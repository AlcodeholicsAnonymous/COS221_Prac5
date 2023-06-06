<?php

function error($msg)
{
    $error = array("status" => "error", "timestamp" => time(), "data" => $msg);
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


function auth($jsonData, $DBConnection)
{
    if (!isset($jsonData->passwordHash)) {
        error("no password");
    }

    $statement = mysqli_prepare($DBConnection, "SELECT * FROM User WHERE Password = ?");
    checkStmt($statement, $DBConnection);
    mysqli_stmt_bind_param($statement, "s", $jsonData->passwordHash);
    checkExecute($statement, $DBConnection);
    $result = mysqli_stmt_get_result($statement);
    $output = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if (count($output) == 0) {
        return false;
    }

    return $output[0]["User_ID"];
}

function getManagedWinery($jsonData, $DBConnection)
{
    $userID = auth($jsonData, $DBConnection);
    $statement = mysqli_prepare($DBConnection, "SELECT * FROM Winery WHERE Manager_ID = ?");
    checkStmt($statement, $DBConnection);
    mysqli_stmt_bind_param($statement, "i", $userID);
    checkExecute($statement, $DBConnection);
    $result = mysqli_stmt_get_result($statement);
    $output = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if (count($output) == 0) {
        return false;
    }

    return $output[0];
}

switch ($jsonData->type) {
    case "getAllWines":
        getAllWines($jsonData, $DBConnection);
        break;
    case "addWine":
        addWine($jsonData, $DBConnection);
        break;
    case "getAllWineries":
        getAllWineries($jsonData, $DBConnection);
        break;
    case "deleteWine":
        deleteWine($jsonData, $DBConnection);
        break;
    case "updateWine":
        updateWine($jsonData, $DBConnection, $wineryID);
        break;
    default:
        error("invalid type");
        break;
}

function getAllWines($jsonData, $DBConnection)
{
    //if return includes location include " JOIN Winery
    // ON Wine.Winery_ID = Winery.Winery_ID JOIN Location ON Winery.Location_ID = Location.Location_ID "

    $DBQuery = "SELECT ";
    $addLocation = false;
    $addWinery = false;
    $addRating = false;
    if (isset($jsonData->returnWines)) {
        foreach ($jsonData->returnWines as $key => $value) {
            if ($value != "location" && $value != "winery" && $value != "rating") {
                $DBQuery .= "Wine." . $value . ", ";
            }
            if ($value == "location") {
                $addLocation = true;
            }
            if ($value == "winery") {
                $addWinery = true;
            }
            if ($value == "rating") {
                $addRating = true;
            }
        }
    }

    if ($addWinery) {
        $DBQuery .= "Winery.Name AS Winery, ";
    }

    if ($addLocation) {
        $DBQuery .= "Location.Country, ";
    }

    if ($addRating) {
        $DBQuery .= "AVG(Rating.Rating) AS Rating, ";
    }

    $DBQuery = substr($DBQuery, 0, -2);

    $DBQuery .= " FROM Wine";
    if ($addWinery) {
        $DBQuery .= " JOIN Winery ON Wine.Winery_ID = Winery.Winery_ID";
    }

    if ($addLocation) {
        $DBQuery .= " JOIN Location ON Winery.Location_ID = Location.Location_ID";
    }

    if ($addRating) {
        $DBQuery .= " LEFT JOIN Rating ON Wine.Wine_ID = Rating.Wine_ID";
    }

    $addLocation = false;
    $addWinery = false;

    if (isset($jsonData->searchWines)) {
        $DBQuery .= " WHERE ";
        $params = array();
        foreach ($jsonData->searchWines as $key => $value) {
            if ($value == "rating") {
                $DBQuery .= "Rating.Rating >= ? AND ";
                $params[] = $jsonData->searchWines->rating;
            } else if ($value == "yearFrom") {
                $DBQuery .= "Wine.Year >= ? AND ";
                $params[] = $jsonData->searchWines->yearFrom;
            } else  if ($value == "yearTo") {
                $DBQuery .= "Wine.Year <= ? AND ";
                $params[] = $jsonData->searchWines->yearTo;
            } else if ($value == "priceFrom") {
                $DBQuery .= "Wine.Price >= ? AND ";
                $params[] = $jsonData->searchWines->priceFrom;
            } else if ($value == "priceTo") {
                $DBQuery .= "Wine.Price <= ? AND ";
                $params[] = $jsonData->searchWines->priceTo;
            } else  if ($value == "location") {
                $DBQuery .= "Location.Country = ? AND ";
                $params[] = $jsonData->searchWines->location;
            } else if ($value == "winery") {
                $DBQuery .= "Winery.Name = ? AND ";
                $params[] = $jsonData->searchWines->winery;
            } else {
                $DBQuery .= "Wine." . $key . " = ? AND ";
                $params[] = $value;
            }
        }
        $DBQuery = substr($DBQuery, 0, -5);
    }

    if ($jsonData->sort) {
        $DBQuery .= " ORDER BY " . $jsonData->sort;
        if ($jsonData->order) {
            $DBQuery .= " " . $jsonData->order;
        }
    }

    // Checking to see if there is a limit on the number of rows returned
    if ($jsonData->limit) {
        $DBQuery .= " LIMIT " . $jsonData->limit;
    }

    if (isset($jsonData->group)) 
    {
        $DBQuery .= " GROUP BY ";
        foreach ($jsonData->group as $key => $value) 
        {
            $DBQuery .= $value . ", ";
        }
    }

    $DBQuery = substr($DBQuery, 0, -2);

    $statement = mysqli_prepare($DBConnection, $DBQuery);
    checkStmt($statement, $DBConnection);

    if (isset($params)) {
        $types = str_repeat('s', count($params));
        mysqli_stmt_bind_param($statement, $types, ...$params);
    }

    checkExecute($statement, $DBConnection);
    $result = mysqli_stmt_get_result($statement);
    $output = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $returnJson = array("status" => "success", "timestamp" => time(), "data" => $output, "query" => $DBQuery);
    echo json_encode($returnJson);
}

function addWine($jsonData, $DBConnection)
{
    //check if user i

    $DBQuery = "INSERT INTO Wine (";
    $params = array();
    foreach ($jsonData->wine as $key => $value) {
        $DBQuery .= $key . ", ";
        $params[] = $value;
    }
    $DBQuery = substr($DBQuery, 0, -2);
    $DBQuery .= ") VALUES (";
    foreach ($jsonData->wine as $key => $value) {
        $DBQuery .= "?, ";
    }
    $DBQuery = substr($DBQuery, 0, -2);
    $DBQuery .= ")";

    $statement = mysqli_prepare($DBConnection, $DBQuery);
    checkStmt($statement, $DBConnection);
    $types = str_repeat('s', count($params));
    mysqli_stmt_bind_param($statement, $types, ...$params);
    checkExecute($statement, $DBConnection);
    $result = mysqli_stmt_get_result($statement);
    $output = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $returnJson = array("status" => "success", "timestamp" => time(), "data" => $output);
    echo json_encode($returnJson);
}

function getAllWineries($jsonData, $DBConnection)
{
}

function deleteWine($jsonData, $DBConnection)
{

    if (!isset($jsonData->wineName) || empty($jsonData->wineName || !isset($jsonData->wineYear) || empty($jsonData->wineYear) || !isset($jsonData->wineType) || empty($jsonData->wineType))) {
        error("Missing Details");
    }
    $Winery = getManagedWinery($jsonData, $DBConnection);
    $DBQuery = "DELETE FROM Wine WHERE ";
    
}
function updateWine($jsonData, $DBConnection, $wineryID)
{
    if (!isset($jsonData->wineName) || empty($jsonData->wineName || !isset($jsonData->wineYear) || empty($jsonData->wineYear) || !isset($jsonData->wineType) || empty($jsonData->wineType))) {
        error("Missing Details");
    }
    $DBQuery = "UPDATE Wine (";
    $params = array();
    foreach ($jsonData->parameters as $key => $value) {
        $DBQuery .= $key . ", ";
        $params[] = $value;
    }
    $DBQuery = substr($DBQuery, 0, -2);
    $DBQuery .= ") VALUES (";
    foreach ($jsonData->parameters as $key => $value) {
        $DBQuery .= "?, ";
    }
    $DBQuery = substr($DBQuery, 0, -2);
    $DBQuery .= ") WHERE  Winery_ID = ? AND Name = ? AND Year = ? AND Type = ?";
    $params[] = $wineryID;
    $params[] = $jsonData->wineName;
    $params[] = $jsonData->wineYear;
    $params[] = $jsonData->wineType;
    $statement = mysqli_prepare($DBConnection, $DBQuery);
    checkStmt($statement, $DBConnection);
    $types = str_repeat('s', count($params));
    mysqli_stmt_bind_param($statement, $types, ...$params);
    checkExecute($statement, $DBConnection);
    $result = mysqli_stmt_get_result($statement);
    if ($result == false) {
        error("Wine does not exist");
    } else {
        $returnJson = array("status" => "success", "timestamp" => time(), "data" => "Wine Updated!");
        echo json_encode($returnJson);
    }
}
function checkStmt($stmt, $conn)
{
    if (!$stmt) {
        $output = array("status" => "error", "timestamp" => strval(time()), "data" => "Error preparing query: " . mysqli_error($conn));
        echo json_encode($output);
        die();
        return;
    }
}
function checkExecute($stmt, $conn)
{
    if (!mysqli_stmt_execute($stmt)) {
        $output = array("status" => "error", "timestamp" => strval(time()), "data" => "Error executing query: " . mysqli_error($conn));
        echo json_encode($output);
        die();
        return;
    }
}
