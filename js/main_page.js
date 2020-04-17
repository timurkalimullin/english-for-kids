import {Card, MainCard} from './card_render.js';
import {cards,categories} from './cards.js';

export default class App {
  constructor() {
    this.categorie = 'main-page';
    this.gameStarted = false;
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
    document.querySelector('.btn__wrapper').append(this.renderBtn());
  }

  renderBtn() {
    const button = document.createElement('button');
    button.classList.add('btn');
    if (!window.state.train) {
      button.classList.add('play');
    }
    return button;
  }

  game(categorie) {
    this.gameStarted = true;
    document.querySelector('.btn').classList.add('begin');
    let arr = [];
    Object.keys(cards[categorie]).forEach(el=>{
      arr.push(cards[categorie][el]);
    });

    const shuffle = (arr) =>{
      var j, temp;
      for(var i = arr.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    };
    arr = shuffle(arr);

    const prog =()=> {
      if (arr.length>0) {
        let currentCard = arr.pop();
        new Audio(currentCard.audioSrc).play();
        let listener = () =>{
          if (event.target.closest('.front')) {
            if (event.target.querySelector('.card-header').innerHTML === currentCard.word) {
              new Audio('../assets/audio/correct.mp3').play();
              document.removeEventListener('click', listener);
              setTimeout(prog(), 1000);
            } else {
              new Audio('../assets/audio/error.mp3').play();
            }
          }
        };
        document.addEventListener('click', listener);
      }
    };

    prog();
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

      if (event.target.closest('.btn.play') && this.gameStarted === false) {
        this.game(this.categorie);
      }
    });

    const checkbox = document.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', ()=>{
      this.switcher();
    });

  }

  switcher() {
    this.gameStarted = false;
    window.state.train = !window.state.train;
    document.querySelectorAll('.card').forEach(el=>{
      el.classList.toggle('play');
    });
    document.querySelectorAll('.sub-link__card').forEach(el=>{
      el.classList.toggle('play');
    });
    document.querySelector('nav').classList.toggle('play');
    if (this.categorie !== 'main-page') {
      document.querySelector('.btn').classList.toggle('play');
      document.querySelector('.btn').classList.remove('begin');
    }
  }

  clearPage() {
    this.gameStarted = false;
    document.querySelector('.main__wrapper').innerHTML = '';
    document.querySelector('.btn__wrapper').innerHTML = '';
  }
}
