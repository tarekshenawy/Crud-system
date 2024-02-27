let thetitle = document.getElementById("title");
let theprice = document.getElementById("price");
let thetaxes = document.getElementById("taxes");
let theads = document.getElementById("ads");
let thediscount = document.getElementById("discount");
let thetotal = document.getElementById("total");
let thecount = document.getElementById("count");
let thecategory = document.getElementById('category');
let thecreate = document.getElementById("create");
let mood ='create';
let index;


//get total
function gettotal(){
    if(theprice.value !=''){
        let result = (+theprice.value + +thetaxes.value + +theads.value ) - (+thediscount.value);
        thetotal.innerHTML = result;
        thetotal.style.background="green";
    }else{
        thetotal.style.background="red";
        thetotal.innerHTML="";
    }
}

let dataitems;
if(localStorage.product != null){
    dataitems = JSON.parse( localStorage.product );
}
else{
     dataitems=[];
}

//////////////////// create
thecreate.onclick =()=>{
    if(thetitle.value != "" && theprice.value !=""){
        let newdata = {
            title : thetitle.value.toLowerCase(),
            price :theprice.value,
            taxes :thetaxes.value,
            ads : theads.value,
            discount : thediscount.value,
            total:thetotal.innerHTML,
            count :thecount.value,
            category:thecategory.value.toLowerCase(),
        }

        if(mood === 'create'){
            if(newdata.count >1 && newdata.count <100){
                for(i=0 ;i<newdata.count ; i++){
                    dataitems.push(newdata);
    
                }
            }
            else{
                dataitems.push(newdata);
                }

        }
        else{
            dataitems[index] = newdata;
            mood="create";
            thecreate.innerHTML="create";
            thecount.style.display="block";

        }
        localStorage.setItem("product", JSON.stringify(dataitems));
       cleardata()
    }
   
    Showdata()
   
  
}

////////////////////////cleardata
function cleardata(){
    thetitle.value="";
    theprice.value="";
    theads.value="";
    thetaxes.value="";
    thediscount.value="";
    thecount.value="";
    thecategory.value="";
    thetotal.innerHTML="";
    total.style.background="red";

}
/////////show data
function Showdata()
{
    let table="";
    for(i=0 ; i< dataitems.length ; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataitems[i].title}</td>
        <td>${dataitems[i].price}</td>
        <td>${dataitems[i].taxes}</td>
        <td>${dataitems[i].ads}</td>
        <td>${dataitems[i].discount}</td>
        <td>${dataitems[i].total}</td>
        <td>${dataitems[i].category}</td>
        <td><button id="update" onclick="Update(${i})">Update</button></td>
        <td><button id="delete" onclick="deleteitem(${i})">Delete</button></td>
    </tr>
        `
    }
    document.getElementById("table").innerHTML = table;
   
    let btn = document.getElementById("deleteall");
    if(dataitems.length > 0){
       btn.innerHTML =`
       <button onclick="deleteall()">DeleteAll (${dataitems.length})</button>
       `
    }
    else{
        btn.innerHTML='';
    } 
}
Showdata()
///////////////////// delete the item 
function deleteitem (i){
    dataitems.splice(i,1);
    localStorage.product = JSON.stringify(dataitems);
    Showdata();
}
//////////////////////////deleteall
function deleteall(){
    localStorage.clear();
    dataitems.splice(0);
    Showdata()
}
//////////////////////////updateitem 
function Update(i){
    thetitle.value = dataitems[i].title;
    theprice.value =dataitems[i].price;
    thetaxes.value = dataitems[i].taxes;
    theads.value = dataitems[i].ads;
    thediscount.value = dataitems[i].discount;
    gettotal();
    thecount.style.display ='none';
    thecategory.value = dataitems[i].category;
     mood = 'update';
     thecreate.innerHTML="update";
     index = i;
     scroll({
        top:0,
        behavior:"smooth",
        
     })

}



let searchmood = 'title';
let btnsearch = document.getElementById("search");
///////////////////////////getsearch 
function getsearch(id){
    if(id === "searchtitle"){
        searchmood="title";  
        btnsearch.placeholder="search by title";
    }
    else{
        searchmood ="category";
        btnsearch.placeholder="search by category";
    }
    btnsearch.focus()
    Showdata()
    btnsearch.value=""
}
///////////////////////getsearch items
function searchitems(value){
    let table='';
    if(searchmood == "title"){
        for(i=0 ; i< dataitems.length ;i++){
           if( dataitems[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i+1}</td>
            <td>${dataitems[i].title}</td>
            <td>${dataitems[i].price}</td>
            <td>${dataitems[i].taxes}</td>
            <td>${dataitems[i].ads}</td>
            <td>${dataitems[i].discount}</td>
            <td>${dataitems[i].total}</td>
            <td>${dataitems[i].category}</td>
            <td><button id="update" onclick="Update(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteitem(${i})">Delete</button></td>
        </tr>
            `
           }
        }
    }
    else
    {
        for(i=0 ; i<dataitems.length ;i++){
            if( dataitems[i].category.includes(value.toLowerCase())){
             table += `
             <tr>
             <td>${i+1}</td>
             <td>${dataitems[i].title}</td>
             <td>${dataitems[i].price}</td>
             <td>${dataitems[i].taxes}</td>
             <td>${dataitems[i].ads}</td>
             <td>${dataitems[i].discount}</td>
             <td>${dataitems[i].total}</td>
             <td>${dataitems[i].category}</td>
             <td><button id="update" onclick="Update(${i})">Update</button></td>
             <td><button id="delete" onclick="deleteitem(${i})">Delete</button></td>
         </tr>
             `
            }
         }

    }
    document.getElementById("table").innerHTML = table;

}






















































































