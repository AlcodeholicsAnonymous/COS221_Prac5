
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

// Cookie Information
var isLoggedIn = getCookie("LoggedIn");
var Name = getCookie("name");
var Surname = getCookie("surname");
var UserID = getCookie("UserID");


function APIRequest(Request)
{
    let postData = 
    {
        "apikey": "69",
        "query": "SELECT",
        "type": "CustomQuery",
        "Query": "SELECT * FROM Rating WHERE User_ID = " + UserID + ";"
    };

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () 
    {
        let ReturnDataRatings = JSON.parse(this.responseText);

        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () 
        {
            let ReturnData = JSON.parse(this.responseText)

            if (ReturnData.status == "error" || ReturnData.data.length == 0) 
            {
                const card = generateNoneFound();
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
                        ReturnData.data[index].Year, ratingID, ReturnData.data[index].Wine_ID, UserID, isLoggedIn, // change when user is logged in,
                        Number(ReturnData.data[index].Average_Rating).toFixed(2)
                    );
                    cardContainer.appendChild(card);

                    for (let i = 0; i < ReturnDataRatings.data.length; i++) 
                    {
                        if (ReturnDataRatings.data[i].Wine_ID == ReturnData.data[index].Wine_ID) 
                        {
                            for (let j = ratingID; j < ratingID + (Number)(ReturnDataRatings.data[i].Rating); j++)
                            {
                                document.getElementById(j).checked = true;
                            }
                        }
                    }

                    ratingID += 5;
                    index++;
                }
            }
        }
        xhttp.open("POST", "http://127.0.0.1:8080", true);
        xhttp.send(JSON.stringify(Request));
    }
    xhttp.open("POST", "http://127.0.0.1:8080", true);
    xhttp.send(JSON.stringify(postData));
}

// function APIRequest(Request) 
// {
    
//     console.log("Users name: " + Name);
//     console.log("Users surname: " + Surname);
//     console.log("Users ID: " + UserID);
//     console.log("Users LoggedIn: " + isLoggedIn);
// 	let postData =
// 	{
// 		apikey: "69",
// 		query: "SELECT",
// 		type: "CustomQuery",
// 		Query: "SELECT * FROM Rating WHERE User_ID = " + UserID + ";"
// 	};

// 	fetch("http://127.0.0.1:8080",
// 	{
// 		method: "POST",
// 		headers:
// 		{
// 			"Content-Type": "application/json"
// 		},
// 		body: JSON.stringify(postData)
// 	})
// 	.then(response => response.json())
// 	.then(ReturnDataRatings => {
// 		fetch("http://127.0.0.1:8080",
// 			{
// 				method: "POST",
// 				headers:
// 				{
// 					"Content-Type": "application/json"
// 				},
// 				body: JSON.stringify(Request)
// 			})
// 			.then(response => response.json())
// 			.then(ReturnData => {
// 				if (ReturnData.status == "error" || ReturnData.data.length == 0) 
// 				{
// 					const card = generateNoneFound();
// 					cardContainer.appendChild(card);
// 				}
// 				else 
// 				{
// 					let index = 0;
// 					let ratingID = 0;
// 					while (ReturnData.data[index] && typeof ReturnData.data[index].Name !== "undefined") {
// 						let card = GenerateWineCard
// 							(
// 								ReturnData.data[index].Image,
// 								ReturnData.data[index].Name,
// 								ReturnData.data[index].Category,
// 								ReturnData.data[index].Winery,
// 								ReturnData.data[index].Country,
// 								ReturnData.data[index].Price,
// 								ReturnData.data[index].Year,
// 								ratingID,
// 								ReturnData.data[index].Wine_ID,
// 								UserID,
// 								isLoggedIn,
// 								Number(ReturnData.data[index].Average_Rating).toFixed(2)
// 							);

// 						cardContainer.appendChild(card);

// 						for (let i = 0; i < ReturnDataRatings.data.length; i++) 
// 						{
// 							if(ReturnDataRatings.data[i].Wine_ID == ReturnData.data[index].Wine_ID) 
// 							{
// 								for (let j = ratingID; j < ratingID + Number(ReturnDataRatings.data[i].Rating); j++) 
// 								{
// 									document.getElementById(j).checked = true;
// 								}
// 							}
// 						}

// 						ratingID += 5;
// 						index++;
// 					}
// 				}
// 			})
// 			.catch(error => {
// 				console.log("Error fetching data:", error);
// 			});
// 	})
// 	.catch(error => {
// 		console.log("Error fetching data:", error);
// 	});
// }




function GenerateWineCard(image, name, type, winery, country, price, year, index, WineID, UserID, loggedIn, ExpertRating) {
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
                            <input type="checkbox" id="${index}" name="Stars" value="${name}" onclick="Ratings('${name}', 0, ${WineID})">
                            <span class="checkmark2"></span>
                        </label>
                        <label class="circular-checkbox">
                            <input type="checkbox" id="${index + 1}" name="Stars" value="${name}" onclick="Ratings('${name}', 1, ${WineID})">
                            <span class="checkmark2"></span>
                        </label>
                        <label class="circular-checkbox">
                            <input type="checkbox" id="${index + 2}" name="Stars" value="${name}" onclick="Ratings('${name}', 2, ${WineID})">
                            <span class="checkmark2"></span>
                        </label>
                        <label class="circular-checkbox">
                            <input type="checkbox" id="${index + 3}" name="Stars" value="${name}" onclick="Ratings('${name}', 3, ${WineID})">
                            <span class="checkmark2"></span>
                        </label>
                        <label class="circular-checkbox">
                            <input type="checkbox" id="${index + 4}" name="Stars" value="${name}" onclick="Ratings('${name}', 4, ${WineID})">
                            <span class="checkmark2"></span>
                        </label>
                        
                        </div>
                    ` : ''}
                </td>
                <td>
                    <p>Expert Rating: ${ExpertRating}</p>
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

	let Request =
		'SELECT '
		+ 'Wine.Wine_ID, '
		+ 'Wine.Image, '
		+ 'Wine.Name, '
		+ 'Wine.Category, '
		+ 'Winery.Name AS Winery, '
		+ 'Location.Country, '
		+ 'Wine.Price, '
		+ 'Wine.Year, '

		+ '( '
		+ 'SELECT AVG(Rating.Rating) '
		+ 'FROM Rating '
		+ 'JOIN User ON Rating.User_ID = User.User_ID '
		+ 'WHERE '
		+ 'Rating.Wine_ID = Wine.Wine_ID '
		+ 'AND User.Is_Expert = 1 '
		+ ') '
		+ 'AS Average_Rating '

		+ 'FROM Wine '

		+ 'JOIN Winery ON Wine.Winery_ID = Winery.Winery_ID '
		+ 'JOIN Location ON Winery.Location_ID = Location.Location_ID '
		+ 'LEFT JOIN Rating ON Wine.Wine_ID = Rating.Wine_ID ';


	if (
		WineCategory.value != "None"
		|| WineWinery.value != "None"
		|| WineCountry.value != "None"
		|| WinePriceFrom.value != ""
		|| WinePriceTo.value != ""
		|| WineYearFrom.value != ""
		|| WineYearTo.value != ""
	) {
		Request += "WHERE "
		if (WineCategory.value != "None") {
			// console.log("Wine Category: " + WineCategory.value);
			Request += 'Wine.Category = "' + WineCategory.value + '" AND ';
		}

		if (WineWinery.value != "None") {
			// console.log("Winery: " + WineWinery.value);
			Request += 'Winery.Name = "' + WineWinery.value + '" AND ';
		}

		if (WineCountry.value != "None") {
			// console.log("Country: " + WineCountry.value);
			Request += "Location.Country = '" + WineCountry.value + "' AND ";
		}

		if (WinePriceFrom.value != "") {
			// console.log("Price From: " + WinePriceFrom.value);
			Request += "Wine.Price >= " + WinePriceFrom.value + " AND ";
		}

		if (WinePriceTo.value != "") {
			// console.log("Price To: " + WinePriceTo.value);
			Request += "Wine.Price <= " + WinePriceTo.value + " AND ";
		}

		if (WineYearFrom.value != "") {
			// console.log("Year From: " + WineYearFrom.value);
			Request += "Wine.Year >= " + WineYearFrom.value + " AND ";
		}

		if (WineYearTo.value != "") {
			// console.log("Year To: " + WineYearTo.value);
			Request += "Wine.Year <= " + WineYearTo.value + " AND ";
		}

		Request = Request.substring(0, Request.length - 4);
	}

	Request += 'GROUP BY '
		+ 'Wine.Wine_ID, '
		+ 'Wine.Image, '
		+ 'Wine.Name, '
		+ 'Wine.Category, '
		+ 'Winery.Name, '
		+ 'Location.Country, '
		+ 'Wine.Price, '
		+ 'Wine.Year ';


	console.log(Request);

	let postData =
	{
		"apikey": "69",
		"query": "SELECT",
		"type": "CustomQuery",
		"Query": Request
	};
	APIRequest(postData);
}

function Ratings(WineName, Rating, WineID) 
{
	console.clear();

	let index = 0;
	for (index = 0; index < Stars.length; index++) {
		if (Stars[index].value == WineName) {
			let rangeStart = index;
			let rangeEnd = index + 4;
			Rating = Rating + index;

			for (let index2 = rangeStart; index2 <= rangeEnd; index2++) {
				if (index2 <= Rating) {
					Stars[index2].checked = true;
				}
				else {
					Stars[index2].checked = false;
				}

			}

			Rating = Rating - index + 1;
			break;
		}
	}

	console.log("Wine Name:\t" + WineName);
	console.log("Wine ID:\t" + WineID);
	console.log("User ID:\t" + UserID);
	console.log("Rating:\t" + (Rating));

	GetRating(WineID, Rating, index);
}

function GetRating(WineID, Rating) 
{
    console.clear();
    console.log("Getting rating where Wine ID = " + WineID + " and User ID = " + UserID);
	let postData =
	{
		"apikey": "69",
		"query": "SELECT",
		"type": "CustomQuery",
		"Query": "SELECT * FROM Rating WHERE User_ID = " + UserID + " AND Wine_ID = " + WineID + ";"
	};
	// console.log(postData);
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		let QueryType = "";
		let ReturnData = JSON.parse(this.responseText)
		// console.log(ReturnData);
		// console.log("Length of return data: " + ReturnData.data.length);

		if (ReturnData.data.length == 0) {
			console.log("No rating found, Inserting new Rating");
			QueryType = "INSERT";
		}
		else {
			console.log("Rating found, Updating Rating");
			QueryType = "UPDATE";
		}
		let postData =
		{
			"apikey": "69",
			"query": QueryType,
			"table": "Rating",
			"values":
			{
				"Wine_ID": WineID,
				"User_ID": (Number)(UserID),
				"Rating": Rating
			}
		};

		SetRating(postData);
	}
	xhttp.open("POST", "http://127.0.0.1:8080", true);
	xhttp.send(JSON.stringify(postData));
    
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
	}
	xhttp.open("POST", "http://127.0.0.1:8080", true);
	xhttp.send(JSON.stringify(postData));
    console.log("Post Data")
	console.log(postData);
}

function getCookie(name) 
{
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

