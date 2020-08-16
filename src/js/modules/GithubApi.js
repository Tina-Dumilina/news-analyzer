export class GithubApi {
  constructor(url) {
    this._url = url;
  }

  getCommits() {
    return fetch(`${this._url}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}