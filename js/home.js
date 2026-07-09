/* ============================================
   Stackly - Home Page
   ============================================ */
'use strict';

// Render header & footer
document.getElementById('app-header').innerHTML = renderHeader('home');
document.getElementById('app-footer').innerHTML = renderFooter();
initCommon();

// Featured products
function renderFeatured() {
  const grid = document.getElementById('homeProducts');
  if (!grid) return;
  const featured = products.filter(p => p.featured);
  grid.innerHTML = featured.map((p, i) => getProductCardHTML(p, i)).join('');
  setTimeout(() => {
    grid.querySelectorAll('.product-card').forEach(card => card.classList.add('visible'));
  }, 100);
  attachCartButtons();
}
renderFeatured();

// Countdown
(function initCountdown() {
  const target = new Date();
  target.setDate(target.getDate() + 14);
  target.setHours(23, 59, 59, 0);
  function tick() {
    const diff = target - new Date();
    if (diff <= 0) return;
    document.getElementById('days').textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    document.getElementById('hours').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    document.getElementById('minutes').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    document.getElementById('seconds').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
})();

// Testimonials slider
(function() {
  const track = document.getElementById('testimonialTrack');
  const dots = document.querySelectorAll('.slider-dot');
  if (!track || !dots.length) return;
  let current = 0;
  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }
  dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.index))));
  let interval = setInterval(() => goTo((current + 1) % dots.length), 4000);
  document.querySelector('.testimonials-slider').addEventListener('mouseenter', () => clearInterval(interval));
  document.querySelector('.testimonials-slider').addEventListener('mouseleave', () => {
    interval = setInterval(() => goTo((current + 1) % dots.length), 4000);
  });
})();

// Newsletter
document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const input = this.querySelector('input');
  if (!input.value || (typeof isValidEmail === 'function' && !isValidEmail(input.value))) {
    showToast('Please enter a valid email address.');
    return;
  }
  showToast('Subscribed successfully! Welcome to Stackly.'); input.value = '';
});

// Counter animation
(function() {
  document.querySelectorAll('.stat-num').forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const increment = target / 40;
    let current = 0;
    function update() {
      current += increment;
      if (current >= target) { counter.textContent = target.toLocaleString(); return; }
      counter.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(update);
    }
    update();
  });
})();

// Cart buttons
function attachCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) addToCart(product);
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
