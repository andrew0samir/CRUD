// CRUDS operations 

let title = document.getElementById("title");
let price = document.getElementById("price");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");

let submit = document.getElementById("submit");
let clear = document.getElementById("clear");

let alert = document.getElementById("alert");
let priceAlert = document.getElementById("PriceAlert");

let mode = "create";
let index;


let newPorduct ={};
// calculate total
function getTotal(){
    if(price.value != ""){
        if (+price.value >= +discount.value ){
            let result = +price.value - +discount.value ;
            total.innerHTML = result; 
            total.style.background = "#040";
            priceAlert.style.display = "none";
        }
        else{
            priceAlert.style.display = "block";
            priceAlert.innerHTML = "price can't be less than the discount!".toUpperCase();
        }
        if (discount.value == ""){
            newPorduct.discount = 0 ;
        }
    }
    else{
        total.innerHTML = " "; 
        total.style.background = "#f80e0eb9";
    }
}

// create product 
let productData ;

if(localStorage.product != null ){
    productData = JSON.parse(localStorage.product);
}
else{
    productData = [];
}

submit.onclick = ()=>{
    newPorduct ={
        title : title.value.toLowerCase() ,
        price : price.value ,
        discount : discount.value ,
        total : total.innerHTML ,
        count : count.value ,
        category : category.value.toLowerCase() ,
    }

    if( title.value !="" && price.value !="" && category.value !=""){

        if (newPorduct.count < 100 ){
            create();
            clearForm();
            alert.style.display = "none";
        }
        else{
            alert.style.display = "block";
            alert.innerHTML = "you can't make more than 99 product at one time".toUpperCase();
        }

    }
    else{
        alert.style.display = "block";
    }
    

    function create() {
        if(mode ==="create"){
            // count of products 
            if(newPorduct.count > 1){
                for (let i = 0 ; i < newPorduct.count ; i++){
                    productData.push(newPorduct);
                }
            }
            else{
                productData.push(newPorduct);
            }
        }
        else{
            productData[index] = newPorduct;
            mode = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
            clear.style.display = "block";
        }
    }

    // save in localstorage
    localStorage.setItem("product", JSON.stringify(productData) );

    showData();


}


// clear inputs data
clear.onclick=()=>{
    clearForm();
    total.style.background = "#f80e0eb9";
}

function clearForm(){
    title.value="";
    price.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
    total.style.background = "#f80e0eb9";

}


// show data in the table 

function showData(){
    getTotal();
    let table = "";
    for(let i = 0 ; i < productData.length ; i++){
        table += `
        
        <tr>
            <td class="box">${i+1}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}</td>
            <td>${productData[i].discount}</td>
            <td>${productData[i].total}</td>
            <td>${productData[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
        </tr>
        `
    }

    document.getElementById("tbody").innerHTML = table ;

    let deleteAllBtn = document.getElementById("deleteAll");
    if (productData.length > 0){
        deleteAllBtn.innerHTML =`
        <button onclick="deleteAll()" >Delete All (${productData.length})</button>
        `
    }
    else{
        deleteAllBtn.innerHTML = "";
    }
    
}

showData() ;



// remove product fronm the table
function deleteProduct(i){
    productData.splice(i,1);
    localStorage.product = JSON.stringify(productData);
    showData();
    search.value ="";
}

function deleteAll(){
    localStorage.clear();
    productData.splice(0);
    showData();
}


// update 

function updateProduct(i){
    title.value = productData[i].title;
    price.value = productData[i].price;
    discount.value = productData[i].discount;
    getTotal();
    category.value = productData[i].category;

    count.style.display = "none";
    clear.style.display = "none";
    submit.innerHTML = "Update";

    mode = "update";
    index = i ;

    scroll({
        top:0 ,
        behavior : "smooth"
    })
    search.value ="";
}


// search 

let searchMode = "title";

function getSearchMode(id){
    let search = document.getElementById("search");
    if(id === "searchTitle"){
        searchMode = "title";
    }
    else{
        searchMode = "category";
    }

    search.placeholder =`search by ${searchMode} `;

    search.focus();
    search.value ="";
    showData();
}


function searchData(data) {
    let table = "";
    for(let i =0 ; i < productData.length ; i++){
        if(searchMode == "title"){

                if(productData[i].title.includes(data.toLowerCase()) ){
                    table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${productData[i].title}</td>
                        <td>${productData[i].price}</td>
                        <td>${productData[i].discount}</td>
                        <td>${productData[i].total}</td>
                        <td>${productData[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                    </tr>
                    `
                }
            

        }
        else{

                if(productData[i].category.includes(data.toLowerCase()) ){
                    table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${productData[i].title}</td>
                        <td>${productData[i].price}</td>
                        <td>${productData[i].discount}</td>
                        <td>${productData[i].total}</td>
                        <td>${productData[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                    </tr>
                    `
                }

        }
    }
    document.getElementById("tbody").innerHTML = table ;

}



