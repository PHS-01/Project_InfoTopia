<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Mail\PasswordResetRequest as PasswordMail;
use App\Models\PasswordRequest as Password;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{
    Hash, Mail, Validator
};
use Illuminate\Support\Str;

class PasswordRequestController extends Controller
{
    private array $validationMessages = [
        'email.required' => 'O campo email é obrigatório.',
        'email.email' => 'O email deve ser válido.',
        'email.exists' => 'O email informado não foi cadastrado no sistema',
        'token.required' => 'O token é obrigatório',
        'token.string' => 'O token deve ser do tipo texto',
        'token.exists' => 'O token informado não foi cadastrado no sistema',
        'new_password.required' => 'A senha é obrigatória',
        'new_password.string' => 'A senha deve ser no formato texto'
    ];

    public function solicitation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|exists:users,email|email',
        ], $this->validationMessages);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $user = User::where('email', $request->email)->first();

        $token = (string) Str::uuid();

        Password::create([
            'user_id' => $user->id,
            'token' => $token,
        ]);

        Mail::to($user->email)->send(new PasswordMail($token));

        return response()->json([
            'message' => 'E-mail para troca de senha enviado com sucesso'
        ]);
    }

    public function setNewPassword(Request $request, string $token)
    {
        $validator = Validator::make(array_merge($request->all(), ['token' => $token]), [
            'token' => 'required|exists:password_requests,token|string',
            'new_password' => 'required|string'
        ], $this->validationMessages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $passwordModel = Password::where('token', $token)->first();

        if (is_null($passwordModel)) {
            return response()->json(['message' => 'Solicitação não encontrada'], 404);
        }

        if ($passwordModel->isValidToken || $passwordModel->activated) {
            return response()->json(['message' => 'Solicitação expirada ou já atendida'], 422);
        }

        $passwordModel->update(['activated' => 1]);
        $user = $passwordModel->user;
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'message' => 'Senha alterada com sucesso'
        ]);
    }
}
