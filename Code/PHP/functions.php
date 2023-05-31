<?php
function emptyInputSignup($name, $surname, $email, $password, $confirm_password)
{
    $result;
    if (empty($name) || empty($surname) || empty($email) || empty($password) || empty($confirm_password))
    {
        $result = true;
    }
    else
    {
        $result = false;
    }
    return $result;
}
function invalidEmail($email)
{
    $result;
    if (!filter_var($email, FILTER_VALIDATE_EMAIL))
    {
        $result = true;
    }
    else
    {
        $result = false;
    }
    return $result;
}
function passwordMatch($password, $confirm_password)
{
    $result;
    if ($password !== $confirm_password)
    {
        $result = true;
    }
    else
    {
        $result = false;
    }
    return $result;
}
function emailExists($conn, $email)
{
    $sql = "SELECT * FROM users WHERE email = ?;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql))
    {
        header("Location: ../HTML/Register.html?error=stmtfailed");
        exit();
    }
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $resultData = mysqli_stmt_get_result($stmt);
    if ($row = mysqli_fetch_assoc($resultData))
    {
        return $row;
    }
    else
    {
        $result = false;
        return $result;
    }
    mysqli_stmt_close($stmt);
}
function passwordStrength($password)
{
    $result;
    if (!preg_match('/^(?=.*\d)(?=.*[^\w\s])(?=.*[a-z])(?=.*[A-Z]).{8,}$/', $password))
    {
        $result = true;
    }
    else
    {
        $result = false;
    }
    return $result;
}
function creatUser($conn, $name, $surname, $email, $password)
{
    $sql = "INSERT INTO users (API_Key, name, surname, email, password) VALUES (?, ?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql))
    {
        header("Location: ../HTML/Register.html?error=stmtfailed");
        exit();
    }
    // Default hashing algorithm is bcrypt and salt is generated automatically
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    //generate api key
    $api_key = bin2hex(openssl_random_pseudo_bytes(5)) . uniqid() . bin2hex(openssl_random_pseudo_bytes(5));
    mysqli_stmt_bind_param($stmt, "sssss", $api_key, $name, $surname, $email, $hashedPassword);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    echo "<script>
    alert('Your API key is: " . $api_key . "');
    window.location.href='../HTML/login.html?error=none';
    </script>";
    exit();
}
function emptyInputLogin($email, $password)
{
    $result;
    if (empty($email) || empty($password))
    {
        $result = true;
    }
    else
    {
        $result = false;
    }
    return $result;
}
function loginUser($conn, $email, $password)
{
    $emailExists = emailExists($conn, $email);
    if ($emailExists === false)
    {
        header("Location: ../HTML/login.html?error=wronglogin");
        exit();
    }
    $passwordHashed = $emailExists["password"];
    $checkPassword = password_verify($password, $passwordHashed);
    if ($checkPassword === false)
    {
        header("Location: ../HTML/login.html?error=wronglogin");
        exit();
    }
    else if ($checkPassword === true)
    {
        session_start();
        $_SESSION["name"] = $emailExists["name"];
        $_SESSION["surname"] = $emailExists["surname"];
        $_SESSION["useremail"] = $emailExists["email"];
        setcookie('API_Key', $emailExists["API_Key"], time() + (86400 * 30), '/', '', false, false);
    }
}