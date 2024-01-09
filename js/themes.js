const themeSwitcher = document.querySelector(".switcher-icon");
const element = document.documentElement;
let siteTheme = 'dark';


function changeSiteTheme() {
  
   themeSwitcher.addEventListener("click", (e) => {

      if (siteTheme === 'dark') {
         setTheme("light");
         siteTheme = "light";
      } else {
         setTheme("dark");
         siteTheme = "dark";
      }
   })
}
function setTheme(theme) {
   element.setAttribute('data-theme', theme);
   localStorage.setItem('siteTheme', theme);
}

changeSiteTheme();

function setLocalThemeStorage() {
   localStorage.setItem('siteTheme', theme);
 }
 window.addEventListener('beforeunload', setLocalThemeStorage);

 function getLocalThemeStorage() {
   if(localStorage.getItem('siteTheme')) {
     const theme = localStorage.getItem('siteTheme');
     setTheme(theme);
   }
 }
 window.addEventListener('load', getLocalThemeStorage);