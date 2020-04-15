import {Card, MainCard} from './card_render.js';
import {cards,categories} from './cards.js';

export default class MainPage {
  constructor() {
    this.train = true;
  }

  renderMain() {
    Object.keys(categories).forEach(el=>{
      let newCard = new MainCard(el).renderCard();
      document.querySelector('.main__wrapper').append(newCard);
    });
  }

  renderSub(categorie) {
    cards[categorie].forEach(el=>{
      let newCard = new Card(el).renderCard();
      document.querySelector('.main__wrapper').append(newCard);
    });
  }

  listeners() {
    const checkbox = document.querySelector('input[type="checkbox"]');

    checkbox.addEventListener('change', ()=>{
      console.log(this.train);
      this.switcher();
    });

    document.querySelector('#hamburger-icon').addEventListener('mousedown', ()=>{
      document.querySelector('nav').classList.toggle('active');
      document.querySelector('#hamburger-icon').classList.toggle('active');
    });
  }

  switcher() {
    this.train = !this.train;
  }
}
