
const btn = document.querySelector('.btn');
const btnIcon = document.querySelector('.btn-icon');
const icon1 = document.querySelector('.icon1');
const icon2 = document.querySelector('.icon2');

btn.addEventListener('click', () => {
    btnIcon.classList.toggle('clicked');
    if (btnIcon.classList.contains('clicked')) {
        icon1.classList.remove('active');
        icon2.classList.add('active');
    } else {
        icon2.classList.remove('active');
        icon1.classList.add('active');
    }
});
