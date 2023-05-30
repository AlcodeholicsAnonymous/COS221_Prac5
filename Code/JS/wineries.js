var ret = "*",
    limit = 20,
    order = "DESC",
    fuzzy = true,
    country = "",
    region = "",
    tasting = false,
    cantact = "";



function getWineries() {
    //var spesWinery = "{}"
    var reqWin = new XMLHttpRequest();
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
                    info.innerHTML = "Country:  " +wineries.data[i].country+ "<br/>"+
                                    "Region:  " +wineries.data[i].region+ "<br/>"+
                                    "Address:  " +wineries.data[i].address+ "<br/>"+
                                    "Postal Code:  " +wineries.data[i].postal+ "<br/>"+
                                    "Wine Tasting:  " +wineries.data[i].tasting+ "<br/>"+
                                    "Contact:  " +wineries.data[i].contact+ "<br/>";

                windiv.appendChild(info)
                const galdiv = document.createElement("div");
                galdiv.className = "gallery";
                    windiv.appendChild(galdiv);
                const image = document.createElement("img"); 
                    var reqImg = new XMLHttpRequest();
                    reqImg.addEventListener("readystatechange", function() {
                        if(this.readyState === 4 && this.status === 200) {
                            var imgURL = this.responseText;
                            image.src = imgURL;
                            image.alt = "imgURL";     
                            galdiv.appendChild(image); ;
                        }
                    });
                    reqImg.open("GET", "https://wheatley.cs.up.ac.za/api/getimage?brand="+wineries.data[i].make+
                                "&model="+wineries.data[i].model);
                    reqImg.send();
                const dcript = document.createElement("div");
                    dcript.innerHTML = wineries.data[i].make +" "+ wineries.data[i].model;
                    dcript.className = "desc";
                    galdiv.appendChild(dcript);
            }
        }
    });
    reqCar.open("POST", "https://localhost:8081/");
    reqCar.setRequestHeader("Content-Type", "applicaton/json");
    reqCar.send(spesCar);
}

function getCars() {
    var spesCar  = "{\"studentnum\":\""+studnum+
                "\",\"type\":\"GetAllCars\",\"limit\":"+limit+
                ",\"apikey\":\""+apikey+
                "\",\"search\":{\"make\":\""+make+
                "\",\"model\":\""+model+
                "\",\"transmission\":\""+trans+
                "\",\"engine_type\":\""+engine+
                "\",\"body_type\":\""+body+
                "\",\"number_of_seats\":\""+seats+
                "\",\"series\":\""+series+
                "\",\"trim\":\""+trim+
                "\",\"number_of_cylinders\":\""+numCyl+
                "\"},\"fuzzy\": true,\"sort\":\""+sortIn+"\",\"order\":\""+order+"\",\"return\":\"*\"}";

    var reqCar = new XMLHttpRequest();
    reqCar.addEventListener("readystatechange", function() {
        if(this.readyState === 4 && this.status === 200) {
            var cars = JSON.parse(this.responseText);
            console.log(cars);
            const carGall = document.getElementById("cargallery");
            carGall.innerHTML = "";
            
        }
    });
    reqCar.open("POST", "https://localhost:8081/WineryAPI.php");
    reqCar.setRequestHeader("Content-Type", "applicaton/json");
    reqCar.send(spesCar);
}