//Contrôle du menu burger
window.addEventListener("DOMContentLoaded", () => {
    let navbar = document.querySelector(".home__header-navbar");
    let burger = document.querySelector(".home__header-logo-section-burger");

    burger.addEventListener('click', () => {
        navbar.style.display = navbar.style.display === 'none' || navbar.style.display === '' ? 'flex' : 'none';
    });

    const checkNavbarDisplay = () => {
        navbar.style.display = window.innerWidth >= 940 ? 'flex' : 'none';
    };

    checkNavbarDisplay();
    window.addEventListener('resize', checkNavbarDisplay);
});

// Animation du caroussel infinis
(async () => {
    const interval = 3000;
    const paddingRight = 50;
    const slideContainer = document.querySelector('.home__hero-carousel');
    const slidesWrapper = document.querySelector('.home__hero-carousel-slides');
    const slides = document.querySelectorAll('.home__hero-carousel-slides > li');
    const delay = ms => new Promise(r => setTimeout(r, ms));
    const movLeft = (el, mov) => new Promise(r => {
        el.ontransitionend = _ => {
            el.ontransitionend = null;
            el.style.transition = 'none';
            r();
        };
        el.style.transition = '2s';
        el.style.transform = `translateX(${-mov}px)`;
    });

    let index = 0;

    while (true) {
        await delay(interval);
        await movLeft(slidesWrapper, slides[index].offsetWidth + paddingRight);
        slidesWrapper.appendChild(slides[index]);
        slidesWrapper.style.transform = `translateX(0)`;
        index = ++index % slides.length;
    }
})();


// Animation du slider infini d'images :
const carousel = document.querySelector(".home__slider-carousel");

const leftArrow = document.querySelector(".home__slider-left-arrow");
const rightArrow = document.querySelector(".home__slider-right-arrow");
let currentIndex = 0;
let prevIndex;
const images = document.querySelectorAll(".home__slider-carousel-image");
const totalImages = Object.keys(images).length;
let imageWidth;

function updateImageWidth() {
  if (window.innerWidth <= 500) {
    imageWidth = images[0].offsetWidth;
  } else {
    imageWidth = images[0].getBoundingClientRect().width;
  }
}

updateImageWidth();

window.addEventListener('resize', updateImageWidth);

// console.log("getbounding1", images[1].getBoundingClientRect());

leftArrow.addEventListener("click", () => {
  prevIndex = currentIndex;
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  carousel.style.transform = `translateX(-${imageWidth}px)`;
  carousel.insertBefore(images[currentIndex], carousel.firstChild);

  setTimeout(() => {
    carousel.style.transform = "";
    carousel.classList.add("sliding-transition");

  }, 10);

  setTimeout(() => {
    carousel.classList.remove("sliding-transition");
  }, 490);
});

rightArrow.addEventListener("click", () => {
  carousel.classList.add("sliding-transition");

  prevIndex = currentIndex;
  currentIndex = (currentIndex + 1) % totalImages;

  carousel.style.transform = `translateX(-${imageWidth}px)`;


  setTimeout(() => {
    carousel.appendChild(images[prevIndex]);
    carousel.classList.remove("sliding-transition");
    carousel.style.transform = "";
  }, 500);
});


