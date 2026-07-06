/* hero.js — hero background slide carousel with dot navigation */
(function () {
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

  show(0);
  start();
})();
