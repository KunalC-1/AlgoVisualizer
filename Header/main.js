var dropdown = document.querySelector(".dropdown");
var dropdown_menu = dropdown.querySelector(".dropdown-menu"); 

var bool = 1;
dropdown.addEventListener('click', function(){
    if (bool){
        dropdown_menu.style.transition = "all 0.5s ease-in-out";
        dropdown_menu.style.height = '123px';
        dropdown.classList.toggle('active');
        bool = false;
        console.log("hello");
   }else {
        dropdown_menu.style.transition = "all 0.5s ease-in-out";
        dropdown_menu.style.height = '0px';
        dropdown.classList.toggle('active');
        bool = true;
   }
});

var li = dropdown_menu.querySelectorAll('li');

li.forEach(item => {
    item.addEventListener('click', event => {
       dropdown.querySelector('span').innerHTML = item.innerText ; 
    });
});
