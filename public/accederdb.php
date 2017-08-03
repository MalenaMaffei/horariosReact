<?php
if( isset($_GET['desde'],$_GET['hasta'],$_GET['tabla']) ) {
  getHorarios($_GET['desde'],$_GET['hasta'],$_GET['tabla']);
} else {
  die("Solicitud no válida.");
}

function getHorarios($desde, $hasta, $tabla){
    $servername = "localhost";
    $username = "root";
    $password = "maleines2412";
    $dbname = "Horarios";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }


    $tablaArray = explode('_', $tabla);
    $tablaVuelta = $tablaArray[1]."_".$tablaArray[0]."_".$tablaArray[2];
    $sqlIda = "SELECT $desde, $hasta FROM $tabla";
    $sqlVuelta = "SELECT $hasta, $desde FROM $tablaVuelta";
    $resultIda = mysqli_query($conn, $sqlIda);
    $resultVuelta = mysqli_query($conn, $sqlVuelta);
    $to_encode = array();
    $to_encode_vuelta = array();
    $total = array();

    array_push($total, $desde);
    array_push($total, $hasta);

    if (mysqli_num_rows($resultIda) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($resultIda)) {
            array_push($to_encode,$row);
        }
        array_push($total, $to_encode);
    } else {
        echo "0 results";
    }

    if (mysqli_num_rows($resultVuelta) > 0) {
        // output data of each row
        while($row = mysqli_fetch_assoc($resultVuelta)) {
            array_push($to_encode_vuelta,$row);
        }
        array_push($total, $to_encode_vuelta);
    } else {
        echo "0 results";
    }

    mysqli_close($conn);
    echo json_encode($total);

}
?>
