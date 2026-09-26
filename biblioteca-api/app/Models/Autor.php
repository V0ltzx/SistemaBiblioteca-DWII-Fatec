<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Autor extends Model
{
    protected $fillable = ['nome', 'quantidade_livros', 'biografia'];

    public function livros() 
    {
        return $this->hasMany(Livro::class);
    }
}
