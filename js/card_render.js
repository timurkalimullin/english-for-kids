import { cards, categories } from "./cards.js";

class Card {
  constructor (data) {
    this.data = data;
    this.audio = this.data.audioSrc;
  }

  renderCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <div class="front" style="background-image: url(${this.data.image});">
    <div class="card-header">${this.data.word}</div></div>
    <div class="back" style="background-image: url(${this.data.image});">
    <div class="card-header">${this.data.translation}</div></div>
    <div class="rotate"></div>
    `;

    card.addEventListener('click', (e)=>{
      if (e.target === card.querySelector('.rotate')) {
        card.classList.add('flip');
      }
      if (e.target === card.querySelector('.front')) {
        let audio = new Audio(this.audio);
        audio.play();
      }
    });

    card.addEventListener('mouseleave', (e)=>{
      card.classList.remove('flip');
    });

    return card;
  }
}

class MainCard {
  constructor(categorie) {
    this.categorie = categorie;
    this.categorieContent = cards[this.categorie];
  }

  renderCard() {
    let random = Math.floor(Math.random()*(this.categorieContent.length)),
    randomImg = this.categorieContent[random].image;
    const card = document.createElement('div');
    card.classList.add('main-card');
    card.innerHTML = `
    <div class="main-card__img">
    <img src="${randomImg}" alt="image">
    </div>
    <p></p>
    `;

    return card;
  }
}

export {Card, MainCard};
