<?php

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