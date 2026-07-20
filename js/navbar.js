/**
 * ============================================================================
 * NAVBAR
 * Sant Kirpal Senior Secondary School — Website Front-End
 * ============================================================================
 * Sticky navbar background on scroll, mobile hamburger menu open/close,
 * and the mobile accordion submenu toggles.
 */

/* navbar.js — sticky navbar on scroll + mobile hamburger menu */
(function() {
  const navbar = document.querySelector('[data-navbar]');
  const hamburger = document.querySelector('[data-hamburger]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const overlay = document.querySelector('[data-mobile-overlay]');

  /* ---- sticky state (rAF-throttled so it never fires more than once per frame) ---- */
  let scrollTicking = false;
  function applyScrollState() {
    if (!navbar) return;
    navbar.classList.toggle('is-scrolled', window.scrollY > 40);
    scrollTicking = false;
  }
  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(applyScrollState);
  }
  window.addEventListener('scroll', onScroll, {
    passive: true
  });
  applyScrollState();

  /* ---- mobile menu toggle ---- */
  function openMenu() {
    if (hamburger) hamburger.classList.add('is-active');
    if (mobileNav) mobileNav.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    if (navbar) navbar.classList.add('is-scrolled');
    document.documentElement.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (hamburger) hamburger.classList.remove('is-active');
    if (mobileNav) mobileNav.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
  }
  if (hamburger) {
    hamburger.setAttribute('aria-expanded', 'false');
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
      if (!sub) return;
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
