function submitForm(e) {
  e.preventDefault();
  window.location.href = '../Confirmation/confirmation.html';
}

function goBack() {
  window.history.back();
}
const cartItemsContainer = document.getElementById('cart-items');
const cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h4>${item.name}</h4>
            <p>Rs.${item.price.toFixed(2)} x ${item.quantity}</p>
          </div>
          <div class="controls">
            <button onclick="updateQuantity(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${index}, 1)">+</button>
            <button onclick="removeItem(${index})">🗑️</button>
          </div>
        `;
    cartItemsContainer.appendChild(div);
  });

  document.getElementById('subtotal').textContent = `Subtotal: Rs.${total.toFixed(2)}`;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity < 1) cart[index].quantity = 1;
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}
renderCart();
function submitForm(e) {
  e.preventDefault();

  const form = document.querySelector('.checkout-form');
  const formData = {
    contact: form.querySelector('input[placeholder="Email or mobile phone number"]').value,
    country: form.querySelector('select').value,
    firstName: form.querySelector('input[placeholder="First name (optional)"]').value,
    lastName: form.querySelector('input[placeholder="Last name"]').value,
    address: form.querySelector('input[placeholder="Address"]').value,
    apartment: form.querySelector('input[placeholder="Apartment, suite, etc. (optional)"]').value,
    city: form.querySelector('input[placeholder="City"]').value,
    postalCode: form.querySelector('input[placeholder="Postal code (optional)"]').value,
    phone: form.querySelector('input[placeholder="Phone"]').value,
  };

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const newOrder = {
    customerInfo: formData,
    cartItems: cart,
    totalAmount: subtotal,
    orderDate: new Date().toLocaleString()
  };

  const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

  existingOrders.push(newOrder);

  localStorage.setItem('orders', JSON.stringify(existingOrders));

  localStorage.removeItem('cart');

  window.location.href = '../Confirmation/confirmation.html';
}
