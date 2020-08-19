import 'swiper/swiper-bundle.css';
import './style.css';

import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);

import { GithubApi } from '../../js/modules/GithubApi';
import { CommitCard } from '../../js/components/CommitCard';
import { CommitCardList } from '../../js/components/CommitCardList';
import * as CONSTANTS from '../../js/constants';
import { getCorrectDateFormat, showErrorMessage } from '../../js/utils';

// Swiper
const swiper = new Swiper('.swiper', {
  loop: true,
  observer: true,
  observeParents: true,

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
    600: {
      slidesPerView: 2,
      spaceBetween: 8,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 16,
      centeredSlides: true,
      initialSlide: 2
    },
  }
});

// Class instances
const githubApi = new GithubApi(CONSTANTS.GITHUB_API_URL, CONSTANTS.COMMITS_NUMBER_LIMIT);
const commitCardList = new CommitCardList(document.querySelector('.swiper__wrapper'));

// Elements
const commitCardTemplate = document.querySelector('#commit-card').content;

githubApi.getCommits()
  .then(data => {
    data.forEach(commit => {
      commitCardList.addCard(new CommitCard(commit, commitCardTemplate, getCorrectDateFormat).create());
    })
  })
  .catch(() => {
    document.querySelector('.github__wrapper').style.display = 'none';
    showErrorMessage();
  })

