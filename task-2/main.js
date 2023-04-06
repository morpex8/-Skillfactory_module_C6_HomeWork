const btn = document.querySelector('button.btn');


// Размеры экрана
let screenWidth = window.screen.width;
let screenHeight = window.screen.height;
// Область просмотра
let viewWidth = document.documentElement.clientWidth;
let viewHeight = document.documentElement.clientHeight;
// Область просмотра со скроллом
let viewScrollWidth = window.innerWidth;
let viewScrollHeight = window.innerHeight;

btn.addEventListener('click', () => {
    alert(`\t\tРазмеры экрана: ${screenWidth}px, на ${screenHeight}px \n 
           Область просмотра: ${viewWidth}px на ${viewHeight}px, \n
           Область просмотра + скролл: ${viewScrollHeight}px на ${viewScrollHeight}px.
           `);
});