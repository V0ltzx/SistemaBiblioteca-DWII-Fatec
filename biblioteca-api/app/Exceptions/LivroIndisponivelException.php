<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class LivroIndisponivelException extends Exception
{
    public function render(): JsonResponse
    {
        return response()->json([
            'erro' => 'Este livro já está emprestado no momento.',
        ], 422);
    }
}