
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

var cities=["Allahabad","Delhi","Ahemdabad","Jaipur","Kashmir","Mumbai","Madras","Lucknow","Kanpur","Kolkata","Goa","Shimla","Chandigarh","Agra","Thane"];

var current=-1;
var auto=document.getElementsByClassName('city');

for(var i of auto){

    i.addEventListener("input",function(){

        current=this.id;
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
        parent.appendChild(a);
        for(var j=0;j<lis.length;j++)
        {
            var b = document.createElement("div");
            b.classList.add('autocomplete-item');
            b.innerHTML = lis[j];
            b.addEventListener("click",function(){
                
                
                var parent=this.parentNode;
                var grand=parent.parentNode;

                if(grand.id==="to")
                {
                    var inp=document.getElementById("city_to");
                    inp.value=this.innerHTML;

                    var element=inp.parentNode.getElementsByClassName('autocomplete');

                    for(var j of element)
                    {
                        inp.parentNode.removeChild(j);
                    }

                }
                else{

                    var inp=document.getElementById("city_from");
                    inp.value=this.innerHTML;

                    var element=inp.parentNode.getElementsByClassName('autocomplete');

                    for(var j of element)
                    {
                        inp.parentNode.removeChild(j);
                    }

                }
            });
            a.appendChild(b);
            
            
        }

    });

    i.addEventListener('focus',function(){
        
        if(current===this.id && current===-1)
        {

        }
        else
        {
            var node=document.getElementsByClassName("autocomplete");
            
            if(node!=undefined)
            {
                for(var j of node)
                {
                    j.parentNode.removeChild(j);
                }
            }
        }
    })

    
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


