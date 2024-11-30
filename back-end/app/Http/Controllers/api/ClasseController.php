<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Models\{
    Classe, User
};
use App\Http\Resources\{
    ClasseCollection, ClasseResource
};
use Illuminate\Support\Facades\{
    Validator
};
use Illuminate\Routing\Controllers\{
    HasMiddleware, Middleware
};

class ClasseController extends Controller implements HasMiddleware
{
    private array $validationMessages = [
        'name.required' => 'O campo Nome é obrigatório',
        'name.string' => 'O campo Nome deve ser um texto',
        'name.max' => 'O campo Nome não pode ter mais que 100 caracteres',
        'profile_photo.required' => 'O campo Foto de Perfil é obrigatório',
        'profile_photo.image' => 'A Foto de Perfil deve ser uma imagem nos formatos: jpeg, png, jpg, gif ou svg',
        'profile_photo.max' => 'A Foto de Perfil não pode exceder 2 MB',
        'cover_photo.required' => 'O campo Capa é obrigatório',
        'cover_photo.image' => 'A Capa deve ser uma imagem nos formatos: jpeg, png, jpg, gif ou svg',
        'cover_photo.max' => 'A Capa não pode exceder 2 MB',
        'course_id.required' => 'O campo ID do Curso é obrigatório',
        'course_id.exists' => 'O ID do Curso deve corresponder a um curso existente',
        'course_id.integer' => 'O ID do Curso deve ser um número inteiro',
        'users.required' => 'O campo usuários é obrigatório.',
        'users.array' => 'O campo usuários deve ser um array.',
        'users.*.integer' => 'Cada usuário deve ser identificado por um número inteiro.',
        'users.*.exists' => 'Um ou mais usuários selecionados não existem.',
        'year.required' => 'O ano é obrigatório',
        'year.integer' => 'O ano deve ser um número inteiro'
    ];

    public function index()
    {
        return new ClasseCollection(Classe::paginate());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'profile_photo' => 'required|image:jpeg,png,jpg,gif,svg|max:2048',
            'cover_photo' => 'required|image:jpeg,png,jpg,gif,svg|max:2048',
            'course_id' => 'required|exists:courses,id|integer',
            'year' => 'required|integer'
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $profilePath = saveFile($request, 'profile_photo', '/images/classes/profile') ?: '';
        $coverPath = saveFile($request, 'cover_photo', '/images/classes/cover') ?: '';

        $class = Classe::create(array_merge(
            $request->except(['profile_photo', 'cover_photo']), [
                'profile_photo' => $profilePath,
                'cover_photo' => $coverPath,
            ]
        ));

        return new ClasseResource($class);
    }

    public function show(Classe $class)
    {
        return new ClasseResource($class);
    }

    public function update(Request $request, Classe $class)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string|max:100',
            'profile_photo' => 'nullable|image:jpeg,png,jpg,gif,svg|max:2048',
            'cover_photo' => 'nullable|image:jpeg,png,jpg,gif,svg|max:2048',
            'course_id' => 'nullable|exists:courses,id|integer',
            'year' => 'nullable|integer'
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $profilePath = saveFile($request, 'profile_photo', '/images/classes/profile', $class->profile_photo) ?: $class->profile_photo;
        $coverPath = saveFile($request, 'cover_photo', '/images/classes/cover', $class->cover_photo) ?: $class->cover_photo;

        $class->update(array_filter(
            array_merge(
                $request->except(['profile_photo', 'cover_photo']), [
                    'profile_photo' => $profilePath,
                    'cover_photo' => $coverPath,
                ]
            )
        ));

        return new ClasseResource($class);
    }

    public function destroy(Classe $class)
    {
        $class->delete();

        deleteFile("storage/{$class->profile_photo}");
        deleteFile("storage/{$class->cover_photo}");

        return response()->json(['message' => 'Turma deletada com sucesso']);
    }

    public function createLeaders(Request $request, Classe $class)
    {
        $validator = Validator::make($request->all(), [
            'users' => 'required|array',
            'users.*' => 'integer|exists:users,id'
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $class->users()->attach($request->users);

        return response()->json(['message' => 'Líderes de turma criados com sucesso'], 200);
    }

    public function removeLeaders(Request $request, Classe $class)
    {
        $validator = Validator::make($request->all(), [
            'users' => 'required|array',
            'users.*' => 'integer|exists:users,id'
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $class->users()->detach($request->users);

        return response()->json(['message' => 'Líderes de turma removidos com sucesso'], 200);
    }

    public static function middleware() : array
    {
        return [
            new Middleware('can:viewAny,App\Models\Classe', only: ['index', 'show']),
            new Middleware('can:update,class', only: ['update']),
            new Middleware('can:create,App\Models\Classe', only: ['register', 'logout']),
            new Middleware('can:delete,class', only: ['destroy', 'createLeaders', 'removeLeaders']),
        ];
    }
}
