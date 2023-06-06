<?php
    session_start();
    session_unset();
    session_destroy();
    setcookie("name", "None", time() - 3600, "/");
    setcookie("surname", "None", time() - 3600, "/");
    setcookie("LoggedIn", false, time() - 3600, "/");
    setcookie("isExpert", false, time() - 3600, "/");
    setcookie("UserID", "None", time() - 3600, "/");
    header("Location: ../HTML/Wine.html");
    exit();
?>