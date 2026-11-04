<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLivroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $livroId = $this->route('livro')->livro_id;

        return [
            'titulo'         => ['sometimes', 'required', 'string', 'max:100'],
            'isbn'           => ['sometimes', 'required', 'string', 'max:45', "unique:livros,isbn,{$livroId},livro_id"],
            'capa'           => ['sometimes', 'nullable', 'string', 'max:300'],
            'sinopse'        => ['sometimes', 'nullable', 'string'],
            'genero'         => ['sometimes', 'nullable', 'string', 'max:45'],
            'ano_publicacao' => ['sometimes', 'nullable', 'integer', 'digits:4'],
            'autor_id'       => ['sometimes', 'required', 'integer', 'exists:autors,autor_id'],
        ];
    }
}