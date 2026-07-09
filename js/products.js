/* ============================================
   Stackly - Products Page
   ============================================ */
'use strict';

document.getElementById('app-header').innerHTML = renderHeader('products');
document.getElementById('app-footer').innerHTML = renderFooter();
initCommon();

const grid = document.getElementById('allProductsGrid');

function renderAllProducts(filter = 'all') {
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  grid.innerHTML = filtered.map((p, i) => getProductCardHTML(p, i)).join('');
  setTimeout(() => {
    grid.querySelectorAll('.product-card').forEach(card => card.classList.add('visible'));
  }, 100);
  attachButtons();
}

function attachButtons() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) addToCart(product);
    });
  });
}

// Filters
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderAllProducts(btn.dataset.filter);
  });
});

// URL category param
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
if (category) {
  const btn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
  if (btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderAllProducts(category);
  } else {
    renderAllProducts('all');
  }
} else {
  renderAllProducts('all');
}
