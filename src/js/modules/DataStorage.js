export class DataStorage {
  saveResults(key, results) {
    localStorage.setItem(key, JSON.stringify(results));
  }

  getResults(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  clear() {
    localStorage.clear();
  }
}