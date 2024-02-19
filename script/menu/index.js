const reponse = await fetch('./data/recipes.json')
const recipes = await reponse.json()
let filter = 'all'
let filteredRecipes = []
const select = document.querySelector('select')
select.addEventListener('change', filterRecipes)

function generateCards(recipes, filter) {
  console.log('Entered generate cards')
  let cardWrapper = document.querySelector('.card-wrapper')
  if (filter == 'vegetarian') {
    filteredRecipes = recipes.filter((recipe) => recipe.vegetarian == true)
  } else if (filter == 'vegan') {
    filteredRecipes = recipes.filter((recipe) => recipe.vegan == true)
  } else {
    filteredRecipes = recipes
  }
  for (let recipe of filteredRecipes) {
    const recipeCard = document.createElement('div')
    recipeCard.setAttribute('class', 'recipe-card')
    recipeCard.setAttribute('id', `id-${recipe.id}`)
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
function rotateCards() {
  //Rotate the recipe-card elements by random angle between -7deg and 7deg
  console.log('Entered rotateCard')
  var cards = document.querySelectorAll('.recipe-card')
  for (let card of cards) {
    var angle = Math.floor(Math.random() * 7) + 1 // get a number between 1 and 7
    angle *= Math.round(Math.random()) ? 1 : -1 // add minus sign in 50% of cases
    let text = `rotate(${angle}deg)`
    card.style.transform = text
    console.log('card is' + card)
  }
}

function filterRecipes() {
  console.log('Entered filterRecipes')
  let cardWrapper = document.querySelector('.card-wrapper')
  cardWrapper.innerHTML = ''
  let select = document.querySelector('select')
  filter = select.value
  console.log(recipes)
  generateCards(recipes, filter)
  rotateCards()
  let selectedOption = select.selectedIndex
  if (selectedOption == 0) {
    select.className = 'yellow-option'
  } else if (selectedOption == 1) {
    select.className = 'purple-option'
  } else {
    select.className = 'blue-option'
  }
}

filterRecipes()
