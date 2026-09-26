<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AutorController;
use App\Http\Controllers\DevolucaoController;
use App\Http\Controllers\EmprestimoController;
use App\Http\Controllers\LivroController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\LivroExternoController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('throttle:60,1')->group(function () {

    Route::post('/registrar', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/autores', [AutorController::class, 'index']);
    Route::get('/autores/{autor}', [AutorController::class, 'show']);
    Route::get('/livros', [LivroController::class, 'index']);
    Route::get('/livros/{livro}', [LivroController::class, 'show']);


    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::post('/autores', [AutorController::class, 'store']);
        Route::put('/autores/{autor}', [AutorController::class, 'update']);
        Route::delete('/autores/{autor}', [AutorController::class, 'destroy']);

        Route::post('/livros', [LivroController::class, 'store']);
        Route::put('/livros/{livro}', [LivroController::class, 'update']);
        Route::delete('/livros/{livro}', [LivroController::class, 'destroy']);

        Route::apiResource('emprestimos', EmprestimoController::class)
             ->only(['index', 'store', 'show', 'destroy']);
        Route::patch('/emprestimos/{emprestimo}/devolucao', DevolucaoController::class);

        Route::apiResource('usuarios', UsuarioController::class)
             ->only(['index', 'show', 'update', 'destroy']);

        Route::get('/livros-externos/busca', LivroExternoController::class);

    });

    
});



