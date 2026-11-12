<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Emprestimo extends Model
{
    protected $primaryKey = 'emprestimo_id';
    protected $fillable = ['livro_id', 'usuario_id', 'data_emprestimo', 'data_devolucao', 'data_devolvido', 'status'];

    public function livro() 
    {
        return $this->belongsTo(Livro::class, 'livro_id', 'livro_id');
    }

    public function usuario() 
    {
        return $this->belongsTo(Usuario::class, 'usuario_id', 'usuario_id');
    }
}
