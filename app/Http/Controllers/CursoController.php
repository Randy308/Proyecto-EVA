<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Pagina;
use Illuminate\Http\Request;

class CursoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $curso = new Curso();
        $curso->nombre_curso = $request['nombreCurso'];
        $curso->save();
        $hiddenValues = $request->all();

        // Filtra los valores para obtener solo los atributos hidden
        $hiddenInputs = array_filter($hiddenValues, function ($key) {
            return strpos($key, 'myHiddenField') === 0;
        }, ARRAY_FILTER_USE_KEY);
        
        // Realiza cualquier operación con los valores de los atributos hidden
        foreach ($hiddenInputs as $name => $value) {
            $pagina = new Pagina();
            $pagina->nombre_pagina = $name;
            $pagina->contenido = $value;
            $pagina->curso_id = $curso->id;
            $pagina->save();
        }
        return $request;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
