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


function insertQuery($jsonData, $DBConnection){

}

function deleteQuery($jsonData, $DBConnection){
    
}

function updateQuery($jsonData, $DBConnection){
    
}

//this query returns the whole picture thing you showed in the discord meeting
/*$query = "SELECT Wine.image, Wine.Name, Wine.Type, Winery.Name, Location.Country, Wine.Price, Wine.Year FROM Wine JOIN Winery
 ON Wine.Winery_ID = Winery.Winery_ID JOIN Location ON Winery.Location_ID = Location.Location_ID;";

//$query = "SELECT * FROM Wine;";
$result = mysqli_query($DBConnection, $query);

    $output = $result->fetch_all(MYSQLI_ASSOC);

//step 5: build response
$returnJson = array("status"=>"success", "timestamp"=>time(), "data"=>$output);
echo JSON_encode($returnJson);*/
function selectQuery($jsonData, $DBConnection){
    //$DBQuery = "SELECT ";
    $DBQuery = "SELECT Wine.Image, Wine.Name, Wine.Type, Winery.Name, Location.Country, Wine.Price, Wine.Year FROM Wine JOIN Winery
    ON Wine.Winery_ID = Winery.Winery_ID JOIN Location ON Winery.Location_ID = Location.Location_ID ";
    
    if(isset($jsonData->distinct) && ($jsonData->distinct == "true")){
        $DBQuery .= "DISTINCT ";
    }


    // Checking to see if there are any specific return columns
    /*if (isset($jsonData->return)){
        if (is_array($jsonData->return) && count($jsonData->return) > 0)
        {
            $returnColumns = implode(", ", $jsonData->return);
            $DBQuery .= $returnColumns . " ";
        }
        else
        {
            $DBQuery .= "* ";
        }
    }*/
    


    // Checking to see which table the data is coming from
    /*if ($jsonData->from == "GetWines")
    {
        $DBQuery .= "FROM Wine ";
    }
    else if ($jsonData->from == "GetWineries")
    {
        $DBQuery .= "FROM Winery ";
    }
    else if ($jsonData->from == "GetLocations")
    {
        $DBQuery .= "FROM Location ";
    }
    else if ($jsonData->from == "GetUsers")
    {
        $DBQuery .= "FROM User ";
    }
    else if ($jsonData->from == "GetRatings")
    {
        $DBQuery .= "FROM Rating ";
    }*/


    // Checking to see if there are any seacrh conditions
    /*if ($jsonData->search && is_object($jsonData->search)) 
    {
        $DBQuery .= " WHERE ";
        $searchArray = (array) $jsonData->search;
        $searchCount = count($searchArray);
        $i = 0;
        foreach ($searchArray as $key => $value) 
        {
            if (is_string($value)) 
            {
                $DBQuery .= $key . " = '" . $value . "'";
            } 
            elseif (is_numeric($value)) 
            {
                $DBQuery .= $key . " = " . $value;
            } 
            elseif (is_bool($value)) 
            {
                $DBQuery .= $key . " = " . ($value ? "1" : "0");
            }

            if ($i < $searchCount - 1) 
            {
                $DBQuery .= " AND ";
            }
            $i++;
        }
    }*/

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

    /*
    if ($jsonData->type == "CustomQuery" && $jsonData->Query)
    {
        $DBQuery = $jsonData->Query;
    }
    console.log($DBQuery);*/

    // Putting Together the statement and executing it
    /*$stmt = mysqli_prepare($DBConnection, $DBQuery);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) 
    {
        $timestamp = round(microtime(true) * 1000);
        $ReturnArray = array();
        while ($row = mysqli_fetch_assoc($result)) 
        {
            $ReturnArray[] = $row;
        }
        $response = array
        (
            "status" => "success",
            "timestamp" => $timestamp,
            "data" => $ReturnArray
        );
        $json = json_encode($response, JSON_PRETTY_PRINT);
        header('Content-Type: application/json');
        echo $json;
    } 
    else 
    {
        $timestamp = round(microtime(true) * 1000);
        $response = array(
            "status" => "error",
            "timestamp" => $timestamp,
            "message" => "Bad request"
        );
        $json = json_encode($response, JSON_PRETTY_PRINT);
        header('Content-Type: application/json');
        echo $json;
    }*/
    

    $result = mysqli_query($DBConnection, $DBQuery);

    $output = $result->fetch_all(MYSQLI_ASSOC);

    //step 5: build response
    $returnJson = array("status"=>"success", "timestamp"=>time(), "data"=>$output);
    echo JSON_encode($returnJson);

}


?>