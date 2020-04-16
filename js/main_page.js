import {Card, MainCard} from './card_render.js';
import {cards,categories} from './cards.js';

export default class MainPage {

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
      this.switcher();
      console.log(window.state.train);
    });

    document.querySelector('#hamburger-icon').addEventListener('mousedown', ()=>{
      document.querySelector('nav').classList.toggle('active');
      document.querySelector('#hamburger-icon').classList.toggle('active');
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
}
