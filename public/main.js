// ! ********************* loading page ********************* 
const loader = document.querySelector('.preloader');
window.addEventListener('load', () => {
    loader.style.display = 'none';
})

// ! ********************* CHANGE BACKGROUND HEADER ********************* 
const  scrollHeader = () => {
    const nav = document.querySelector('.navbar')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

// ! ********************* show scroll up *********************
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

// ! ********************* show menu *********************
const show = document.querySelector('#show')
const showMenu = () => {
    const menu = document.querySelector('.navbar-menu')
    menu.classList.add('show-menu')
}
show.addEventListener('click', showMenu)

// ! ********************* close menu *********************
const close = document.querySelector('#close')
const closeMenu = () => {
    const menu = document.querySelector('.navbar-menu')
    menu.classList.remove('show-menu')
}
close.addEventListener('click', closeMenu)
