
import App from './js/main_page.js';
import Statistics from './js/statistics.js';

window.onload = () => {
  window.state = {
    train: true
  };

  if (!window.localStorage.statistics) {
    Statistics.initStats();
  }

  let main = new App();
  main.renderMain();
  main.listeners();
};



