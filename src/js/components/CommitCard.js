export class CommitCard {
  constructor(card, cardTemplate, getCorrectDateFormat) {
    this._card = card;
    this._cardTemplate = cardTemplate;
    this._formatDate = getCorrectDateFormat;
  }

  create() {
    this._view = this._cardTemplate.cloneNode(true).firstElementChild;
    this._view.querySelector('.swiper__image').src = this._card.author.avatar_url;
    this._view.querySelector('.swiper__time').textContent = this._formatDate(this._card.commit.committer.date);
    this._view.querySelector('.swiper__time').datetime = this._card.commit.committer.date;
    this._view.querySelector('.swiper__author').textContent = this._card.commit.committer.name;
    this._view.querySelector('.swiper__email').textContent = this._card.commit.committer.email;
    this._view.querySelector('.swiper__text').textContent = this._card.commit.message;
    return this._view;
  }
}