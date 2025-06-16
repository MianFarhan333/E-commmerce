document.getElementById('addProductForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('productName').value.trim();
  const price = document.getElementById('productPrice').value.trim();
  const category = document.getElementById('productCategory').value;
  const fileInput = document.getElementById('productImage');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select an image.');
    return;
  }

  if (!category) {
    alert('Please select a category.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const base64Image = reader.result;

    const product = {
      name,
      price,
      image: base64Image,
      category 
    };

    const existing = JSON.parse(localStorage.getItem('products') || '[]');
    existing.push(product);
    localStorage.setItem('products', JSON.stringify(existing));

    alert('Product added!');
    window.location.href = "../Product/product.html";
  };

  reader.readAsDataURL(file);
});
// const categorySelect = document.getElementById("productCategory");
// const subCategorySelect = document.getElementById("productSubCategory");

// const subCategories = {
//     men: ["T-Shirts", "Jeans", "Shoes", "Accessories"],
//     women: ["Dresses", "Handbags", "Heels", "Jewelry"],
//     kids: ["Toys", "Clothes", "Shoes", "Stationery"]
// };
// console.log(subCategories);


categorySelect.addEventListener("change", function () {
    const selectedCategory = this.value;
    subCategorySelect.innerHTML = '<option value="">Select Sub-Category</option>';

    if (selectedCategory && subCategories[selectedCategory]) {
        subCategories[selectedCategory].forEach(sub => {
            const option = document.createElement("option");
            option.value = sub.toLowerCase();
            option.textContent = sub;
            subCategorySelect.appendChild(option);
        });
    }
});

