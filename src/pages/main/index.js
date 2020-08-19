import "./style.css";
import { NewsApi } from '../../js/modules/NewsApi';
import { DataStorage } from '../../js/modules/DataStorage';
import { NewsCard } from '../../js/components/NewsCard';
import { NewsCardList } from '../../js/components/NewsCardList';
import * as CONSTANTS from '../../js/constants';
import { renderLoadingState, showErrorMessage, renderNotFoundState, hidePreloaderElement, getCorrectDateFormat } from '../../js/utils';
import { SearchInput } from '../../js/components/SearchInput';
import { BaseComponent } from '../../js/components/BaseComponent';

const serverUrl = NODE_ENV === 'development' ? 'https://newsapi.org/v2/everything' : CONSTANTS.NEWS_API_URL;

// Class instances
const newsApi = new NewsApi ({
  baseUrl: serverUrl,
  apiKey: CONSTANTS.NEWS_API_KEY,
});
const dataStorage = new DataStorage();
const newsCardList = new NewsCardList(document.querySelector('.results__list'));

// Elements
const searchFormElement = document.querySelector('.intro__search');
const newsCardTemplate = document.querySelector('#news-card').content;
const analyticsLinkElement = document.querySelector('.results__analytics-link');
const resultsButtonElement = document.querySelector('.results__button');
const resultsSectionElement = document.querySelector('.results');

let counter = 0;

// Functions
const getNewsApiDateFormat = date => date.toISOString().split('T')[0];

const showNewsCards = () => {
  const articles = dataStorage.getResults(localStorage.currentKey).articles;
  articles.splice(counter, CONSTANTS.CARDS_TO_RENDER).forEach(article => {
    newsCardList.addCard(new NewsCard(article, newsCardTemplate, getCorrectDateFormat).create());
  });

  if (counter >= articles.length) {
    resultsButtonElement.style.display = 'none';
  } else {
    resultsButtonElement.style.display = 'block';
  }
  counter += CONSTANTS.CARDS_TO_RENDER;
};

const searchNews = (e) => {
  e.preventDefault();
  counter = 0;
  resultsSectionElement.style.display = 'block';
  renderLoadingState(newsCardList, resultsButtonElement);

  const value = searchFormElement.querySelector('.intro__input').value;
  const config = {
    from: getNewsApiDateFormat(CONSTANTS.WEEK_AGO),
    to: getNewsApiDateFormat(new Date()),
    query: value,
    limit: CONSTANTS.PAGE_SIZE_LIMIT,
  };

  newsApi.getNews(config)
    .then(data => {
      dataStorage.clear();
      if (data.totalResults > 0) {
        localStorage.currentKey = value;
        dataStorage.saveResults(value, data);
        analyticsLinkElement.style.display = 'inline-block';
        showNewsCards();
      } else {
        renderNotFoundState();
      }
    })
    .catch(() => showErrorMessage())
    .finally(() => hidePreloaderElement());
};

const getInitialState = () => {
  if (localStorage.currentKey) {
    resultsSectionElement.style.display = 'block';
    analyticsLinkElement.style.display = 'inline-block';
    document.querySelector('.intro__input').defaultValue = localStorage.currentKey;
    showNewsCards();
  }
};

const checkInputValidity = () => {

};

const resultsButton = new BaseComponent([{
  element: resultsButtonElement,
  event: 'click',
  callback: showNewsCards,
}]);
resultsButton.setHandlers();

const searchInput = new SearchInput([
  {
    element: searchFormElement,
    event: 'submit',
    callback: searchNews,
  },
  {
    element: searchFormElement,
    event: 'input',
    callback: checkInputValidity,
  }
]);
searchInput.setHandlers();

window.onload = getInitialState();