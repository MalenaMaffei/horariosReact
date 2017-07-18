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

$sql = "SELECT $desde, $hasta FROM $tabla";
$result = mysqli_query($conn, $sql);
$to_encode = array();

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        array_push($to_encode,$row);
    }
} else {
    echo "0 results";
}

mysqli_close($conn);
echo json_encode($to_encode);
}
?>
