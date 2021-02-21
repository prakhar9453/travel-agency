
var ent,exit;
var dep,arr;

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
    });

var timing=document.getElementsByClassName('datePicker');

for(var i of timing)
{
    i.addEventListener('focus',function(){

        if(this.id==="dept" && ent)
            return;
        
        if(this.id==="return" && exit)
            return;

        this.type='date';
        var j=new Date().toDateInputValue();

        if(this.id==="dept")
        {
            if(exit)
            {
                this.value=j;
                this.min=j;
                this.max=exit;

            }
            else{
            this.value=j;
            ent=this.value;
            this.min=j;
            }
        }
        else if(this.id==="return")
        {
            
            if(ent)
            {
                this.min=ent;
                this.value=ent;
                exit=this.value;
            
            }
            else
            {
                this.min=j;
                this.value=j;
                exit=this.value;
            }
        }
    });
    i.addEventListener("change",function(event){

    var d=document.getElementById("dept");
    var a=document.getElementById("return");
    this.value=event.target.value;
    console.log(this.value);
     if(this.id==="dept")
     {
        ent=this.value;
        a.min=ent;
     }
     else if(this.id==="return")
     {
        exit=this.value;
        d.max=exit;

     }

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
                    arr=inp.value;
                    var element=inp.parentNode.getElementsByClassName('autocomplete');

                    for(var j of element)
                    {
                        inp.parentNode.removeChild(j);
                    }

                }
                else{

                    var inp=document.getElementById("city_from");
                    inp.value=this.innerHTML;
                    dep=inp.value;
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
    i.addEventListener("change",function(){

        if(this.id==="city_from")
            dep=this.value;
        else
            arr=this.value;
    });

    
}
var check=document.getElementById("type_journey");
var final=document.getElementById('checkout_button');

final.addEventListener('click',function(){
     

    if(timing[0].value=="" || (timing[1].value=="" && check.checked!=false) || auto[0].value=="" || auto[1].value=="")
    {
        var c=document.getElementById("field");
        if(c)
        {
            return;
        }

        var b = document.createElement("div");
        b.setAttribute("id","field");
        b.innerHTML="*All Fields are necessary";
        var book=document.getElementById("booking");
        book.appendChild(b);
        setTimeout(function(){

            var book=document.getElementById("booking");
            var b=document.getElementById("field");

            book.removeChild(b);
        },1000);
        return;
    }

        timing[0].type='text';
        timing[1].type='text';

        timing[0].value="";
        timing[1].value="";

        auto[0].value="";
        auto[1].value="";

        window.open("./invoice.html","_self");
        
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

check.addEventListener("change",function(){

    var ret=document.getElementById("return");
    if(check.checked===true){
    ret.disabled=false;
    ret.placeholder="Return Date"
    }
    if(check.checked===false){
        exit=null;
        ret.value=null;
        ret.disabled=true;
        ret.type="text";
        ret.placeholder="Add Return"
    }
})