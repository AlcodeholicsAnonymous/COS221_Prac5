
var cardContainer = document.getElementById("WineContainer");
function APIRequest(Request)
{
    // Request = 
    // {
    //     type: "getWines",
    //     return: "*",
    //     limit: 5
    // };
    // const xhttp = new XMLHttpRequest();
    // xhttp.onload = function () 
    // {
    //     let ReturnData = JSON.parse(this.responseText)
    //     console.log(ReturnData);

    //     if (ReturnData.status == "error") 
    //     {
    //         const card = generateNoneFound()
    //         cardContainer.appendChild(card);
    //     }
    //     else 
    //     {
            for (let index = 0; index < 1; index++) 
            {
                // if (ReturnData.data[index] && typeof ReturnData.data[index].Name !== 'undefined') 
                // {
                    let card = GenerateWineCard
                    (
                        // ReturnData.data[index].Image, ReturnData.data[index].Name,
                        // ReturnData.data[index].Type, ReturnData.data[index].Winery,
                        // ReturnData.data[index].Country, ReturnData.data[index].Price,
                        // ReturnData.data[index].Year
                        "https://images.vivino.com/thumbs/nC9V6L2mQQSq0s-wZLcaxw_pb_x300.png", 
                        "Amarone della Valpolicella",
                        "Red", 
                        "Ernesto Ruffo", 
                        "Italy", 
                        "R1000", 
                        "2005"
                    );

                    cardContainer.appendChild(card);
                // }
            }
    //     }
    // }
    // xhttp.open("POST", "C:/xampp/htdocs/Code/PHP/WineryAPI", true);
    // xhttp.send(JSON.stringify(Request));
    // console.log(JSON.stringify(Request));
}

function GenerateWineCard(image, name, type, winery, country, price, year)
{
    console.log("Generating Wine Card");
    console.log(image);
    console.log(name);
    console.log(type);
    console.log(winery);
    console.log(country);
    console.log(price);
    console.log(year);

    const card = document.createElement("div");
    card.classList.add("Wine");
    // card.style.backgroundImage = `url(${Car.Image})`;
    card.innerHTML = `

    <img class="WineImage" 
        src="${image}"" 
        alt="Wine 1"
    >
    <div class="WineInfo">
        <h2>${name}</h2>
        <div class="WineInfoContainer">
            <table>
                <tr>
                    <td>Wine Type:</td>
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
            </table>
        </div>
    </div>
`;
    return card;
}

function ClearFilters()
{
    console.log("Clearing Filters");
    document.getElementById("WineType").value = "";
    document.getElementById("Winery").value = "";
    document.getElementById("Country").value = "";
    document.getElementById("PriceFrom").value = "";
    document.getElementById("PriceTo").value = "";
    document.getElementById("YearFrom").value = "";
    document.getElementById("YearTo").value = "";
}