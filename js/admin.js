'use strict';

// ========== AUTH GUARD ==========
if (typeof isLoggedIn !== 'function' || !isLoggedIn()) {
  window.location.href = 'login.html';
}

const authUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

// ========== DATA ==========
let adminProducts = JSON.parse(localStorage.getItem('admin_products')) || JSON.parse(JSON.stringify(products));
let adminOrders = JSON.parse(localStorage.getItem('admin_orders')) || [];
let editingProductId = null;

function saveProducts() {
  localStorage.setItem('admin_products', JSON.stringify(adminProducts));
}

function saveOrders() {
  localStorage.setItem('admin_orders', JSON.stringify(adminOrders));
}

// Generate sample orders if none exist
function seedOrders() {
  if (adminOrders.length === 0) {
    const names = ['Sarah Mitchell', 'Robert Johnson', 'Emily Lewis', 'David Chen', 'Amanda Wilson', 'James Taylor'];
    const statuses = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];
    for (let i = 0; i < 8; i++) {
      const itemCount = 1 + Math.floor(Math.random() * 3);
      const items = [];
      let total = 0;
      for (let j = 0; j < itemCount; j++) {
        const p = adminProducts[Math.floor(Math.random() * adminProducts.length)];
        const qty = 1 + Math.floor(Math.random() * 2);
        const price = p.price;
        items.push({ name: p.name, qty, price });
        total += price * qty;
      }
      const d = new Date();
      d.setDate(d.getDate() - Math.floor(Math.random() * 30));
      adminOrders.push({
        id: 'ORD-' + String(1000 + i),
        customer: names[i % names.length],
        items,
        total: Math.round(total),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      });
    }
    saveOrders();
  }
}
seedOrders();

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
  if (tabId === 'overview') renderAdminStats();
  if (tabId === 'products') renderProductsTable();
  if (tabId === 'orders') renderOrdersTable();
  if (tabId === 'analytics') renderAnalytics();
  if (tabId === 'settings') renderSettings();
};

// ========== DASHBOARD STATS ==========
function renderAdminStats() {
  if (authUser) {
    document.getElementById('adminDisplayName').textContent = authUser.name || 'Admin';
    document.getElementById('adminAvatar').textContent = (authUser.name?.[0] || 'A').toUpperCase();
    document.getElementById('adminSidebarEmail').textContent = authUser.email;
  }
  const totalProducts = adminProducts.length;
  const totalOrders = adminOrders.length;
  const revenue = adminOrders.reduce((s, o) => s + (o.status !== 'cancelled' ? o.total : 0), 0);
  const customers = [...new Set(adminOrders.map(o => o.customer))].length;

  document.getElementById('adminStats').innerHTML = `
    <div class="stat-card"><div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></div><div class="stat-value">${totalProducts}</div><div class="stat-label">Total Products</div></div>
    <div class="stat-card"><div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div class="stat-value">${totalOrders}</div><div class="stat-label">Total Orders</div></div>
    <div class="stat-card"><div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div><div class="stat-value">$${revenue.toLocaleString()}</div><div class="stat-label">Revenue</div></div>
    <div class="stat-card"><div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div><div class="stat-value">${customers}</div><div class="stat-label">Customers</div></div>
  `;

  // Recent orders table
  const recent = adminOrders.slice(-5).reverse();
  document.getElementById('recentOrdersTable').innerHTML = recent.map(o => `
    <tr><td>${o.id}</td><td>${o.customer}</td><td>${o.items.length}</td><td>$${o.total.toLocaleString()}</td><td><span class="status-badge ${o.status}">${o.status}</span></td><td>${o.date}</td></tr>
  `).join('');
  renderAdminCharts();
}

// ========== CHARTS ==========
let adminCharts = {};

function renderAdminCharts() {
  if (typeof Chart === 'undefined') return;

  // Destroy previous instances
  Object.values(adminCharts).forEach(c => { if (c) c.destroy(); });

  // --- Revenue Line Chart ---
  const months = [];
  const revenueData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    months.push(d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const monthRev = adminOrders
      .filter(o => o.status !== 'cancelled')
      .reduce((s, o) => {
        const od = new Date(o.date);
        return od >= start && od <= end ? s + o.total : s;
      }, 0);
    revenueData.push(monthRev);
  }

  const ctx1 = document.getElementById('adminRevenueChart');
  if (ctx1) {
    adminCharts.revenue = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Revenue ($)',
          data: revenueData,
          borderColor: '#c7a254',
          backgroundColor: 'rgba(199, 162, 84, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#c7a254',
          pointBorderColor: '#c7a254',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#888', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
          y: { ticks: { color: '#888', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.04)' } }
        }
      }
    });
  }

  // --- Order Status Doughnut ---
  const statusCounts = {};
  adminOrders.forEach(o => { statusCounts[o.status] = (statusCounts[o.status] || 0) + 1; });
  const statusLabels = Object.keys(statusCounts);
  const statusData = Object.values(statusCounts);
  const statusColors = {
    pending: '#eab308', processing: '#c7a254',
    shipped: '#3b82f6', completed: '#22c55e', cancelled: '#ef4444'
  };

  const ctx2 = document.getElementById('adminStatusChart');
  if (ctx2) {
    adminCharts.status = new Chart(ctx2, {
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
}

// ========== PRODUCTS ==========
function renderProductsTable() {
  const search = (document.getElementById('productSearch').value || '').toLowerCase();
  const cat = document.getElementById('categoryFilter').value;
  let filtered = adminProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search);
    const matchCat = cat === 'all' || p.category === cat;
    return matchSearch && matchCat;
  });

  document.getElementById('productsTable').innerHTML = filtered.map((p, i) => `
    <tr>
      <td><div class="product-cell">${p.svg || ''}<div><div class="p-name">${p.name}</div><div class="p-category">${p.category}</div></div></div></td>
      <td style="text-transform:capitalize">${p.category}</td>
      <td>$${p.price.toLocaleString()}</td>
      <td>${'\u2605'.repeat(Math.floor(p.rating))} ${p.rating}</td>
      <td>
        <button class="action-btn" onclick="editProduct(${i})" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
        <button class="action-btn danger" onclick="deleteProduct(${i})" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="5" style="text-align:center;padding:32px;color:var(--text-muted)">No products found.</td></tr>';
}

document.getElementById('productSearch').addEventListener('input', renderProductsTable);
document.getElementById('categoryFilter').addEventListener('change', renderProductsTable);

window.deleteProduct = function(index) {
  if (!confirm('Delete this product?')) return;
  adminProducts.splice(index, 1);
  saveProducts();
  renderProductsTable();
  showToast('Product deleted.');
};

window.editProduct = function(index) {
  const p = adminProducts[index];
  editingProductId = index;
  document.getElementById('modalTitle').textContent = 'Edit Product';
  document.getElementById('prodName').value = p.name;
  document.getElementById('prodCategory').value = p.category;
  document.getElementById('prodPrice').value = p.price;
  document.getElementById('prodOriginalPrice').value = p.originalPrice || '';
  document.getElementById('prodRating').value = p.rating;
  document.getElementById('prodReviews').value = p.reviews;
  document.getElementById('prodBadge').value = p.badge || 'none';
  document.getElementById('prodIcon').value = p.icon || '';
  document.getElementById('productModal').classList.add('open');
};

function openAddProductModal() {
  editingProductId = null;
  document.getElementById('modalTitle').textContent = 'Add Product';
  ['prodName','prodCategory','prodPrice','prodOriginalPrice','prodRating','prodReviews','prodBadge','prodIcon'].forEach(id => {
    const el = document.getElementById(id);
    if (id === 'prodCategory') el.value = 'kitchen';
    else if (id === 'prodBadge') el.value = 'none';
    else if (id === 'prodRating') el.value = '';
    else if (id === 'prodReviews') el.value = '';
    else el.value = '';
  });
  document.getElementById('productModal').classList.add('open');
}

document.getElementById('addProductBtn').addEventListener('click', openAddProductModal);

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('productModal').classList.remove('open');
});
document.getElementById('modalCancel').addEventListener('click', () => {
  document.getElementById('productModal').classList.remove('open');
});

document.getElementById('modalSave').addEventListener('click', () => {
  const name = document.getElementById('prodName').value.trim();
  const category = document.getElementById('prodCategory').value;
  const price = parseFloat(document.getElementById('prodPrice').value);
  const originalPrice = document.getElementById('prodOriginalPrice').value ? parseFloat(document.getElementById('prodOriginalPrice').value) : null;
  const rating = parseFloat(document.getElementById('prodRating').value) || 4;
  const reviews = parseInt(document.getElementById('prodReviews').value) || 0;
  const badge = document.getElementById('prodBadge').value;
  const icon = document.getElementById('prodIcon').value.trim();

  if (!name || !price) {
    showToast('Please fill in name and price.');
    return;
  }

  const product = {
    id: editingProductId !== null ? adminProducts[editingProductId].id : Date.now(),
    name, category, price, originalPrice, rating, reviews,
    badge: badge === 'none' ? null : badge, icon,
    svg: getProductSVG(icon || 'default'),
    description: `Premium ${name} — designed for modern living.`
  };

  if (editingProductId !== null) {
    adminProducts[editingProductId] = product;
    showToast('Product updated.');
  } else {
    adminProducts.unshift(product);
    showToast('Product added.');
  }

  saveProducts();
  document.getElementById('productModal').classList.remove('open');
  renderProductsTable();
});

function getProductSVG(icon) {
  const icons = {
    oven: '<svg viewBox="0 0 120 120" width="120" height="120"><rect x="20" y="30" width="80" height="60" rx="4" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="28" y="38" width="64" height="36" rx="2" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/><circle cx="60" cy="56" r="8" fill="none" stroke="#c7a254" stroke-width="1.5"/><line x1="60" y1="64" x2="60" y2="74" stroke="#c7a254" stroke-width="1.5"/><rect x="44" y="20" width="8" height="14" rx="2" fill="#c7a254" opacity="0.6"/><rect x="68" y="20" width="8" height="14" rx="2" fill="#c7a254" opacity="0.6"/></svg>',
    washer: '<svg viewBox="0 0 120 120" width="120" height="120"><rect x="25" y="35" width="70" height="50" rx="5" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="30" y="20" width="12" height="20" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="78" y="20" width="12" height="20" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="60" r="12" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/><path d="M56 60h8M60 56v8" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/></svg>',
    fridge: '<svg viewBox="0 0 120 120" width="120" height="120"><rect x="30" y="25" width="60" height="70" rx="4" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="34" y="30" width="52" height="40" rx="2" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/><rect x="34" y="78" width="52" height="12" rx="2" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="50" r="6" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>',
    speaker: '<svg viewBox="0 0 120 120" width="120" height="120"><rect x="35" y="15" width="50" height="90" rx="6" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="42" r="14" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/><circle cx="60" cy="42" r="5" fill="#c7a254" opacity="0.6"/><rect x="45" y="70" width="30" height="20" rx="3" fill="none" stroke="#c7a254" stroke-width="1.5"/></svg>',
    ac: '<svg viewBox="0 0 120 120" width="120" height="120"><rect x="14" y="16" width="36" height="36" rx="4" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="20" y="22" width="24" height="24" rx="3" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/><circle cx="32" cy="34" r="5" fill="none" stroke="#c7a254" stroke-width="1.5"/><path d="M32 22v-4M20 34h-4M48 34h-4" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/></svg>',
    default: '<svg viewBox="0 0 120 120" width="120" height="120"><rect x="20" y="30" width="80" height="60" rx="8" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="60" r="15" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/><path d="M55 60h10M60 55v10" stroke="#c7a254" stroke-width="1.5" stroke-linecap="round"/></svg>',
    cooktop: '<svg viewBox="0 0 120 120" width="120" height="120"><rect x="15" y="40" width="90" height="50" rx="4" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="40" cy="65" r="12" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/><circle cx="80" cy="65" r="12" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/></svg>',
    dryer: '<svg viewBox="0 0 120 120" width="120" height="120"><rect x="30" y="20" width="60" height="80" rx="8" fill="none" stroke="#c7a254" stroke-width="1.5"/><circle cx="60" cy="55" r="18" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/><circle cx="60" cy="55" r="5" fill="#c7a254" opacity="0.4"/></svg>',
    vacuum: '<svg viewBox="0 0 120 120" width="120" height="120"><circle cx="60" cy="85" r="18" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="52" y="25" width="16" height="45" rx="4" fill="none" stroke="#c7a254" stroke-width="1.5"/><rect x="56" y="20" width="8" height="12" rx="2" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/></svg>',
    light: '<svg viewBox="0 0 120 120" width="120" height="120"><circle cx="60" cy="50" r="20" fill="none" stroke="#c7a254" stroke-width="1.5"/><line x1="60" y1="70" x2="60" y2="90" stroke="#c7a254" stroke-width="1.5"/><line x1="45" y1="80" x2="75" y2="80" stroke="#c7a254" stroke-width="1.5"/></svg>'
  };
  return icons[icon] || icons.default;
}

// ========== ORDERS ==========
function renderOrdersTable() {
  const filter = document.getElementById('orderStatusFilter').value;
  const filtered = filter === 'all' ? adminOrders : adminOrders.filter(o => o.status === filter);

  document.getElementById('ordersTable').innerHTML = filtered.map((o, i) => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.customer}</td>
      <td>${o.items.map(it => `${it.name} × ${it.qty}`).join(', ')}</td>
      <td>$${o.total.toLocaleString()}</td>
      <td><span class="status-badge ${o.status}">${o.status}</span></td>
      <td>${o.date}</td>
      <td>
        <select onchange="updateOrderStatus(${i}, this.value)" style="background:var(--dark-3);border:1px solid var(--dark-4);border-radius:6px;padding:4px 8px;color:var(--text);font-size:0.8rem;font-family:inherit">
          <option value="pending" ${o.status==='pending'?'selected':''}>Pending</option>
          <option value="processing" ${o.status==='processing'?'selected':''}>Processing</option>
          <option value="shipped" ${o.status==='shipped'?'selected':''}>Shipped</option>
          <option value="completed" ${o.status==='completed'?'selected':''}>Completed</option>
          <option value="cancelled" ${o.status==='cancelled'?'selected':''}>Cancelled</option>
        </select>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="7" style="text-align:center;padding:32px;color:var(--text-muted)">No orders found.</td></tr>';
}

document.getElementById('orderStatusFilter').addEventListener('change', renderOrdersTable);

window.updateOrderStatus = function(index, status) {
  adminOrders[index].status = status;
  saveOrders();
  renderOrdersTable();
  showToast('Order status updated.');
};

// ========== ANALYTICS ==========
function renderAnalytics() {
  const totalRevenue = adminOrders.reduce((s, o) => s + (o.status !== 'cancelled' ? o.total : 0), 0);
  const avgOrder = adminOrders.filter(o => o.status !== 'cancelled').reduce((s, o, _, a) => a.length ? s + o.total / a.length : 0, 0);
  const pendingOrders = adminOrders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const completedOrders = adminOrders.filter(o => o.status === 'completed').length;

  document.getElementById('analyticsStats').innerHTML = `
    <div class="stat-card"><div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div><div class="stat-value">$${totalRevenue.toLocaleString()}</div><div class="stat-label">Total Revenue</div></div>
    <div class="stat-card"><div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div class="stat-value">$${Math.round(avgOrder).toLocaleString()}</div><div class="stat-label">Avg. Order Value</div></div>
    <div class="stat-card"><div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div><div class="stat-value">${pendingOrders}</div><div class="stat-label">Pending Orders</div></div>
    <div class="stat-card"><div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg></div><div class="stat-value">${completedOrders}</div><div class="stat-label">Completed Orders</div></div>
  `;

  // Category performance
  const cats = ['kitchen', 'laundry', 'cooling', 'smart'];
  document.getElementById('categoryPerfTable').innerHTML = cats.map(cat => {
    const prods = adminProducts.filter(p => p.category === cat);
    const rev = adminOrders.reduce((s, o) => {
      if (o.status === 'cancelled') return s;
      return s + o.items.filter(it => prods.some(p => p.name === it.name)).reduce((ss, it) => ss + it.price * it.qty, 0);
    }, 0);
    return `<tr><td style="text-transform:capitalize">${cat}</td><td>${prods.length}</td><td>$${rev.toLocaleString()}</td></tr>`;
  }).join('');

  // Top rated products
  const sorted = [...adminProducts].sort((a, b) => b.rating - a.rating).slice(0, 5);
  document.getElementById('topRatedTable').innerHTML = sorted.map(p => `
    <tr><td>${p.name}</td><td>${'\u2605'.repeat(Math.floor(p.rating))} ${p.rating}</td><td>${p.reviews}</td></tr>
  `).join('');
}

// ========== SETTINGS ==========
const SETTINGS_KEY = 'admin_store_settings';
const defaultSettings = { storeName: 'Stackly', storeEmail: 'admin@stackly.com', currency: 'USD', taxRate: '8', freeShippingThreshold: '99' };

function renderSettings() {
  const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || defaultSettings;
  document.getElementById('storeName').value = saved.storeName || '';
  document.getElementById('storeEmail').value = saved.storeEmail || '';
  document.getElementById('storeCurrency').value = saved.currency || 'USD';
  document.getElementById('taxRate').value = saved.taxRate || '8';
  document.getElementById('freeShippingThreshold').value = saved.freeShippingThreshold || '99';
}

document.querySelector('#tab-settings .btn-dash.primary').addEventListener('click', () => {
  const storeEmail = document.getElementById('storeEmail').value.trim();
  if (typeof isValidEmail === 'function' && !isValidEmail(storeEmail)) {
    showToast('Please enter a valid store email address.');
    return;
  }
  const settings = {
    storeName: document.getElementById('storeName').value.trim(),
    storeEmail: storeEmail,
    currency: document.getElementById('storeCurrency').value,
    taxRate: document.getElementById('taxRate').value,
    freeShippingThreshold: document.getElementById('freeShippingThreshold').value
  };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  showToast('Settings saved successfully!');
});

// ========== LOGOUT ==========
document.getElementById('logoutBtn').addEventListener('click', e => {
  e.preventDefault();
  if (typeof logoutUser === 'function') logoutUser();
  window.location.href = 'login.html';
});

// ========== INIT ==========
renderAdminStats();
renderProductsTable();
renderOrdersTable();

// Init
initCommon();
