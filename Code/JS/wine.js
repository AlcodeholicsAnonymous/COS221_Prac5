
var cardContainer = document.getElementById("WineContainer");
var WineCategory = document.getElementById("WineCategory");
var WineWinery = document.getElementById("Winery");
var WineCountry = document.getElementById("Country");
var WinePriceFrom = document.getElementById("PriceFrom");
var WinePriceTo = document.getElementById("PriceTo");
var WineYearFrom = document.getElementById("YearFrom");
var WineYearTo = document.getElementById("YearTo");
var Stars = document.getElementsByName("Stars");
var RatingDiv = document.getElementById("Rating");

function APIRequest(Request)
{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () 
    {
        let ReturnData = JSON.parse(this.responseText)
        // console.log(ReturnData);

        if (ReturnData.status == "error" || ReturnData.data.length == 0) 
        {
            const card = generateNoneFound()
            cardContainer.appendChild(card);
        }
        else 
        {
            let index = 0;
            let ratingID = 0;
            while (ReturnData.data[index] && typeof ReturnData.data[index].Name !== 'undefined') 
            {
                let card = GenerateWineCard
                (
                    ReturnData.data[index].Image, ReturnData.data[index].Name,
                    ReturnData.data[index].Category, ReturnData.data[index].Winery,
                    ReturnData.data[index].Country, ReturnData.data[index].Price,
                    ReturnData.data[index].Year, ratingID, ReturnData.data[index].Wine_ID, 5, true // change when user is logged in,
                );
                
                ratingID += 5;
                cardContainer.appendChild(card);
                
                index++;
            }

        }
    }
    xhttp.open("POST", "http://127.0.0.1:8080", true);
    xhttp.send(JSON.stringify(Request));
    // console.log(JSON.stringify(Request));
}

function GenerateWineCard(image, name, type, winery, country, price, year, index, WineID, UserID, loggedIn) {
    const card = document.createElement("div");
    card.classList.add("Wine");
  
    const wineImage = document.createElement("div");
    wineImage.classList.add("WineImage");
    wineImage.style.backgroundImage = `url(${image})`; // Set the background image here
  
    const wineInfo = document.createElement("div");
    wineInfo.classList.add("WineInfo");
    wineInfo.innerHTML = `
      <h2>${name}</h2>
      <div class="WineInfoContainer">
          <table>
              <tr>
                  <td>Wine Category:</td>
                  <td>${type}</td>
              </tr>
              <tr>
                  <td>Winery:</td>
                  <td>${winery}</td>
              </tr>
              <tr>
                  <td>Country:</td>
                  <td>${country}</td>
              </tr>
              <tr>
                  <td>Price:</td>
                  <td>${price}</td>
              </tr>
              <tr>
                  <td>Year:</td>
                  <td>${year}</td>
              </tr>
              <tr>
                <td>
${loggedIn ? `
            <div class="Rating" id="Rating">
              <label class="circular-checkbox">
                  
                  <input type="checkbox" id="${index}" name="Stars" value="${name}" onclick="Ratings('${name}', '${UserID}', 0, ${WineID})">
                  <span class="checkmark2"></span>
              </label>
              <label class="circular-checkbox">
                  
                  <input type="checkbox" id="${index + 1}" name="Stars" value="${name}" onclick="Ratings('${name}', '${UserID}', 1, ${WineID})">
                  <span class="checkmark2"></span>
              </label>
              <label class="circular-checkbox">
                  
                  <input type="checkbox" id="${index + 2}" name="Stars" value="${name}" onclick="Ratings('${name}', '${UserID}', 2, ${WineID})">
                  <span class="checkmark2"></span>
              </label>
              <label class="circular-checkbox">
                  
                  <input type="checkbox" id="${index + 3}" name="Stars" value="${name}" onclick="Ratings('${name}', '${UserID}', 3, ${WineID})">
                  <span class="checkmark2"></span>
              </label>
              <label class="circular-checkbox">
                  
                  <input type="checkbox" id="${index + 4}" name="Stars" value="${name}" onclick="Ratings('${name}', '${UserID}', 4, ${WineID})">
                  <span class="checkmark2"></span>
              </label>
              
            </div>
          ` : ''}
                </td>
                <td>
                    <p>Average Rating: 4.5</p>
                </td>
              </tr>
          </table>
          
      </div>
    `;
  
    card.appendChild(wineImage);
    card.appendChild(wineInfo);
  
    return card;
}
  
function generateNoneFound() 
{
    console.log("No Wines Found");
  
    const card = document.createElement("div");
    card.classList.add("Wine");
    
    const wineImage = document.createElement("div");
    wineImage.classList.add("WineImage");
    // wineImage.style.backgroundImage = `url(${image})`; // Set the background image here
  
    const wineInfo = document.createElement("div");
    wineInfo.classList.add("WineInfo");
    wineInfo.innerHTML = `
      <h2>We're sorry but there are no wines that match your filters type, please change them and try again</h2>
      
    `;
  
    card.appendChild(wineImage);
    card.appendChild(wineInfo);
  
    return card;
}
  

function ClearFilters()
{
    // console.log("Clearing Filters");
    WineCategory.value = "None";
    WineWinery.value = "None";
    WineCountry.value = "None";
    WinePriceFrom.value = "";
    WinePriceTo.value = "";
    WineYearFrom.value = "";
    WineYearTo.value = "";

    ApplyFilters();

}

function ApplyFilters()
{

    cardContainer.innerHTML = "";
    // console.log("Applying Filters");

    let Request = 'SELECT Wine.Wine_ID, Wine.Image, Wine.Name, Wine.Category, Winery.Name AS "Winery", '
    + 'Location.Country, Wine.Price, Wine.Year '
    + 'FROM Wine '
    + 'JOIN Winery ON Wine.Winery_ID = Winery.Winery_ID '
    + 'JOIN Location ON Winery.Location_ID = Location.Location_ID ';

    if(
        WineCategory.value != "None" 
        || WineWinery.value != "None" 
        || WineCountry.value != "None" 
        || WinePriceFrom.value != "" 
        || WinePriceTo.value != "" 
        || WineYearFrom.value != "" 
        || WineYearTo.value != ""
    )
    {
        Request += "WHERE "
        if (WineCategory.value != "None") 
        {
            // console.log("Wine Category: " + WineCategory.value);
            Request += 'Wine.Category = "' + WineCategory.value + '" AND ';
        }
        
        if (WineWinery.value != "None") 
        {
            // console.log("Winery: " + WineWinery.value);
            Request += 'Winery.Name = "' + WineWinery.value + '" AND ';
        }
        
        if (WineCountry.value != "None") 
        {
            // console.log("Country: " + WineCountry.value);
            Request += "Location.Country = '" + WineCountry.value + "' AND ";
        }
        
        if (WinePriceFrom.value != "") 
        {
            // console.log("Price From: " + WinePriceFrom.value);
            Request += "Wine.Price >= " + WinePriceFrom.value + " AND ";
        }
        
        if (WinePriceTo.value != "") 
        {
            // console.log("Price To: " + WinePriceTo.value);
            Request += "Wine.Price <= " + WinePriceTo.value + " AND ";
        }
        
        if (WineYearFrom.value != "") 
        {
            // console.log("Year From: " + WineYearFrom.value);
            Request += "Wine.Year >= " + WineYearFrom.value + " AND ";
        }
        
        if (WineYearTo.value != "") 
        {
            // console.log("Year To: " + WineYearTo.value);
            Request += "Wine.Year <= " + WineYearTo.value + " AND ";
        }

        Request = Request.substring(0, Request.length - 5);
    }
    
    

    // console.log(Request);
      
    let postData = 
    {
        "apikey": "69",
        "query": "SELECT",
        "type": "CustomQuery",
        "Query": Request
    };
    APIRequest(postData);
}

function Ratings(WineName, UserID, Rating, WineID) 
{
    // console.clear();

    for (let index = 0; index < Stars.length; index++) 
    {
        if (Stars[index].value == WineName) 
        {
            let rangeStart = index;
            let rangeEnd = index + 4;
            Rating = Rating + index;
            
            for (let index2 = rangeStart; index2 <= rangeEnd; index2++) 
            {
                if (index2 <= Rating) 
                {
                    Stars[index2].checked = true;
                }
                else 
                {
                    Stars[index2].checked = false;
                }

            }

            Rating = Rating - index + 1;
            break;
        }
    }

    console.log("Wine Name:\t" + WineName);
    console.log("Wine ID:\t" + WineID)
    console.log("User ID:\t" + UserID);
    console.log("Rating:\t" + (Rating));

    let postData = 
    {
        "apikey": "69",
        "query": "INSERT",
        "table": "Rating",
        "values": 
        {
            "User_ID": UserID,
            "Wine_ID": WineID,
            "Rating": Rating
        }
    };
    SetRating(JSON.stringify(postData)); 
}

function SetRating(postData)
{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () 
    {
        let ReturnData = JSON.parse(this.responseText)
        console.log(ReturnData);

        if (ReturnData.status == "error") 
        {
            console.log("Error: " + ReturnData.message);
        }
        else 
        {
            console.log("Rating Added");
        }
    }
    xhttp.open("POST", "http://127.0.0.1:8080", true);
    xhttp.send(postData);
}

function GetRating(WineName, UserID, WineID)
{

}