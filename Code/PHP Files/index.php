<?php

function error($msg){
    $error = array("status"=>"error", "timestamp"=>time(), "data"=>$msg);
    echo JSON_encode($error);
    die();
}

$host = "wheatley.cs.up.ac.za";
$username = "u20743956";
$password = "Iwantinnow@34";
$database = "u20743956_Wines";

//expect json data
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$postData = file_get_contents('php://input');
$jsonData = json_decode($postData);



try {
    $DBConnection = mysqli_connect($host, $username, $password, $database);
} catch (Exception $th) {
    error("Server error");
}


//validation
if(!isset($jsonData->query)){
    error("no query type");
}

if(!isset($jsonData->apikey)){
    error("no api key");
}

if($jsonData->apikey != "69"){
    error("invalid api key");
}

if(!isset($jsonData->from)){
    error("no table");
}


switch ($jsonData->query) {
    case "SELECT":
        selectQuery($jsonData, $DBConnection);
        break;
    case "INSERT":
        insertQuery($jsonData, $DBConnection);
        break;
    case "DELETE":
        deleteQuery($jsonData, $DBConnection);
        break;
    case "UPDATE":
        updateQuery($jsonData, $DBConnection);
        break;
    default:
    error("invalid type");
        break;
  }


function selectQuery($jsonData, $DBConnection){
    $DBQuery = "SELECT Wine.Image, Wine.Name, Wine.Type, Winery.Name AS Winery, Location.Country, Wine.Price, Wine.Year FROM Wine JOIN Winery
    ON Wine.Winery_ID = Winery.Winery_ID JOIN Location ON Winery.Location_ID = Location.Location_ID ";
    
    if(isset($jsonData->distinct) && ($jsonData->distinct == "true")){
        $DBQuery .= "DISTINCT ";
    }


    if (isset($jsonData->Type))
    {
        $DBQuery .= " WHERE Wine.Type = '" . $jsonData->Type . "'";
    }



    if($jsonData->sort)
    {
        $DBQuery .= " ORDER BY " . $jsonData->sort;
        if($jsonData->order)
        {
            $DBQuery .= " " . $jsonData->order;
        }
    }


    // Checking to see if there is a limit on the number of rows returned
    if ($jsonData->limit)
    {
        $DBQuery .= " LIMIT " . $jsonData->limit;
    }

    $DBQuery .= ";";

    
    if ($jsonData->type == "CustomQuery" && $jsonData->Query)
    {
        $DBQuery = $jsonData->Query;
    }
    
    

    $result = mysqli_query($DBConnection, $DBQuery);

    $output = $result->fetch_all(MYSQLI_ASSOC);

    $returnJson = array("status"=>"success", "timestamp"=>time(), "data"=>$output);
    echo JSON_encode($returnJson);

}

function insertQuery($jsonData, $DBConnection){
    if ($jsonData->type == "CustomQuery" && $jsonData->Query)
    {
        $DBQuery = $jsonData->Query;
    }
    $result = mysqli_query($DBConnection, $DBQuery);
    $output = $result->fetch_all(MYSQLI_ASSOC);
    $returnJson = array("status"=>"success", "timestamp"=>time(), "data"=>$output);
    echo JSON_encode($returnJson);
}

function deleteQuery($jsonData, $DBConnection){
    if ($jsonData->type == "CustomQuery" && $jsonData->Query)
    {
        $DBQuery = $jsonData->Query;
    }
    $result = mysqli_query($DBConnection, $DBQuery);
    $output = $result->fetch_all(MYSQLI_ASSOC);
    $returnJson = array("status"=>"success", "timestamp"=>time(), "data"=>$output);
    echo JSON_encode($returnJson);
}

function updateQuery($jsonData, $DBConnection){
    if ($jsonData->type == "CustomQuery" && $jsonData->Query)
    {
        $DBQuery = $jsonData->Query;
    }
    $result = mysqli_query($DBConnection, $DBQuery);
    $output = $result->fetch_all(MYSQLI_ASSOC);
    $returnJson = array("status"=>"success", "timestamp"=>time(), "data"=>$output);
    echo JSON_encode($returnJson);
}


?>
