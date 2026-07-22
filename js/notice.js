/**
 * ============================================================================
 * HOME — NOTICE MARQUEE
 * K.M. Public Senior Secondary School — Website Front-End
 * ============================================================================
 * Duplicates the notice/highlights card list once so the vertical
 * auto-scroll marquee loops seamlessly (pauses on hover via CSS).
 */

/* notice.js — infinite vertical auto-scrolling notice/highlights feed (pause on hover via CSS) */
(function() {
  const track = document.querySelector('[data-notice-track]');
  if (!track) return;

  // Duplicate the card list once so the CSS keyframe (translateY -50%) loops seamlessly
  const clone = track.innerHTML;
  track.insertAdjacentHTML('beforeend', clone);
})();
