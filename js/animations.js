/**
 * ============================================================================
 * SCROLL REVEAL + BUTTON RIPPLE
 * K.M. Public Senior Secondary School — Website Front-End
 * ============================================================================
 * Reveals [data-reveal] elements as they enter the viewport via
 * IntersectionObserver, and adds a Material-style ripple effect to every
 * .btn on click. Runs on every page.
 */

/* animations.js — scroll reveal via IntersectionObserver + button ripple effect */
(function() {
  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
      }
    );
    revealEls.forEach((el, i) => {
      el.style.setProperty('--i', i % 6);
      observer.observe(el);
    });
  }

  /* ---- Button ripple effect ---- */
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
      btn.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 650);
    });
  });
})();
