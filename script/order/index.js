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
// if no order if basket show empty basket message
let emptyOrders = document.createElement('h2')
emptyOrders.innerText = 'Your have no current order, go to menu to add some !'

function updateOrder(event) {
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
  updateOrders()
}

function generateBasket(orders) {
  ordersWrapper.innerHTML = ''
  console.log('Entered generate basket')
  //Generate order cards
  for (let order of orders) {
    const orderCard = document.createElement('div')
    orderCard.setAttribute('class', 'order-card')
    const recipePicture = document.createElement('img')
    recipePicture.src = order.recipe.picture
    const recipePrice = document.createElement('p')
    recipePrice.innerText = `Price $${order.recipe.price}`
    const orderNumber = document.createElement('p')
    orderNumber.innerText = `Number ${order.number}`
    orderNumber.setAttribute('id', 'order-number')
    const removeButton = document.createElement('button')
    removeButton.addEventListener('click', (event) => updateOrder(event))
    removeButton.innerText = 'Remove 1'
    removeButton.setAttribute('id', `remove-${order.id}`)
    const addButton = document.createElement('button')
    addButton.innerText = 'Add 1'
    addButton.setAttribute('id', `add-${order.id}`)
    addButton.addEventListener('click', (event) => updateOrder(event))
    const orderTotal = document.createElement('p')
    orderTotal.innerHTML = `Subtotal $${Math.floor(
      order.number * order.recipe.price
    )}`
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
    ordersWrapper.appendChild(orderCard)
    orderCard.appendChild(recipeLink)
    orderCard.appendChild(recipePicture)
    orderCard.appendChild(recipePrice)
    orderCard.appendChild(removeButton)
    orderCard.appendChild(orderNumber)
    orderCard.appendChild(addButton)
    orderCard.appendChild(orderTotal)
  }
}

function generateValidOrder(orders) {
  const ordersTotal = document.createElement('div')
  ordersTotal.setAttribute('class', 'orders-total')
  ordersWrapper.appendChild(ordersTotal)
  let totalItems = 0
  let totalPrice = 0
  for (let order of orders) {
    totalItems += order.number
    totalPrice += order.recipe.price * order.number
  }
  const total = document.createElement('p')
  total.innerText = `Your order contains ${totalItems} items for a total of $${Math.floor(
    totalPrice
  )}`
  ordersTotal.appendChild(total)
  const sendButton = document.createElement('button')
  //add event listener on sending order button
  sendButton.addEventListener('click', sendOrder)
  sendButton.innerText = 'Validate order'
  ordersTotal.appendChild(sendButton)
  const resetButton = document.createElement('button')
  //add event listener on reset order button
  resetButton.addEventListener('click', deleteOrder)
  resetButton.innerText = 'Delete order'
  ordersTotal.appendChild(resetButton)
}

function updateOrders() {
  //get orders from local storage
  let orders = getLocalOrder()
  console.log('Entered updateOrders')
  if (orders.length == 0) {
    ordersWrapper.innerHTML = ''
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
  updateOrders()
}
function deleteOrder() {
  let orders_json = JSON.stringify([])
  localStorage.setItem('orders', orders_json)
  alert(
    'Your pre-order has been successfully deleted. Please contact us if you have any trouble on this site'
  )
  updateOrders()
}

updateOrders()

// choose a name and date for the command in popup ?
// reset basket when sending order
// add sending order to json file