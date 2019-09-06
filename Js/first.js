

let searchRow = document.getElementById("searchRow");
let websiteName = document.getElementById("websiteName");
let websiteLink = document.getElementById("websiteLink");
let btnLinks = document.getElementById("btnLinks");
let currentlinks = 0;
let searchInp = document.getElementById("searchInp");
let linksContainer;
if(localStorage.getItem("links")== null)
{
     linksContainer = [];
}
else
{
     linksContainer = JSON.parse(localStorage.getItem("links"));
     displayLinks();
}

function validation()
{
    var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if(regex.test(websiteLink.value) == false)
    {
        alert("the url is undifind");
        displayLinks() = false;
    }
    else if (regex.test(websiteLink.value)== true)
    {
        addLinks();
    }
}
btnLinks.onclick = function(){
    validation();
    if(btnLinks.innerHTML == "Add Link")
    {
        addLinks();
        displayLinks();
        clearform();
    }
    else
    {
        updateProduct();
        displayLinks();
    }    
}

 function addLinks() {
    if(!websiteName.value && !websiteLink.value)
    {
        alert("fill the form , please");
        stop();
    }
    else if(!websiteName.value)
    {
        alert("fill the webName , please");
        stop();
    }
    else if(!websiteLink.value)
    {
        alert("fill the webLink , please");
        stop();
        
    }
    else
    {
        let link = 
        {
            webname:websiteName.value,
            weblink:websiteLink.value
        }
        linksContainer.push(link);
        displayLinks()
        localStorage.setItem("links", JSON.stringify(linksContainer));
      }
      

    }    
    
    searchInp.onkeyup = function(){
        searchlink(searchInp.value);
    }
    function searchlink(linkresult){
        let searchCols = "";
        for(let i = 0; i< linksContainer.length; i++)
        {
            if(linksContainer[i].webname.includes(linkresult))
            {
                searchCols+=`<div class="col-md-4  text-center py-3">
                <div class=" border py-2 my-2">
                        <h3 class="font-weight-bold py-3">`+linksContainer[i].webname+`</h3>
                        <button onclick="setform(`+i+`)" class="btn btn-success mb-2 mx-2">Update</button>
                        <a href="`+linksContainer[i].weblink+`" target="_blank">
                            <button class="btn btn-info mb-2 mx-2">Visit</button>
                        </a>
                    <button onclick="deletelink(`+i+`)" class="btn btn-danger mb-2">Delete</button>
                </div>
            </div>`
            }
        }
        searchRow.innerHTML = searchCols;
    }   

  function displayLinks()
  {
      let cols ="";
      for(let i= 0; i< linksContainer.length; i++)
      {
          cols+= `<div class="col-lg-6  text-center py-3">
          <div class=" border py-2 my-2">
                  <h3 class="font-weight-bold py-3">`+linksContainer[i].webname+`</h3>
                  <button onclick="setform(`+i+`)" class="btn btn-success mb-2 mx-2">Update</button>
                  <a href="`+linksContainer[i].weblink+`" target="_blank">
                      <button class="btn btn-info mb-2 mx-2">Visit</button>
                  </a>
              <button onclick="deletelink(`+i+`)" class="btn btn-danger mb-2">Delete</button>
          </div>
      </div>`
      }
      document.getElementById("linksRow").innerHTML = cols;
  }

  function setform(i){
    
    websiteName.value = linksContainer[i].webname;
    websiteLink.value = linksContainer[i].weblink;

    $(btnLinks).html("Update Link");
    currentlinks = i;
  }

  function updateProduct(){
      linksContainer[currentlinks].webname = websiteName.value;
      linksContainer[currentlinks].weblink = websiteLink.value;
      
      $(btnLinks).html("Add Link");
      localStorage.setItem("links", JSON.stringify(linksContainer));
      clearform();

  }
 

  function deletelink(id){
    linksContainer.splice(id , 1);
    localStorage.setItem("links", JSON.stringify(linksContainer));
    displayLinks();
  }

  function clearform()
  {
     let clearform = document.getElementsByClassName("form-control");
     for(let i= 0; i< clearform.length; i++)
     {
        clearform[i].value = "";
     }
  }

  

  