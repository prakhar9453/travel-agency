var departureDate,returnDate;
var departureCity,arrivalCity;

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
    });

var dateElement=document.getElementsByClassName('datePicker');

for(var i of dateElement)
{
    i.addEventListener('focus',function(){

        if(this.id==="departureDate" && departureDate)
            return;
        
        if(this.id==="returnDate" && returnDate)
            return;

        this.type='date';
        var currentDate=new Date().toDateInputValue();

        if(this.id==="departureDate")
        {
            if(returnDate)
            {
                this.value=currentDate;
                departureDate=this.value;
                this.min=currentDate;
                this.max=returnDate;

            }
            else{
            this.value=currentDate;
            departureDate=this.value;
            this.min=currentDate;
            }
        }
        else if(this.id==="returnDate")
        {
            
            if(departureDate)
            {
                this.min=departureDate;
                this.value=departureDate;
                returnDate=this.value;
            
            }
            else
            {
                this.min=currentDate;
                this.value=currentDate;
                returnDate=this.value;
            }
        }
    });
    i.addEventListener("change",function(event){

    var departureDateElement=document.getElementById("departureDate");
    var returnDateElement=document.getElementById("returnDate");
    this.value=event.target.value;

     if(this.id==="departureDate")
     {
        departureDate=event.target.value;
        returnDateElement.min=departureDate;
       
     }
     else if(this.id==="returnDate")
     {
        returnDate=this.value;
        departureDateElement.max=returnDate;

     }

    });
}

var cities=["Allahabad","Delhi","Ahemdabad","Jaipur","Kashmir","Mumbai","Madras","Lucknow","Kanpur","Kolkata","Goa","Shimla","Chandigarh","Agra","Thane"];

var current=-1;
var cityInputElement=document.getElementsByClassName('city');

for(var i of cityInputElement){

    i.addEventListener("input",function(){

        current=this.id;
        var parent;

        if(this.id==="departureCity")
        parent=document.getElementById('departureCityContainer');
        else
        parent=document.getElementById('arrivalCityContainer');

        var element=parent.getElementsByClassName('autocompleteContainer');
        console.log(element);

        for(var j of element)
        {
            parent.removeChild(j);
        }

        if(this.value==="")
        {
            return;
        }

        var autoCompleteList=cities.filter(x=>x.toUpperCase().startsWith(this.value.toUpperCase()));

        var divElement = document.createElement("div");
        divElement.setAttribute('class','autocompleteContainer');
        parent.appendChild(divElement);

        for(var j=0;j<autoCompleteList.length;j++)
        {
            var cityElement = document.createElement("div");
            cityElement.classList.add('autocomplete-item');
            cityElement.innerHTML = autoCompleteList[j];
            cityElement.addEventListener("click",function(){
                
                
                var parent=this.parentNode;
                var grandParent=parent.parentNode;

                if(grandParent.id==="arrivalCityContainer")
                {
                    var inputElementArrival=document.getElementById("arrivalCity");
                    inputElementArrival.value=this.innerHTML;
                    arrivalCity=inputElementArrival.value;
                    var autoCompleteElement=document.getElementsByClassName('autocompleteContainer');
                    console.log(autoCompleteElement);
                    

                    for(var j of autoCompleteElement)
                    {
                        inputElementArrival.parentNode.removeChild(j);
                    }

                }
                else{

                    var inputElemenetDeparture=document.getElementById("departureCity");
                    inputElemenetDeparture.value=this.innerHTML;
                    departureCity=inputElemenetDeparture.value;
                    var autoCompleteElement=document.getElementsByClassName('autocompleteContainer');
                    console.log(autoCompleteElement);
                    

                    for(var j of autoCompleteElement)
                    {
                        inputElemenetDeparture.parentNode.removeChild(j);
                    }

                }
            });
            divElement.appendChild(cityElement); 
            
        }

    });

    i.addEventListener('focus',function(){
        
        if(current===this.id && current===-1)
        {

        }
        else
        {
            var autoCompleteElement=document.getElementsByClassName("autocompleteContainer");
            
            if(autoCompleteElement!=undefined)
            {
                for(var j of autoCompleteElement)
                {
                    j.parentNode.removeChild(j);
                }
            }
        }
    })
    i.addEventListener("change",function(){

        if(this.id==="departureCity")
            departureCity=this.value;
        else
            arrivalCity=this.value;
    });
    
}
var journeyType=document.getElementById("journeyType");
var checkOutButton=document.getElementById('checkout_button');

checkOutButton.addEventListener('click',function(){
     

    if(dateElement[0].value=="" || (dateElement[1].value=="" && journeyType.checked!=false) || cityInputElement[0].value=="" || cityInputElement[1].value=="")
    {
        var allFieldWarning=document.getElementById("fieldAlert");
        if(allFieldWarning)
        {
            return;
        }

        var fieldWarning = document.createElement("div");
        fieldWarning.setAttribute("id","fieldAlert");
        fieldWarning.innerHTML="*All Fields are necessary";
        var containerForm=document.getElementById("journey-form");
        containerForm.appendChild(fieldWarning);
        setTimeout(function(){

            
            var fieldWarning=document.getElementById("fieldAlert");

            fieldWarning.parentNode.removeChild(fieldWarning);
        },1000);
        return;
    }
    if(cityInputElement[0].value===cityInputElement[1].value)
    {
        var sameFieldWarning = document.createElement("div");
        sameFieldWarning.setAttribute("id","fieldAlert");
        sameFieldWarning.innerHTML="*Arrival and departure can't be same";
        var containerForm=document.getElementById("journey-form");
        containerForm.appendChild(sameFieldWarning);
        setTimeout(function(){

            
            var sameFieldWarning=document.getElementById("fieldAlert");
            sameFieldWarning.parentNode.removeChild(sameFieldWarning);
        },1000);
        return;

    }

        dateElement[0].type='text';
        dateElement[1].type='text';

        dateElement[0].value="";
        dateElement[1].value="";

        cityInputElement[0].value="";
        cityInputElement[1].value="";

        if(journeyType.checked===true)
        {
            journeyType.checked=false;
        }
        localStorage.setItem("departureCity",departureCity.toUpperCase());
        localStorage.setItem("arrivalCity",arrivalCity.toUpperCase());
        localStorage.setItem("departureDate",departureDate);
        localStorage.setItem("returnDate",returnDate);
        window.open("./invoice.html","_self");
        
});

var span = document.getElementsByClassName("close")[0];
var btn = document.getElementById("helpButton");
var modal = document.getElementById("helpModal");

btn.onclick = function() {
    modal.style.display = "block";
  }
  
span.onclick = function() {
    modal.style.display = "none";
  }

journeyType.addEventListener("change",function(){

    var returnDateElement=document.getElementById("returnDate");
    if(journeyType.checked===true){
    returnDateElement.disabled=false;
    returnDateElement.placeholder="Return Date"
    }
    if(journeyType.checked===false){
        returnDate=null;
        returnDateElement.value=null;
        returnDateElement.disabled=true;
        returnDateElement.type="text";
        returnDateElement.placeholder="Add Return"
    }
})