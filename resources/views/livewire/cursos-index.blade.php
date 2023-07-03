<div>
    {{-- Care about people's approval and you will be their prisoner. --}}
    <div class="card"  >
        @if ($cursos->count())
            <div class="card-body containers">
                @foreach ($cursos as $curso)
                    <div class="card" style="width: 20rem;">
                        <img class="card-img-top" src="{{ asset('img/alfil.jpg') }}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{ $curso->nombre_curso }}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Duracion: {{ $curso->duracion }}</h6>
                            <p class="card-text">{{ $curso->descripcion }}</p>
                            <form action="{{ route('abrirCurso.edit', $curso->id) }}">
                                <button class="btn btn-info">Abrir Curso</button>
                            </form>

                        </div>
                    </div>
                @endforeach
            </div>
            <div class="card-footer">
                {{ $cursos->links() }}
            </div>
        @else
            <div class="card-body">
                <strong>No hay registros</strong>
            </div>
        @endif

    </div>
</div>
