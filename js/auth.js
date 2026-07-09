'use strict';

const AUTH_USERS_KEY = 'Stackly_users';
const AUTH_CURRENT_KEY = 'Stackly_current_user';

function getUsers() {
  try {
    const raw = localStorage.getItem(AUTH_USERS_KEY);
    if (!raw) return [];
    const users = JSON.parse(raw);
    if (!Array.isArray(users)) return [];
    let migrated = false;
    users.forEach(u => { if (!u.role) { u.role = 'user'; migrated = true; } });
    if (migrated) saveUsers(users);
    return users;
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function isLoggedIn() {
  return sessionStorage.getItem(AUTH_CURRENT_KEY) !== null;
}

function getCurrentUser() {
  const data = sessionStorage.getItem(AUTH_CURRENT_KEY);
  if (!data) return null;
  const user = JSON.parse(data);
  if (!user.role) { user.role = 'user'; sessionStorage.setItem(AUTH_CURRENT_KEY, JSON.stringify(user)); }
  return user;
}

function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return false;
  sessionStorage.setItem(AUTH_CURRENT_KEY, JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }));
  return user;
}

function registerUser(name, email, password, role) {
  const users = getUsers();
  if (users.find(u => u.email === email)) return null;
  const newUser = { id: Date.now(), name, email, password, role: role || 'user', createdAt: new Date().toISOString() };
  users.push(newUser);
  saveUsers(users);
  sessionStorage.setItem(AUTH_CURRENT_KEY, JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }));
  return newUser;
}

function logoutUser() {
  sessionStorage.removeItem(AUTH_CURRENT_KEY);
}

function getRedirectURL(role) {
  return role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
}

// ========== ROLE TOGGLE ==========
document.querySelectorAll('.role-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

function getSelectedRole() {
  const active = document.querySelector('.role-btn.active');
  return active ? active.dataset.role : 'user';
}

// ========== LOGIN PAGE ==========
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  if (isLoggedIn()) {
    const user = getCurrentUser();
    window.location.href = getRedirectURL(user ? user.role : 'user');
  }

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const errorEl = document.getElementById('loginError');

    if (!email || !password) {
      errorEl.textContent = 'Please fill in all fields.';
      errorEl.classList.add('show');
      return;
    }

    if (typeof isValidEmail === 'function' && !isValidEmail(email)) {
      errorEl.textContent = 'Please enter a valid email address.';
      errorEl.classList.add('show');
      return;
    }

    const selectedRole = getSelectedRole();
    sessionStorage.setItem(AUTH_CURRENT_KEY, JSON.stringify({ id: Date.now(), name: email.split('@')[0], email, role: selectedRole }));
    window.location.href = getRedirectURL(selectedRole);
  });
}

// ========== SIGNUP PAGE ==========
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  if (isLoggedIn()) {
    const user = getCurrentUser();
    window.location.href = getRedirectURL(user ? user.role : 'user');
  }

  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    const role = getSelectedRole();
    const errorEl = document.getElementById('signupError');

    if (!name || !email || !password || !confirm) {
      errorEl.textContent = 'Please fill in all fields.';
      errorEl.classList.add('show');
      return;
    }

    if (typeof isValidName === 'function' && !isValidName(name)) {
      errorEl.textContent = 'Name must contain only letters.';
      errorEl.classList.add('show');
      return;
    }

    if (typeof isValidEmail === 'function' && !isValidEmail(email)) {
      errorEl.textContent = 'Please enter a valid email address.';
      errorEl.classList.add('show');
      return;
    }

    if (typeof isValidPassword === 'function' && !isValidPassword(password)) {
      errorEl.textContent = 'Password must contain uppercase, lowercase, numbers, and at least one special character.';
      errorEl.classList.add('show');
      return;
    }

    if (password !== confirm) {
      errorEl.textContent = 'Passwords do not match.';
      errorEl.classList.add('show');
      return;
    }

    const user = registerUser(name, email, password, role);
    if (user === null) {
      errorEl.textContent = 'An account with this email already exists.';
      errorEl.classList.add('show');
      return;
    }

    window.location.href = getRedirectURL(role);
  });
}

// ========== HEADER / FOOTER (auth pages only) ==========
if (document.getElementById('loginForm') || document.getElementById('signupForm')) {
  document.getElementById('app-header').innerHTML = renderHeader('login');
  document.getElementById('app-footer').innerHTML = renderFooter();
  initCommon();
}
