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

const darkMode = () =>{

    const iconDarkMode = document.querySelector(".bx-moon");
    const body = document.body;
    
    iconDarkMode.addEventListener("click", e=>{    
        body.classList.toggle("darkmode");
        swtichIcons(body,"darkmode",iconDarkMode,"bx-moon","bx-sun");
    })
}
const stickyMenu =()=>{
    const navbar = document.querySelector(".navbar");
    
    window.addEventListener("scroll", (event) => {
        let scrollY = this.scrollY;
        console.log(scrollY);
        scrollY !== 0 ? navbar.classList.add("stickyMenu") : navbar.classList.remove("stickyMenu");
       
    });
}
const dropdownMenu = ()=> {
    const iconMenu = document.querySelector(".bx-grid-alt");
    const iconShopping = document.querySelector(".bx-shopping-bag");
    const menu = document.querySelector(".navbar__menu--index");

    iconMenu.addEventListener("click",e=>{
        menu.classList.toggle("active");
        iconMenu.style.position="relative";
        iconShopping.style.position="relative";
        swtichIcons(menu,"active",iconMenu,"bx-grid-alt","bx-x");
    });

}
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

//pendiente
const addingProductsToLocalStorage = () =>{
    const buttons = document.querySelectorAll(".icon__product");  
    buttons.forEach(button=>{
        button.addEventListener("click", e=>{
            e.preventDefault();
            cartShopping.push(products.filter(item=>item.id===parseInt(e.target.getAttribute("data-id"))));  
            
        }); 
    });
}
//pendiente
const addingProductsCartDom =()=>{
    const add__container = document.querySelector(".added__elements");
    if (!cartShopping.length) {
        add__container.innerHTML = `<div class="added__elements--empty">
                                        <img src="assets/images/empty-cart.png" alt="empty cart">
                                        <h2>Your cart is empty</h2>
                                        <p>You can add items to your cart by clicking on the + button on the product page.</p>
                                    </div> `;
    }else{
        // cartShopping.forEach(item=>{        
        //     let html = `<div class="added__element">
        //                     <div class="cart__image">
        //                         <img src="${item[0].image}" alt="">
        //                     </div>
        //                     <div class="cart__content">
        //                         <h4>${item[0].name}</h4>
        //                         <p>Stock: ${item[0].quantity} | <span>${item[0].price}</span></p>
        //                         <h5><span>Subtotal: 120.00</span></h5>
        //                         <div class="cart__buttons">
        //                             <div class="cart__button--add">
        //                                 <div><i class='bx bx-minus'></i></div>
        //                                 <div><p class="text__color">4 units</p></div>
        //                                 <div><i class='bx bx-plus'></i></div>
        //                             </div>
        //                             <div class="cart__button--delete">
        //                                 <span><i class='bx bx-trash' ></i></span>
        //                             </div>
    
        //                         </div>
        //                     </div>
        //                 </div>`;
        //     add__container.innerHTML+=html;
        // });
    }
    
}
//pendiente
const countItemsCart =()=>{
    const count = document.querySelector(".cart__count");
    
}

const swtichIcons =(element,classToEvaluate,icon,iconClassOne,iconClassTwo)=>{

    if (element.classList.contains(`${classToEvaluate}`)){
        icon.classList.remove(`${iconClassOne}`);
        icon.classList.add(`${iconClassTwo}`);
    }else{
        icon.classList.remove(`${iconClassTwo}`);
        icon.classList.add(`${iconClassOne}`);
    }
}

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

stickyMenu();
darkMode();
dropdownMenu();
dropdownCart();
navPosition();
addingProductsDom();
addingProductsCartDom();

