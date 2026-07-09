# Remove Wishlist Section from User Dashboard

## Files to Modify

### 1. `user-dashboard.html`

**a) Remove sidebar nav item**
- Remove line containing `<li><a href="#" data-tab="wishlist">...Wishlist</a></li>`

**b) Remove wishlist tab content**
- Remove the entire block from `<!-- Wishlist -->` to the closing `</div>` before `<!-- Addresses -->`

**c) Remove wishlist quick action card**
- Remove the third `<a>` card (the one with the heart SVG that links to `switchTab('wishlist')`)

### 2. `js/dashboard.js`

**a) Remove switch case**
- Remove line: `if (tabId === 'wishlist') renderWishlist();`

**b) Remove functions**
- Remove the entire `renderWishlist()` function
- Remove the `window.removeFromWishlist()` function

**c) Remove init call**
- Remove line: `renderWishlist();`
