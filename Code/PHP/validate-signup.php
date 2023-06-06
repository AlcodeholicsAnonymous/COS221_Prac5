<?php
if (isset($_POST["submit"])) 
{
  $name = $_POST["name"];
  $surname = $_POST["surname"];
  $email = $_POST["email"];
  $password = $_POST["password"];
  $confirm_password = $_POST["confirm_password"];
  require_once 'config.php';
  require_once 'functions.php';
  if (emptyInputSignup($name, $surname, $email, $password, $confirm_password) !== false) 
  {
    header("Location: Register.php?error=emptyinput");
    exit();
  }
  if (invalidEmail($email) !== false) 
  {
    header("Location: Register.php?error=invalidemail");
    exit();
  }
  if (passwordMatch($password, $confirm_password) !== false)
  {
    header("Location: Register.php?error=passwordsdontmatch");
    exit();
  }
  if (emailExists($conn, $email) !== false)
  {
    header("Location: Register.php?error=emailtaken");
    exit();
  }
  if (passwordStrength($password) !== false)
  {
    header("Location: Register.php?error=passwordstrength");
    exit();
  }
  creatUser($conn, $name, $surname, $email, $password);
}
else
{
  header("Location: Register.php");
  exit();
}