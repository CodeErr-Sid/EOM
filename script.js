// cursor integraitons


// JavaScript code for cursor interaction
const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('.hoverable');


document.body.addEventListener('mousemove', onMouseMove);

for (let i = 0; i < $hoverables.length; i++) {
    $hoverables[i].addEventListener('mouseenter', onMouseHover);
    $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

function onMouseMove(e) {
    const offsetX = e.clientX; // Get the cursor position relative to the window
    const offsetY = e.clientY;

    updateCursorPosition(offsetX, offsetY); // Update cursor position

    // Check if the cursor is within any section or footer
   
}

function updateCursorPosition(x, y) {
    TweenMax.to($bigBall, .4, {
        x: x - 15,
        y: y - 15
    });
    TweenMax.to($smallBall, .1, {
        x: x - 5,
        y: y - 7
    });
}

function onMouseHover() {
    TweenMax.to($bigBall, .3, {
        scale: 4
    });
}

function onMouseHoverOut() {
    TweenMax.to($bigBall, .3, {
        scale: 1
    });
}

// smooth scrolling

document.querySelectorAll('#navlinks li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Nav Bar
const navlinks = document.querySelector("#nav-links");

navlinks.querySelectorAll('li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            scrollToElement(targetElement);
        }
    });
});

function scrollToElement(element) {
    const targetPosition = element.getBoundingClientRect().top - document.querySelector('nav').offsetHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition;
    const duration = 1000; // Duration in milliseconds (1000ms = 1s)
    let start = null;

    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const progressPercent = Math.min(progress / duration, 1);
        window.scrollTo(0, startPosition + distance * easeInOutQuad(progressPercent));

        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    });
}

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
// About us section

document.addEventListener('DOMContentLoaded', function () {
    const aboutSection = document.querySelector('.about-section');
    const textContent = document.querySelector('.text-content');
    const imageContent = document.querySelector('.image-content');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                textContent.classList.add('animate');
                imageContent.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(aboutSection);
});



// navscrolled 

const navbar = document.querySelector('.navbar');

function handleScroll() {
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// About Section
document.addEventListener('DOMContentLoaded', function () {
    const aboutSection = document.querySelector('.about-section');
    const textContent = document.querySelector('.text-content');
    const imageContent = document.querySelector('.image-content');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                textContent.classList.add('animate');
                imageContent.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(aboutSection);
});


//   testimonials animations

// vars
'use strict'
var testim = document.getElementById("testim"),
    testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
    touchStartPos,
    touchEndPos,
    touchPosDiff,
    ignoreTouch = 30;
;

window.onload = function () {

    // Testimonials Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length - 1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;

        clearTimeout(testimTimer);
        testimTimer = setTimeout(function () {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function () {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function () {
        playSlide(currentSlide += 1);
    })

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function () {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function (e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })

    testim.addEventListener("touchstart", function (e) {
        touchStartPos = e.changedTouches[0].clientX;
    })

    testim.addEventListener("touchend", function (e) {
        touchEndPos = e.changedTouches[0].clientX;

        touchPosDiff = touchStartPos - touchEndPos;

        console.log(touchPosDiff);
        console.log(touchStartPos);
        console.log(touchEndPos);


        if (touchPosDiff > 0 + ignoreTouch) {
            testimLeftArrow.click();
        } else if (touchPosDiff < 0 - ignoreTouch) {
            testimRightArrow.click();
        } else {
            return;
        }

    })
}

// gallery

import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'


var swiper = new Swiper(`[unique-script-id="w-w-dm-id"] .mySwiper`, {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: `[unique-script-id="w-w-dm-id"] .swiper-pagination`,
        clickable: true,
    },
    breakpoints: {
        200: {
            slidesPerView: 1
        },
        501: {
            slidesPerView: 1.5
        },
        769: {
            slidesPerView: 2.5,
            spaceBetween: 10
        },
        1025: {
            slidesPerView: 3,
            spaceBetween: 20
        },
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: `[unique-script-id="w-w-dm-id"] .swiper-button-next`,
        prevEl: `[unique-script-id="w-w-dm-id"] .swiper-button-prev`,
    },
    loop: true,
});
