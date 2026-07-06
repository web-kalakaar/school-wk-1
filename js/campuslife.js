/* campuslife.js — builds the seamless infinite dual-direction campus gallery marquee */
(function () {
  const rows = document.querySelectorAll('[data-campus-row]');
  if (!rows.length) return;

  // Duplicate row contents once so the CSS translateX(-50%) loop is seamless
  rows.forEach((row) => {
    const clone = row.innerHTML;
    row.insertAdjacentHTML('beforeend', clone);
  });
})();
