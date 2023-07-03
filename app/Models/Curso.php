<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_curso',
        'descripcion',
        'duracion',
        'fecha_inicio',
        'fecha_fin',
    ];


    public function paginas()
    {
        return $this->hasMany(Pagina::class);
    }
}
