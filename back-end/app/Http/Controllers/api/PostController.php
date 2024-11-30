<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Http\Resources\{
    PostCollection, PostResource
};
use App\Models\Classe;
use App\Models\User;
use App\Notifications\NewPost;
use Illuminate\Routing\Controllers\{
    HasMiddleware, Middleware
};
use Illuminate\Support\Facades\{
    Validator
};

class PostController extends Controller implements HasMiddleware
{
    private array $validationMessages = [
        'image.required' => 'O campo Mídia é obrigatório.',
        'image.mimes' => 'O campo Mídia deve ser um arquivo nos formatos: jpeg, png, jpg, gif ou svg.',
        'image.file' => 'O campo Mídia deve ser um arquivo nos formatos: jpeg, png, jpg, gif ou svg.',
        'image.max' => 'A Mídia não pode exceder 2 MB.',
        'description.required' => 'O campo Descrição é obrigatório.',
        'description.string' => 'O campo Descrição deve ser um texto.',
        'user_id.required' => 'O campo ID do Usuário é obrigatório.',
        'user_id.exists' => 'O ID do Usuário deve corresponder a um usuário existente.',
        'user_id.integer' => 'O ID do Usuário deve ser um número inteiro.',
        'classe_id.required' => 'O campo ID da Turma é obrigatório.',
        'classe_id.exists' => 'O ID da Turma deve corresponder a uma turma existente.',
        'classe_id.integer' => 'O ID da Turma deve ser um número inteiro.',
    ];

    public function index()
    {
        return new PostCollection(Post::orderByDesc('important')->orderByDesc('updated_at')->paginate());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|mimes:jpg,jpeg,png,gif,mp4,svg|file|max:10018',
            'description' => 'required|string',
            'user_id' => 'required|exists:users,id|integer',
            'classe_id' => 'required|exists:classes,id|integer'
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $user = User::find($request->user_id);

        // if (!hasRoles($user, ['Administrador']) && !isLeader($user, Classe::find($request->classe_id))) {
        //     return response()->json([
        //         'errors' => [
        //             'O usuário não é líder/representante da turma informada'
        //         ]
        //     ], 403);
        // }

        $imagePath = saveFile($request, 'image', 'images/posts') ?: '';

        $post = Post::create(array_merge(
            $request->except(['image']),
            ['image' => $imagePath]
        ));

        // Notifica todos os usuários do sistema sobre a nova postagem
        foreach (User::all() as $user) $user->notify(new NewPost($post));

        return new PostResource($post);
    }

    public function show(Post $post)
    {
        return new PostResource($post);
    }

    public function update(Request $request, Post $post)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'nullable|mimes:jpg,jpeg,png,gif,mp4,svg|file|max:10018',
            'description' => 'nullable|string',
            'user_id' => 'nullable|exists:users,id|integer',
            'classe_id' => 'nullable|exists:classes,id|integer'
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $imagePath = saveFile($request, 'image', 'images/posts', $post->image) ?: $post->image;

        $post->update(array_filter(
            array_merge(
                $request->except(['image']),
                ['image' => $imagePath]
            )
        ));

        return new PostResource($post);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        deleteFile("storage/{$post->image}");

        return response()->json(['message' => 'Postagem deletada com sucesso']);
    }

    public static function middleware() : array
    {
        return [
            new Middleware('can:viewAny,App\Models\Post', only: ['index', 'show']),
            new Middleware('can:update,post', only: ['update']),
            new Middleware('can:create,App\Models\Post', only: ['store']),
            new Middleware('can:delete,post', only: ['destroy']),
        ];
    }
}
