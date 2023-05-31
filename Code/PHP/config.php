<?php
//Timothy_Whitaker_u22744968
$serverName = "wheatley.cs.up.ac.za";
$dbusername = "";
$dbpassword = "";
$dbName = "";

$conn = mysqli_connect($serverName, $dbusername, $dbpassword, $dbName);

if(!$conn)
{
    die("Connection failed: ".mysqli_connect_error());
}
else
{
    header("HTTP/1.1 200 OK");
}