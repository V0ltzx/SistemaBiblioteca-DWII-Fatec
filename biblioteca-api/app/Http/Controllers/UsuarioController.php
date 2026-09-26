<?php

namespace App\Http\Controllers;

use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function index()
    {
        return Usuario::paginate(15);
    }

    public function show(Usuario $usuario)
    {
        return $usuario;
    }

    public function update(Usuario $usuario)
    {
        $dados = request()->validate([
            'nome'           => ['sometimes', 'string', 'max:100'],
            'email'          => ['sometimes', 'email', 'max:100'],
        ]);

        $usuario->update($dados);
        return $usuario;
    }

    public function destroy(Usuario $usuario)
    {
        $usuario->delete();
        return response()->json(null, 204);
    }
}