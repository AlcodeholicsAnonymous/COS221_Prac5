var Navbar = document.getElementById("Navbar");

function PopulateNav() 
{
  const name = getCookie("name");
  const surname = getCookie("surname");
  const isLoggedIn = getCookie("LoggedIn");

  console.log("Generating Navbar");

  const LogoImg = document.createElement("img");
  LogoImg.src = "../Img/Logo.png";
  Navbar.appendChild(LogoImg);

  const NavLinks = document.createElement("li");
  NavLinks.classList.add("NavSpacing");

  NavLinks.innerHTML = `
      <a href="../HTML/Wine.html">
          Wines
      </a>
      <a href="../HTML/winery.html">
          Wineries
      </a>
    `;

  let postData =
  {
		"type" : "getAllWineries",
		"returnWineries" : [ "Admin_ID", "name", "location", "rating", "Image"],
		"sort" : "country",
		"order" : "ASC",
		"limit" : 20,
    "searchWineries":
		{
			"Admin_ID": UserID
		}
	};

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () 
  {
    let ReturnData = JSON.parse(this.responseText)
    // console.log(ReturnData);

    if (ReturnData.status == "error" || ReturnData.data.length == 0 || getCookie("UserID") == "None") 
    {
      console.log("Not Admin");
    }
    else 
    {
      console.log("Admin");
      NavLinks.innerHTML += `
        <a href="#">
            Add Wine
        </a>
        <a href="#">
            Manage Winery
        </a>
        `;
    }

    if (isLoggedIn) 
    {
      NavLinks.innerHTML += `
            <a href="../PHP/Logout.php" onclick="return LogoutWarning()">
                ${name} ${surname} (Logout)
            </a>
            `;
    }
    else 
    {
      NavLinks.innerHTML += `
        <a href="../PHP/login.php">
            Login
        </a>
        `;
    }

  }
  xhttp.open("POST", "http://127.0.0.1:8080", true);
  xhttp.send(JSON.stringify(postData));



  Navbar.appendChild(NavLinks);
}

function getCookie(name) {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // Check if the cookie starts with the provided name
    if (cookie.startsWith(name + '=')) {
      // Extract and return the cookie value
      return cookie.substring(name.length + 1);
    }
  }

  // Cookie not found
  return null;
}

function LogoutWarning() {
  return confirm("Are you sure you want to log out?");
}
