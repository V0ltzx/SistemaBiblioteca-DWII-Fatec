<?php

namespace App\Http\Controllers;

use App\Models\Emprestimo;
use App\Models\Livro;
use App\Services\EmprestimoService;
use Illuminate\Http\Request;

class EmprestimoController extends Controller
{
    public function index(Request $request)
    {
        return Emprestimo::with('livro', 'usuario')
            ->where('usuario_id', $request->user()->usuario_id)
            ->paginate(15);
    }

    public function store(Request $request, EmprestimoService $service)
    {
        $request->validate([
            'livro_id' => ['required', 'integer', 'exists:livros,livro_id'],
        ]);

        $livro = Livro::findOrFail($request->livro_id);

        $emprestimo = $service->registrar($livro, $request->user());

        return response()->json($emprestimo, 201);
    }

    public function show(Emprestimo $emprestimo)
    {
        return $emprestimo->load('livro', 'usuario');
    }

    public function destroy(Emprestimo $emprestimo)
    {
        $emprestimo->delete();
        return response()->json(null, 204);
    }
}