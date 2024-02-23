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
//get recipes data from json
const reponse = await fetch('./data/recipes.json')
const recipes = await reponse.json()
let ordersWrapper = document.querySelector('.orders-wrapper')
let validOrder = document.querySelector('.valid-order')
// if no order if basket show empty basket message
let emptyOrders = document.createElement('h2')
emptyOrders.innerText = 'Your have no current order, go to menu to add some !'

function updateNumber(event) {
  console.log(event)
  console.log(event.target.id)
  let buttonId = event.target.id
  const id = buttonId.split('-')[1]
  console.log(id)
  const selectedRecipe = recipes.find((recipe) => recipe.id == id)
  let orders = getLocalOrder()
  let order = orders.find((order) => order.id == id)
  if (buttonId.charAt(0) == 'r') {
    if (order.number == 1) {
      const orderIndex = orders.indexOf(order)
      order = orders.splice(orderIndex, 1)
    } else {
      order.number > 0 && order.number--
    }
  } else {
    if (!order) {
      order = orders.push({ id: id, recipe: selectedRecipe, number: 1 })
    } else {
      setNumber(id, orders, '+')
    }
  }
  updateLocalOrder(orders)
  updateNumbers()
}

function generateBasket(orders) {
  ordersWrapper.innerHTML = ''
  validOrder.innerHTML = ''
  console.log('Entered generate basket')
  console.log(orders)
  //Generate order cards
  for (let order of orders) {
    console.log(order)
    //set postit
    const orderCard = document.createElement('div')
    orderCard.setAttribute('class', 'order-card')
    //set recipe infos div
    const recipeInfos = document.createElement('div')
    recipeInfos.setAttribute('class', 'recipe-infos')
    //set recipe picture
    const recipePicture = document.createElement('img')
    recipePicture.src = order.recipe.picture
    //set recipe title and price
    const recipeName = document.createElement('h2')
    recipeName.innerText = order.recipe.name
    const recipePrice = document.createElement('p')
    recipePrice.innerText = `Price $${order.recipe.price}`
    // const orderCardRecipe = document.createElement('div')
    // orderCardRecipe.setAttribute('class', 'order-card__recipe')
    // const orderCardTitlePrice = document.createElement('div')
    // orderCardTitlePrice.setAttribute('class', 'order-card__recipe-title-price')

    //set mini postit div order infos
    const orderOptions = document.createElement('div')
    orderOptions.setAttribute('class', 'mini-postit')
    const basketWrapper = document.createElement('div')
    basketWrapper.setAttribute('class', 'basket-wrapper')
    //Order buttons
    const orderBasketImg = document.createElement('img')
    orderBasketImg.src = './assets/basket-icon.svg'
    const orderNumber = document.createElement('p')
    if (!order) {
      orderNumber.innerText = '0'
    } else {
      orderNumber.innerText = order.number
    }
    orderNumber.setAttribute('id', `number-${order.recipe.id}`)
    //RemoveLogo
    const removeLogo = document.createElement('img')
    removeLogo.src = './assets/remove-icon.svg'
    removeLogo.alt = 'remove 1 from basket'
    removeLogo.addEventListener('click', (event) => updateNumber(event))
    removeLogo.setAttribute('id', `remove-${order.recipe.id}`)
    //AddLogo
    const addLogo = document.createElement('img')
    addLogo.src = './assets/add-icon.svg'
    addLogo.alt = 'add 1 to basket'
    addLogo.setAttribute('id', `add-${order.recipe.id}`)
    addLogo.addEventListener('click', (event) => updateNumber(event))
    //set subtotal
    const orderSubtotal = document.createElement('p')
    orderSubtotal.innerHTML = `Subtotal $${
      Math.round(order.number * order.recipe.price * 100) / 100
    }`

    //Link to detailed recipe page
    const recipeLink = document.createElement('a')
    recipeLink.href = `./recipe.html?id=${order.recipe.id}`
    recipeLink.innerText = order.recipe.name

    //Change bakcground and link color by veggie type
    if (order.recipe.vegan) {
      recipeLink.style.backgroundColor = '#cd82fca6'
      recipeLink.style.borderRadius = '80% 20% 81% 19% / 9% 87% 13% 91%'
      orderCard.style.backgroundColor = '#5eacf5'
      orderOptions.style.backgroundColor = '#cd82fca6'
    } else if (order.recipe.vegetarian) {
      recipeLink.style.backgroundColor = '#fdff8a9d'
      recipeLink.style.borderRadius = '80% 20% 81% 19% / 20% 25% 75% 80%'
      orderCard.style.backgroundColor = '#cd82fc'
      orderOptions.style.backgroundColor = '#fdff8a9d'
    }

    //Append to HTML
    ordersWrapper.appendChild(orderCard)
    orderCard.appendChild(recipeInfos)
    orderCard.appendChild(orderOptions)
    recipeInfos.appendChild(recipePicture)
    recipeInfos.appendChild(recipeName)
    recipeInfos.appendChild(recipePrice)
    orderOptions.appendChild(basketWrapper)
    basketWrapper.appendChild(orderBasketImg)
    basketWrapper.appendChild(orderNumber)
    basketWrapper.appendChild(removeLogo)
    basketWrapper.appendChild(addLogo)
    orderOptions.appendChild(orderSubtotal)
  }
}

function generateValidOrder(orders) {
  let totalItems = 0
  let totalPrice = 0
  for (let order of orders) {
    totalItems += order.number
    totalPrice += order.recipe.price * order.number
  }
  const total = document.createElement('p')
  total.innerHTML = `Your order contains <span class="valid-order__bold"> ${totalItems} items</span> for a total of <span class="valid-order__bold">$${
    Math.round(totalPrice * 100) / 100
  }</span>`
  validOrder.appendChild(total)
  const sendButton = document.createElement('button')
  //add event listener on sending order button
  sendButton.addEventListener('click', sendOrder)
  sendButton.innerText = 'Validate order'
  validOrder.appendChild(sendButton)
  const resetButton = document.createElement('button')
  //add event listener on reset order button
  resetButton.addEventListener('click', deleteOrder)
  resetButton.innerText = 'Delete order'
  validOrder.appendChild(resetButton)
}

function updateNumbers() {
  //get orders from local storage
  let orders = getLocalOrder()
  console.log('Entered updateNumbers')
  if (orders.length == 0) {
    ordersWrapper.innerHTML = ''
    validOrder.innerHTML = ''
    ordersWrapper.appendChild(emptyOrders)
  } else {
    generateBasket(orders)
    generateValidOrder(orders)
  }
}

function sendOrder() {
  let orders_json = JSON.stringify([])
  localStorage.setItem('orders', orders_json)
  alert(
    'Your order has been successfully send to us ! Thank you for your trust, see you soon.'
  )
  updateNumbers()
}
function deleteOrder() {
  let orders_json = JSON.stringify([])
  localStorage.setItem('orders', orders_json)
  alert(
    'Your pre-order has been successfully deleted. Please contact us if you have any trouble on this site'
  )
  updateNumbers()
}

updateNumbers()

// choose a name and date for the command in popup ?
// reset basket when sending order
// add sending order to json file
