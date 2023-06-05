<?php
$serverName = "wheatley.cs.up.ac.za";
$dbusername = "u20743956";
$dbpassword = "Iwantinnow@34";
$dbName = "u20743956_Wines";

$conn = mysqli_connect($serverName, $dbusername, $dbpassword, $dbName);

if(!$conn)
{
    die("Connection failed: ".mysqli_connect_error());
}
else
{
    header("HTTP/1.1 200 OK");
}