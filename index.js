
import {Card, MainCard} from './js/card_render.js';
import {cards,categories} from './js/cards.js';


const checkbox = document.querySelector('input[type="checkbox"]');

checkbox.addEventListener('change', function () {
  setTimeout(switcher, 300);
});

function switcher() {
  const slider = document.querySelector('.slider');
  if (checkbox.checked) {
    slider.innerHTML = '';
    slider.addEventListener('transitionend', ()=>{
      slider.innerHTML = '<div class="slider-text">TRAIN</div class="slider-text">';
      document.querySelector('.slider-text').style.cssText = `display:inline-block;margin-top:7px;margin-left:6px`;
    });
  } else {
    slider.innerHTML = '';
    slider.addEventListener('transitionend', ()=>{
      slider.innerHTML = '<div class="slider-text">PLAY</div class="slider-text">';
      document.querySelector('.slider-text').style.cssText = `display:inline-block;margin-top:7px;margin-left:45px`;
    });
  }
}

Object.keys(categories).forEach(el=>{
  let newCard = new MainCard(el).renderCard();

  document.querySelector('.main__wrapper').append(newCard);
});



