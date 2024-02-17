function rotateCard() {
  var cards = document.querySelectorAll('.recipe-card')
  for (let card of cards) {
    var angle = Math.floor(Math.random() * 7) + 1 // this will get a number between 1 and 7;
    angle *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign in 50% of cases
    let text = `rotate(${angle}deg)`
    card.style.transform = text
  }
}
rotateCard()
