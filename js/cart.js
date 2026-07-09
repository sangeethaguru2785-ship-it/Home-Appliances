/* ============================================
   Stackly - Cart Page
   ============================================ */
'use strict';

document.getElementById('app-header').innerHTML = renderHeader('products');
document.getElementById('app-footer').innerHTML = renderFooter();
initCommon();

const itemsContainer = document.getElementById('cartPageItems');
const summaryContainer = document.getElementById('cartPageSummary');

function renderCartPage() {
  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-page-empty">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="1.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <a href="products.html" class="btn-primary">Start Shopping</a>
      </div>`;
    summaryContainer.innerHTML = '';
    return;
  }

  itemsContainer.innerHTML = `
    <div class="cart-page-header">
      <h2>Cart Items (${cart.reduce((s, i) => s + i.quantity, 0)})</h2>
    </div>
    <div class="cart-page-list">
      ${cart.map(item => `
        <div class="cart-page-item" data-id="${item.id}">
          <div class="cpi-details">
            <a href="product-detail.html?id=${item.id}" class="cpi-name">${item.name}</a>
            <div class="cpi-category">${item.category}</div>
            <div class="cpi-price">$${item.price.toLocaleString()}</div>
          </div>
          <div class="cpi-quantity">
            <button class="qty-btn" onclick="cartUpdateQty(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="cartUpdateQty(${item.id}, 1)">+</button>
          </div>
          <div class="cpi-total">$${(item.price * item.quantity).toLocaleString()}</div>
          <button class="cpi-remove" onclick="cartRemoveItem(${item.id})">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      `).join('')}
    </div>`;

  const subtotal = getCartTotal();
  const shipping = subtotal >= 99 ? 0 : 15;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  summaryContainer.innerHTML = `
    <div class="cart-summary-card">
      <h3>Order Summary</h3>
      <div class="summary-row"><span>Subtotal</span><span>$${subtotal.toLocaleString()}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:#22c55e">Free</span>' : '$' + shipping.toFixed(2)}</span></div>
      <div class="summary-row"><span>Tax (8%)</span><span>$${tax.toFixed(2)}</span></div>
      <div class="summary-divider"></div>
      <div class="summary-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
      ${subtotal < 99 ? `<p class="shipping-note">Add $${(99 - subtotal).toFixed(0)} more for free shipping!</p>` : '<p class="shipping-note free">You qualify for free shipping!</p>'}
      <a href="404.html" class="btn-primary checkout-btn">Proceed to Checkout</a>
      <a href="products.html" class="continue-shopping">Continue Shopping</a>
    </div>`;
}

// Global handlers for cart page
window.cartUpdateQty = function(id, delta) {
  updateQuantity(id, delta);
  renderCartPage();
};

window.cartRemoveItem = function(id) {
  removeFromCart(id);
  renderCartPage();
};

renderCartPage();
