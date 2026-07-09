/* ============================================
   Stackly - Product Detail Page
   ============================================ */
'use strict';

document.getElementById('app-header').innerHTML = renderHeader('products');
document.getElementById('app-footer').innerHTML = renderFooter();
initCommon();

const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id'));
const product = products.find(p => p.id === productId);

const container = document.getElementById('detailContainer');

if (!product) {
  container.innerHTML = `
    <div class="detail-not-found">
      <h2>Product not found</h2>
      <p>The product you're looking for doesn't exist.</p>
      <a href="products.html" class="btn-primary">Browse Products</a>
    </div>`;
} else {
  const stars = '\u2605'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '\u00BD' : '');
  const hasSale = product.originalPrice !== null;
  const discount = hasSale ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  container.innerHTML = `
    <div class="detail-layout">
      <div class="detail-gallery reveal">
        <div class="detail-main-image">${product.image ? `<img src="${product.image}" alt="${product.name}">` : product.svg}</div>
      </div>
      <div class="detail-info reveal">
        <div class="detail-category">${product.category}</div>
        <h1 class="detail-title">${product.name}</h1>
        <div class="detail-rating">
          <span class="stars">${stars}</span>
          <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
        </div>
        <div class="detail-price">
          <span class="price-current">$${product.price.toLocaleString()}</span>
          ${hasSale ? `<span class="price-original">$${product.originalPrice.toLocaleString()}</span><span class="price-badge">Save ${discount}%</span>` : ''}
        </div>
        <p class="detail-description">${product.description}</p>
        <div class="detail-specs">
          <h3>Key Features</h3>
          <ul>${product.specs.map(s => `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c7a254" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${s}</li>`).join('')}</ul>
        </div>
        <div class="detail-actions">
          <button class="btn-primary add-to-cart" data-id="${product.id}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Add to Cart — $${product.price.toLocaleString()}
          </button>
          <button class="btn-secondary wishlist-btn-detail">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            Add to Wishlist
          </button>
        </div>
        <div class="detail-meta">
          <div class="meta-item"><strong>SKU:</strong> HE-${product.id.toString().padStart(4, '0')}</div>
          <div class="meta-item"><strong>Category:</strong> ${product.category}</div>
          <div class="meta-item"><strong>Availability:</strong> <span style="color:#22c55e">In Stock</span></div>
        </div>
      </div>
    </div>`;

  // Make reveal elements visible (rendered after observer was set up)
  container.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

  // Add to cart
  container.querySelector('.add-to-cart')?.addEventListener('click', () => addToCart(product));

  // Wishlist
  container.querySelector('.wishlist-btn-detail')?.addEventListener('click', function() {
    const svg = this.querySelector('svg');
    let wishlist = JSON.parse(localStorage.getItem('Stackly_wishlist')) || [];
    const exists = wishlist.includes(product.id);
    if (exists) {
      wishlist = wishlist.filter(id => id !== product.id);
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      showToast('Removed from wishlist');
    } else {
      wishlist.push(product.id);
      svg.setAttribute('fill', '#ef4444');
      svg.setAttribute('stroke', '#ef4444');
      showToast('Added to wishlist!');
    }
    localStorage.setItem('Stackly_wishlist', JSON.stringify(wishlist));
  });
}

// Related products (same category, exclude current)
const related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);
const relatedGrid = document.getElementById('relatedProducts');
if (relatedGrid) {
  if (related.length > 0) {
    relatedGrid.innerHTML = related.map((p, i) => getProductCardHTML(p, i)).join('');
    setTimeout(() => {
      relatedGrid.querySelectorAll('.product-card').forEach(c => c.classList.add('visible'));
    }, 100);
    relatedGrid.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const p = products.find(pr => pr.id === id);
        if (p) addToCart(p);
      });
    });
  } else {
    relatedGrid.innerHTML = '';
    document.querySelector('.products .section-header')?.remove();
  }
}
