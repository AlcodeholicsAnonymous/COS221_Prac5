<?php
if(isset($_POST["submit"]))
{
    require_once 'config.php';
    require_once 'functions.php';
    $email = $_POST["email"];
    $password = $_POST["password"];
    if(emptyInputLogin($email, $password) !== false)
    {
        header("Location: login.php?error=emptyinput");
        exit();
    }
    loginUser($conn, $email, $password);
}
else
{
    header("Location: login.php");
    exit();
}