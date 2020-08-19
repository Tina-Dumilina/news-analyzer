export class GithubApi {
  constructor(url, commitsLimit) {
    this._url = url;
    this._commitsLimit = commitsLimit;
  }

  getCommits() {
    return fetch(`${this._url}`, {
      page: this._commitsLimit
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}