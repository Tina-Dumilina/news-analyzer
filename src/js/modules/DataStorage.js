export class DataStorage {
  saveResults(key, results) {
    this._key = key;
    localStorage.setItem(this._key, JSON.stringify(results));
  }

  getResults() {
    return JSON.parse(localStorage.getItem(this._key));
  }

  clear() {
    localStorage.clear();
  }
}