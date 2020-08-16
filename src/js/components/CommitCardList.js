export class CommitCardList {
  constructor(container) {
    this._container = container;
  }

  addCard(card) {
    this._container.appendChild(card);
  }
}