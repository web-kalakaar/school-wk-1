/* loader.js — handles the standard page loader with school name */
(function () {
  const loader = document.querySelector('[data-loader]');
  if (!loader) return;

  function hideLoader() {
    loader.classList.add('loader-hidden');
    document.body.classList.remove('is-loading');
    // remove from DOM after transition for accessibility / performance
    window.setTimeout(() => loader.setAttribute('aria-hidden', 'true'), 700);
  }

  window.addEventListener('load', () => {
    // small minimum display time so the loader doesn't just flash
    window.setTimeout(hideLoader, 600);
  });

  // safety fallback in case 'load' is delayed by slow third-party assets
  window.setTimeout(hideLoader, 4000);
})();
