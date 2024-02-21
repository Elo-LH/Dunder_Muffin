const reponse = await fetch('./data/basketRecipes.json')
const basketRecipes = await reponse.json()
let basketWrapper = document.querySelector('.basket-wrapper')
// if no order if basket show empty basket message
let emptyBasket = document.createElement('h2')
emptyBasket.innerText = 'Your basket is empty !'
basketRecipes[0] ?? basketWrapper.appendChild(emptyBasket)
//Initialize total
let totalPrice = 0

function generateBasket(basketRecipes) {
  console.log('Entered generate basket')
  //Generate order cards
  for (let order of basketRecipes) {
    totalPrice += order.recipe.price * order.number
    const orderCard = document.createElement('div')
    orderCard.setAttribute('class', 'order-card')
    const recipePicture = document.createElement('img')
    recipePicture.src = order.recipe.picture
    const recipePrice = document.createElement('p')
    recipePrice.innerText = `Price : $${order.recipe.price}`
    const orderNumber = document.createElement('p')
    orderNumber.innerText = `Number : ${order.number}`
    const orderTotal = document.createElement('p')
    orderTotal.innerText = `Subtotal : ${order.number * order.recipe.price}`
    //Link to detailed recipe page
    const recipeLink = document.createElement('a')
    recipeLink.href = `./recipe.html?id=${order.recipe.id}`
    recipeLink.innerText = order.recipe.name
    //Change bakcground and link color by veggie type
    if (order.recipe.vegan) {
      recipeLink.style.backgroundColor = '#cd82fca6'
      recipeLink.style.borderRadius = '80% 20% 81% 19% / 9% 87% 13% 91%'
      orderCard.style.backgroundColor = '#5eacf5'
    } else if (order.recipe.vegetarian) {
      recipeLink.style.backgroundColor = '#fdff8a9d'
      recipeLink.style.borderRadius = '80% 20% 81% 19% / 20% 25% 75% 80%'
      orderCard.style.backgroundColor = '#cd82fc'
    }

    //Append to HTML
    basketWrapper.appendChild(orderCard)
    orderCard.appendChild(recipeLink)
    orderCard.appendChild(recipePicture)
    orderCard.appendChild(recipePrice)
    orderCard.appendChild(orderNumber)
    orderCard.appendChild(orderTotal)
  }
}
function generateValidOrder(totalPrice) {}

generateBasket(basketRecipes)
generateValidOrder(totalPrice)
