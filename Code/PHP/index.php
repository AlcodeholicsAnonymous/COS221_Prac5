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
    $statement = mysqli_prepare($DBConnection, "SELECT Winery_ID FROM Winery WHERE Admin_ID = ?");
    checkStmt($statement, $DBConnection);
    mysqli_stmt_bind_param($statement, "i", $userID);
    checkExecute($statement, $DBConnection);
    $result = mysqli_stmt_get_result($statement);
    $output = mysqli_fetch_all($result, MYSQLI_ASSOC);
    if (count($output) == 0) {
        return false;
    }
    return $output[0]["Winery_ID"];
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
        updateWine($jsonData, $DBConnection);
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
        foreach ($jsonData->returnWines as $key => $value) 
        {
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

    if (isset($jsonData->searchWines)) 
    {
        $DBQuery .= " WHERE ";
        $params = array();
        foreach ($jsonData->searchWines as $key => $value) 
        {
            if ($key == "category") 
            {
                $DBQuery .= "Wine.Category = ? AND ";
                $params[] = $jsonData->searchWines->category;
            }
            else if ($key == "winery") 
            {
                $DBQuery .= "Winery.Name = ? AND ";
                $params[] = $jsonData->searchWines->winery;
            } 
            else if ($key == "rating") 
            {
                $DBQuery .= "Rating.Rating >= ? AND ";
                $params[] = $jsonData->searchWines->rating;
            } 
            else if ($key == "yearFrom") 
            {
                $DBQuery .= "Wine.Year >= ? AND ";
                $params[] = $jsonData->searchWines->yearFrom;
            } 
            else  if ($key == "yearTo") 
            {
                $DBQuery .= "Wine.Year <= ? AND ";
                $params[] = $jsonData->searchWines->yearTo;
            } 
            else if ($key == "priceFrom") 
            {
                $DBQuery .= "Wine.Price >= ? AND ";
                $params[] = $jsonData->searchWines->priceFrom;
            } 
            else if ($key == "priceTo") 
            {
                $DBQuery .= "Wine.Price <= ? AND ";
                $params[] = $jsonData->searchWines->priceTo;
            } 
            else  if ($key == "location") 
            {
                $DBQuery .= "Location.Country = ? AND ";
                $params[] = $jsonData->searchWines->location;
            } 
            else 
            {
                $DBQuery .= "Wine." . $key . " = ? AND ";
                $params[] = $value;
            }
        }
        $DBQuery = substr($DBQuery, 0, -5);
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
    
    if ($jsonData->sort) 
    {
        if($jsonData->sort == "Rating")
        {
            $DBQuery .= " ORDER BY AVG(Rating.Rating)";
        }
        else
        {
            $DBQuery .= " ORDER BY " . $jsonData->sort;
        }
        
        if ($jsonData->order) 
        {
            $DBQuery .= " " . $jsonData->order;
        }
    }
    
    // Checking to see if there is a limit on the number of rows returned
    if ($jsonData->limit) {
        $DBQuery .= " LIMIT " . $jsonData->limit;
    }

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
    // $returnJson = array("status" => "success", "query" => $DBQuery);
    echo json_encode($returnJson);
}

function getAllWineries($jsonData, $DBConnection)
{
    $DBQuery = "SELECT ";
    $addLocation = false;
    $addRating = false;

    if (isset($jsonData->returnWineries)) {
        foreach ($jsonData->returnWineries as $key => $value) {
            if ($value != "location" && $value != "winery" && $value != "rating") {
                $DBQuery .= "Winery." . $value . ", ";
            }
            if ($value == "location") {
                $addLocation = true;
            }
            if ($value == "rating") {
                $addRating = true;
            }
        }
    }
    if ($addLocation) {
        $DBQuery .= " Location.Country AS Country, Location.Region AS Region ";
    }

    if ($addRating) {
        $DBQuery .= " (SELECT AVG(avg_winery_rating) AS average_rating
                        FROM (
                            SELECT AVG(Rating) AS avg_winery_rating
                            FROM Rating
                            INNER JOIN Wine ON Rating.Wine_ID = Wine.Wine_ID
                            GROUP BY Wine.Winery_ID
                        ) AS winery_ratings
                    )AS wineryRating ";
    }
    
    $DBQuery = substr($DBQuery, 0, -2);
    $DBQuery .= " FROM Winery ";

    if ($addLocation) {
        $DBQuery .= " JOIN Location ON Winery.Location_ID = Location.Location_ID";
    }

    if ($addRating) {
        $DBQuery .= " JOIN Wine ON Winery.Winery_ID = Wine.Winery_ID 
                    JOIN Rating ON Wine.Wine_ID = Rating.Wine_ID ";
    }

    $addLocation = false;
    $addRating = false;

    if (isset($jsonData->searchWines)) {
        $DBQuery .= " WHERE ";
        $params = array();
        foreach ($jsonData->searchWines as $key => $value) {
            if ($value == "rating") {
                $DBQuery .= "wineryRating >= ? AND ";
                $params[] = $jsonData->searchWines->rating;
            } else  if ($value == "location") {
                $DBQuery .= "Country = ? AND ";
                $params[] = $jsonData->searchWines->location;
            } else {
                $DBQuery .= "Winery." . $key . " = ? AND ";
                $params[] = $value;
            }
        }
        $DBQuery = substr($DBQuery, 0, -5);
    }
    //GROUP BY Winery.Winery_ID
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
    $statement = mysqli_prepare($DBConnection, $DBQuery);
    checkStmt($statement, $DBConnection);

    if (isset($params)) {
        $types = str_repeat('s', count($params));
        mysqli_stmt_bind_param($statement, $types, ...$params);
    }
    checkExecute($statement, $DBConnection);
    $result = mysqli_stmt_get_result($statement);
    $output = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $returnJson = array("status" => "success", "timestamp" => time(), "data" => $output);
    echo json_encode($returnJson);
}

function addWine($jsonData, $DBConnection)
{
    if (auth($jsonData, $DBConnection) != false)
    {
        $DBQuery = "INSERT INTO Wine (Winery_ID, ";
        $types = "i";
        $Winery_ID = getManagedWinery($jsonData, $DBConnection);
        $params[] = $Winery_ID;
        foreach ($jsonData->parameters as $key => $value) 
        {
            $sanitizedKey = mysqli_real_escape_string($DBConnection, $key); // Sanitize the column name
            $DBQuery .= $sanitizedKey . ", ";
            $params[] = $value;
            typeof($value) == "string" ? $types .= "s" : $types .= "i";
        }
        $DBQuery = substr($DBQuery, 0, -2);
        $DBQuery .= ") VALUES (?,?,?,?,?,?,?,?)";
        $statement = mysqli_prepare($DBConnection, $DBQuery);
        checkStmt($statement, $DBConnection);
        mysqli_stmt_bind_param($statement, $types, ...$params);
        checkExecute($statement, $DBConnection);

        $returnJson = array("status" => "success", "timestamp" => time(), "data" => "Wine Added Successfully");
        echo json_encode($returnJson);
    }
    else
    {
        error("Not a Manager");
    }
}
function typeOf($value)
{
    if (is_numeric($value)) {
        return "i";
    } else {
        return "string";
    }
}
function deleteWine($jsonData, $DBConnection)
{
    if (auth($jsonData, $DBConnection) != false) 
    {
        if (!isset($jsonData->wineName) || empty($jsonData->wineName || !isset($jsonData->wineYear) || empty($jsonData->wineYear) || !isset($jsonData->wineType) || empty($jsonData->wineType))) {
            error("Missing Details");
        }
        $Winery = getManagedWinery($jsonData, $DBConnection);
        $DBQuery = "DELETE FROM Wine WHERE Winery_ID = ? AND Name = ? AND Year = ? AND Type = ?";
        $statement = mysqli_prepare($DBConnection, $DBQuery);
        checkStmt($statement, $DBConnection);
        $types = "isis";
        $Winery_ID = getManagedWinery($jsonData, $DBConnection);
        $params = array($Winery_ID ,$jsonData->wineName, $jsonData->wineYear, $jsonData->wineType);
        mysqli_stmt_bind_param($statement, $types, ...$params);
        checkExecute($statement, $DBConnection);
        $result = mysqli_stmt_get_result($statement);
        $returnJson = array("status" => "success", "timestamp" => time());
        echo json_encode($returnJson);
    }
    else
    {
        error("Not a Manager");
    }
}
function updateWine($jsonData, $DBConnection)
{
    if (auth($jsonData, $DBConnection)) 
    {
        if (!isset($jsonData->wineName) || empty($jsonData->wineName || !isset($jsonData->wineYear) || empty($jsonData->wineYear) || !isset($jsonData->wineType) || empty($jsonData->wineType))) {
            error("Missing Details");
        }
        $DBQuery = "UPDATE Wine SET ";
        $params = array();
        foreach ($jsonData->parameters as $key => $value)
        {
            $sanitizedKey = mysqli_real_escape_string($DBConnection, $key); // Sanitize the column name
            $DBQuery .= $sanitizedKey . " = ?, ";
            typeof($value) == "string" ? $types .= "s" : $types .= "i";
            $params[] = $value;
        }
        $DBQuery = substr($DBQuery, 0, -2);
        $DBQuery .= " WHERE Winery_ID = ? AND Name = ? AND Year = ? AND Type = ?";
        $params[] = getManagedWinery($jsonData, $DBConnection);
        $params[] = $jsonData->wineName;
        $params[] = $jsonData->wineYear;
        $params[] = $jsonData->wineType;
        $statement = mysqli_prepare($DBConnection, $DBQuery);
        checkStmt($statement, $DBConnection);
        $types .= "isis";
        mysqli_stmt_bind_param($statement, $types, ...$params);
        checkExecute($statement, $DBConnection);
        
        $result = mysqli_stmt_get_result($statement);
        $returnJson = array("status" => "success", "timestamp" => time(), "data" => "Wine Updated Successfully");
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

function getRecommendations($jsonData, $DBConnection){
    $DBQuery = "SELECT Wine.Image, Wine.Name, Wine.Type, Winery.Name, Location.Country, Wine.Price, Wine.Year FROM Wine JOIN Winery
    ON Wine.Winery_ID = Winery.Winery_ID JOIN Location ON Winery.Location_ID = Location.Location_ID ";
    
    $where = "WHERE ";
    $params = array();
    
    if(isset ($jsonData->location) && !empty($jsonData->wineName)){
        $where .= "Wine.Name = ? AND ";
        $params[] = $jsonData->wineName;
    }
    
    if ($jsonData->limit)
    {
        $DBQuery .= " LIMIT " . $jsonData->limit;
    }
}
