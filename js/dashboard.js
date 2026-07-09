'use strict';

// ========== AUTH GUARD ==========
if (typeof isLoggedIn !== 'function' || !isLoggedIn()) {
  window.location.href = 'login.html';
}

const authUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

// ========== DATA ==========
let userOrders = JSON.parse(localStorage.getItem('admin_orders')) || [];
let userAddresses = JSON.parse(localStorage.getItem('user_addresses')) || [];
const USER_PROFILE_KEY = 'user_profile';
const defaultName = authUser ? authUser.name.split(' ') : ['User', ''];
let userProfile = JSON.parse(localStorage.getItem(USER_PROFILE_KEY)) || {
  firstName: defaultName[0] || '',
  lastName: defaultName.slice(1).join(' ') || '',
  email: authUser ? authUser.email : '',
  phone: '',
  bio: ''
};

function saveAddresses() {
  localStorage.setItem('user_addresses', JSON.stringify(userAddresses));
}

function saveProfile() {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(userProfile));
}

// Seed sample addresses
if (userAddresses.length === 0) {
  userAddresses.push({
    id: Date.now() + 1,
    label: 'Home',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States'
  });
  userAddresses.push({
    id: Date.now() + 2,
    label: 'Work',
    street: '456 Office Blvd',
    city: 'New York',
    state: 'NY',
    zip: '10002',
    country: 'United States'
  });
  saveAddresses();
}

// ========== SIDEBAR ==========
document.querySelectorAll('.sidebar-nav a').forEach(link => {
  link.addEventListener('click', e => {
    const tab = link.dataset.tab;
    if (!tab) return;
    e.preventDefault();
    document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    switchTab(tab);
    const sidebar = document.getElementById('dashboardSidebar');
    if (window.innerWidth <= 768) sidebar.classList.remove('open');
  });
});

document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('dashboardSidebar').classList.toggle('open');
});

window.switchTab = function(tabId) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  const el = document.getElementById('tab-' + tabId);
  if (el) el.classList.add('active');
  if (tabId === 'overview') renderUserOverview();
  if (tabId === 'orders') renderUserOrders();
  if (tabId === 'wishlist') renderWishlist();
  if (tabId === 'addresses') renderAddresses();
  if (tabId === 'profile') renderProfile();
};

// ========== OVERVIEW ==========
function renderUserOverview() {
  const name = userProfile.firstName || 'User';
  document.getElementById('userDisplayName').textContent = name;
  const initial = (userProfile.firstName?.[0] || authUser?.name?.[0] || 'U').toUpperCase();
  document.getElementById('userAvatar').textContent = initial;
  document.getElementById('userSidebarEmail').textContent = userProfile.email || authUser?.email || '';

  const orderCount = userOrders.length;
  const addrCount = userAddresses.length;
  const completedOrders = userOrders.filter(o => o.status === 'completed').length;

  document.getElementById('userStats').innerHTML = `
    <div class="stat-card"><div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div class="stat-value">${orderCount}</div><div class="stat-label">Total Orders</div></div>
    <div class="stat-card"><div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div class="stat-value">${addrCount}</div><div class="stat-label">Saved Addresses</div></div>
    <div class="stat-card"><div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg></div><div class="stat-value">${completedOrders}</div><div class="stat-label">Completed Orders</div></div>
  `;

  // Activity summary
  const lastOrder = userOrders.length ? userOrders[userOrders.length - 1] : null;
  document.getElementById('lastOrderTime').textContent = lastOrder ? lastOrder.date : 'No orders yet';
  document.getElementById('completedCount').textContent = completedOrders;

  // Recent orders
  const recent = userOrders.slice(-3).reverse();
  document.getElementById('recentOrdersList').innerHTML = recent.length
    ? recent.map(o => `
      <div class="order-card">
        <div class="order-card-header">
          <span class="order-id">${o.id}</span>
          <span class="order-date">${o.date}</span>
        </div>
        <div class="order-items">
          ${o.items.map(it => `
            <div class="order-item-row">
              <span class="order-item-name">${it.name} × ${it.qty}</span>
              <span class="order-item-total">$${(it.price * it.qty).toLocaleString()}</span>
            </div>
          `).join('')}
        </div>
        <div class="order-card-footer">
          <span class="status-badge ${o.status}">${o.status}</span>
          <span class="order-total">$${o.total.toLocaleString()}</span>
        </div>
      </div>
    `).join('')
    : '<div class="empty-state"><p>No orders yet. Start shopping!</p></div>';
  renderUserCharts();
}

// ========== CHARTS ==========
let userCharts = {};

function renderUserCharts() {
  if (typeof Chart === 'undefined') return;

  Object.values(userCharts).forEach(c => { if (c) c.destroy(); });

  // --- Order Status Doughnut ---
  const statusCounts = {};
  userOrders.forEach(o => { statusCounts[o.status] = (statusCounts[o.status] || 0) + 1; });
  const statusLabels = Object.keys(statusCounts);
  const statusData = Object.values(statusCounts);
  const statusColors = {
    pending: '#eab308', processing: '#c7a254',
    shipped: '#3b82f6', completed: '#22c55e', cancelled: '#ef4444'
  };

  const ctx1 = document.getElementById('userStatusChart');
  if (ctx1) {
    userCharts.status = new Chart(ctx1, {
      type: 'doughnut',
      data: {
        labels: statusLabels.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
        datasets: [{
          data: statusData,
          backgroundColor: statusLabels.map(s => statusColors[s] || '#888'),
          borderColor: '#1a1a24',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#ccc', padding: 16, font: { size: 11 } }
          }
        }
      }
    });
  }

  // --- Spending Bar Chart ---
  const recentOrders = [...userOrders].reverse().slice(0, 6);
  const orderLabels = recentOrders.map(o => o.id);
  const orderTotals = recentOrders.map(o => o.total);

  const ctx2 = document.getElementById('userSpendingChart');
  if (ctx2) {
    userCharts.spending = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: orderLabels,
        datasets: [{
          label: 'Order Total ($)',
          data: orderTotals,
          backgroundColor: 'rgba(199, 162, 84, 0.6)',
          borderColor: '#c7a254',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { color: '#888', font: { size: 10 } },
            grid: { color: 'rgba(255,255,255,0.04)' }
          },
          y: {
            ticks: { color: '#888', font: { size: 11 } },
            grid: { color: 'rgba(255,255,255,0.04)' }
          }
        }
      }
    });
  }
}

// ========== ORDERS ==========
function renderUserOrders() {
  const list = document.getElementById('ordersList');
  if (!userOrders.length) {
    list.innerHTML = '<div class="empty-state"><h3>No Orders Yet</h3><p>Your order history will appear here once you make a purchase.</p><a href="products.html" class="btn-dash primary">Start Shopping</a></div>';
    return;
  }
  list.innerHTML = [...userOrders].reverse().map(o => `
    <div class="order-card">
      <div class="order-card-header">
        <span class="order-id">${o.id}</span>
        <span class="order-date">${o.date}</span>
      </div>
      <div class="order-items">
        ${o.items.map(it => `
          <div class="order-item-row">
            <span class="order-item-name">${it.name} × ${it.qty}</span>
            <span class="order-item-total">$${(it.price * it.qty).toLocaleString()}</span>
          </div>
        `).join('')}
      </div>
      <div class="order-card-footer">
        <span class="status-badge ${o.status}">${o.status}</span>
        <span class="order-total">$${o.total.toLocaleString()}</span>
      </div>
    </div>
  `).join('');
}

// ========== WISHLIST ==========
function renderWishlist() {
  const grid = document.getElementById('wishlistGrid');
  const wishlistIds = JSON.parse(localStorage.getItem('Stackly_wishlist')) || [];
  if (!wishlistIds.length) {
    grid.innerHTML = '<div class="empty-state"><h3>Your Wishlist is Empty</h3><p>Browse products and add items to your wishlist.</p><a href="products.html" class="btn-dash primary">Browse Products</a></div>';
    return;
  }
  const allProducts = typeof products !== 'undefined' ? products : JSON.parse(localStorage.getItem('admin_products')) || [];
  const items = allProducts.filter(p => wishlistIds.includes(p.id));
  if (!items.length) {
    grid.innerHTML = '<div class="empty-state"><h3>Wishlist items not found</h3><p>The products you saved may have been removed.</p></div>';
    return;
  }
  grid.innerHTML = items.map(p => `
    <div class="product-card">
      <div class="product-image">
        ${p.image ? `<img src="${p.image}" alt="${p.name}">` : (p.svg || '')}
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <a href="product-detail.html?id=${p.id}" class="product-name">${p.name}</a>
        <div class="product-rating">
          <span class="stars">${'\u2605'.repeat(Math.floor(p.rating))}${'\u2606'.repeat(5 - Math.floor(p.rating))}</span>
          <span>(${p.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">$${p.price.toLocaleString()}</span>
          ${p.originalPrice ? `<span class="price-original">$${p.originalPrice.toLocaleString()}</span>` : ''}
        </div>
        <button class="add-to-cart" onclick="removeFromWishlist(${p.id})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          Remove
        </button>
      </div>
    </div>
  `).join('');
}

window.removeFromWishlist = function(productId) {
  let wishlist = JSON.parse(localStorage.getItem('Stackly_wishlist')) || [];
  wishlist = wishlist.filter(id => id !== productId);
  localStorage.setItem('Stackly_wishlist', JSON.stringify(wishlist));
  renderWishlist();
  showToast('Removed from wishlist');
};

// ========== ADDRESSES ==========
function renderAddresses() {
  const grid = document.getElementById('addressGrid');
  if (!userAddresses.length) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><h3>No Addresses Saved</h3><p>Add a shipping address for faster checkout.</p></div>';
    return;
  }
  grid.innerHTML = userAddresses.map((a, i) => `
    <div class="address-card">
      <span class="address-type">${a.label}</span>
      <p>${a.street}<br>${a.city}, ${a.state} ${a.zip}<br>${a.country}</p>
      <div class="address-actions">
        <button class="btn-dash secondary sm" onclick="editAddress(${i})">Edit</button>
        <button class="btn-dash danger sm" onclick="deleteAddress(${i})">Delete</button>
      </div>
    </div>
  `).join('');
}

window.deleteAddress = function(index) {
  if (!confirm('Delete this address?')) return;
  userAddresses.splice(index, 1);
  saveAddresses();
  renderAddresses();
  showToast('Address deleted.');
};

window.editAddress = function(index) {
  const a = userAddresses[index];
  document.getElementById('addrLabel').value = a.label;
  document.getElementById('addrStreet').value = a.street;
  document.getElementById('addrCity').value = a.city;
  document.getElementById('addrState').value = a.state;
  document.getElementById('addrZip').value = a.zip;
  document.getElementById('addrCountry').value = a.country;
  document.getElementById('addressModal').dataset.editIndex = index;
  document.getElementById('addressModal').classList.add('open');
};

document.getElementById('addAddressBtn').addEventListener('click', () => {
  ['addrLabel','addrStreet','addrCity','addrState','addrZip','addrCountry'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('addressModal').dataset.editIndex = '';
  document.getElementById('addressModal').classList.add('open');
});

document.getElementById('addressModalClose').addEventListener('click', () => {
  document.getElementById('addressModal').classList.remove('open');
});
document.getElementById('addressModalCancel').addEventListener('click', () => {
  document.getElementById('addressModal').classList.remove('open');
});

document.getElementById('addressModalSave').addEventListener('click', () => {
  const label = document.getElementById('addrLabel').value.trim();
  const street = document.getElementById('addrStreet').value.trim();
  const city = document.getElementById('addrCity').value.trim();
  const state = document.getElementById('addrState').value.trim();
  const zip = document.getElementById('addrZip').value.trim();
  const country = document.getElementById('addrCountry').value.trim();

  if (!label || !street || !city || !state || !zip || !country) {
    showToast('Please fill in all fields.');
    return;
  }

  const modal = document.getElementById('addressModal');
  const editIndex = modal.dataset.editIndex;

  const addr = { id: Date.now(), label, street, city, state, zip, country };

  if (editIndex !== undefined && editIndex !== '') {
    userAddresses[parseInt(editIndex)] = addr;
    showToast('Address updated.');
  } else {
    userAddresses.push(addr);
    showToast('Address added.');
  }

  saveAddresses();
  modal.classList.remove('open');
  renderAddresses();
});

// ========== PROFILE ==========
function renderProfile() {
  const initials = (userProfile.firstName?.[0] || 'U') + (userProfile.lastName?.[0] || '');
  document.getElementById('profileAvatar').textContent = initials || 'U';
  document.getElementById('profileName').textContent = userProfile.firstName + ' ' + userProfile.lastName;
  document.getElementById('profileEmail').textContent = userProfile.email;
  document.getElementById('pfFirstName').value = userProfile.firstName || '';
  document.getElementById('pfLastName').value = userProfile.lastName || '';
  document.getElementById('pfEmail').value = userProfile.email || '';
  document.getElementById('pfPhone').value = userProfile.phone || '';
  document.getElementById('pfBio').value = userProfile.bio || '';
}

document.getElementById('saveProfileBtn').addEventListener('click', () => {
  const firstName = document.getElementById('pfFirstName').value.trim();
  const lastName = document.getElementById('pfLastName').value.trim();
  const email = document.getElementById('pfEmail').value.trim();
  const phone = document.getElementById('pfPhone').value.trim();
  const bio = document.getElementById('pfBio').value.trim();

  if (!firstName || !lastName || !email) {
    showToast('Please fill in required fields.');
    return;
  }

  if (typeof isValidName === 'function' && (!isValidName(firstName) || !isValidName(lastName))) {
    showToast('Name must contain only letters.');
    return;
  }

  if (typeof isValidEmail === 'function' && !isValidEmail(email)) {
    showToast('Please enter a valid email address.');
    return;
  }

  userProfile = { firstName, lastName, email, phone, bio };
  saveProfile();
  renderProfile();
  renderUserOverview();
  showToast('Profile updated!');
});

// ========== INIT ==========
renderUserOverview();
renderUserOrders();
renderWishlist();
renderAddresses();
renderProfile();

// ========== LOGOUT ==========
document.getElementById('logoutBtn').addEventListener('click', e => {
  e.preventDefault();
  if (typeof logoutUser === 'function') logoutUser();
  window.location.href = 'login.html';
});

// Init
initCommon();
