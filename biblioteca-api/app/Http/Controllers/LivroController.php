<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLivroRequest;
use App\Http\Requests\UpdateLivroRequest;
use App\Models\Autor;
use App\Models\Livro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LivroController extends Controller
{
    public function index(Request $request)
    {
        $query = Livro::with(['autor', 'emprestado']);

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
        $livroDados = $request->validated();

        //$autorInfo = Http::get('https://openlibrary.org' . $livroDados['autor'] . '.json')->json();

        $autor = Autor::firstOrCreate(
            ['nome' => $livroDados['autor']],
            ['biografia' => $livroDados['autor_bio'] ?? null] 
        );

        unset($livroDados['autor'], $livroDados['autor_bio']);

        $livro = Livro::create([
            ...$livroDados,
            'autor_id' => $autor->autor_id
        ]);

        return response()->json($livro, 201);
    }

    public function show(Livro $livro)
    {
        return $livro->load(['autor', 'emprestado']);
    }

    public function update(UpdateLivroRequest $request, Livro $livro)
    {
        $livro->update($request->validated());
        return $livro;
    }

    public function destroy(Livro $livro)
    {
        if ($livro->emprestimos()->whereNull('data_devolvido')->exists()) {
            return response()->json([
                'message' => 'Não é possível remover um livro com empréstimo em aberto.',
            ], 422);
        }

        $livro->delete();
        return response()->noContent();
    }
}