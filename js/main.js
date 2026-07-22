/**
 * ============================================================================
 * APP ENTRY POINT
 * K.M. Public Senior Secondary School — Website Front-End
 * ============================================================================
 * Small cross-cutting setup that runs on every page: marks the document
 * as JS-ready, injects the current year in the footer, and wires up the
 * newsletter form placeholder. Page-specific behaviour lives in its own
 * file (navbar.js, hero.js, admission.js, etc.) and is loaded separately.
 */

/* main.js — entry point. Individual task scripts (loader.js, navbar.js, hero.js,
   counters.js, campuslife.js, notice.js, animations.js, backtotop.js) are loaded
   separately in index.html; this file only holds small cross-cutting setup. */
(function() {
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
