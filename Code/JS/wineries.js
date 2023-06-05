
var cardContainer = document.getElementById("windiv");


function APIRequest() 
{
    let Request = 
    {
        "apikey": "69",
        "query": "SELECT",
        "type": "CustomQuery",
        "Query": "SELECT * FROM Winery;"
    };
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () 
    {
        let ReturnData = JSON.parse(this.responseText)
        console.log(ReturnData);

        if (ReturnData.status == "error" || ReturnData.data.length == 0) 
        {
            // const card = generateNoneFound()
            // cardContainer.appendChild(card);
        }
        else 
        {
            let index = 0;
            // while (ReturnData.data[index] && typeof ReturnData.data[index].Name !== 'undefined') 
            // {
                let card = GenerateWineCard
                (
                    ReturnData.data[0].Winery_ID, ReturnData.data[0].Name,
                    ReturnData.data[0].Admin_ID, ReturnData.data[0].Location_ID,
                    ReturnData.data[0].Image
                );
                cardContainer.appendChild(card);

                // index++;
            // }

        }
    }
    xhttp.open("POST", "http://127.0.0.1:8080", true);
    xhttp.send(JSON.stringify(Request));
    console.log(JSON.stringify(Request));
}

function GenerateWineCard(ID, Name, Admin, Location, Image) 
{
    console.log("Generating Winery Card");
    console.log(ID);
    console.log(Name);
    console.log(Admin);
    console.log(Location);
    console.log(Image);

    const card = document.createElement("p");
    card.style.color = "white";

    card.innerHTML = `
            ID: ${ID}           <br>
            Name: ${Name}         <br>
            Admin ID: ${Admin}      <br>
            Location ID:${Location}  <br>
            Image: ${Image}         <br>
        `;

    console.log(card);
    return card;
}