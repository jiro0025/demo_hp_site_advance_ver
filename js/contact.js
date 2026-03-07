/* ============================
   Contact Form — Data & Canvas
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      alert('すべての項目をご入力ください。');
      return;
    }

    // Email format check
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
      alert('有効なメールアドレスをご入力ください。');
      return;
    }

    // UI: show success, hide form
    form.style.opacity = '0';
    form.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      form.style.display = 'none';
      if (success) {
        success.classList.add('show');
      }
    }, 300);
  });
});
