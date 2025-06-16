    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const container = document.getElementById("orders-container");

    orders.forEach((order, index) => {
      const orderDiv = document.createElement("div");
      orderDiv.className = "order";

      const customer = order.customerInfo;

      orderDiv.innerHTML = `
        <h2>Order #${index + 1}</h2>
        <p><strong>Date:</strong> ${order.orderDate}</p>
        <p><strong>Customer:</strong> ${customer.firstName} ${customer.lastName}</p>
        <p><strong>Contact:</strong> ${customer.contact}</p>
        <p><strong>Country:</strong> ${customer.country}</p>
        <p><strong>Address:</strong> ${customer.address || 'N/A'}</p>

        <div class="items">
          <h4>Items:</h4>
          ${order.cartItems.map(item => `
            <div class="item">• ${item.name} (x${item.quantity}) — Rs ${item.price * item.quantity}</div>
          `).join('')}
        </div>

        <div class="total">Total Amount: Rs ${order.totalAmount}</div>
      `;

      container.appendChild(orderDiv);
    });