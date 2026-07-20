/**
 * ============================================================================
 * BACK-TO-TOP BUTTON
 * Sant Kirpal Senior Secondary School — Website Front-End
 * ============================================================================
 * Shows the back-to-top button after the user scrolls past a threshold
 * and smooth-scrolls to the top of the page on click.
 */

/* backtotop.js — shows/hides the back-to-top button and smooth-scrolls to page top */
(function() {
  const btn = document.querySelector('[data-back-to-top]');
  if (!btn) return;

  let ticking = false;
  function applyVisibility() {
    btn.classList.toggle('is-visible', window.scrollY > 600);
    ticking = false;
  }
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(applyVisibility);
    }, {
      passive: true
    }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();
