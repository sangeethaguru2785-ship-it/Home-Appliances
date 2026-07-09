/* ============================================
   Stackly - Contact Page
   ============================================ */
'use strict';

document.getElementById('app-header').innerHTML = renderHeader('contact');
document.getElementById('app-footer').innerHTML = renderFooter();
initCommon();

document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const nameInput = document.getElementById('contactName');
  if (nameInput && typeof isValidName === 'function' && !isValidName(nameInput.value.trim())) {
    showToast('Name must contain only letters.');
    return;
  }
  const emailInput = this.querySelector('input[type="email"]');
  if (emailInput && typeof isValidEmail === 'function' && !isValidEmail(emailInput.value.trim())) {
    showToast('Please enter a valid email address.');
    return;
  }
  showToast('Message sent successfully! We\'ll get back to you soon.');
  this.reset();
});

document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('active');
    document.querySelectorAll('.faq-item.active').forEach(i => i.classList.remove('active'));
    if (!isOpen) item.classList.add('active');
  });
});
