<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $fillable = ['nome', 'email', 'senha_hash'];

    public function emprestimos() 
    {
        return $this->hasMany(Emprestimo::class);
    }
}
