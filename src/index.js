//Contrôle du menu burger

window.addEventListener("DOMContentLoaded", (event) => {
    const navbar = document.querySelector(".home__header-navbar");
    const burger = document.querySelector(".home__header-navbar-burger");

    burger.addEventListener('click', function() {
        if (navbar.style.display === 'none' || navbar.style.display === '') {
            navbar.style.display = 'flex'; 
        } else {
            navbar.style.display = 'none';
        }
    });

//Affichage de la Navbar au dessus de 879px

    const checkNavbarDisplay = () => {
        if (window.innerWidth >= 879) {
            navbar.style.display = 'flex';
        } else {
            navbar.style.display = 'none'; 
        }
    };
    checkNavbarDisplay();
    window.addEventListener('resize', checkNavbarDisplay);
});

(async ()=>
  {
  const
    interval       = 3000  // ms
  , paddingRight   = 50
  , slideContainer = document.querySelector('.home__hero-carousel') 
  , slidesWrapper  = document.querySelector('.home__hero-carousel-slides')
  , slides         = document.querySelectorAll('.home__hero-carousel-slides > li')
  , delay          = ms => new Promise(r => setTimeout(r, ms))
  , movLeft = (el, mov) => new Promise(r =>
    {
    el.ontransitionend =_=>
      {
      el.ontransitionend = null
      el.style.transition = 'none';
      r()
      }
    el.style.transition = '2s';
    el.style.transform  = `translateX(${-mov}px)`;
    });

  let index = 0;

  while (true)
    {
    await delay( interval )
    await movLeft( slidesWrapper, slides[index].clientWidth + paddingRight  )

    slidesWrapper.appendChild( slides[index] )  // mov first slide to the end
    slidesWrapper.style.transform    = `translateX(0)` // rest translateX
    index = ++index % slides.length
    }
  })()