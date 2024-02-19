// Récupération des pièces depuis le fichier JSON
var cards = document.querySelectorAll('.form-card')

function rotateCards(cards) {
  //Rotate the recipe-card elements by random angle between -7deg and 7deg
  console.log('Entered rotateCard')
  for (let card of cards) {
    var angle = Math.floor(Math.random() * 6) + 1 // get a number between 1 and 7
    angle *= Math.round(Math.random()) ? 1 : -1 // add minus sign in 50% of cases
    let text = `rotate(${angle}deg)`
    card.style.transform = text //apply transform to card
    // Take all children of the card and revert transform on them to make them horizontal
    let children = card.children
    console.log(children)
    for (let child of children) {
      let correct = `rotate(${-angle}deg)`
      child.style.transform = correct
    }
  }
}
rotateCards(cards)
