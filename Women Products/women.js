const allProducts = JSON.parse(localStorage.getItem("products")) || [];
console.log(localStorage.getItem("allProducts"));


const womenProducts = allProducts.filter(product => product.category === "women");
console.log(womenProducts);

const container = document.getElementById("women-products");

if (womenProducts.length === 0) {
  container.innerHTML = "<p>No products found in 'women' category.</p>";
} else {
  womenProducts.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-item";
    div.innerHTML = `
          <img src="${product.image}" alt="${product.name}" width="150" />
          <h3>${product.name}</h3>
          <p>Price: Rs. ${product.price}</p>
          <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
          `;
    container.appendChild(div);
  });
}
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(item => item.name === name);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1, image });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = '../Cart/cart.html';
}
