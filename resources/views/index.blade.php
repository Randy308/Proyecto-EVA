<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    
    <link rel="stylesheet" href={{ asset('css/style-index.css') }}>
    <title>Document</title>
</head>
<body>
    <ul>
        <li><a class="active" href="{{route('index')}}">Inicio</a></li>
        <li><a href="{{route('plantillas')}}">Crear Plantillas</a></li>
        <li><a href="{{route('simulador')}}">Simulador</a></li>
      </ul>
    <h1>Lorem, ipsum.</h1> 
</body>
</html>