import {cards, categories} from './cards.js';

export default class Statistics {
  constructor(card) {
    this.card = card;
  }

  static initStats() {
    let temp ={};
    Object.values(cards).flat().map((el,i)=>{
      temp[el.word] = {
        'word':el.word,
        'translation': el.translation,
        'right': 0,
        'wrong': 0,
        'percent': 0
      };
    });
    window.localStorage.setItem('statistics', JSON.stringify(temp));
  }

  writeStats(arg) {
    let card = this.card,
    stats = JSON.parse(window.localStorage.statistics);
    stats[card.word][arg]+=1;
    stats[card.word].percent = stats[card.word].wrong * 100/(stats[card.word].wrong + stats[card.word].right);
    window.localStorage.statistics = JSON.stringify(stats);
  }

  renderStats() {
    const table = document.createElement('table'), stats = JSON.parse(window.localStorage.statistics);
    table.innerHTML = `
    <tr>
    <th>Word</th>
    <th>Translation</th>
    <th>Right answers</th>
    <th>Wrong answers</th>
    <th>Percent of errors</th>
    </tr>
    `;
    document.querySelector('.main__wrapper').append(table);
    Object.values(stats).forEach(el=>{
      let row = document.createElement('tr');
      row.innerHTML = `
      <td>${el.word}</td>
      <td>${el.translation}</td>
      <td>${el.right}</td>
      <td>${el.wrong}</td>
      <td>${el.percent}</td>
      `;
      document.querySelector('table').append(row);
    });
  }
}



