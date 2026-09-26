<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAutorRequest;
use App\Models\Autor;

class AutorController extends Controller
{
    public function index()
    {
        return Autor::paginate(15);
    }

    public function store(StoreAutorRequest $request)
    {
        $autor = Autor::create($request->validated());
        return response()->json($autor, 201);
    }

    public function show(Autor $autor)
    {
        return $autor->load('livros');
    }

    public function update(StoreAutorRequest $request, Autor $autor)
    {
        $autor->update($request->validated());
        return $autor;
    }

    public function destroy(Autor $autor)
    {
        $autor->delete();
        return response()->json(null, 204);
    }
}