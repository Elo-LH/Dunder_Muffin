const reponse = await fetch('./data/recipes.json')
const recipes = await reponse.json()
let filter = 'all'
let filteredRecipes = []

function generateCards(recipes, filter) {
  console.log('Entered generate cards')
  const cardWrapper = document.querySelector('.card-wrapper')
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

function filterRecipes() {
  console.log('Entered filterRecipes')
  const select = document.querySelector('select')
  filter = select.value
  console.log(recipes)
  generateCards(recipes, filter)
}

function test() {
  alert('yes')
}

filterRecipes()
