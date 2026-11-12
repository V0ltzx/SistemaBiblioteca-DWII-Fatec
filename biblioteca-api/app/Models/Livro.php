<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Livro extends Model
{
    protected $table = 'livros';
    protected $primaryKey = 'livro_id';

    protected $fillable = [
        'titulo', 'isbn', 'capa', 'sinopse',
        'genero', 'ano_publicacao', 'autor_id',
    ];

    public function autor()
    {
        return $this->belongsTo(Autor::class, 'autor_id', 'autor_id');
    }

    public function emprestimos()
    {
        return $this->hasMany(Emprestimo::class, 'livro_id', 'livro_id');
    }

    public function emprestado(): HasOne{
        return $this->hasOne(Emprestimo::class, 'livro_id', 'livro_id')->where('status', 'emprestado');
    }
}