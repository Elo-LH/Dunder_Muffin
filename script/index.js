// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('./data/recipes.json')
const recipes = await reponse.json()
const id = window.location.search.slice(4)
console.log(id)

console.log(recipes)

function rotateCard() {
  //Rotate the recipe-card elements by random angle between -7deg and 7deg
  console.log('Entered rotateCard')
  var cards = document.querySelectorAll('.recipe-card')
  console.log(cards.length)
  cards.length == 0 && (cards = document.querySelectorAll('input, textarea'))

  for (let card of cards) {
    var angle = Math.floor(Math.random() * 7) + 1 // get a number between 1 and 7
    angle *= Math.round(Math.random()) ? 1 : -1 // add minus sign in 50% of cases
    let text = `rotate(${angle}deg)`
    card.style.transform = text
  }
}

function generateCards(recipes) {
  console.log('Entered generate cards')
  const cardWrapper = document.querySelector('.card-wrapper')
  if (!cardWrapper) {
    return
  }

  for (let recipe of recipes) {
    const recipeCard = document.createElement('div')
    recipeCard.setAttribute('class', 'recipe-card')
    recipeCard.setAttribute('id', `id=${recipe.id}`)
    const recipePicture = document.createElement('img')
    // if no link to recipe picture, affect default
    recipe.picture == ''
      ? (recipePicture.src = './images/default-recipe-picture.jpg')
      : (recipePicture.src = recipe.picture)
    const recipeName = document.createElement('h2')
    recipeName.innerText = recipe.name
    const recipeDescription = document.createElement('p')
    recipeDescription.innerText = recipe.description
    // adding veggie badges to recipe description
    recipeDescription.innerText += recipe.vegan
      ? ' (🌱Vegan)'
      : recipe.vegetarian
      ? ' (🥛Vegetarian)'
      : ''

    const recipeLink = document.createElement('a')
    recipeLink.innerText = 'See details ->'
    recipeLink.href = `./recipe.html?id=${recipe.id}`
    cardWrapper.appendChild(recipeCard)
    recipeCard.appendChild(recipePicture)
    recipeCard.appendChild(recipeName)
    recipeCard.appendChild(recipeDescription)
    recipeCard.appendChild(recipeLink)
  }
}
function generateRecipeDetails(id) {
  console.log('generateRecipeDetails entered')
  const recipeWrapper = document.querySelector('.recipe-wrapper')
  const recipe = recipes[id - 1]
  console.log(recipe)
  const recipeDetails = document.createElement('div')
  const recipePicture = document.createElement('img')
  recipePicture.src = recipe.picture
  const recipeName = document.createElement('h1')
  recipeName.innerText = recipe.name
  const recipeDescription = document.createElement('p')
  recipeDescription.innerText = recipe.description
  recipeDescription.innerText += recipe.vegan
    ? ' (🌱Vegan)'
    : recipe.vegetarian
    ? ' (🥛Vegetarian)'
    : ''
  const recipePrice = document.createElement('p')
  recipePrice.innerText = recipe.price
  const recipeLink = document.createElement('a')
  recipeLink.innerText = 'Back to menu'
  recipeLink.href = './menu.html'

  recipeWrapper.appendChild(recipeDetails)
  recipeDetails.appendChild(recipeName)
  recipeDetails.appendChild(recipePicture)
  recipeDetails.appendChild(recipeDescription)
  recipeDetails.appendChild(recipePrice)
  recipeDetails.appendChild(recipeLink)
}

generateCards(recipes)
rotateCard()
id ? generateRecipeDetails(id) : generateCards(recipes)
