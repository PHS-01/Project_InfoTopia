<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Http\Resources\{
    RoleResource, RoleCollection, UserResource
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class RoleController extends Controller implements HasMiddleware
{
    private array $validationMessages = [
        'name.required' => 'O nome é obrigatório',
        'name.string' => 'O nome deve ser um texto',
        'name.max' => 'O nome não pode ser maior que 40 caracteres',
        'users.required' => 'O campo usuários é obrigatório.',
        'users.array' => 'O campo usuários deve ser um array.',
        'users.*.integer' => 'Cada usuário deve ser identificado por um número inteiro.',
        'users.*.exists' => 'Um ou mais usuários selecionados não existem.',
    ];

    public function index()
    {
        return new RoleCollection(Role::paginate());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:40',
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $role = Role::create([
            'name' => $request->name,
        ]);

        return new RoleResource($role);
    }

    public function show(Role $role)
    {
        return new RoleResource($role);
    }

    public function update(Request $request, Role $role)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:40',
        ], $this->validationMessages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $role->update([
            'name' => $request->name,
        ]);

        return new RoleResource($role);
    }

    public function destroy(Role $role)
    {
        $role->delete();

        return response()->json(['message' => 'Cargo deletado com sucesso']);
    }

    public function assingRole(Request $request, Role $role)
    {
        $validator = Validator::make($request->all(), [
            'users' => 'required|array',
            'users.*' => 'integer|exists:users,id'
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $role->users()->attach($request->users);

        return response()->json([
            'message' => 'Novo cargo adicionado aos usuários',
        ], 200);
    }

    public function removeRole(Request $request, Role $role)
    {
        $validator = Validator::make($request->all(), [
            'users' => 'required|array',
            'users.*' => 'integer|exists:users,id'
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $role->users()->detach($request->users);

        return response()->json([
            'message' => 'Cargo removido dos usuários',
        ], 200);
    }

    public function showUsersByRole()
    {
        $rolesUsers = [];

        foreach (Role::all() as $role) {
            foreach ($role->users as $user) $rolesUsers[$role->name][] = new UserResource($user);
        }
        
        return response()->json($rolesUsers, 200);
    }

    public static function middleware() : array
    {
        return [
            new Middleware('can:view,App\Models\Role', except: ['index', 'show']),
            new Middleware('can:viewAny,App\Models\Role', except: ['index', 'show']),
        ];
    }
}