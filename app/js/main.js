
const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    burger = document.querySelector('._burger'),
    header = document.querySelector('.header');



let thisTarget;
body.addEventListener('click', function (event) {

    thisTarget = event.target;

    // Меню в шапке
    if (thisTarget.closest('._burger')) {
        menu.forEach(elem => {
            elem.classList.toggle('_active')
        })
    }



    let btnToScroll = thisTarget.closest('._btn-to-scroll');
    if(btnToScroll) {
      event.preventDefault();
      let section;
    
      section = document.querySelector(btnToScroll.getAttribute('href'))
    
      menu.forEach(elem => {
        elem.classList.remove('_active')
      })

      if(window.innerWidth > 992) {

        window.scroll({
          left: 0,
          top: (section) ? section.offsetTop : 0,
          behavior: 'smooth'
        })

      } else {

        window.scroll({
          left: 0,
          top: (section) ? section.offsetTop - header.offsetHeight : 0,
          behavior: 'smooth'
        })

      }
    
    }



    let headerLangIntro = thisTarget.closest('.header__lang--intro');
    if(headerLangIntro) {
      
      headerLangIntro.parentElement.classList.toggle('_active');

    } else if(!thisTarget.closest('.header__lang')) {
      if(document.querySelector('.header__lang')) {
        document.querySelector('.header__lang').classList.remove('_active')
      }
    }



    let whatIsVideoPreview = thisTarget.closest('.what-is__video--preview');
    if(whatIsVideoPreview) {

      whatIsVideoPreview.classList.add('_hide');

      let video = whatIsVideoPreview.parentElement.querySelector('.what-is__video--element'),
          videoUrl = video.dataset.url;

      video.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoUrl}?feature=oembed&autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    }



    let cookiesMessageSubmit = thisTarget.closest('.cookies-message__submit');
    if(cookiesMessageSubmit) {
      let cookiesMessage = cookiesMessageSubmit.closest('.cookies-message');
      cookiesMessage.classList.add('_removing');
      localStorage.setItem('DeepWorker-cookies-message', true);
      setTimeout(() => {
        cookiesMessage.remove();
      },300)
    }

})

// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

let reviewsSlider = new Swiper('.reviews__slider--wrapper', {
  
    spaceBetween: 15,
    slidesPerView: 1,

    loop: true,
    
    navigation: {
        nextEl: '.swiper-button-next#reviews-arrow-next',
        prevEl: '.swiper-button-prev#reviews-arrow-prev',
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
      },
    }
});

let charitySlider = new Swiper('.charity__slider--wrapper', {
  
  slidesPerView: 1,

  loop: true,
  
  navigation: {
      nextEl: '.swiper-button-next#charity-arrow-next',
      prevEl: '.swiper-button-prev#charity-arrow-prev',
  },

  breakpoints: {
    1200: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
  }
});

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

wow = new WOW({
mobile:       false,
})
wow.init();

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=


function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
  top: box.top + pageYOffset,
  left: box.left + pageXOffset
  };

}

function scrollPage() {

  const offsetCheckJs = document.querySelector('.offset-check-js');
  let top = [getCoords(offsetCheckJs).top, false];
  
  header.classList.add('_loaded');
  
  function scrollPageFunc() {
    top[0] = getCoords(offsetCheckJs).top;
    
    if(top[0] >= 300 && top[1] == false) {
  
        top[1] = true;
        header.style.setProperty('--opacity', '0');
        
        setTimeout(function() {
          header.classList.add('_active');
          header.style.setProperty('--opacity', '1');
            
        },200);
  
    } else if(top[0] <= 300 && top[1] == true) {
  
        top[1] = false;
        header.style.setProperty('--opacity', '0');
  
        setTimeout(function() {
          header.style.setProperty('--opacity', '1');
          header.classList.remove('_active');

            
        },200);
  
    }
  }
  
  scrollPageFunc();
  
  window.onscroll = scrollPageFunc;
  
}
  
scrollPage();
