import './style.css';
import { Statistics } from '../../js/components/Statistics';
import { DAY } from '../../js/constants';
import { renderNotFoundState } from '../../js/utils';

const getChartWeekdayFormat = (date) => {
  const dateInstance = new Date(date);
  return `${dateInstance.toLocaleDateString('ru', {day: 'numeric'})}, ${dateInstance.toLocaleDateString('ru', {weekday: 'short'})}`
};

const getMonthFormatted = date => new Date(date).toLocaleDateString('ru', {month: 'long'});

const getCorrectMonthFormat = newsArray => {
  const lastNewsArticleDate = getMonthFormatted(newsArray[newsArray.length - 1].publishedAt);
  const firstNewsArticleDate = getMonthFormatted(newsArray[0].publishedAt);

  return (lastNewsArticleDate !== firstNewsArticleDate) ?
    `${lastNewsArticleDate}-${firstNewsArticleDate}` :
    firstNewsArticleDate;
};

const getWeekdaysArray = () => {
  const week = [];
  for (let i = 0; i < 7; i++) {
    week.push(new Date(Date.now() - i * DAY));
  }
  return week.reverse();
};

if (localStorage.currentKey) {
  const articles = JSON.parse(localStorage.getItem(localStorage.currentKey)).articles;
  const statistics = new Statistics(
    document.querySelector('.statistics'), 
    localStorage.currentKey, 
    articles,
    getChartWeekdayFormat
  );
  statistics.renderSummaryBlock();
  statistics.renderChartMonth(getCorrectMonthFormat);
  statistics.renderChartDays(getWeekdaysArray);
  statistics.renderChartDiagram();
} else {
  renderNotFoundState();
}