<!DOCTYPE html>
<html lang="en">

    <head>
        <link rel="stylesheet" href="../CSS/login.css" type="text/css">
        <title>Winery Login</title>
    </head>

    <body>
        <div class="Container">
            <div class="form-box">
                <div class = "hidden">
                    <form action="validate-login.php" method="post" id="login_form">
                        <!-- Add the link to a php login validation form -->
                        <h2 class="hidden">Login</h2>
                        <div class="inputbox">
                            <input type="text" name = "email"required>
                            <label for="">Email</label>
                        </div>
                        <div class="inputbox">
                            <input type="password" name="password" required>
                            <label for="">Password</label>
                        </div>
                    </form>
                    <div>
                        <div class="hidden">
                            <a class="forget" href="../HTML/Wine.html">Return Home</a>
                        </div>
                        <button type="submit" form="login_form" name="submit">Log in</button>
                        <div class="register hidden">
                            <p>Don't have a account: <a href="Register.php">Register</a></p>
                        </div>
                    </div>
                </div>
                <?php
                    if (isset($_GET["error"])) 
                    {
                        if ($_GET["error"] == "emptyinput") 
                        {
                            echo "<h2>Fill in all fields</h2>";
                        }
                        else if ($_GET["error"] == "wronglogin")
                        {
                            echo "<h2>Incorrect login information</h2>";
                        }
                    }
                ?>
            </div>
        </div>
        <script defy src="../JS/animation.js"></script>
    </body>

</html>