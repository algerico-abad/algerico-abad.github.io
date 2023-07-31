// global nodes
let slideCarousel
let slideControls, btnSlideLeft, btnSlideRight, slidePages
// global variables
let currentFocusedNode
let previousScrollLeft = 0
// instantiate the viewport objects
window.onload = () => {
    // instantiate elements from the slider carousel
    slideCarousel = document.getElementById('slide-carousel')
    // instantiate elements from the slider controls
    slideControls = document.getElementById('slide-controls')
    btnSlideLeft = slideControls.querySelector('#btnSlideLeft')
    btnSlideRight = slideControls.querySelector('#btnSlideRight')
    slidePages = slideControls.querySelector('#pages')
    // remove the sample node of the slide pages
    slidePages.innerHTML = ''
    // populate the slide pages
    for (let i = 0; i < slideCarousel.children.length; i++) {
        let pageNode = document.createElement('div')
        pageNode.className = 'page-btn-inactive'
        slidePages.appendChild(pageNode)
    }
    // make the first children an active page
    slidePages.children[0].className = 'page-btn-active'
    btnSlideLeft.style.pointerEvents = 'none'
    btnSlideLeft.style.opacity = '0.5'
    // insert event listeners
    let updateScroll = false
    slideCarousel.onwheel = () => { updateScroll = true }
    slideCarousel.ontouchmove = () => { updateScroll = true }
    slideCarousel.onscrollend = () => {
        for (let i = 0; i < slideCarousel.children.length; i++) {
            slidePages.children[i].className = 'page-btn-inactive'
            if (isInViewport(slideCarousel.children[i])) {
                slidePages.children[i].className = 'page-btn-active'
                currentFocusedNode = slideCarousel.children[i]
                btnSlideLeft.style.pointerEvents = ''
                btnSlideLeft.style.opacity = ''
                btnSlideRight.style.pointerEvents = ''
                btnSlideRight.style.opacity = ''
                if (currentFocusedNode.previousElementSibling === null) {
                    btnSlideLeft.style.pointerEvents = 'none'
                    btnSlideLeft.style.opacity = '0.5'
                }
                if (currentFocusedNode.nextElementSibling === null) {
                    btnSlideRight.style.pointerEvents = 'none'
                    btnSlideRight.style.opacity = '0.5'
                }
            }
        }
        if (previousScrollLeft < slideCarousel.scrollLeft && updateScroll) {
            console.log('scroll to right...')
            slideCarousel.scroll(currentFocusedNode.nextElementSibling.offsetLeft - 30, 0)
        } else if (previousScrollLeft > slideCarousel.scrollLeft && updateScroll) {
            console.log('scroll to left...')
            slideCarousel.scroll(currentFocusedNode.previousElementSibling.offsetLeft - 30, 0)
        }
        updateScroll = false
        previousScrollLeft = slideCarousel.scrollLeft
    }
    btnSlideLeft.onclick = () => {
        slideCarousel.scroll(currentFocusedNode.previousElementSibling.offsetLeft - 30, 0)
    }
    btnSlideRight.onclick = () => {
        slideCarousel.scroll(currentFocusedNode.nextElementSibling.offsetLeft - 30, 0)
    }
    // set the current focused node in the slider
    currentFocusedNode = slideCarousel.children[0]
    slideCarousel.scroll(currentFocusedNode.offsetLeft - 30, 0)
}
// determine what element is visible on the screen
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.left >= 0 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}