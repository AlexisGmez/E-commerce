"use strict";

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
        shoppingcart.classList.toggle("active");
    });
    
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