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

//get recipes data from json
const reponse = await fetch('./data/recipes.json')
const recipes = await reponse.json()
//initialize filter
let filter = 'all'
let filteredRecipes = []
//add event listener on changing selected filter
const select = document.querySelector('select')
select.addEventListener('change', filterRecipes)

function getLocalOrder() {
  //get orders in local storage
  let orders_json = localStorage.getItem('orders')
  let orders = JSON.parse(orders_json)
  console.log('The json from local storage is:')
  console.log(orders)
  // If the file is empty
  if (!orders) {
    // set to empty array
    orders = []
    // create local storage
    orders_json = JSON.stringify(orders)
    localStorage.setItem('orders', orders_json)
  }
  return orders
}

function updateLocalOrder(orders) {
  let orders_json = JSON.stringify(orders)
  localStorage.setItem('orders', orders_json)
}

function setNumber(id, orders, operand) {
  for (var i = 0; i < orders.length; i++) {
    if (orders[i].id === id) {
      if ((operand = '+')) {
        orders[i].number++
      } else {
        orders[i].number--
      }
      return orders
    }
  }
}

function updateNumber(event) {
  let buttonId = event.target.id
  const id = buttonId.split('-')[1]
  console.log(`id of button is ${id}`)
  const selectedRecipe = recipes.find((recipe) => recipe.id == id)
  let orders = getLocalOrder()
  let order = orders.find((order) => order.id == id)
  if (buttonId.charAt(0) == 'r') {
    if (!order) {
      updateLocalOrder(orders)
      return
    } else if (order.number == 1) {
      const orderIndex = orders.indexOf(order)
      order = orders.splice(orderIndex, 1)
      let orderNumber = document.getElementById(`number-${id}`)
      orderNumber.innerText = '0'
      updateLocalOrder(orders)
      return
    } else {
      order.number > 0 && order.number--
    }
  } else {
    if (!order) {
      order = orders.push({ id: id, recipe: selectedRecipe, number: 1 })
      order = orders.find((order) => order.id == id)
    } else {
      setNumber(id, orders, '+')
    }
  }
  let orderNumber = document.getElementById(`number-${id}`)
  orderNumber.innerText = `${order.number}`
  updateLocalOrder(orders)
}

function generateCards(recipes, filter) {
  console.log('Entered generate cards')
  let cardWrapper = document.querySelector('.card-wrapper')
  let orders = getLocalOrder()
  //Filter recipe by selected option
  if (filter == 'vegetarian') {
    filteredRecipes = recipes.filter((recipe) => recipe.vegetarian == true)
  } else if (filter == 'vegan') {
    filteredRecipes = recipes.filter((recipe) => recipe.vegan == true)
  } else {
    filteredRecipes = recipes
  }
  //Generate cards
  for (let recipe of filteredRecipes) {
    const recipeCard = document.createElement('div')
    recipeCard.setAttribute('class', 'recipe-card')
    recipeCard.setAttribute('id', `id-${recipe.id}`)
    const recipePicture = document.createElement('img')
    //If no link to recipe picture, affect default
    recipe.picture == ''
      ? (recipePicture.src = './images/default-recipe-picture.jpg')
      : (recipePicture.src = recipe.picture)
    const recipeName = document.createElement('h2')
    recipeName.innerText = recipe.name
    const recipeType = document.createElement('p')
    //put first letter in caps
    let majType = recipe.type.charAt(0).toUpperCase() + recipe.type.slice(1)
    recipeType.innerText = majType
    // adding veggie badges to recipe description
    recipeType.innerText += recipe.vegan
      ? ' - 🌱Vegan'
      : recipe.vegetarian
      ? ' - 🐥Vegetarian'
      : ''
    //Link to detailed recipe page
    const recipeLink = document.createElement('a')
    recipeLink.innerText = 'See details ->'
    recipeLink.href = `./recipe.html?id=${recipe.id}`
    //Price
    const recipePrice = document.createElement('p')
    recipePrice.innerText = `$${recipe.price}`

    //Order buttons
    const orderOptions = document.createElement('div')
    orderOptions.setAttribute('class', 'order-options')
    const orderBasketImg = document.createElement('img')
    orderBasketImg.src = './assets/basket-icon.svg'
    const orderNumber = document.createElement('p')
    let order = orders.find((order) => order.id == recipe.id)
    if (!order) {
      orderNumber.innerText = '0'
    } else {
      orderNumber.innerText = order.number
    }
    orderNumber.setAttribute('id', `number-${recipe.id}`)
    //RemoveLogo
    const removeLogo = document.createElement('img')
    removeLogo.src = './assets/remove-icon.svg'
    removeLogo.alt = 'remove 1 from basket'
    removeLogo.addEventListener('click', (event) => updateNumber(event))
    removeLogo.setAttribute('id', `remove-${recipe.id}`)
    //AddLogo
    const addLogo = document.createElement('img')
    addLogo.src = './assets/add-icon.svg'
    addLogo.alt = 'add 1 to basket'
    addLogo.setAttribute('id', `add-${recipe.id}`)
    addLogo.addEventListener('click', (event) => updateNumber(event))

    //Set wrappers
    const cardInfos = document.createElement('div')
    cardInfos.setAttribute('class', 'card-infos')
    const cardBottom = document.createElement('div')
    cardBottom.setAttribute('class', 'card-bottom')

    //Change bakcground and link color by veggie type
    if (recipe.vegan) {
      recipeLink.style.backgroundColor = '#cd82fca6'
      recipeLink.style.borderRadius = '80% 20% 81% 19% / 9% 87% 13% 91%'
      recipeCard.style.backgroundColor = '#5eacf5'
      orderOptions.style.backgroundColor = '#cd82fca6'
    } else if (recipe.vegetarian) {
      recipeLink.style.backgroundColor = '#fdff8a9d'
      recipeLink.style.borderRadius = '80% 20% 81% 19% / 20% 25% 75% 80%'
      recipeCard.style.backgroundColor = '#cd82fc'
      orderOptions.style.backgroundColor = '#fdff8a9d'
    }
    //Append to HTML
    cardWrapper.appendChild(recipeCard)
    recipeCard.appendChild(recipePicture)
    recipeCard.appendChild(recipeName)
    recipeCard.appendChild(cardBottom)
    cardBottom.appendChild(cardInfos)
    cardInfos.appendChild(recipeType)
    cardInfos.appendChild(recipePrice)
    cardInfos.appendChild(recipeLink)
    cardBottom.appendChild(orderOptions)
    orderOptions.appendChild(orderBasketImg)
    orderOptions.appendChild(orderNumber)
    orderOptions.appendChild(removeLogo)
    orderOptions.appendChild(addLogo)
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

function colorSelect(selectedOption) {
  if (selectedOption == 0) {
    select.className = 'yellow-option'
  } else if (selectedOption == 1) {
    select.className = 'purple-option'
  } else {
    select.className = 'blue-option'
  }
}

function filterRecipes() {
  console.log('Entered filterRecipes')
  let cardWrapper = document.querySelector('.card-wrapper')
  cardWrapper.innerHTML = ''
  let select = document.querySelector('select')
  filter = select.value
  generateCards(recipes, filter)
  rotateCards()
  let selectedOption = select.selectedIndex
  colorSelect(selectedOption)
}

filterRecipes()
