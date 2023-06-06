var cardContainer = document.getElementById("WineContainer");
var WineCategory = document.getElementById("WineCategory");
var WineWinery = document.getElementById("Winery");
var WineName = document.getElementById("Name");
var WineType = document.getElementById("Type");
var WinePriceFrom = document.getElementById("PriceFrom");
var WineYearFrom = document.getElementById("YearFrom");
var WineAvailable = document.getElementById("Available");


function backgroundGet(){

    
    if(getCookie("userID") !== 'undefiend'){
    let user = getCookie("userID");
    let Request = "SELECT Winery_ID,Image FROM Winery WHERE Admin_ID = '"+user+"'";  

    let postData = 
    {
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
                WineWinery.value = ReturnData.data[index].Winery_ID;
                document.getElementById("infoCon").style.backgroundImage = "url('"+ReturnData.data[index].image+"')";
                index++;
            }

        }

    } 

    xhttp.open("POST", "http://127.0.0.1:8080", true);
    xhttp.send(JSON.stringify(postData));
    console.log(JSON.stringify(postData));
}
}


function APIRequest(Request)
{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () 
    {
        let ReturnData = JSON.parse(this.responseText)
        console.log(ReturnData);

        if (ReturnData.status == "error") 
        {
            document.getElementById("FillTitle").style.color = "red";
            document.getElementById("FillTitle").value = "Something Wrong";
        }
        else 
        {
           
            document.getElementById("FillTitle").style.color = "green";
            document.getElementById("FillTitle").value = "Succes";
            

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
    WineType.value = "";
    WinePriceFrom.value = "";
    WineYearFrom.value = "";
    WineAvailable.checked = false;

    ApplyFilters();

}

function Update()
{
    cardContainer.innerHTML = "";
    console.log("Updating");



    if(
        WineCategory.value == "None" 
        || WineYearFrom.value == "" 
        || WineName.value == "" 
        || WineType.value ==""
    )
    {

        document.getElementById("FillTitle").style.color = "red";
        document.getElementById("FillTitle").value = "Fill in fields";
        

    }else
    {
        let Request = "UPDATE Wine SET ";
 
        if (WinePriceFrom.value != "") 
        {
        
            Request += 'Price = "' + WinePriceFrom.value + '",';
        }
        
        if (WineAvailable.checked == true) 
        {
            
            Request += 'Available = "' + 1 + '"';
        }else{
            Request += 'Available = "' + 0 + '"';
        }

        Request += " WHERE Name Like '%"+WineName.value+"%' AND Year = '"+WineYearFrom.value+"' AND Type LIKE '%"+WineType.value+"%' AND Category = '"+WineCategory.value +"'AND Winery_ID = '"+WineWinery.value +"'";

       
    }
    
    
    

    console.log(Request);
      
    let postData = 
    {
      
        "query": "UPDATE",
        "type": "updateWine",
        "Query": Request
    };
    APIRequest(postData);
}


function Delete()
{
    cardContainer.innerHTML = "";
    console.log("Deleting");



    if(
        WineCategory.value == "None" 
        || WineYearFrom.value == "" 
        || WineName.value == "" 
        || WineType.value ==""
    )
    {

        document.getElementById("FillTitle").style.color = "red";
        document.getElementById("FillTitle").value = "Fill in fields";
        

    }else
    {
        let Request = "DELETE FROM Wine";
 

        Request += " WHERE Name Like '%"+WineName.value+"%' AND Year = '"+WineYearFrom.value+"' AND Type LIKE '%"+WineType.value+"%' AND Category = '"+WineCategory.value +"'AND Winery_ID = '"+WineWinery.value +"'";

       
    }
    
    
    

    console.log(Request);
      
    let postData = 
    {
      
        "query": "DELETE",
        "type": "deleteWine",
        "Query": Request
    };
    APIRequest(postData);
}