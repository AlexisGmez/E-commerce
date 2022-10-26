"use strict";


const products = [
    {
    id: 1,
    name: 'Hoodies',
    price: 14.00,
    image: 'assets/images/featured1.png',
    category: 'hoodies',
    quantity: 10
  },
  {
    id: 2,
    name: 'Shirts',
    price: 24.00,
    image: 'assets/images/featured2.png',
    category: 'shirts',
    quantity: 15
  },
  {
    id: 3,
    name: 'Sweatshirts',
    price: 24.00,
    image: 'assets/images/featured3.png',
    category: 'sweatshirts',
    quantity: 20
  }
];
const cartShopping=[];

//cuando recargo la pagina se guardan los cambios
const loadingPage=()=>{

    document.addEventListener("DOMContentLoaded",e=>{

        if (localStorage.getItem("cart")!==null) {    
            const carLocalStorage = JSON.parse(localStorage.getItem("cart"));
            cartShopping.push(...carLocalStorage);    
            addingProductsCartDom();
            countItemsCartDom();
            totalSum();   
        }  
        if (localStorage.getItem("darkmode")==="true") {
            const iconDarkMode = document.querySelector(".bx-moon");
            document.body.classList.add("darkmode");
            iconDarkMode.classList.remove("bx-moon");
            iconDarkMode.classList.add(`${localStorage.getItem("icon")}`);
        }
        addingProductsCartDom();
        
        
    });
}

//aplico el modo obcuro
const darkMode = () =>{

    const iconDarkMode = document.querySelector(".bx-moon");
    const body = document.body;
    
    iconDarkMode.addEventListener("click", e=>{    
        e.preventDefault();
        
        const active = body.classList.toggle("darkmode");
        swtichIcons(body,"darkmode",iconDarkMode,"bx-moon","bx-sun");
        localStorage.setItem("icon",`${iconDarkMode.classList[1]}`);
        localStorage.setItem("darkmode",`${active}`);

    });
}

//aplico el menu fijo
const stickyMenu =()=>{
    const navbar = document.querySelector(".navbar");
    
    window.addEventListener("scroll", (event) => {
        let scrollY = this.scrollY;
        console.log(scrollY);
        scrollY !== 0 ? navbar.classList.add("stickyMenu") : navbar.classList.remove("stickyMenu");
       
    });
}

//deslizo el menu lateral
const dropdownMenu = ()=> {
    const iconMenu = document.querySelector(".bx-grid-alt");
    const iconShopping = document.querySelector(".bx-shopping-bag");
    const menu = document.querySelector(".navbar__menu--index");

    iconMenu.addEventListener("click",e=>{
        e.preventDefault();
        menu.classList.toggle("active");
        iconMenu.style.position="relative";
        iconShopping.style.position="relative";
        swtichIcons(menu,"active",iconMenu,"bx-grid-alt","bx-x");
    });

}

//deslizo el menu del carrito
const dropdownCart =()=>{
    const shoppingcartIcon = document.querySelector(".bx-shopping-bag");
    const shoppingcart = document.querySelector(".main__shoppingCart");
    const closeButton = document.querySelector(".bx-x");
    const cart__count = document.querySelector(".cart__count");

    shoppingcartIcon.addEventListener("click", e=>{
        e.preventDefault();
        shoppingcart.classList.toggle("active");
    });
    closeButton.addEventListener("click",e=>{
        e.preventDefault();
        shoppingcart.classList.toggle("active");
    });
    cart__count.addEventListener("click",e=>{
        e.preventDefault();
        shoppingcart.classList.toggle("active");
    });
    
}

//ingreso los productos al dom dinamicamente
const addingProductsDom =()=>{
    const container = document.querySelector(".main__products");
    products.forEach(element => {
        let html = `<div class="main__product ">
                        <img src="${element.image}" alt="">
                        <div class="product__description">
                            <h3>$${element.price}</h3>
                            <span>Stock: ${element.quantity}</span>
                            <p class="text__color">${element.name}</p>
                            <div class="icon__product"><i data-id=${element.id} class='bx bx-plus'></i></div>
                        </div>
                    </div> `;
        container.innerHTML += html;
    });

}
//manejo los eventos de los clicks para pintar las acciones en el dom
const addingProductsToCartShopping = () =>{
    const buttons = document.querySelectorAll(".icon__product");  
    buttons.forEach(button=>{

        button.addEventListener("click", e=>{
            e.preventDefault();
            addToCartAlgorithm(e);    
            addingProductsCartDom();   
            countItemsCartDom();
            totalSum();
        }); 
    });
}

//// este metodo agrega, quita y elimina totalmente elementos del carrito
const cartActionsButton = ()=>{
    const container = document.querySelector(".main__shoppingCart");
    container.addEventListener("click", e=>{
        const buttonClicked = e.target.getAttribute("data-id");
        const validar = cartShopping.filter(item=>item.id==buttonClicked);
        if (e.target.classList[1] === "bx-plus") validar[0].addCount = validar[0].addCount+1;
        if (e.target.classList[1] === "bx-minus") validar[0].addCount = validar[0].addCount-1;
        if (e.target.classList[1] === "bx-trash") validar[0].addCount = 0;
        addingProductsCartDom();   
        countItemsCartDom();   
        totalSum();
        localStorage.setItem("cart",JSON.stringify(cartShopping));
    });
}
//funcion para agregar los articulos al dom y esta funcion se llama dentro de addingProductsToCartShopping
const addingProductsCartDom =(e)=>{

    const add__container = document.querySelector(".added__elements");
    let cant = getCountItems();

    if (cartShopping.length===0 || cant===0) {
        localStorage.removeItem('cart');
        add__container.innerHTML = `<div class="added__elements--empty">
                                        <img src="assets/images/empty-cart.png" alt="empty cart">
                                        <h2>Your cart is empty</h2>
                                        <p>You can add items to your cart by clicking on the + button on the product page.</p>
                                    </div> `;
        
    }else{
        add__container.innerHTML = ""; 
        cartShopping.forEach((item)=>{     
            
            if (item.addCount!==0) {
                let html = `<div class="added__element">
                            <div class="cart__image">
                                <img src="${item.image}" alt="">
                            </div>
                            <div class="cart__content">
                                <h4>${item.name}</h4>
                                <p>Stock: ${item.quantity} | <span>${item.price}</span></p>
                                <h5><span>Subtotal: ${item.addCount*item.price}</span></h5>
                                <div class="cart__buttons">
                                    <div class="cart__button--add">
                                        <div><i data-id=${item.id}  class='bx bx-minus'></i></div>
                                        <div><p class="text__color">${item.addCount} units</p></div>
                                        <div><i data-id=${item.id} class='bx bx-plus'></i></div>
                                    </div>
                                    <div class="cart__button--delete">
                                        <span><i data-id=${item.id} class='bx bx-trash' ></i></span>
                                    </div>
    
                                </div>
                            </div>
                        </div>`;
                add__container.innerHTML+=html;
            }
            
        });
    }
}
//Pinto la notificacion de la cantidad de productos agregados
const countItemsCartDom =()=>{
    const count = document.querySelector(".cart__count");
    
    count.innerHTML = getCountItems();   
}

// suma total del pago y los items 
const totalSum = () =>{
    
    const totalItems=document.querySelector(".total__sum--items");
    const totalSum=document.querySelector(".total__sum--price");

    let cont = 0;
    cartShopping.forEach(item => {
        cont += item.addCount*item.price;
    });
    totalSum.innerHTML = `$${cont}.00`;
    totalItems.innerHTML = `items: ${getCountItems()}`;
    
    
}
//algoritmo para calcular la cantidad de elementos agregados al carrito
const getCountItems = () =>{
    let totalItems = 0;
    cartShopping.forEach(item => {
        totalItems += item.addCount;
    });
    return totalItems;
}
//Algoritmo para agregar elementos al array cartShopping y al local storage
const addToCartAlgorithm = (e)=>{
    const producto = products.filter(item=>item.id===parseInt(e.target.getAttribute("data-id")));
    if (cartShopping.length===0) {           
        cartShopping.push({
            id: producto[0].id,
            name: producto[0].name,
            price: producto[0].price,
            image: producto[0].image,
            category: producto[0].category,
            quantity: producto[0].quantity,
            addCount:1
        }); 
        localStorage.setItem("cart",JSON.stringify(cartShopping));
        
    }else{
        const validation = cartShopping.filter(item => item.id === producto[0].id);
        
        if (validation.length===0) {
            cartShopping.push({
                id: producto[0].id,
                name: producto[0].name,
                price: producto[0].price,
                image: producto[0].image,
                category: producto[0].category,
                quantity: producto[0].quantity,
                addCount:1
            }); 
            localStorage.setItem("cart",JSON.stringify(cartShopping));
        }else{
            validation[0].addCount = validation[0].addCount+1;
            localStorage.setItem("cart",JSON.stringify(cartShopping));
        }
             
    } 
}
//funcion para cambiar el icono al dar un click
const swtichIcons =(element,classToEvaluate,icon,iconClassOne,iconClassTwo)=>{

    if (element.classList.contains(`${classToEvaluate}`)){
        icon.classList.remove(`${iconClassOne}`);
        icon.classList.add(`${iconClassTwo}`);
    }else{
        icon.classList.remove(`${iconClassTwo}`);
        icon.classList.add(`${iconClassOne}`);
    }
}


//funcion para saber la posicion en la que estoy en el dom y ubicarla en el navbar
const navPosition =()=>{

    const entries = document.querySelectorAll(".observer");
    const home = document.querySelector(".nav__home");
    const products = document.querySelector(".nav__products");

    const ob = new IntersectionObserver(entries =>{    
        if(entries[0].intersectionRatio>0.5){
            home.classList.toggle("focus");
        }else{
            home.classList.toggle("focus");
            products.classList.toggle("focus");
        }
    });
    entries.forEach(item =>ob.observe(item));
}

loadingPage();
stickyMenu();
darkMode();
dropdownMenu();
dropdownCart();
navPosition();
addingProductsDom();
addingProductsToCartShopping();
cartActionsButton();

