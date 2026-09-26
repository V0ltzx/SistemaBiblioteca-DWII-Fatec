<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Livro extends Model
{
    protected $fillable = ['titulo', 'isbn', 'capa', 'sinopse', 'ano_publicacao', 'genero', 'autor_id'];

    public function autor() 
    {
        return $this->belongsTo(Autor::class);
    }

    public function emprestimos() 
    {
        return $this->hasMany(Emprestimo::class);
    }

}
