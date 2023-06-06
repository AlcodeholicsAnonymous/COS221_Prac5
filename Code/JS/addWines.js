var cardContainer = document.getElementById("WineContainer");
var WineCategory = document.getElementById("WineCategory");
var WineName = document.getElementById("WineName");
var WineType = document.getElementById("Type");
var WineWinery = document.getElementById("Winery");
var WinePriceFrom = document.getElementById("PriceFrom");
var WineYearFrom = document.getElementById("YearFrom");
var WinePicture = document.getElementById("Image");





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

    console.log("Adding Wine");


    if(WineCategory.value == "None"
    || WineName.value == "" 
    || WineType.value ==""
    || WinePriceFrom.value == "" 
    || WineYearFrom.value == "" 
    || WinePicture.value == ""){

        document.getElementById("FillTitle").style.color = "red";

    }else
    {
        let wine = 
    {
      
        "Name" : WineName.value,
        "Year" : WineYearFrom.value,
        "Type" :WineType.value,
        "Image" : WinePicture.value,
        "Price" : WinePriceFrom.value,
        "Available" :"1",
        "Category" : WineCategory.value
        
    }
    
    
    console.log(Request);
      
    let postData = 
    {
        "type": "addWine",
        "wine": wine
    };
    APIRequest(postData);
    }
}