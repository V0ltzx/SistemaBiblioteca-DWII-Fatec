<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'usuarios';
    protected $primaryKey = 'usuario_id';

    protected $fillable = [
        'nome', 'email', 'senha_hash',
    ];

    protected $hidden = ['senha_hash', 'remember_token'];

    public function getAuthPassword()
    {
        return $this->senha_hash;
    }

    public function emprestimos()
    {
        return $this->hasMany(Emprestimo::class, 'usuario_id', 'usuario_id');
    }
}