const checkbox = document.querySelector('input[type="checkbox"]');

checkbox.addEventListener('change', function () {
  setTimeout(switcher, 300);
});

function switcher() {
  const slider = document.querySelector('.slider');
  if (checkbox.checked) {
    // do this
    slider.innerHTML = '<div class="slider-text">TRAIN</div class="slider-text">';
    document.querySelector('.slider-text').style.cssText = `display:inline-block;margin-top:7px;margin-left:6px`;
  } else {
    // do that
    slider.innerHTML = '<div class="slider-text">PLAY</div class="slider-text">';
    document.querySelector('.slider-text').style.cssText = `display:inline-block;margin-top:7px;margin-left:45px`;
  }
}

const dataCard = {
  word: 'dive',
  translation: 'нырять',
  image: '../assets/img/dive.jpg',
  audioSrc: '../assets/audio/dive.mp3'
};

class Card {
  constructor (data) {
    this.data = data;
  }

  renderCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    const front = document.createElement('div');
    front.classList.add('front');
    front.style.backgroundImage = `url("${this.data.image}")`;
    card.append(front);

    return card;
  }
}

let newCard = new Card(dataCard).renderCard();

document.querySelector('.main__wrapper').append(newCard);



