/* navbar.js — sticky navbar on scroll + mobile hamburger menu */
(function () {
  const navbar = document.querySelector('[data-navbar]');
  const hamburger = document.querySelector('[data-hamburger]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const overlay = document.querySelector('[data-mobile-overlay]');

  /* ---- sticky state ---- */
  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) navbar.classList.add('is-scrolled');
    else navbar.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu toggle ---- */
  function openMenu() {
    hamburger.classList.add('is-active');
    mobileNav.classList.add('is-open');
    overlay.classList.add('is-open');
    hamburger.classList.add('aria-expanded', 'true');
    navbar.classList.add('is-scrolled')
    document.documentElement.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger.classList.remove('is-active');
    mobileNav.classList.remove('is-open');
    overlay.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
  }
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('is-active') ? closeMenu() : openMenu();
    });
  }
  if (overlay) overlay.addEventListener('click', closeMenu);

  /* ---- mobile submenu accordion ---- */
  document.querySelectorAll('[data-mobile-toggle]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sub = btn.nextElementSibling;
      const isOpen = sub.classList.contains('is-open');
      document.querySelectorAll('.mobile-nav__sub').forEach((s) => s.classList.remove('is-open'));
      if (!isOpen) sub.classList.add('is-open');
    });
  });

  /* ---- close mobile nav on link click ---- */
  document.querySelectorAll('.mobile-nav a:not([data-mobile-toggle])').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
})();
