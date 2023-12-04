/*visual_main*/ 

   var swiper = new Swiper(".visual_main_box", {
     spaceBetween: 0,
     centeredSlides: true,
     autoplay: {
     delay: 2500,
     disableOnInteraction: false,
     rewind: true,

     },
     pagination: {
       el: ".swiper-pagination",
       clickable: true,
     },
     navigation: {
       nextEl: ".swiper-button-next",
       prevEl: ".swiper-button-prev",
     },
     
   });

/* top100 */

     var swiper_top100 = new Swiper(".top100_box", {
       rewind: true,
       slideToClickedSlide: true,
       scrollbar: {
         el: ".swiper-scrollbar",
       },
       breakpoints: {
        601: {
        width: 375,
        slidesPerView: 1,
        allowTouchMove: true,
        },
        769: {
          width: 610,
        }
        
       }
     });

   /* period_box */
   $(document).ready(function(){    
   
  $('.post-slider').slick({
  slidesToShow: 1,
  arrows: false,
  fade: true,
  asNavFor: '.post-wrapper',
  autoplay: true,
  autoplaySpeed: 1000,
});
$('.post-wrapper').slick({
  slidesToShow: 2,
  slidesToScroll: 1,
  asNavFor: '.post-slider',
  arrows: false,
  leftMode: true,
  focusOnSelect: true,
});
});

/* aditor_box */
var swiper_aditor = new Swiper(".aditor_box", {
  width: 220,
  rewind: true,
});

/*artist_box*/

   $(document).ready(function(){    
     
   $('.center').slick({
     centerMode: true,
     centerPadding: '60px',
     slidesToShow: 3,
     prevArrow:false,
     nextArrow:false,
     responsive: [
     {
         breakpoint: 768,
         settings: {
           centerMode: true,
           centerPadding: '40px',
           slidesToShow: 3
         }
       },
       {
         breakpoint: 480,
         settings: {
           centerMode: true,
           centerPadding: '80px',
           slidesToShow: 1
         }
       }
     ]
   });
   
   });
   

   
