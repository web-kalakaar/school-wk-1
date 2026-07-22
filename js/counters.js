/**
 * ============================================================================
 * ANIMATED STAT COUNTERS
 * K.M. Public Senior Secondary School — Website Front-End
 * ============================================================================
 * Animates any [data-counter] element from 0 up to its target value once
 * it scrolls into view, using an ease-out cubic curve.
 */

/* counters.js — animates numeric stat counters when they enter the viewport */
(function() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    }
  );

  counters.forEach((c) => observer.observe(c));
})();
