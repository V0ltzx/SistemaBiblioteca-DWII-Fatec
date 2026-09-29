<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAutorRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'nome'              => ['required', 'string', 'max:100', 'unique:autors,nome'],
            'quantidade_livros' => ['nullable', 'integer', 'min:0'],
            'biografia'         => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'nome.unique' => 'O nome do autor já está em uso.'
        ];
    }

}