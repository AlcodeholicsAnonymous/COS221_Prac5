<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="../CSS/Register.css">
    <title>Winery Login</title>
</head>

<body>
    <div class="Container">
        <div class="form-box">
            <div class="hidden">
                <form action="validate-signup.php" method="post" id="register_form" onsubmit="return validateForm();">
                    <!-- Add the link to a php Register validation form -->
                    <h2>Register</h2>
                    <div class="inputbox">
                        <input type="text" id="name" name ="name"required>
                        <label for="">Name</label>
                    </div>
                    <div class="inputbox">
                        <input type="text" id="surname" name ="surname" required>
                        <label for="">Surname</label>
                    </div>
                    <div class="inputbox">
                        <input type="text" id="email" name ="email" required>
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        <input type="password" id="password" name ="password" required>
                        <label for="">Password</label>
                    </div>
                    <div class="inputbox">
                        <input type="password" id="confirm_password" name ="confirm_password" required>
                        <label for="">Confirm Password</label>
                    </div>
                </form>
                <div class="hidden">
                    <a class="forget" href="../HTML/Wine.html">Return Home</a>
                </div>
                <div>
                    <button type="submit" form="register_form" name="submit">Register</button>
                    <div class="register">
                        <p>Already have a account: <a href="login.php">Login</a></p>
                    </div>
                </div>
                <script>
                    function validateForm()
                    {
                        const emailInput = document.getElementById("email");
                        const email = emailInput.value;
                        const emailRegex = /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

                        if (!emailRegex.test(email)) {
                            alert("Invalid email address");
                            emailInput.focus();
                            return false;
                        }
                        const passwordInput = document.getElementById("password");
                        const password = passwordInput.value;
                        const passwordRegex = /^(?=.*\d)(?=.*[^\w\s])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

                        if (!passwordRegex.test(password)) {
                            alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit and one symbol");
                            passwordInput.focus();
                            return false;
                        }

                        const confirmPasswordInput = document.getElementById("confirm_password");
                        if (password !== confirmPasswordInput.value) {
                            alert("Passwords do not match");
                            confirmPasswordInput.focus();
                            return false;
                        }
                        return true;
                    }
                </script>
                <?php
                    if (isset($_GET["error"]))
                    {
                        if ($_GET["error"] == "emptyinput")
                        {
                        echo "<h2>Fill in all fields</h2>";
                        }
                        else if ($_GET["error"] == "invalidemail")
                        {
                        echo "<h2>Choose a proper email</h2>";
                        }
                        else if ($_GET["error"] == "passwordsdontmatch")
                        {
                        echo "<h2>Passwords don't match</h2>";
                        }
                        else if ($_GET["error"] == "stmtfailed")
                        {
                        echo "<h2>Something went wrong, try again</h2>";
                        }
                        else if ($_GET["error"] == "emailtaken")
                        {
                        echo "<h2>Email already taken</h2>";
                        }
                        else if ($_GET["error"] == "passwordstrength")
                        {
                        echo "<h2>Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit and one symbol</h2>";
                        }
                        else if ($_GET["error"] == "none")
                        {
                        echo "<h2>You have signed up</h2>";
                        }
                    }
                ?>
            </div>
        </div>
    </div>
    <script defy src="../JS/animation.js"></script>
</body>

</html>