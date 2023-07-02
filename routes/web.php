<?php

use App\Http\Controllers\CursoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SimuladorController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('index');
})->name('index');
Route::get('/plantillas', function () {
    return view('plantillas');
})->name('plantillas');

Route::get('/simulador',[SimuladorController::class,'index'])->name('simulador');


Route::get('/vista', function () {
    return view('vista');
})->name('vista');

Route::get('/cuestionario', function () {
    return view('cuestionario');
})->name('cuestionario');

Route::post('/guardarCurso',[CursoController::class,'store'])->name('guardarCurso.store');
Route::get('/abrirCurso/{curso}',[CursoController::class,'edit'])->name('abrirCurso.edit');