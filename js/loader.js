/**
 * ============================================================================
 * PAGE LOADER
 * K.M. Public Senior Secondary School — Website Front-End
 * ============================================================================
 * Hides the full-screen loading splash once the page has finished loading
 * (or after a hard timeout, whichever comes first).
 */

/* loader.js */
(function() {

  const loader = document.querySelector("[data-loader]");
  if (!loader) return;

  let hidden = false;

  function hideLoader() {

    if (hidden) return;
    hidden = true;

    loader.classList.add("loader-hidden");
    document.body.classList.remove("is-loading");

    setTimeout(() => {
      loader.remove();
    }, 700);

  }

  window.addEventListener("load", () => {
    setTimeout(hideLoader, 700);
  });

  setTimeout(hideLoader, 4000);

})();
