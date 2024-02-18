// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('./data/recipes.json')
const recipes = await reponse.json()

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
    const recipePicture = document.createElement('img')
    // if no link to recipe picture, affect default
    recipe.picture == ''
      ? (recipePicture.src = './images/default-recipe-picture.jpg')
      : (recipePicture.src = recipe.picture)
    const recipeName = document.createElement('h2')
    recipeName.innerText = recipe.name
    const recipeDescription = document.createElement('p')
    recipeDescription.innerText = recipe.description
    recipeDescription.innerText += recipe.vegan
      ? ' (🌱Vegan)'
      : recipe.vegetarian
      ? ' (🥛Vegetarian)'
      : ''
    cardWrapper.appendChild(recipeCard)
    recipeCard.appendChild(recipePicture)
    recipeCard.appendChild(recipeName)
    recipeCard.appendChild(recipeDescription)
  }
}

generateCards(recipes)
rotateCard()
