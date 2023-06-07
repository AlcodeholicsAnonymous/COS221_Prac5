
var cardContainer = document.getElementById("WineContainer");
var filterWinery = document.getElementById("Winery");
var filterRating = document.getElementById("Rating");
var filterCountry = document.getElementById("Country");
var Stars = document.getElementsByName("Stars");
var RatingDiv = document.getElementById("Rating");

// Cookie Information
var isLoggedIn = getCookie("LoggedIn");
var Name = getCookie("name");
var Surname = getCookie("surname");
var UserID = getCookie("UserID");


function APIRequest(Request)
{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () 
    {
		// console.log("Response");
		// console.log(this.responseText);
		let ReturnData = JSON.parse(this.responseText);
		console.log(ReturnData);
		console.log(ReturnData.data.length);
        if (ReturnData.status == "error" || ReturnData.data.length == 0) 
		{
			console.log("No Wines Found");
			const card = generateNoneFound();
			cardContainer.appendChild(card);
		}
		else 
		{
			console.log("Wines Found");
			let index = 0;
			while (ReturnData.data[index] && typeof ReturnData.data[index].name != 'undefined') 
			{
				if(ReturnData.data[index].Average_Rating == null)
				{
					ReturnData.data[index].Average_Rating = 0;
				}
				if(ReturnData.data[index].Wine_Tasting == 0)
				{
					ReturnData.data[index].Wine_Tasting = "No";
				}
				else
				{
					ReturnData.data[index].Wine_Tasting = "Yes";
				}
				let card = GenerateWineCard
				(
					// console.log("1")
					ReturnData.data[index].Image, ReturnData.data[index].name, 
					ReturnData.data[index].Country, ReturnData.data[index].Region, 
					Number(ReturnData.data[index].Average_Rating).toFixed(2), ReturnData.data[index].Wine_Tasting
				);
				cardContainer.appendChild(card);
				index++;
			}
		}
    }
    xhttp.open("POST", "http://127.0.0.1:8080", true);
    xhttp.send(JSON.stringify(Request));
	console.log("Request");
	console.log(Request);
}

function GenerateWineCard(image, Name, Country, Region, Rating, WineTasting) 
{
	const card = document.createElement("div");
	card.classList.add("Wine");

	const top = document.createElement("div");
	top.classList.add("TopHalf");

	const img = document.createElement("div");
	img.classList.add("WineImage");
	img.style.backgroundImage = `url(${image})`; // Set the background image here

	const name = document.createElement("div");
	name.classList.add("WineryName");

	const nameText = document.createElement("h1");
	nameText.innerHTML = Name;
	name.appendChild(nameText);

	top.appendChild(img);
	top.appendChild(name);

	const bottom = document.createElement("div");
	bottom.classList.add("BottomHalf");

	bottom.innerHTML = `
	<table>
		<tr>
			<td>Country:</td>
			<td>${Country}</td>
			<td>Region:</td>
			<td>${Region}</td>
		</tr>
		<tr>
			<td>Rating:</td>
			<td>${Rating}</td>
			<td>Wine Tasting:</td>
			<td>${WineTasting}</td>
		</tr>
	</table>
	`;


	card.appendChild(top);
	card.appendChild(bottom);
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
	console.log("Clearing Filters");//
	filterWinery.value = "None";
	filterCountry.value = "None";
	filterRatingFrom.value = "";
	filterRatingTo.value = "";

	ApplyFilters();
}

function ApplyFilters() 
{
    
	// let Query = 'SELECT '
	// 	+ 'Winery.Name AS Winery, '
	// 	+ 'Location.Country, '
	// 	+ 'Location.Region, '
	// 	+ 'Winery.Image, '
	// 	+ 'AVG(Rating.Rating) AS Average_Rating '

	// 	+ 'FROM '
	// 	+ 'Wine '

	// 	+ 'JOIN Winery ON Wine.Winery_ID = Winery.Winery_ID '
	// 	+ 'JOIN Location ON Winery.Location_ID = Location.Location_ID '
	// 	+ 'LEFT JOIN Rating ON Wine.Wine_ID = Rating.Wine_ID '

	// 	+ 'GROUP BY '
	// 	+ 'Winery.Name, '
	// 	+ 'Location.Country, '
	// 	+ 'Location.Region, '
	// 	+ 'Wine.Image ';

	// console.log(Query);

    

	let Request =
	{
		"type" : "getAllWineries",
		"returnWineries" : ["Wine_Tasting", "Admin_ID", "name", "location", "rating", "Image"],
        "searchWineries" : {},
		"sort" : "country",
		"order" : "ASC",
		"limit" : 20,
	}

    cardContainer.innerHTML = "";

    let postData = {};
	postData.type = "getAllWines";
	postData.returnWines =
	[
		"Winery_ID",
        "Admin_ID",
		"Image",
		"name",
		"location",
		"rating",
        "Wine_Tasting"
	];
    
	postData.group =
	[
		"Winery.Winery_ID",
		"Winery.Image",
		"Winery.Name",
		"Location.Country"
	];

    if 
	(
		filterWinery.value != "None"
		|| filterCountry.value != "None"
		|| filterRating.value != ""
	) 
	{
		postData.searchWines = {};
		if (filterWinery.value != "None") 
		{
			postData.searchWines.name = filterWinery.value;
			console.log("Winery: " + filterWinery.value);
		}

		if (filterCountry.value != "None") 
		{
			postData.searchWines.location = filterCountry.value;
			console.log("Country: " + filterCountry.value);
		}

		if (filterRating.value != "") 
		{
			postData.searchWines.rating = (Number)(filterRating.value);
			console.log("wineryRating: " + postData.searchWines.rating);
		}
	}

	APIRequest(Request);
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

