/* ============================================
   Stackly - Deals & Offers Page
   ============================================ */
'use strict';

document.getElementById('app-header').innerHTML = renderHeader('deals');
document.getElementById('app-footer').innerHTML = renderFooter();
initCommon();

const dealsGrid = document.getElementById('dealsGrid');
const dealsSummary = document.getElementById('dealsSummary');
const dealsFilters = document.getElementById('dealsFilters');

// Build category filters from actual deal products
(function buildFilters() {
  const cats = getDealCategories();
  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = cat;
    btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    dealsFilters.appendChild(btn);
  });
})();

function renderDeals(filter = 'all') {
  const dealProducts = getDealProducts();
  const filtered = filter === 'all' ? dealProducts : dealProducts.filter(p => p.category === filter);

  dealsSummary.textContent = `${filtered.length} deal${filtered.length !== 1 ? 's' : ''} available`;

  dealsGrid.innerHTML = filtered.map((p, i) => {
    const stars = '\u2605'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '\u00BD' : '');
    return `
      <div class="deal-product-card" style="transition-delay: ${i * 0.05}s">
        <div class="deal-product-badge">-${p.discount}%</div>
        <a href="product-detail.html?id=${p.id}" class="deal-product-image">${p.image ? `<img src="${p.image}" alt="${p.name}">` : p.svg}</a>
        <div class="deal-product-info">
          <div class="deal-product-category">${p.category}</div>
          <a href="product-detail.html?id=${p.id}" class="deal-product-name">${p.name}</a>
          <div class="deal-product-rating">
            <span class="stars">${stars}</span>
            <span>(${p.reviews})</span>
          </div>
          <div class="deal-product-pricing">
            <span class="deal-price-current">$${p.price.toLocaleString()}</span>
            <span class="deal-price-original">$${p.originalPrice.toLocaleString()}</span>
            <span class="deal-price-save">Save $${(p.originalPrice - p.price).toLocaleString()}</span>
          </div>
          <div class="deal-progress">
            <div class="deal-progress-bar">
              <div class="deal-progress-fill" style="width: ${70 + Math.floor(Math.random() * 25)}%"></div>
            </div>
            <span class="deal-progress-text">Hurry! Low stock</span>
          </div>
          <button class="add-to-cart" data-id="${p.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Add to Cart
          </button>
        </div>
      </div>`;
  }).join('');

  setTimeout(() => {
    dealsGrid.querySelectorAll('.deal-product-card').forEach(c => c.classList.add('visible'));
  }, 100);

  // Cart buttons
  dealsGrid.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) addToCart(product);
    });
  });
}

// Filters
dealsFilters.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    dealsFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDeals(btn.dataset.filter);
  });
});

renderDeals('all');

// Countdown
(function() {
  const target = new Date();
  target.setDate(target.getDate() + 7);
  target.setHours(23, 59, 59, 0);
  function tick() {
    const diff = target - new Date();
    if (diff <= 0) return;
    document.getElementById('dealDays').textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    document.getElementById('dealHours').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    document.getElementById('dealMins').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    document.getElementById('dealSecs').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
})();
