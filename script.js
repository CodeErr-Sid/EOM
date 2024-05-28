// Nav Bar
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('change');
    });
});

// About Section
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
  