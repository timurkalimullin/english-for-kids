
import Card from './js/card_render.js';

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

const dataCard = {
  word: 'dive',
  translation: 'нырять',
  image: '../assets/img/dive.jpg',
  audioSrc: '../assets/audio/dive.mp3'
};

let newCard = new Card(dataCard).renderCard();

document.querySelector('.main__wrapper').append(newCard);



