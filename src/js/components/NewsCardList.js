export class NewsCardList {
  constructor(container) {
    this._container = container;
  }

  addCard(card) {
    this._container.appendChild(card);
  }

  erase() {
    this._container.innerHTML = '';
  }
}