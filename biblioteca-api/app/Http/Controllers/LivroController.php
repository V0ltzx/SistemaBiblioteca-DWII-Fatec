<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLivroRequest;
use App\Http\Requests\UpdateLivroRequest;
use App\Models\Livro;
use Illuminate\Http\Request;

class LivroController extends Controller
{
    public function index(Request $request)
    {
        $query = Livro::with('autor');

        if ($busca = $request->query('busca')) {
            $query->where('titulo', 'like', "%{$busca}%");
        }

        if ($genero = $request->query('genero')) {
            $query->where('genero', $genero);
        }

        $query->orderBy($request->query('ordenar', 'titulo'));

        return $query->paginate(15);
    }

    public function store(StoreLivroRequest $request)
    {
        $livro = Livro::create($request->validated());
        return response()->json($livro, 201);
    }

    public function show(Livro $livro)
    {
        return $livro->load('autor', 'emprestimos');
    }

    public function update(UpdateLivroRequest $request, Livro $livro)
    {
        $livro->update($request->validated());
        return $livro;
    }

    public function destroy(Livro $livro)
    {
        $livro->delete();
        return response()->json(null, 204);
    }
}