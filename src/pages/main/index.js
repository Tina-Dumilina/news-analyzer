import "./style.css";
import { NewsApi } from '../../js/modules/NewsApi';
import { DataStorage } from '../../js/modules/DataStorage';
import { NewsCard } from '../../js/components/NewsCard';
import { NewsCardList } from '../../js/components/NewsCardList';
import * as CONSTANTS from '../../js/constants';
import { renderLoadingState, showErrorMessage, renderNotFoundState, hidePreloaderElement, getCorrectDateFormat } from '../../js/utils';

// Class instances
const newsApi = new NewsApi ({
  baseUrl: CONSTANTS.NEWS_API_URL,
  apiKey: CONSTANTS.NEWS_API_KEY,
});
const dataStorage = new DataStorage();
const newsCardList = new NewsCardList(document.querySelector('.results__list'));

// Elements
const searchFormElement = document.querySelector('.intro__search');
const newsCardTemplate = document.querySelector('#news-card').content;
const analyticsLinkElement = document.querySelector('.results__analytics-link');
const resultsButtonElement = document.querySelector('.results__button');

let counter = 0;

// Functions
const showNewsCards = () => {
  const articles = dataStorage.getResults().articles;
  articles.splice(counter, CONSTANTS.CARDS_TO_RENDER).forEach(article => {
    newsCardList.addCard(new NewsCard(article, newsCardTemplate, getCorrectDateFormat).create());
  });

  if (counter >= articles.length) {
    resultsButtonElement.style.display = 'none';
  }
  counter += CONSTANTS.CARDS_TO_RENDER;
};

const searchNews = (e) => {
  e.preventDefault();
  counter = 0;
  renderLoadingState(newsCardList, dataStorage, resultsButtonElement);

  const today = new Date();
  const fromDay = new Date(today.getTime() - 7);
  const value = searchFormElement.querySelector('.intro__input').value;

  newsApi.getNews(value, fromDay, today)
    .then(data => {
      if (data.totalResults > 0) {
        dataStorage.saveResults(value, data);
        showNewsCards();
        analyticsLinkElement.style.display = 'inline-block';

        if (data.totalResults > CONSTANTS.CARDS_TO_RENDER) {
          resultsButtonElement.style.display = 'block';
        }
      } else {
        renderNotFoundState();
      }
    })
    .catch(() => showErrorMessage())
    .finally(() => hidePreloaderElement());
};

// Event listeners
searchFormElement.addEventListener('submit', searchNews);
resultsButtonElement.addEventListener('click', showNewsCards);