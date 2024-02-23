const adress = 'Dunder Muffin 300 PATTISON AVENUE SCRANTON PA 18504-9633'

function copyAdress() {
  // Copy the text inside the text field
  navigator.clipboard.writeText(adress)

  // Alert the copied text
  console.log(copyMessage)
  copyMessage.style.display = 'block'
  setTimeout(() => {
    copyMessage.style.display = 'none'
  }, 2000)
}

const adressDiv = document.querySelector('.footer-contact')
adressDiv.addEventListener('click', copyAdress)
const copyMessage = document.createElement('span')
copyMessage.setAttribute('class', 'copy-message')
copyMessage.innerText = 'Adress copied to clipboard'
adressDiv.appendChild(copyMessage)

var cards = document.querySelectorAll('.form-card')
// Add event listener to inputs of contact-form
var formInputs = document.querySelectorAll('input, textarea')
formInputs.forEach((input) =>
  input.addEventListener('change', (event) => updateValidMark(event))
)

function updateValidMark(event) {
  console.log('Entered changeValidColor')
  let input = event.srcElement
  let inputId = input.id
  let label = document.getElementById(`${inputId}-check`)
  let inputValid = input.validity.valid
  inputValid ? (label.innerText = '✔️') : (label.innerText = '❌')
}

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
    for (let child of children) {
      let correct = `rotate(${-angle}deg)`
      child.style.transform = correct
    }
  }
}

rotateCards(cards)
