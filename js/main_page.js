import {Card, MainCard} from './card_render.js';
import {cards,categories} from './cards.js';

export default class App {
  constructor() {
    this.categorie = 'main-page';
    this.gameStarted = false;
    this.gameListener = null;
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

    let currentCard, currentAudio, rightAnswer = 0, wrongAnswer = 0;

    this.gameListener = () =>{
      if (event.target.closest('.front') && !event.target.closest('.inactive')) {
        if (event.target.querySelector('.card-header').innerHTML === currentCard.word) {
          event.target.closest('.card').classList.add('inactive');
          new Audio('../assets/audio/correct.mp3').play();
          this.createStar('../assets/img/star-win.svg');
          rightAnswer++;
          document.removeEventListener('click', this.gameListener);
          setTimeout(gameLogic, 600);
        } else {
          new Audio('../assets/audio/error.mp3').play();
          this.createStar('../assets/img/star.svg');
          wrongAnswer++;
        }
      }

      if (event.target.closest('.btn.play.begin')) {
       currentAudio.play();
      }
    };

    const gameLogic =()=> {
      if (arr.length>0) {
        currentCard = arr.pop();
        currentAudio = new Audio(currentCard.audioSrc);
        currentAudio.play();
        document.addEventListener('click', this.gameListener);
      } else {
        if (wrongAnswer === 0) {
          this.gameStarted = false;
          this.clearPage();
          this.createEmodji('../assets/img/success.jpg', '../assets/audio/success.mp3','Congratulations!', setTimeout(this.clearPage, 3000));
          setTimeout(this.renderMain, 3200);
          this.categorie = 'main-page';
        } else {
          this.gameStarted = false;
          this.clearPage();
          this.createEmodji('../assets/img/failure.jpg', '../assets/audio/failure.mp3',`Number of wronganswers: ${wrongAnswer} :(`, setTimeout(this.clearPage, 3000));
          setTimeout(this.renderMain, 3200);
          this.categorie = 'main-page';
        }
      }
    };

    gameLogic();
  }

  createStar(path) {
    const star = document.createElement('div');
    star.style.backgroundImage = `url(${path})`;
    star.classList.add('star');
    document.querySelector('.star-bar').append(star);
  }

  createEmodji(imgSrc, audioSrc, text) {
    const emodji = document.createElement('div');
    emodji.innerHTML = `
    <img src=${imgSrc} alt="emodji">
    <p>${text}</p>
    `;
    emodji.classList.add('emodji');
    new Audio(audioSrc).play();
    document.querySelector('.main__wrapper').append(emodji);
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
      el.classList.remove('inactive');
    });
    document.querySelectorAll('.sub-link__card').forEach(el=>{
      el.classList.toggle('play');
    });
    document.querySelector('nav').classList.toggle('play');
    if (this.categorie !== 'main-page') {
      document.querySelector('.btn').classList.toggle('play');
      document.querySelector('.btn').classList.remove('begin');
    }
    document.removeEventListener('click', this.gameListener);
    document.querySelector('.star-bar').innerHTML = '';
  }

  clearPage() {
    this.gameStarted = false;
    document.removeEventListener('click', this.gameListener);
    document.querySelector('.main__wrapper').innerHTML = '';
    document.querySelector('.btn__wrapper').innerHTML = '';
    document.querySelector('.star-bar').innerHTML = '';
  }
}
