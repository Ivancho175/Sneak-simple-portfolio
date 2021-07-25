const navToggle = document.querySelector('.nav-toggle');
const navItems = document.querySelectorAll('.nav__item');

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
})

navItems.forEach(item => {
    item.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})