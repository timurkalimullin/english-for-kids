import {Card, MainCard} from './card_render.js';
import {cards,categories} from './cards.js';

export default class MainPage {
  constructor() {
    this.categorie = 'main-page';
  }

  renderMain() {
    this.categorie = 'main-page';
    Object.keys(categories).forEach(el=>{
      let newCard = new MainCard(el).renderCard();
      document.querySelector('.main__wrapper').append(newCard);
    });
  }

  renderSub(categorie) {
    this.categorie = categorie;
    cards[categorie].forEach(el=>{
      let newCard = new Card(el).renderCard();
      document.querySelector('.main__wrapper').append(newCard);
    });
  }

  listeners() {
    document.addEventListener('mousedown', (event)=>{
      let sublink = event.target.closest('.sub-link');
      if (sublink) {
        let  sublinkId = sublink.getAttribute('id');
        if (sublinkId === 'main-page') {
          this.clearPage();
          this.renderMain();
        } else {
          this.clearPage();
          this.renderSub(sublinkId);
        }
      }

      if (event.target.closest('#hamburger-icon')) {
        document.querySelector('nav').classList.toggle('active');
        document.querySelector('#hamburger-icon').classList.toggle('active');
      } else if (!event.target.closest('#hamburger-icon') && event.target.getAttribute('id') !== 'nav') {
        document.querySelector('nav').classList.remove('active');
        document.querySelector('#hamburger-icon').classList.remove('active');
      }
    });

    const checkbox = document.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', ()=>{
      this.switcher();
    });

  }

  switcher() {
    window.state.train = !window.state.train;
    document.querySelectorAll('.card').forEach(el=>{
      el.classList.toggle('play');
    });
    document.querySelectorAll('.sub-link__card').forEach(el=>{
      el.classList.toggle('play');
    });
    document.querySelector('nav').classList.toggle('play');
    }

  clearPage() {
    document.querySelector('.main__wrapper').innerHTML = '';
  }
}
