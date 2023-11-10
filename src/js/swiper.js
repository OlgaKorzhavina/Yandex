var similarSwiper = new Swiper(".similar", {
    slidesPerView:3,
    spaceBetween: 11,
    loop: true,
     breakpoints:{
      910: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 11,
       },
       1440:{
       slidesPerView: 3,
       slidesPerGroup: 1,
       spaceBetween: 11,
       }
    },
    });


    var similarSwiper = new Swiper(".topswiper", {
        slidesPerView:6,
        spaceBetween: 17,
        loop: true,
         breakpoints:{
          910: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 17,
           },
           1440:{
           slidesPerView: 6,
           slidesPerGroup: 1,
           spaceBetween: 17,
           }
        },
        });
    