// ! ********************* loading page ********************* 
const loader = document.querySelector('.preloader');
window.addEventListener('load', function(){
    loader.style.display = 'none';
})

// ! ********************* CHANGE BACKGROUND HEADER ********************* 
function scrollHeader(){
    const nav = document.querySelector('.navbar')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

// ! ********************* show scroll up *********************
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)