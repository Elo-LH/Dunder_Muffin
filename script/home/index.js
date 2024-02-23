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
console.log(adressDiv)
adressDiv.addEventListener('click', copyAdress)
const copyMessage = document.createElement('span')
copyMessage.setAttribute('class', 'copy-message')
copyMessage.innerText = 'Adress copied to clipboard'

adressDiv.appendChild(copyMessage)
