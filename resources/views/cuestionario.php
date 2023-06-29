<?php
$preguntas = array();

// Verificar si se ha enviado el formulario para agregar una pregunta
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['agregar_pregunta'])) {
    $pregunta = $_GET['pregunta'];
    $opciones = array($_GET['opcion1'], $_GET['opcion2'], $_GET['opcion3']);
    $preguntas[] = array('pregunta' => $pregunta, 'opciones' => $opciones);

    // Guardar las preguntas en un archivo
    guardarPreguntas($preguntas);
}

// Verificar si se ha enviado el formulario para eliminar todas las preguntas
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['eliminar_preguntas'])) {
    // Eliminar todas las preguntas
    eliminarTodasLasPreguntas();
}

// Función para generar el formulario del cuestionario
function generarCuestionario($preguntas) {
    $form = '<form method="get" action="">';
    
    foreach ($preguntas as $index => $datosPregunta) {
        $pregunta = $datosPregunta['pregunta'];
        $opciones = $datosPregunta['opciones'];
        
        $form .= '<div style="display: inline-block; width: 200px; margin-right: 20px;">';
        $form .= '<h3>Pregunta ' . ($index + 1) . '</h3>';
        $form .= '<p>' . $pregunta . '</p>';
        
        foreach ($opciones as $opcionIndex => $opcion) {
            $opcionNumero = $opcionIndex + 1;
            $form .= '<input type="radio" name="respuesta' . $index . '" value="' . $opcion . '"> ' . $opcion . '<br>';
        }
        
        $form .= '</div>';
    }
    
    $form .= '<input type="submit" name="enviar_respuestas" value="Enviar Respuestas">';
    $form .= '</form>';
    
    return $form;
}

// Función para mostrar la lista de preguntas
function mostrarListaPreguntas($preguntas) {
    $lista = '<h2>Lista de Preguntas</h2>';
    $lista .= '<ul>';
    
    foreach ($preguntas as $index => $datosPregunta) {
        $pregunta = $datosPregunta['pregunta'];
        $opciones = $datosPregunta['opciones'];
        
        $lista .= '<li>';
        $lista .= '<h3>Pregunta ' . ($index + 1) . '</h3>';
        $lista .= '<p>' . $pregunta . '</p>';
        $lista .= '<ul>';
        
        foreach ($opciones as $opcionIndex => $opcion) {
            $opcionNumero = $opcionIndex + 1;
            $lista .= '<li>Opción ' . $opcionNumero . ': ' . $opcion . '</li>';
        }
        
        $lista .= '</ul>';
        $lista .= '</li>';
    }
    
    $lista .= '</ul>';
    
    return $lista;
}

// Función para guardar las preguntas en un archivo
function guardarPreguntas($preguntas) {
    $archivo = 'preguntas.json';

    // Obtener las preguntas existentes
    $preguntasAnteriores = obtenerPreguntas();

    // Agregar las nuevas preguntas
    $preguntasNuevas = array_merge($preguntasAnteriores, $preguntas);

    // Guardar las preguntas en el archivo
    $preguntasJSON = json_encode($preguntasNuevas);

    // Guardar las preguntas en el archivo
    file_put_contents($archivo, $preguntasJSON);
}

// Función para obtener las preguntas desde el archivo
function obtenerPreguntas() {
    $archivo = 'preguntas.json';

    // Verificar si el archivo existe
    if (file_exists($archivo)) {
        // Leer el contenido del archivo
        $contenido = file_get_contents($archivo);

        // Convertir el contenido a un array de preguntas
        $preguntas = json_decode($contenido, true);

        // Verificar si se pudo decodificar el contenido correctamente
        if ($preguntas !== null) {
            return $preguntas;
        }
    }

    return array(); // Devolver un array vacío si no hay preguntas o si hay algún error
}

// Función para eliminar todas las preguntas
function eliminarTodasLasPreguntas() {
    $archivo = 'preguntas.json';

    // Eliminar el archivo de preguntas
    if (file_exists($archivo)) {
        unlink($archivo);
    }
    
    // Limpiar el array de preguntas
    $preguntas = array();
}

// Función para generar el archivo ZIP con el cuestionario SCORM
function createSCORMZip() {
    $preguntas = obtenerPreguntas();

    // Verificar si hay preguntas para generar el cuestionario
    if (count($preguntas) === 0) {
        echo 'No hay preguntas para generar el cuestionario.';
        return;
    }

    $zip = new ZipArchive();

    // Nombre del archivo ZIP
    $zipFileName = 'contenido_scorm.zip';

    // Abre el archivo ZIP para escritura
    if ($zip->open($zipFileName, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {
        // Agrega el archivo imsmanifest.xml al ZIP
        $imsmanifestContent = '<?xml version="1.0" encoding="UTF-8"?>
        <manifest xmlns="http://www.imsglobal.org/xsd/imscp_v1p1" xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_v1p3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" identifier="MANIFEST-01" version="1" xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 http://www.imsglobal.org/xsd/imsccv1p2/imsmanifest_v1p2.xsd http://www.adlnet.org/xsd/adlcp_v1p3 http://www.imsglobal.org/xsd/imsccv1p2/imsmanifest_v1p2.xsd">
          <metadata>
            <schema>IMS Content</schema>
            <schemaversion>1.2.0</schemaversion>
          </metadata>
          <organizations default="ORG-01">
            <organization identifier="ORG-01">
              <title>Organization 1</title>
              <item identifier="ITEM-01" identifierref="RESOURCE-01">
                <title>Item 1</title>
              </item>
            </organization>
          </organizations>
          <resources>
            <resource identifier="RESOURCE-01" type="webcontent" adlcp:scormType="sco" href="index.html">
              <file href="index.html" />
            </resource>
          </resources>
        </manifest>';

        $zip->addFromString('imsmanifest.xml', $imsmanifestContent);

        // Agrega el archivo index.html al ZIP
        $indexContent = '<html>
        <head>
            <title>Cuestionario SCORM</title>
        </head>
        <body>
            <h1>Cuestionario SCORM</h1>
            <form method="post" action="procesar_respuestas.php">
                ' . generarCuestionario($preguntas) . '
                <input type="submit" name="enviar_respuestas" value="Enviar Respuestas">
            </form>
        </body>
        </html>';

        $zip->addFromString('index.html', $indexContent);

        // Cierra el archivo ZIP
        $zip->close();

        // Descargar el archivo ZIP
        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="' . $zipFileName . '"');
        header('Content-Length: ' . filesize($zipFileName));
        readfile($zipFileName);

        // Eliminar el archivo ZIP
        unlink($zipFileName);
    } else {
        echo 'No se pudo crear el archivo ZIP.';
    }
}

// Obtener la lista de preguntas
$preguntas = obtenerPreguntas();

// Verificar si se ha enviado el formulario para descargar el cuestionario SCORM
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['generar_scorm'])) {
    createSCORMZip();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Cuestionario</title>
</head>
<body>
    <h1>Cuestionario</h1>
    
    <?php echo mostrarListaPreguntas($preguntas); ?>
    
    <h2>Agregar Pregunta</h2>
    <form method="get" action="">
        <label for="pregunta">Pregunta:</label>
        <input type="text" name="pregunta" id="pregunta" required><br>
        
        <label for="opcion1">Opción 1:</label>
        <input type="text" name="opcion1" id="opcion1" required><br>
        
        <label for="opcion2">Opción 2:</label>
        <input type="text" name="opcion2" id="opcion2" required><br>
        
        <label for="opcion3">Opción 3:</label>
        <input type="text" name="opcion3" id="opcion3" required><br>
        
        <input type="submit" name="agregar_pregunta" value="Agregar Pregunta">
    </form>
    
    <h2>Opciones</h2>
    <form method="get" action="">
        <input type="submit" name="eliminar_preguntas" value="Eliminar todas las preguntas">
    </form>
    
    <h2>Generar Cuestionario SCORM</h2>
    <form method="get" action="">
        <input type="submit" name="generar_scorm" value="Generar Cuestionario SCORM">
    </form>
</body>
</html>
