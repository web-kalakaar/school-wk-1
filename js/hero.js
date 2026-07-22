/**
 * ============================================================================
 * HOME — HERO SLIDER
 * K.M. Public Senior Secondary School — Website Front-End
 * ============================================================================
 * Auto-advancing background slide carousel for the homepage hero, with
 * clickable dot navigation. Home page only.
 */

/* hero.js — hero background slide carousel with dot navigation */
(function() {
  const slides = document.querySelectorAll('[data-hero-slide]');
  const dots = document.querySelectorAll('[data-hero-dot]');
  if (!slides.length) return;

  let current = 0;
  let timer = null;
  const INTERVAL = 5500;

  function show(index) {
    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    current = index;
  }

  function next() {
    show((current + 1) % slides.length);
  }

  function start() {
    stop();
    timer = window.setInterval(next, INTERVAL);
  }

  function stop() {
    if (timer) window.clearInterval(timer);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      show(i);
      start();
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Pause the auto-advance while the tab is hidden (saves battery/CPU on
  // mobile) and resume when the user comes back to it.
  document.addEventListener('visibilitychange', () => {
    if (reduceMotion) return;
    document.hidden ? stop() : start();
  });

  show(0);
  if (!reduceMotion) start();
})();
