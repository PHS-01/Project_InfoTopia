<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Http\Resources\{
    CommentResource, CommentCollection
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controllers\{
    HasMiddleware, Middleware
};

class CommentController extends Controller implements HasMiddleware
{
    private array $validationMessages = [
        'content.required' => 'O campo de conteúdo é obrigatório',
        'content.string' => 'O campo de conteúdo deve ser uma string',

        'user_id.required' => 'O campo de ID do usuário é obrigatório',
        'user_id.exists' => 'O ID do usuário fornecido não existe',
        'user_id.integer' => 'O ID do usuário deve ser um número inteiro',

        'post_id.required' => 'O campo de ID da postagem é obrigatório',
        'post_id.exists' => 'O ID da postagem fornecido não existe',
        'post_id.integer' => 'O ID da postagem deve ser um número inteiro',
    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new CommentCollection(Comment::orderBy('updated_at', 'desc')->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
            'user_id' => 'required|exists:users,id|integer',
            'post_id' => 'required|exists:posts,id|integer',
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $comment = Comment::create($request->all());

        return new CommentResource($comment);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        return new CommentResource($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
            'user_id' => 'nullable|exists:users,id|integer',
            'post_id' => 'nullable|exists:posts,id|integer',
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $comment->update($request->all());

        return new CommentResource($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();

        return response()->json([
            'message' => 'Comentário deletado com sucesso'
        ]);
    }

    public static function middleware() : array
    {
        return [
            new Middleware('can:viewAny,App\Models\Comment', only: ['index', 'show']),
            new Middleware('can:create,App\Models\Comment', only: ['store']),
            new Middleware('can:update,comment', only: ['update']),
            new Middleware('can:delete,comment', only: ['destroy']),
        ];
    }
}
