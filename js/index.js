//import menu and translation
import i18Obj from './translate.js';
import './menu.js';
import './themes.js'; 

// Portfolio
const portfolioBtnContainer = document.querySelector(".portfolio__buttons");
const portfolioBtns = document.querySelectorAll(".portfolio__button");
const portfolioBtn = document.querySelector(".portfolio__button");
const portfolioImages = document.querySelectorAll(".portfolio__image img");
const seasons = ['winter', 'spring', 'summer', 'autumn'];



// Portfolio images handler

const handleButtonClass = () => {
   portfolioBtnContainer.addEventListener("click", (e) => {
      
      if (e.target.classList.contains("portfolio__button")) {
         let buttonActive = e.target;
         const season = buttonActive.dataset.season;
         removeClassActive();
         addClassActive(buttonActive);
         changeImage(season);
      }
      
   })
}
   
const changeImage = (season) => {
      portfolioImages.forEach((img, index) => img.src = `./assets/img/${season}/${index + 1}.jpg`);
}

const removeClassActive = () => {
   portfolioBtns.forEach(btn => {
       btn.classList.remove("button-active");
   })
}

const addClassActive = (buttonActive) => {
   buttonActive.classList.add("button-active");
}

handleButtonClass();

function preloadImages() {
   seasons.forEach(season => {
      for(let i = 1; i <= 6; i++) {
         const img = new Image();
         img.src = `./assets/img/${season}/${i}.jpg`;
       }
   })
   
 }
 preloadImages();

//translation
const langSwitcher = document.querySelector(".lang-list");
const langLinks = document.querySelectorAll(".lang-link");
const itemsToTranslate = document.querySelectorAll('[data-i18n]');
let siteLang = "en";


const changeCurrentLang = () => {
   langSwitcher.addEventListener("click", (e) => {
      if(e.target.classList.contains("lang-link")) {
         const activeLink = e.target;
         removeLangActive();
         addLangActive(activeLink);
         if(activeLink.classList.contains("lang-en")) {
            getTranslate("en");
         } else if (activeLink.classList.contains("lang-ru")) {
            getTranslate("ru");
         }
      }
   })
}

const getTranslate = (lang) => {
   itemsToTranslate.forEach(item => {
      item.textContent = i18Obj[lang][item.dataset.i18n];
      if (item.placeholder) { 
         item.value = ''; 
         item.placeholder = i18Obj[lang][item.dataset.i18n];
      }
      localStorage.setItem('siteLang', lang);
      siteLang = lang;

   })
}

const removeLangActive = () =>
langLinks.forEach(btn => {
   btn.classList.remove("active-link")
})
 const addLangActive = (activeLink) => {
    activeLink.classList.add("active-link");
 }

changeCurrentLang();
// Buttons 
var animateButton = function(e) {

   e.preventDefault;
   //reset animation
   e.target.classList.remove('animate');
   
   e.target.classList.add('animate');
   setTimeout(function(){
     e.target.classList.remove('animate');
   },700);
 };
 
 var bubblyButtons = document.getElementsByClassName("bubbly-button");
 
 for (var i = 0; i < bubblyButtons.length; i++) {
   bubblyButtons[i].addEventListener('click', animateButton, false);
 }

// Local storage

function setLocalLangStorage() {
   localStorage.setItem('siteLang', lang);
 }
 window.addEventListener('beforeunload', setLocalLangStorage);

 function getLocalLangStorage() {
   if(localStorage.getItem('siteLang')) {
     const lang = localStorage.getItem('siteLang');
     getTranslate(lang);
   }
 }
 window.addEventListener('load', getLocalLangStorage);

 console.log("Отметка - 85 баллов.\nОтзыв по пунктам ТЗ:\nВсе пункты выполнены полностью!");