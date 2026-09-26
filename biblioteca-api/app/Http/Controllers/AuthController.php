<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $dados = $request->validate([
            'nome'           => ['required', 'string', 'max:100'],
            'email'          => ['required', 'email', 'max:100', 'unique:usuarios,email'],
            'senha'          => ['required', 'string', 'min:8']
        ]);

        $usuario = Usuario::create([
            'nome'            => $dados['nome'],
            'email'           => $dados['email'],
            'senha_hash'      => Hash::make($dados['senha'])
        ]);

        $token = $usuario->createToken('biblioteca')->plainTextToken;

        return response()->json(['usuario' => $usuario, 'token' => $token], 201);
    }

    public function login(Request $request)
    {
        $credenciais = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'], 
        ]);

        if (! Auth::attempt($credenciais)) {
            return response()->json(['erro' => 'Credenciais inválidas.'], 401);
        }

        $usuario = Auth::user();
        $token = $usuario->createToken('biblioteca')->plainTextToken;

        return response()->json(['usuario' => $usuario, 'token' => $token]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete(); 
        return response()->json(['mensagem' => 'Logout realizado com sucesso.']);
    }
}