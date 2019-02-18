var navBar = document.querySelector('#navigation');
var navBtn = document.querySelector('.nav-btn');
navBtn.addEventListener('click', function () {
    this.classList.toggle('open');
    navBar.classList.toggle('__open');
});