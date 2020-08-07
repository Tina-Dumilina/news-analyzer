import 'swiper/swiper-bundle.css';
import './style.css';

import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);

const swiper = new Swiper('.swiper', {
  loop: true,

  slideClass: 'swiper__slide',
  slideNextClass: 'swiper__slide_next',	
  slidePrevClass: 'swiper__slide_prev',
  slideActiveClass: 'swiper__slide_active',
  wrapperClass: 'swiper__wrapper',

  pagination: {
    el: '.swiper__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'swiper__bullet',
    bulletActiveClass: 'swiper__bullet_active'
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 8,
      centeredSlides: false,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 8,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 16,
      centeredSlides: true,
    },
  }
});