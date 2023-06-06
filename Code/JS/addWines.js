var cardContainer = document.getElementById("WineContainer");
var WineCategory = document.getElementById("WineCategory");
var WineName = document.getElementById("WineName");
var WineType = document.getElementById("Type");
var WinePriceFrom = document.getElementById("PriceFrom");
var WineYearFrom = document.getElementById("YearFrom");
var WinePicture = document.getElementById("WineImage");



function backgroundGet(){

    let user = getCookie("userID");
    let Request = "SELECT Image FROM Winery WHERE Admin_ID = '"+user+"'";  

    let postData = 
    {
        "apikey": "69",
        "query": "SELECT",
        "type": "CustomQuery",
        "Query": Request
    };


    const xhttp = new XMLHttpRequest();
    xhttp.onload = function (){

        let ReturnData = JSON.parse(this.responseText)
        console.log(ReturnData);
        if (ReturnData.status == "error" || ReturnData.data.length == 0) 
        {
            const card = generateNoneFound()
          
        }
        else 
        {
            let index = 0;
            while (ReturnData.data[index] && typeof ReturnData.data[index].Name !== 'undefined') 
            {
                
                document.getElementById("infoCon").style.backgroundImage = "url('"+ReturnData.data[index].image+"')";
                index++;
            }

        }

    } 

    xhttp.open("POST", "http://127.0.0.1:8080", true);
    xhttp.send(JSON.stringify(postData));
    console.log(JSON.stringify(postData));
}




function APIRequest(Request)
{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () 
    {
        let ReturnData = JSON.parse(this.responseText)
        console.log(ReturnData);

        if (ReturnData.status == "error" || ReturnData.data.length == 0) 
        {
      
        }
        else 
        {
           
            //return thing;

        }
    }
    xhttp.open("POST", "http://127.0.0.1:8080", true);
    xhttp.send(JSON.stringify(Request));
    console.log(JSON.stringify(Request));
}


  

function Clear()
{
    console.log("Clearing Filters");
    WineCategory.value = "None";
    WineName.value = ""; 
    WineType.value ="";
    WinePriceFrom.value = "" ;
    WineYearFrom.value = ""; 
    WinePicture.value = "";

}

function AddWine()
{
    cardContainer.innerHTML = "";
    console.log("Adding Wine");


    if(WineCategory.value == "None"
    || WineName.value == "" 
    || WineType.value ==""
    || WinePriceFrom.value == "" 
    || WineYearFrom.value == "" 
    || WinePicture.value == ""){

        document.getElementById("FillTitle").style.color = "red";

    }
    {
        let Request = "INSERT INTO Wine (Winery_ID, Name, Year,Type,Image,Price,Available,Category) VALUES ("
        +"'" +WineName.value+"',"
        +"'" +WineYearFrom.value+"',"
        +"'" +WineType.value+"',"
        +"'" +WinePicture.value+"',"
        +"'" +WinePriceFrom.value+"',"
        +"'" +1+"',"
        +"'" +WineCategory.value+"')"
        ;
    }
    
    

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