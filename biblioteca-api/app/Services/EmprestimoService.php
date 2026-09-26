<?php

namespace App\Services;

use App\Exceptions\LivroIndisponivelException;
use App\Models\Emprestimo;
use App\Models\Livro;
use App\Models\Usuario;

class EmprestimoService
{
    public function registrar(Livro $livro, Usuario $usuario): Emprestimo
    {
        $jaEmprestado = Emprestimo::where('livro_id', $livro->livro_id)
            ->where('status', 'emprestado')
            ->exists();

        if ($jaEmprestado) {
            throw new LivroIndisponivelException();
        }

        return Emprestimo::create([
            'livro_id'        => $livro->livro_id,
            'usuario_id'      => $usuario->usuario_id,
            'data_emprestimo' => now()->toDateString(),
            'data_devolucao'  => now()->addDays(14)->toDateString(),
            'status'          => 'emprestado',
        ]);
    }

    public function registrarDevolucao(Emprestimo $emprestimo): Emprestimo
    {
        $emprestimo->update([
            'data_devolucao' => now()->toDateString(),
            'status'         => 'devolvido',
        ]);

        return $emprestimo;
    }
}