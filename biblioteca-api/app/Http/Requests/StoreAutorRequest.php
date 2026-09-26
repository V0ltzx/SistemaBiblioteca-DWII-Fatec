<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAutorRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'nome'              => ['required', 'string', 'max:100'],
            'quantidade_livros' => ['nullable', 'integer', 'min:0'],
            'biografia'         => ['nullable', 'string'],
        ];
    }
}