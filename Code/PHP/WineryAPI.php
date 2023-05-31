<?php

$host = "localhost";
$username = "u20743956";
$password = ""; // Remember to include password
$database = "u20743956_Wines";

$DBConnection = new mysqli($host, $username, $password, $database);

if ($DBConnection->connect_error) 
{
    die("Connection failed: " . $DBConnection->connect_error);
}


// $postData = file_get_contents('php://input');
$jsonData = json_decode($postData);

$DBQuery = "SELECT ";

// Checking to see if there are any specific return columns
if (is_array($jsonData->return) && count($jsonData->return) > 0)
{
    $returnColumns = implode(", ", $jsonData->return);
    $DBQuery .= $returnColumns . " ";
}
else
{
    $DBQuery .= "* ";
}


// Checking to see which table the data is coming from
if ($jsonData->type == "GetWines")
{
    $DBQuery .= "FROM Wine ";
}
else if ($jsonData->type == "GetWineries")
{
    $DBQuery .= "FROM Winery ";
}
else if ($jsonData->type == "GetLocations")
{
    $DBQuery .= "FROM Location ";
}
else if ($jsonData->type == "GetUsers")
{
    $DBQuery .= "FROM User ";
}
else if ($jsonData->type == "GetRatings")
{
    $DBQuery .= "FROM Rating ";
}


// Checking to see if there are any seacrh conditions
if ($jsonData->search && is_object($jsonData->search)) 
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


// Putting Together the statement and executing it
$stmt = mysqli_prepare($DBConnection, $DBQuery);
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
}


?>