export class NewsCard {
  constructor(card, cardTemplate, getCorrectDateFormat) {
    this._card = card;
    this._cardTemplate = cardTemplate;
    this._formatDate = getCorrectDateFormat;
  }

  create() {
    this._view = this._cardTemplate.cloneNode(true).firstElementChild;
    if (this._card.urlToImage) {
      this._view.querySelector('.article__image').src = this._card.urlToImage;
    }
    this._view.querySelector('.article__image').alt = this._card.title;
    this._view.querySelector('.article__heading').textContent = this._card.title;
    this._view.querySelector('.article__lead').textContent = this._card.description;
    this._view.querySelector('.article__source').textContent = this._card.source.name;
    this._view.querySelector('.article__time').textContent = this._formatDate(this._card.publishedAt);
    this._view.querySelector('.article__time').datetime = this._card.publishedAt;
    this._view.querySelector('.article__link').href = this._card.url;

    return this._view;
  }
}