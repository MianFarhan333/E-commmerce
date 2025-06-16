const container = document.getElementById('productContainer');
let products = JSON.parse(localStorage.getItem('products')) || [];

function renderProducts() {
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = '<p>No products available.</p>';
  } else {
    products.forEach((p, index) => {
      const card = document.createElement('div');
      card.className = 'product';
      card.innerHTML = `
       <img src="${p.image}" alt="${p.name}">
       <h3>${p.name}</h3>
      <p>Price: $${p.price}</p>
      <p>Category: ${p.category ? p.category.charAt(0).toUpperCase() + p.category.slice(1) : 'N/A'}</p>
      <button class="edit-btn">Edit</button>
      <button class="remove-btn">Remove</button>
`;

      card.querySelector('.remove-btn').addEventListener('click', () => {
        products.splice(index, 1); 
        localStorage.setItem('products', JSON.stringify(products)); 
        renderProducts(); 
      });

      // Edit product button
      card.querySelector('.edit-btn').addEventListener('click', () => {
        const newName = prompt('Enter new product name:', p.name);
        const newPrice = prompt('Enter new price:', p.price);
        const newImage = prompt('Enter new image URL:', p.image);

        if (newName && newPrice && newImage) {
          products[index] = {
            name: newName,
            price: newPrice,
            image: newImage
          };
          localStorage.setItem('products', JSON.stringify(products));
          renderProducts();
        }
      });


      container.appendChild(card);
    });
  }
}

renderProducts();
