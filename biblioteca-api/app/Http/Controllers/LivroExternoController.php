<?php

namespace App\Http\Controllers;

use App\Models\Autor;
use App\Models\Livro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class LivroExternoController extends Controller
{
    public function busca_isbn(Request $request)
    {
        $request->validate(['isbn' => ['required', 'string']]);

        $resposta = Http::get('https://openlibrary.org/isbn/' . $request->query('isbn') . '.json');

        if ($resposta->failed() || empty($resposta->json())) {
            return response()->json(['erro' => 'Nenhum livro encontrado para esse ISBN.'], 404);
        }

        $info = $resposta->json();

        $author_key = $info['authors'] ?? [];

        $author_info = Http::get('https://openlibrary.org/' . $author_key[0]['key'] . '.json')->json();

        $cover = Http::get('https://covers.openlibrary.org/b/id/' . ($info['covers'][0] ?? '') . '-M.jpg');

        return response()->json([
            'titulo'  => $info['title'] ?? null,
            'autores' => $author_info['personal_name'] ?? null,
            'genero'  => $info['genres'][0] ?? null,
            'capa'    => $cover->successful() ? $cover->url() : null,
            'sinopse' => $info['description'] ?? null,
        ]);
    }

    public function add_livro(Request $request)
    {
        $dados = $request->validate([
            'isbn' => ['required', 'string', 'max:45', 'unique:livros,isbn'],
        ]);

        $resposta = Http::get('https://openlibrary.org/isbn/' . $dados['isbn'] . '.json');

        if ($resposta->failed() || empty($resposta->json())) {
            return response()->json(['erro' => 'Nenhum livro encontrado para esse ISBN.'], 404);
        }

        $info = $resposta->json();
        $authorKey = $info['authors'][0]['key'] ?? null;

        $authorInfo = Http::get('https://openlibrary.org/' . $authorKey . '.json')->json();

        $biografia = $authorInfo['bio'] ?? null;

        if (is_array($biografia)) {
            $biografia = $biografia['value'] ?? null;
        }

        $dadosAutor = [
            'nome' => $authorInfo['personal_name'] ?? $authorInfo['name'] ?? null,
            'biografia' => is_string($biografia) ? $biografia : null,
        ];

        $validacaoAutor = Validator::make($dadosAutor, [
            'nome' => ['required', 'string', 'max:100'],
            'biografia' => ['nullable', 'string'],
        ]);

        if ($validacaoAutor->fails()) {
            return response()->json(['erros' => $validacaoAutor->errors()], 422);
        }

        $descricao = $info['description'] ?? null;
        if (is_array($descricao)) {
            $descricao = $descricao['value'] ?? null;
        }

        $coverId = $info['covers'][0] ?? null;
        $anoMatches = [];
        // Olhar isso aqui
        preg_match('/\b(\d{4})\b/', (string) ($info['publish_date'] ?? ''), $anoMatches);

        $livroDados = [
            'titulo' => $info['title'],
            'isbn' => $dados['isbn'],
            'capa' => $coverId ? 'https://covers.openlibrary.org/b/id/' . $coverId . '-M.jpg' : null,
            'sinopse' => is_string($descricao) ? $descricao : null,
            'genero' => $info['genres'][0] ?? null,
            'ano_publicacao' => $anoMatches[1] ?? null,
        ];

        $validacaoLivro = Validator::make($livroDados, [
            'titulo' => ['required', 'string', 'max:100'],
            'isbn' => ['required', 'string', 'max:45'],
            'capa' => ['nullable', 'string', 'max:300'],
            'sinopse' => ['nullable', 'string'],
            'genero' => ['nullable', 'string', 'max:45'],
            'ano_publicacao' => ['nullable', 'integer', 'digits:4'],
        ]);

        if ($validacaoLivro->fails()) {
            return response()->json(['erros' => $validacaoLivro->errors()], 422);
        }

        $livro = DB::transaction(function () use ($validacaoAutor, $livroDados) {
            $autor = Autor::firstOrCreate(
                ['nome' => $validacaoAutor->validated()['nome']],
                ['biografia' => $validacaoAutor->validated()['biografia'] ?? null]
            );

            $livroDados['autor_id'] = $autor->autor_id;

            return Livro::create($livroDados);
        });

        return response()->json([
            'livro' => $livro,
            'mensagem' => 'Livro adicionado com sucesso.',
        ], 201);
    }
}