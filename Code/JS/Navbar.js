
var Navbar = document.getElementById("Navbar");

function PopulateNav()
{
    console.log("Generating Navbar");

    const LogoImg = document.createElement("img");
    LogoImg.src = "../Img/Logo.jpg";
    Navbar.appendChild(LogoImg);
    
    const NavLinks = document.createElement("li");
    NavLinks.classList.add("NavSpacing");
    NavLinks.innerHTML = `
        <a href="../HTML/Wine.html">
            Wines
        </a>
        <a href="../HTML/wineries.html">
            Wineries
        </a>
        <a href="#">
            Wine Routes
        </a>
        <a href="../HTML/login.html">
            Login
        </a>
    `;
  
    Navbar.appendChild(NavLinks);
}