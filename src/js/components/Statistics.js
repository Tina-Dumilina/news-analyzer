export class Statistics {
  constructor(node, key, news, getChartWeekdayFormat) {
    this._node = node;
    this._key = key.toLowerCase();
    this._news = news;
    this._getChartWeekdayFormat = getChartWeekdayFormat;
  }

  renderSummaryBlock() {
    const container = this._node.querySelector('.summary');
    container.insertAdjacentHTML('afterbegin', `
      <h1 class="summary__title section-title">
        Вы спросили: «${this._getSummaryTitle()}»
      </h1>
      <ul class="summary__results">
        <li class="summary__item">
          Новостей за неделю: 
          <span class="summary__text-accent">${this._getTotalResults()}</span>
        </li>
        <li class="summary__item">
          Упоминаний в заголовках: 
          <span class="summary__text-accent">${this._getTotalTitleMentions()}</span>
        </li>
      </ul>
    `);
  }

  renderChartMonth(getCorrectMonthFormat) {
    this._node.querySelector('.chart').style.display = 'block';
    this._node.querySelector('.chart__month').textContent = `(${getCorrectMonthFormat(this._news)})`;
  }

  renderChartDays(getWeekdaysArray) {
    this._week = getWeekdaysArray();
    const dayElements = this._node.querySelectorAll('.chart__day');
    dayElements.forEach((element, index) => {
      element.textContent = this._getChartWeekdayFormat(this._week[index]);
    });
  }

  renderChartDiagram() {
    const progressBarElements = document.querySelectorAll('.chart__bar');
    const chartNumberElements = document.querySelectorAll('.chart__number');

    const mentionsByDay = [];
    chartNumberElements.forEach((element, index) => {
      const mentionsAmount = this._getMentionsByDay(this._week[index]);
      element.textContent = mentionsAmount;
      mentionsByDay.push(mentionsAmount)
    });

    this._totalMentions = mentionsByDay.reduce((acc, element) => acc += element, 0);
    progressBarElements.forEach((element, index) => {
      element.style.width = this._getMentionsPercentageByDay(mentionsByDay[index]) + `%`;

      if (mentionsByDay[index] === 0) {
        element.classList.add('chart__bar_zero');
      }
    })
  }

  _getSummaryTitle() {
    return this._key.slice(0, 1).toUpperCase() + this._key.slice(1);
  }

  _getTotalResults() {
    return this._news.length.toLocaleString('ru');
  }

  _getTotalTitleMentions() {
    return this._news.reduce((acc, article) => {
      if (article.title.toLowerCase().includes(this._key)) {
        acc++;
      }
      return acc;
    }, 0)
  }

  _getMentionsByDay(date) {
    return this._news.reduce((acc, article) => {
      if (new Date(article.publishedAt).getDate() === date.getDate()) {
        if (article.title.toLowerCase().includes(this._key) ||
          article.description.toLowerCase().includes(this._key)) {
          acc++;
        }
      }
      return acc;
    }, 0);
  }

  _getMentionsPercentageByDay(amount) {
    return Math.round(amount * 100 / this._totalMentions);
  }
}