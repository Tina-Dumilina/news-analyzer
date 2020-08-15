export class NewsApi {
  constructor(options) {
    this._apiKey = options.apiKey;
    this._url = options.baseUrl;
  }

  getNews(query, fromDay, today) {
    return fetch(`${this._url}?q=${query}&from=${fromDay}&to=${today}&sort=publishedAt&pageSize=100&apiKey=${this._apiKey}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}