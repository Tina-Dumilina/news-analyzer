const notFoundElement = document.querySelector('.not-found');
const notFoundTitleElement = document.querySelector('.not-found__heading');
const notFoundTextElement = document.querySelector('.not-found__paragraph');
const preloaderElement = document.querySelector('.preloader');

export function renderLoadingState(newsCardList, dataStorage, resultsButtonElement) {
  newsCardList.erase();
  dataStorage.clear();
  resultsButtonElement.style.display = 'none';
  notFoundElement.style.display = 'none';
  preloaderElement.style.display = 'block';
}

export function showErrorMessage() {
  notFoundElement.style.display = 'block';
  notFoundTitleElement.textContent = 'Во время запроса произошла ошибка.';
  notFoundTextElement.textContent = 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.';
}

export function renderNotFoundState() {
  notFoundElement.style.display = 'block';
  notFoundTitleElement.textContent = 'Ничего не найдено';
  notFoundTextElement.textContent = 'К сожалению по вашему запросу ничего не найдено.';
}

export function hidePreloaderElement() {
  preloaderElement.style.display = 'none';
}

export function getCorrectDateFormat(date) {
  const formattedDate = new Date(date).toLocaleDateString('ru', {month: 'long', day: 'numeric'})
  const year = new Date(date).getFullYear();
  return `${formattedDate}, ${year}`;
}

export function getMonthFormatted(date) {
  return new Date(date).toLocaleDateString('ru', {month: 'long'});
}