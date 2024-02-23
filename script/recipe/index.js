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

// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('./data/recipes.json')
const recipes = await reponse.json()
const id = window.location.search.split('=')[1]
console.log(id)

console.log(recipes)

function generateRecipeDetails(id) {
  console.log('generateRecipeDetails entered')
  const recipeWrapper = document.querySelector('.recipe-wrapper')
  const recipe = recipes.find((recipe) => recipe.id == id)
  console.log(recipe)
  const recipeName = document.createElement('h1')
  recipeName.innerText = recipe.name
  const recipeDetails = document.createElement('div')
  const recipePicture = document.createElement('img')
  recipePicture.src = recipe.picture
  const recipeDescription = document.createElement('p')
  recipeDescription.innerText = recipe.description
  recipeDescription.innerHTML += recipe.vegan
    ? ' <br> (🌱Vegan)'
    : recipe.vegetarian
    ? ' <br> (🐥Vegetarian)'
    : ''
  const recipePrice = document.createElement('p')
  recipePrice.innerText = '$' + recipe.price
  const recipeLink = document.createElement('a')
  recipeLink.innerText = '<- Back to menu'
  recipeLink.href = './menu.html'

  recipeWrapper.appendChild(recipeDetails)
  recipeDetails.appendChild(recipeName)
  recipeDetails.appendChild(recipePicture)
  recipeDetails.appendChild(recipeDescription)
  recipeDetails.appendChild(recipePrice)
  recipeDetails.appendChild(recipeLink)
}

generateRecipeDetails(id)
