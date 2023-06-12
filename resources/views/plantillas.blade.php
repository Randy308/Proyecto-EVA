<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <link rel="stylesheet" href={{ asset('css/style-plantilla.css') }}>
    <title>Document</title>
</head>
<body>
    <h2>Lorem, ipsum.</h2> 
    <div class="container">
        <div class="subcontedor c1">
           
        </div>
        <div class="subcontedor c2">
            <div class="hoja">
                <p>hola mundo</p>
            </div>
        </div>
        <div class="subcontedor c3">
            <input id="button"  onclick="addPlantilla()" type="button" class="btn btn-primary" value="Agregar Diapostiva">
        </div>
    </div>


    <script src="{{ asset('js/plantilla-app.js') }}"></script>
</body>
</html>