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
    $sql = "SELECT * FROM User WHERE Email = ?;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql))
    {
        header("Location: Register.php?error=stmtfailed");
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
    $sql = "INSERT INTO User (First_Name, Last_Name, Is_Expert, Email, Password) VALUES (?, ?, ?, ?, ?)";
    $stmt = mysqli_stmt_init($conn);

    try 
    {
        mysqli_stmt_prepare($stmt, $sql);
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $isExpert = 0; // Assuming it's a non-expert by default
        mysqli_stmt_bind_param($stmt, "ssiss", $name, $surname, $isExpert, $email, $hashedPassword);

        mysqli_stmt_execute($stmt);

        if (mysqli_stmt_affected_rows($stmt) > 0) 
        {
            // Success
            mysqli_stmt_close($stmt);
            mysqli_close($conn);
            header("Location: login.php");
            exit();
        } 
        else 
        {
            // No rows affected, handle error
            mysqli_stmt_close($stmt);
            mysqli_close($conn);
            header("Location: Register.php?error=stmtfailed");
            exit();
        }
    } 
    catch (Exception $e) 
    {
        // Exception occurred, handle error
        mysqli_stmt_close($stmt);
        mysqli_close($conn);
        header("Location: Register.php?error=stmtfailed");
        exit();
    }
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
        header("Location: login.php?error=wronglogin");
        exit();
    }
    $passwordHashed = $emailExists["Password"];
    $checkPassword = password_verify($password, $passwordHashed);
    if ($checkPassword === false)
    {
        header("Location: login.php?error=wronglogin");
        exit();
    }
    else if ($checkPassword === true)
    {
        session_start();
        $_SESSION["name"] = $emailExists["First_Name"];
        $_SESSION["surname"] = $emailExists["Last_Name"];
        $_SESSION["email"] = $emailExists["Email"];
        $_SESSION["isExpert"] = $emailExists["Is_Expert"];
        setcookie("name", $emailExists["First_Name"], time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie("surname", $emailExists["Last_Name"], time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie("LoggedIn", true, time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie("isExpert", $emailExists["Is_Expert"], time() + (86400 * 30), "/"); // 86400 = 1 day
        setcookie("UserID", $emailExists["User_ID"], time() + (86400 * 30), "/"); // 86400 = 1 day
        header("Location: ../HTML/Wine.html");
    }
}

function LogoutUser()
{
    session_start();
    session_unset();
    session_destroy();
    setcookie("name", "", time() - 3600, "/");
    setcookie("surname", "", time() - 3600, "/");
    setcookie("LoggedIn", false, time() - 3600, "/");
    header("Location: ../HTML/Wine.html");
    exit();
}