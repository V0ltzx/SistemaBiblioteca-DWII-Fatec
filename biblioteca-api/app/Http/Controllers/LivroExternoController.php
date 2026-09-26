<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LivroExternoController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate(['isbn' => ['required', 'string']]);

        $resposta = Http::get('https://www.googleapis.com/books/v1/volumes', [
            'q' => 'isbn:' . $request->query('isbn'),
        ]);

        if ($resposta->failed() || empty($resposta->json('items'))) {
            return response()->json(['erro' => 'Nenhum livro encontrado para esse ISBN.'], 404);
        }

        $info = $resposta->json('items.0.volumeInfo');

        return response()->json([
            'titulo'  => $info['title'] ?? null,
            'autores' => $info['authors'] ?? [],
            'capa'    => $info['imageLinks']['thumbnail'] ?? null,
            'sinopse' => $info['description'] ?? null,
        ]);
    }
}