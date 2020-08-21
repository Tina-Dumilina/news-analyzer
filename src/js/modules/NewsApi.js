export class NewsApi {
  constructor(options) {
    this._apiKey = options.apiKey;
    this._url = options.baseUrl;
  }

  getNews({from, to, query, limit}) {
    return fetch(`${this._url}?q=${query}&from=${from}&to=${to}&sortBy=publishedAt&pageSize=${limit}&apiKey=${this._apiKey}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}