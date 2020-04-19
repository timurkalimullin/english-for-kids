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
    stats[card.word].percent = (stats[card.word].wrong * 100/(stats[card.word].wrong + stats[card.word].right)).toFixed();
    stats[card.word].image = card.image;
    stats[card.word].audioSrc = card.audioSrc;
    window.localStorage.statistics = JSON.stringify(stats);
  }

  static renderStats() {
    const resetBtn = document.createElement('button');
    resetBtn.classList.add('btn', 'reset');
    document.querySelector('.btn__wrapper').append(resetBtn);
    const dificultBtn = document.createElement('button');
    dificultBtn.classList.add('btn', 'dificult');
    document.querySelector('.btn__wrapper').append(dificultBtn);

    document.querySelector('.main-header').innerHTML = 'Statistics';

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

  static sortTable(tableHeader) {
    let thList = document.querySelectorAll('th'),
    n = [...thList].indexOf(tableHeader);
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.querySelector('table');
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.getElementsByTagName("tr");
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  static dificultWords() {
    let stats = JSON.parse(window.localStorage.statistics);

    let obj ={}, arr =[];

    Object.keys(stats).sort((a,b)=>{
      return stats[b].percent - stats[a].percent;
    }).forEach(el=>obj[el] = stats[el]);

    for (let i=0; i<8; i++) {
      if (obj[Object.keys(obj)[i]].percent != 0) {
        arr.push(obj[Object.keys(obj)[i]]);
      }
    }
    cards['dificult-words'] = arr;
  }
}





