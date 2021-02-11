
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
    });

var timing=document.getElementsByClassName('datePicker');

for(var i of timing)
{
    i.addEventListener('focus',function(){

        this.type='date';
        this.value=new Date().toDateInputValue();
    });
}

var cities=["Allahabad","Delhi","Ahemdabad","Jaipur","Kashmir","Mumbai","Madras","Lucknow","Kanpur","Kolkata","Goa","Shimla","Chandigarh","Agra"];


var auto=document.getElementsByClassName('city');

for(var i of auto){

    i.addEventListener("input",function(){


        var parent;

        if(this.id==="city_from")
        parent=document.getElementById('from');
        else
        parent=document.getElementById('to');

        var element=parent.getElementsByClassName('autocomplete');

        for(var j of element)
        {
            parent.removeChild(j);
        }

        if(this.value==="")
        {
            return;
        }

        var lis=cities.filter(x=>x.toUpperCase().startsWith(this.value.toUpperCase()));

        var a = document.createElement("DIV");
        a.setAttribute('class','autocomplete');
        for(var j=0;j<lis.length;j++)
        {
            var b = document.createElement("DIV");
            b.classList.add('autocomplete-item');
            b.innerHTML = lis[j];
            a.appendChild(b);
        }

        

        parent.appendChild(a);

    });
    i.addEventListener("blur",function(){


        var parent;

        if(this.id==="city_from")
        parent=document.getElementById('from');
        else
        parent=document.getElementById('to');

        var element=parent.getElementsByClassName('autocomplete');

        for(var j of element)
        {
            parent.removeChild(j);
        }

    });
}
var final=document.getElementById('checkout_button');

final.addEventListener('click',function(){
     
       var node=document.getElementById('spinner');
       node.style.display="block";
       setTimeout(function(resolve,reject){

            var node=document.getElementById('spinner');
            node.style.display="none";

            alert("Thanks for the request our team will contact you if details found valid");

            
       },3000);

        timing[0].type='text';
        timing[1].type='text';

        timing[0].value="";
        timing[1].value="";

        auto[0].value="";
        auto[1].value="";
        
});

var span = document.getElementsByClassName("close")[0];
var btn = document.getElementById("help");
var modal = document.getElementById("myModal");

btn.onclick = function() {
    modal.style.display = "block";
  }
  
span.onclick = function() {
    modal.style.display = "none";
  }


