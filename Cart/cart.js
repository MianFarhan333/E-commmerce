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