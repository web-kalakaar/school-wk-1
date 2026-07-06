/* main.js — entry point. Individual task scripts (loader.js, navbar.js, hero.js,
   counters.js, campuslife.js, notice.js, animations.js, backtotop.js) are loaded
   separately in index.html; this file only holds small cross-cutting setup. */
(function () {
  document.documentElement.classList.add('js-ready');

  // Current year in footer
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Newsletter form (front-end only placeholder submit handling)
  const form = document.querySelector('[data-newsletter-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value) {
        input.value = '';
        input.placeholder = 'Thanks — you are subscribed!';
      }
    });
  }
})();
