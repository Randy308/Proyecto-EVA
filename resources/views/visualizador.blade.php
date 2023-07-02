@if ($curso->count())
    <p>{{ $curso }}</p>
@else
    <p class="h6">No existe roles asignados a este usuario</p>
    <small>Este usuario no podra iniciar sesion a menos que se le asigne un rol</small>
@endif
<br>
<div class="card">

    <div class="card-body">
        <p class="h4">Paginas del curso.-</p>
        
            @foreach ($curso_paginas as $curso_pagina)
                <div class="form-check">
                   
                    <label class="form-check-label" for="flexCheckDefault">
                        {{ $curso_pagina->nombre_pagina }}
                    </label>
                    <iframe srcdoc="{{urldecode($curso_pagina->contenido);}}"></iframe>
                   
                    
                </div>
            @endforeach
    
</div>
