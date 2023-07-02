<?php

namespace App\Http\Livewire;

use App\Models\Curso;
use Livewire\Component;
use Illuminate\Support\Facades\DB;
use Livewire\WithPagination;
use Spatie\Permission\Models\Role;

class CursosIndex extends Component
{   use WithPagination;

    public $search;

    protected $paginationTheme = 'bootstrap';


    public function updatingSearch(){
        $this->resetPage();
    }
    public function render()
    {   
        $cursos = Curso::where('nombre_curso','LIKE','%' . $this->search . '%')->paginate();
        return view('livewire.cursos-index', compact('cursos'));
    }
}
