var cardContainer = document.getElementById("WineContainer");
var WineWinery = document.getElementById("Winery");
var WineName = document.getElementById("Name");
var WineType = document.getElementById("Type");
var WinePriceFrom = document.getElementById("PriceFrom");
var WineYearFrom = document.getElementById("YearFrom");
var WineAvailable = document.getElementById("Available");
var Password = () => {
    var cookies = document.cookie.split(";");
    
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      
      if (cookie.indexOf("password=") === 0) {
        var password = cookie.substring("password=".length);
        password = decodeURIComponent(password);
        console.log("Found password: " + password);
        return password;
      }
    }
}
Password = Password();
function APIRequest(Request)
{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () 
    {
        
        let ReturnData = JSON.parse(this.responseText)
        console.log(ReturnData);

        if (ReturnData.status == "error") 
        {
            document.getElementById("FillTitle").innerHTML = "Something Wrong";
           document.getElementById("FillTitle").style.color = "red";
           
        }
        else 
        {
           
            document.getElementById("FillTitle").style.color = "green";
            document.getElementById("FillTitle").innerHTML = "Succes";
            

        }
    }

    xhttp.open("POST", "http://127.0.0.1:8080", true);
    xhttp.send(JSON.stringify(Request));
    console.log(JSON.stringify(Request));
}



function Clear()
{
    console.log("Clearing Filters");
   
    WineName.value = "";
    WineType.value = "";
    WinePriceFrom.value = "";
    WineYearFrom.value = "";
    WineAvailable.checked = false;

    

}

function Update()
{
    
    console.log("Updating");



    if(
       
         WineYearFrom.value == "" 
        || WineName.value == "" 
        || WineType.value ==""
    )
    {

        document.getElementById("FillTitle").style.color = "red";
        document.getElementById("FillTitle").innerHTML = "Fill in fields";
        

    }else
    {
       
 
       
        
        if (WineAvailable.checked == true) 
        {
            
            var check= "1";
        }else{
            var check= "0";
        }
        let postData = 
        {
          
            "passwordHash" : Password,
            "type": "updateWine",
            "wineName" : WineName.value,
            "wineYear" : WineYearFrom.value,
            "wineType" : WineType.value,
            "parameters" :{
    
                "Available" : check,
                "Price" : WinePriceFrom.value
            }  
        
        };
        APIRequest(postData);
       
    }
       
}


function Delete()
{
    console.log("Deleting");



    if(
         WineYearFrom.value == "" 
        || WineName.value == "" 
        || WineType.value ==""
    )
    {

        document.getElementById("FillTitle").style.color = "red";
        document.getElementById("FillTitle").value = "Fill in fields";
        

    }else
    {
       
        let postData = 
        {
          
            "passwordHash" : Password,
            "type": "deleteWine",
            "wineName" : WineName.value,
            "wineYear" : WineYearFrom.value,
            "wineType" : WineType.value
        
        
        };
        APIRequest(postData);
    }
    

  
}