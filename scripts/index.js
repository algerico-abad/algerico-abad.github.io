// global nodes
let slideCarousel
let slideControls, btnSlideLeft, btnSlideRight, slidePages
let btnMobileNav
let viewport
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
    // instantiate elements from the header
    viewport = document.getElementsByTagName('body')[0]
    btnMobileNav = document.getElementById('btnMobileNav')
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
    btnMobileNav.onclick = () => { displayMobileNav() }
    // set the current focused node in the slider
    currentFocusedNode = slideCarousel.children[0]
    slideCarousel.scroll(currentFocusedNode.offsetLeft - 30, 0)
}
// determine what element is visible on the screen
function isInViewport (element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.left >= 0 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
// show the mobile navigation
function displayMobileNav () {
    // initialize the elements
    let heading1 = document.createElement('h2')
    let btnIcon = document.createElement('div')
    let link1 = document.createElement('a')
    let link2 = document.createElement('a')
    let link3 = document.createElement('a')
    let link4 = document.createElement('a')
    let row = document.createElement('div')
    let column = document.createElement('div')
    let background = document.createElement('div')
    // update the class or id names
    row.className = 'row'
    column.className = 'column'
    btnIcon.className = 'btn-icon'
    background.id = 'mobile-navigation'
    // update the node contents
    heading1.textContent = 'Navigation'
    btnIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>`
    link1.textContent = 'Experience'
    link1.href = '#section-experiences'
    link2.textContent = 'Skills & Me'
    link2.href = '#section-skills'
    link3.textContent = 'Works'
    link3.href = '#section-works'
    link4.textContent = 'Contact'
    link4.href = '#section-contact'
    // set event listeners
    btnIcon.onclick = () => { background.remove() }
    link1.onclick = () => { background.remove() }
    link2.onclick = () => { background.remove() }
    link3.onclick = () => { background.remove() }
    link4.onclick = () => { background.remove() }
    // append the childrens
    row.appendChild(heading1)
    row.appendChild(btnIcon)
    column.appendChild(link1)
    column.appendChild(link2)
    column.appendChild(link3)
    column.appendChild(link4)
    background.appendChild(row)
    background.appendChild(column)
    viewport.appendChild(background)
    console.log(viewport)
}