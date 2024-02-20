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
