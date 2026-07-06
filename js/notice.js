/* notice.js — infinite vertical auto-scrolling notice/highlights feed (pause on hover via CSS) */
(function () {
  const track = document.querySelector('[data-notice-track]');
  if (!track) return;

  // Duplicate the card list once so the CSS keyframe (translateY -50%) loops seamlessly
  const clone = track.innerHTML;
  track.insertAdjacentHTML('beforeend', clone);
})();
