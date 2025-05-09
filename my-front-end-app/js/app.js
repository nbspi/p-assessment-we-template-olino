// js/app.js
// PURPOSE: Load products from API and display them

async function fetchProducts() {
  const listEl = document.getElementById('product-list');
  try {
    const res = await fetch('http://localhost:3000/products');
    const products = await res.json();

    // Clear the “Loading” text
    listEl.innerHTML = '';

    products.forEach(prod => {
      const li = document.createElement('li');
      li.textContent = `${prod.name} (Code: ${prod.product_code}) — Qty: ${prod.quantity_on_hand}`;
      listEl.appendChild(li);
    });
  } catch (err) {
    listEl.textContent = 'Failed to load products.';
    console.error('Fetch error:', err);
  }
}

// Run when page is ready
document.addEventListener('DOMContentLoaded', fetchProducts);
