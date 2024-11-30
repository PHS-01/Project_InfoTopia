<?php

namespace App\Http\Controllers\api;

use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Models\{
    Classe, User
};
use App\Http\Resources\{
    UserCollection, UserResource, ClasseCollection
};
use Illuminate\Support\Facades\{
    Auth, Hash, Http, Validator
};
use Illuminate\Routing\Controllers\{
    HasMiddleware, Middleware
};

class UserController extends Controller implements HasMiddleware
{
    private array $validationMessages = [
        'email.required' => 'O campo email é obrigatório.',
        'email.email' => 'O email deve ser válido.',
        'email.unique' => 'O email já está cadastrado.',
        'matriculation.required' => 'O campo matrícula é obrigatório.',
        'matriculation.numeric' => 'A matrícula deve conter apenas números.',
        'password.required' => 'O campo senha é obrigatório.',
        'password.string' => 'A senha deve ser uma string.',
        'profile_photo.image' => 'Formato de imagem inválido',
        'profile_photo.max' => 'Imagem excede o tamanho máximo',
    ];

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'matriculation' => 'required|unique:users,matriculation|numeric',
            'password' => 'required|string',
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $response = Http::post('https://suap.ifrn.edu.br/api/v2/autenticacao/token/', [
            'username' => $request->matriculation,
            'password' => $request->password
        ]);
        
        if ($response->failed()) return response()->json([ 'errors' => [$response['detail']] ], $response->status());

        $student = Http::withToken($response['access'])->get('https://suap.ifrn.edu.br/api/v2/minhas-informacoes/meus-dados/');

        $profilePhoto = saveFile($request, 'profile_photo', '/images/users', url: $student['url_foto_150x200']) ?: ' ';

        $user = User::create([
            'name' => $student['nome_usual'],
            'email' => $request->email,
            'matriculation' => $request->matriculation,
            'password' => Hash::make($request->password),
            'profile_photo' => $profilePhoto
        ]);

        event(new Registered($user));

        return new UserResource($user);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $credentials = ['email' => $request->email, 'password' => $request->password];
        
        if (!Auth::attempt($credentials)) return response()->json([ 'errors' => ['Credenciais inválidas'] ], 401);

        $token = $request->user()->createToken('Personal Access Token')->plainTextToken;

        return response()->json(['message' => 'Login realizado com sucesso', 'token' => $token]);
    }

    public function logout(Request $request)
    {
        if (Auth::guest()) return response()->json(['errors' => ['Necessário fazer uma sessão para poder sair']]);

        Auth::user()->tokens()->delete();

        Auth::guard('web')->logout();

        return response()->json(['message' => 'Logout realizado com sucesso']);
    }

    public function index()
    {
        return new UserCollection(User::paginate());
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function currentUser()
    {
        return new UserResource(Auth::user());
    }

    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'nullable|email|unique:users,email',
            'matriculation' => 'nullable|unique:users,matriculation|numeric',
            'profile_photo' => 'nullable|image:jpeg,png,jpg,gif,svg|max:2048',
            'password' => 'nullable|string',
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        if (!is_null($request->matriculation) && !is_null($request->password)) {
            $response = Http::post('https://suap.ifrn.edu.br/api/v2/autenticacao/token/', [
                'username' => $request->matriculation,
                'password' => $request->password
            ]);
            
            if ($response->failed()) return response()->json([ 'errors' => [$response['detail']] ], $response->status());
        }

        $path = saveFile($request, 'profile_photo', '/images/users', $user->profile_photo) ?: '';

        $user->update(
            array_filter(array_merge($request->except(['profile_photo', 'password']), ['profile_photo' => $path]))
        );

        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();

        deleteFile("storage/{$user->profile_photo}");

        return response()->json([
            'message' => 'Usuário deletado com sucesso'
        ]);
    }

    public function userClasses(User $user) {
        return new ClasseCollection(
            hasRoles($user, ['Administrador']) ? Classe::all() : $user->classes
        );
    }

    public static function middleware() : array
    {
        return [
            new Middleware('can:viewAny,App\Models\User', only: ['index']),
            new Middleware('can:update,user', only: ['update']),
            new Middleware('can:logout,App\Models\User', only: ['logout']),
            new Middleware('can:delete,App\Models\User', only: ['destroy']),
        ];
    }
}
