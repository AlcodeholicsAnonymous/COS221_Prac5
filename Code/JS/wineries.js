getWineries();

var ret = "*",
    limit = 20,
    //order = "DESC",
    //fuzzy = true,
    reqwinery = "",
    reqcountry = "",
    reqregion = "",
    reqtasting = false;


function getWineries() {
    var spesWinery = {
        query : "Custom",
        apikey : "69",
        type : "CustomQuery",
        Query : "SELECT * FROM Winery"
        /*from : "GetWineries",
        limit : 10,
        name : reqwinery,
        country : reqcountry,
        region : reqregion,
        tasting : reqtasting*/
    }

    var reqWin = new XMLHttpRequest();
    reqWin.open("POST", "https://localhost:8080/");
    reqWin.setRequestHeader("Content-Type", "applicaton/json");
    reqWin.send(JSON.stringify(spesWinery));

    reqWin.addEventListener("readystatechange",function() {
        if(this.readyState === 4 && this.status === 200) {
            var wineries = JSON.parse(this.responseText);
            console.log(wineries);
            const wingal = document.getElementById("winerygallery");
            wingal.innerHTML = "";
            for (var i = 0; i < wineries.data.length; i++) {
                const windiv = document.createElement("div");
                windiv.className = "winery";
                wingal.appendChild(windiv);
                
                const info = document.createElement("p");
                info.innerHTML = "Country:  " +wineries.data[i].Country+ "<br/>"+
                                "Region:  " +wineries.data[i].Region+ "<br/>"+
                                "Address:  " +wineries.data[i].Street_Number+" "+wineries.data[i].Street_Name+ "<br/>"+
                                "Postal Code:  " +wineries.data[i].Postal_Code+ "<br/>"+
                                "Wine Tasting:  " +wineries.data[i].Tasting+ "<br/>"+
                                "Contact:  " +wineries.data[i].Contact+ "<br/>";

                windiv.appendChild(info)
                const galdiv = document.createElement("div");
                galdiv.className = "gallery";
                    windiv.appendChild(galdiv);
                const image = document.createElement("img"); 

                var imgURL = wineries.data[i].Image;
                image.src = imgURL;
                image.alt = wineries.data[i].Name;     
                galdiv.appendChild(image); 
                    
                const dcript = document.createElement("div");
                dcript.innerHTML = wineries.data[i].Name;
                dcript.className = "desc";
                galdiv.appendChild(dcript);
            }
        }
    });
}
