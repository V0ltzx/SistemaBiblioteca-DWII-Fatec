<?php

namespace App\Http\Controllers;

use App\Models\Emprestimo;
use App\Services\EmprestimoService;

class DevolucaoController extends Controller
{
    public function __invoke(Emprestimo $emprestimo, EmprestimoService $service)
    {
        return $service->registrarDevolucao($emprestimo);
    }
}