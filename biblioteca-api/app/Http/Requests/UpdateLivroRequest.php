<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLivroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'titulo'         => ['required', 'string', 'max:100'],
            'isbn'           => ['required', 'string', 'max:45', 'unique:livros,isbn'],
            'capa'           => ['nullable', 'string', 'max:100'],
            'sinopse'        => ['nullable', 'string'],
            'genero'         => ['nullable', 'string', 'max:45'],
            'ano_publicacao' => ['nullable', 'integer', 'digits:4'],
            'autor_id'       => ['required', 'integer', 'exists:autores,autor_id'],
        ];
    }

    public function messages(): array
    {
        return [
            'isbn.unique'      => 'Já existe um livro cadastrado com esse ISBN.',
            'autor_id.exists'  => 'Selecione um autor válido.',
        ];
    }
}