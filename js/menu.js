const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".header__nav");
const navLinks = document.querySelectorAll("nav-link");
const body = document.querySelector("body");

function toggleMenu() {
   hamburger.classList.toggle("menu-active");
   nav.classList.toggle("nav-active");
   body.classList.toggle("body-active");
}

function closeMenu(e) {
   if(e.target.classList.contains("nav-link")) {
      nav.classList.remove("nav-active");
      body.classList.remove("body-active");
      hamburger.classList.remove("menu-active");
   }
}

hamburger.addEventListener('click', toggleMenu);
nav.addEventListener('click', closeMenu);