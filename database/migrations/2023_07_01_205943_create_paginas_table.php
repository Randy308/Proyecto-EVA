<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('paginas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('curso_id');
            $table->string('nombre_pagina')->nullable();
            $table->text('contenido');
            $table->timestamps();
            $table->foreign('curso_id')
                  ->references('id')
                  ->on('cursos')
                  ->onDelete('cascade')->onUpdate('cascade');
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paginas');
    }
};
