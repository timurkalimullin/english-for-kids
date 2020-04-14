export default class Card {
  constructor (data) {
    this.data = data;
  }

  renderCard() {
    const card = document.createElement('div');
    const cardAudio = this.data.audioSrc;
    card.classList.add('card');
    card.innerHTML = `
    <div class="front" style="background-image: url(${this.data.image});">
    <div class="card-header">${this.data.word}</div></div>
    <div class="back" style="background-image: url(${this.data.image});">
    <div class="card-header">${this.data.translation}</div></div>
    <div class="rotate"></div>
    `;

    card.addEventListener('click', (e)=>{
      if (e.target === document.querySelector('.rotate')) {
        card.classList.add('flip');
      }
      if (e.target === document.querySelector('.front')) {
        let audio = new Audio(cardAudio);
        audio.play();
      }
    });

    card.addEventListener('mouseleave', (e)=>{
        card.classList.remove('flip');
    });

    return card;
  }
}
