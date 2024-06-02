// cursor integraitons
function customCursor(options) {
    let settings = $.extend({
        targetClass: 'custom-cursor', // create element with this class
        wrapper: $('body'), // jQuery
        speed: .1,
        movingDelay: 300, // fire event onStop after delay
        hasHover: false, // has hover events
        hoverTarget: $('a[href], button'),
        touchDevices: false, // show on touch devices
        onMove: function (data) {
        }
    }, options),
        data = {},
        checkTouch = !settings.touchDevices && "undefined" !== typeof document.documentElement.ontouchstart,
        timer = null;

    // exit
    if (checkTouch || !settings.wrapper.length) return;

    // append the ball
    settings.wrapper.append(`<div class="${settings.targetClass}"></div>`);

    let $cursor = $('.' + settings.targetClass),
        position = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        mouse = { x: position.x, y: position.y },
        setX = gsap.quickSetter($cursor, "x", "px"),
        setY = gsap.quickSetter($cursor, "y", "px");

    // update data
    data.cursor = $cursor;

    // on mouse move
    window.addEventListener("mousemove", init);

    function init() {
        // remove default mousemove event
        window.removeEventListener("mousemove", init);

        // add new custom event
        window.addEventListener("mousemove", e => {
            mouse.x = e.x;
            mouse.y = e.y;

            // update data and trigger event
            data.isMoving = true;
            settings.onMove(data);

            timer = setTimeout(function () {
                // update data and trigger event
                data.isMoving = false;
                settings.onMove(data);
            }, settings.movingDelay);
        });

        // fade out cursor
        document.addEventListener("mouseleave", e => {
            // update data and trigger event
            data.isInViewport = false;
            settings.onMove(data);
        });

        // update cursor's position
        document.addEventListener("mouseenter", e => {
            mouse.x = position.x = e.x;
            mouse.y = position.y = e.y;

            // update data and trigger event
            data.isInViewport = true;
            settings.onMove(data);
        });

        gsap.ticker.add((time, deltaTime) => {
            let fpms = 60 / 1000,
                delta = deltaTime * fpms,
                dt = 1 - Math.pow(1 - settings.speed, delta);
            position.x += (mouse.x - position.x) * dt;
            position.y += (mouse.y - position.y) * dt;
            setX(position.x);
            setY(position.y);
        });

        data.isInViewport = true;
    }

    // on hover
    if (settings.hasHover && settings.hoverTarget.length) {
        setTimeout(function () {
            settings.hoverTarget.hover(function () {
                data.hoverTarget = $(this);
                data.isHover = true;
                settings.onMove(data);
            }, function () {
                data.hoverTarget = $(this);
                data.isHover = false;
                settings.onMove(data);
            });
        }, 100);
    }
}

// big ball
customCursor({
    hasHover: true,
    onMove: function (data) {
        if (data.isInViewport) {
            // in viewport
            if (data.isMoving) {
                if (data.isHover) {
                    gsap.to(data.cursor, { opacity: 1, scale: 1.5 });
                } else {
                    gsap.to(data.cursor, { opacity: .5, scale: .8 });
                }
            } else {
                if (data.isHover) {
                    gsap.to(data.cursor, { opacity: 1, scale: 1.5 });
                } else {
                    gsap.to(data.cursor, { opacity: .5, scale: 1 });
                }
            }
        } else {
            // out viewport
            gsap.to(data.cursor, { opacity: 0, scale: 0 });
        }
    },
});

// dot inside
customCursor({
    targetClass: 'custom-cursor-dot',
    speed: .5,
    onMove: function (data) {
        if (data.isInViewport) {
            gsap.to(data.cursor, { opacity: 1 });
        } else {
            gsap.to(data.cursor, { opacity: 0 });
        }
    },
});

// preloaing page

document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.querySelector('.pl-preloader');
    const words = document.querySelectorAll('.pl-word');
    const logo = document.querySelector('.pl-logo');
    const content = document.getElementById('eom-content');

    // When the last word has finished fading in, fade them all out together
    words[words.length - 1].addEventListener('animationend', () => {
        words.forEach(word => {
            word.style.animation = 'fadeOut 1s ease-in-out forwards';
        });

        // Start the logo animation after words have faded out
        setTimeout(() => {
            logo.style.display = "block";
            logo.style.animationPlayState = 'running';
        }, 1000); // Delay to start logo animation
    });

    // Hide preloader and show content after logo animation
    logo.addEventListener('animationend', () => {
        preloader.style.display = 'none';
        content.style.display = 'block';
        document.body.style.overflow = 'auto';
    });
});

// hamburger-menu
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('change');
    });
});


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
    // About Us Section
    const aboutSection = document.querySelector('.about-section');
    const textContent = document.querySelector('.text-content');
    const imageContent = document.querySelector('.image-content');

    // Mentors Section
    const mentorsSection = document.querySelector("#our-mentors-2");
    const mentorHeading = mentorsSection.querySelector("#primary-heading-w");
    const mentorContent = mentorsSection.querySelector(".om-2-container");

    // Our Partners Section
    const partnersSection = document.querySelector("#our-partners");
    const partnersHeading = partnersSection.querySelector("#primary-heading-b");
    const partnersContent = partnersSection.querySelectorAll(".op-box");

    // Gallery Sections

    const gallerySection = document.querySelector("#gallery");
    const galleryHeading = gallerySection.querySelector("#primary-heading-b")
    const galleryContent = gallerySection.querySelector(".swiper-container")

    // testimonials
    const testimSection = document.querySelector("#testimonials");
    const testimHeading = document.querySelector(".testim-heading")
    const testimContent = testimSection.querySelector(".testim")

    // Intersection Observer Options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Intersection Observer Callback
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === aboutSection) {
                    textContent.classList.add('animate');
                    imageContent.classList.add('animate');
                } else if (entry.target === mentorsSection) {
                    mentorHeading.classList.add('animate');
                    mentorContent.classList.add('animate');
                } else if (entry.target === partnersSection) {
                    partnersHeading.classList.add('animate');
                    partnersContent.forEach(item => item.classList.add('animate'));
                } else if (entry.target === gallerySection) {
                    galleryHeading.classList.add('animate');
                    galleryContent.classList.add('animate');
                } else if (entry.target === testimSection) {
                    testimHeading.classList.add('animate');
                    testimContent.classList.add('animate');
                }
                observer.unobserve(entry.target);
            }
        });
    };

    // Create Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe About Us Section
    observer.observe(aboutSection);

    // Observe Mentors Section
    observer.observe(mentorsSection);

    // Observe Our Partners Section
    observer.observe(partnersSection);

    // Observe Our Gallery Section
    observer.observe(gallerySection);

    // Observe Our Testimonials Section
    observer.observe(testimSection);
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


document.getElementById('image-stack').addEventListener('click', function () {
    const topImage = document.getElementById('image1');
    const bottomImage = document.getElementById('image2');

    if (topImage.classList.contains('image-top')) {
        topImage.classList.remove('image-top');
        topImage.classList.add('image-bottom');
        bottomImage.classList.remove('image-bottom');
        bottomImage.classList.add('image-top');
    } else {
        topImage.classList.remove('image-bottom');
        topImage.classList.add('image-top');
        bottomImage.classList.remove('image-top');
        bottomImage.classList.add('image-bottom');
    }
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
