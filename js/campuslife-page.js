/**
 * ============================================================================
 * CAMPUS LIFE PAGE — SCROLL-PINNED GALLERIES
 * Sant Kirpal Senior Secondary School — Website Front-End
 * ============================================================================
 * Builds each category gallery from data and drives the sticky,
 * scroll-pinned effect: while a section is pinned, scrolling advances the
 * active gallery image. Falls back to manual arrow navigation on mobile.
 * campuslife.html only.
 */

/* campuslife.js — builds each category gallery from data and drives the
   scroll-pinned effect: while a section is pinned (sticky), scrolling through
   its extra height advances the gallery image instead of the page. */
(function() {
  /* ---------------------------------------------------------------------
     1. GALLERY DATA — one entry per section. Every image currently points
        to the school schoolgallery/campus.webpa placeholder; swap `src` values for real
        photography later without touching any markup.
  --------------------------------------------------------------------- */
  const GALLERY_DATA = {
    infrastructure: {
      title: "Infrastructure",
      images: [{
        src: "schoolgallery/campus.webp",
        caption: "Main Academic Block"
      }, {
        src: "schoolgallery/campus2.webp",
        caption: "Central Library"
      }, {
        src: "schoolgallery/campus3.webp",
        caption: "Multipurpose Auditorium"
      }, {
        src: "schoolgallery/campus2.webp",
        caption: "Reception & Admin Block"
      }, {
        src: "schoolgallery/campus4.webp",
        caption: "Open Corridors & Courtyards"
      }, ],
    },
    classrooms: {
      title: "Modern Classrooms",
      images: [{
        src: "schoolgallery/classroom1.jpg",
        caption: "Smart Interactive Classrooms"
      }, {
        src: "schoolgallery/classroom2.jpg",
        caption: "Activity & Discussion Rooms"
      }, {
        src: "schoolgallery/classroom3.jpg",
        caption: "Primary Wing Learning Corner"
      }, {
        src: "schoolgallery/classroom4.jpg",
        caption: "Senior Secondary Lecture Halls"
      }, ],
    },
    labs: {
      title: "Laboratories",
      images: [{
        src: "schoolgallery/science1.jpg",
        caption: "Physics Laboratory"
      }, {
        src: "schoolgallery/science2.jpg",
        caption: "Chemistry Laboratory"
      }, {
        src: "schoolgallery/science1.jpg",
        caption: "Biology Laboratory"
      }, {
        src: "schoolgallery/science2.jpg",
        caption: "Computer Science Lab"
      }, ],
    },
    sports: {
      title: "Sports Facilities",
      images: [{
        src: "schoolgallery/sports.jpg",
        caption: "Basketball & Volleyball Courts"
      }, {
        src: "schoolgallery/sports2.jpg",
        caption: "Athletics Track & Field"
      }, {
        src: "schoolgallery/sports3.jpg",
        caption: "Indoor Games Room"
      }, {
        src: "schoolgallery/sports4.jpg",
        caption: "Yoga & Fitness Area"
      }, {
        src: "schoolgallery/sports3.jpg",
        caption: "Cricket & Football Ground"
      }, ],
    },
    activities: {
      title: "Activities & Clubs",
      images: [{
        src: "schoolgallery/campus.webp",
        caption: "Art & Craft Club"
      }, {
        src: "schoolgallery/campus2.webp",
        caption: "Music & Instrument Practice"
      }, {
        src: "schoolgallery/campus3.webp",
        caption: "Dance & Performance Club"
      }, {
        src: "schoolgallery/campus4.webp",
        caption: "Debate & Elocution Society"
      }, ],
    },
    events: {
      title: "Events & Celebrations",
      images: [{
        src: "schoolgallery/annual.jpg",
        caption: "Annual Day Celebration"
      }, {
        src: "schoolgallery/annual2.jpg",
        caption: "Independence Day Function"
      }, {
        src: "schoolgallery/annual3.jpg",
        caption: "Annual Sports Day"
      }, {
        src: "schoolgallery/annual4.jpg",
        caption: "Cultural Fest"
      }, {
        src: "schoolgallery/annual3.jpg",
        caption: "Festival Celebrations"
      }, ],
    },
    trips: {
      title: "Educational Trips",
      images: [{
        src: "schoolgallery/campus.webp",
        caption: "Historical Heritage Trip"
      }, {
        src: "schoolgallery/campus.webp",
        caption: "Science City Excursion"
      }, {
        src: "schoolgallery/campus.webp",
        caption: "Adventure & Nature Camp"
      }, {
        src: "schoolgallery/campus.webp",
        caption: "Industrial & Career Visit"
      }, ],
    },
  };

  /* ---------------------------------------------------------------------
     2. RENDER — build the gallery markup (slides, dots, badge, count)
        inside each [data-gallery] placeholder.
  --------------------------------------------------------------------- */
  const sections = document.querySelectorAll("[data-scrollsec]");

  // Cache each section's frequently-updated elements once, instead of
  // re-querying the DOM on every scroll frame (see setActiveSlide below).
  const sectionRefs = new Map();

  sections.forEach((section) => {
    const key = section.getAttribute("data-scrollsec");
    const data = GALLERY_DATA[key];
    if (!data) return;

    const galleryEl = section.querySelector("[data-gallery]");
    const dotsEl = section.querySelector("[data-progress]");
    if (!galleryEl) return;

    galleryEl.innerHTML = `
      <span class="scrollsec__badge">${data.images.length} Photos</span>
      ${data.images
        .map(
          (img, i) => `
        <div class="scrollsec__slide${i === 0 ? " is-active" : ""}" data-slide="${i}">
          <img src="${img.src}" alt="${data.title} — ${img.caption}" loading="lazy">
          <div class="scrollsec__caption"><b>${img.caption}</b><span>${data.title}</span></div>
        </div>`,
        )
        .join("")}
      <div class="scrollsec__arrows">
        <button type="button" class="scrollsec__arrow scrollsec__arrow--prev" data-arrow="prev" aria-label="Previous ${data.title} photo">
          <svg viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="#0F172A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button type="button" class="scrollsec__arrow scrollsec__arrow--next" data-arrow="next" aria-label="Next ${data.title} photo">
          <svg viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#0F172A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
      <span class="scrollsec__mobile-count" data-count-mobile>1 / ${data.images.length}</span>
    `;

    if (dotsEl) {
      dotsEl.innerHTML =
        data.images
        .map(
          (_, i) =>
          `<span data-dot="${i}"${i === 0 ? ' class="is-active"' : ""}></span>`,
        )
        .join("") +
        `<span class="scrollsec__count" data-count>1 / ${data.images.length}</span>`;
    }

    // Give each pinned section enough scroll-height to step through every image
    // (100vh for viewing + 60vh of scroll travel per additional image)
    const extraVh = (data.images.length - 1) * 60;
    section.style.height = `calc(100vh + ${extraVh}vh)`;
    section.dataset.slideCount = data.images.length;

    // Cache references now that the markup exists — avoids repeat querySelectorAll
    // calls inside setActiveSlide, which previously ran on every scroll frame.
    sectionRefs.set(section, {
      slides: section.querySelectorAll("[data-slide]"),
      dots: section.querySelectorAll("[data-dot]"),
      countEl: section.querySelector("[data-count]"),
      mobileCountEl: section.querySelector("[data-count-mobile]"),
    });
  });

  /* ---------------------------------------------------------------------
     3. SHARED ACTIVATION — sets which slide/dot is active for a section.
        Used both by the scroll-pin logic (desktop/tablet) and by the
        manual arrow buttons (mobile, below 680px).
  --------------------------------------------------------------------- */
  function setActiveSlide(section, activeIndex) {
    const count = parseInt(section.dataset.slideCount, 10) || 1;
    const clamped = Math.max(0, Math.min(count - 1, activeIndex));

    // No-op guard: skip all DOM writes if the slide hasn't actually changed —
    // this is what keeps scroll-driven updates from thrashing layout/paint.
    if (parseInt(section.dataset.activeIndex, 10) === clamped) return;
    section.dataset.activeIndex = clamped;

    const refs = sectionRefs.get(section);
    if (!refs) return;

    refs.slides.forEach((slide, i) =>
      slide.classList.toggle("is-active", i === clamped),
    );
    refs.dots.forEach((dot, i) => dot.classList.toggle("is-active", i === clamped));
    if (refs.countEl) refs.countEl.textContent = `${clamped + 1} / ${count}`;
    if (refs.mobileCountEl) refs.mobileCountEl.textContent = `${clamped + 1} / ${count}`;
  }

  /* ---------------------------------------------------------------------
     4. SCROLL-PIN LOGIC — while a section is pinned, map scroll progress
        through its extra height to the active gallery slide index.
        (This naturally has no effect below 992px, since the sticky pin
        is disabled there via CSS and the section's height collapses to
        its content height — see campuslife.css.)
  --------------------------------------------------------------------- */
  function updateActiveSlides() {
    const viewportH = window.innerHeight;
    if (window.matchMedia("(max-width: 680px)").matches) return;
    sections.forEach((section) => {
      const count = parseInt(section.dataset.slideCount, 10) || 1;
      if (count <= 1) return;

      const rect = section.getBoundingClientRect();
      const totalScrollable = rect.height - viewportH; // extra height beyond one screen
      if (totalScrollable <= 0) return;

      // progress = 0 when section top just reached the top of viewport,
      // progress = 1 when section is about to unpin
      let progress = (0 - rect.top) / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));

      const activeIndex = Math.min(count - 1, Math.floor(progress * count));
      setActiveSlide(section, activeIndex);
    });
  }

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveSlides();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, {
    passive: true
  });

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateActiveSlides, 150);
  });
  updateActiveSlides();

  /* ---------------------------------------------------------------------
     5. MANUAL ARROW NAVIGATION — visible only below 680px (see
        campuslife.css). Lets the user step through each section's gallery
        by tapping, since scroll-pinning is disabled at that width.
  --------------------------------------------------------------------- */
  sections.forEach((section) => {
    const prevBtn = section.querySelector('[data-arrow="prev"]');
    const nextBtn = section.querySelector('[data-arrow="next"]');
    if (!prevBtn || !nextBtn) return;

    section.dataset.activeIndex = 0;

    prevBtn.addEventListener("click", () => {
      const current = parseInt(section.dataset.activeIndex, 10) || 0;
      const count = parseInt(section.dataset.slideCount, 10) || 1;
      setActiveSlide(section, (current - 1 + count) % count);
    });

    nextBtn.addEventListener("click", () => {
      const current = parseInt(section.dataset.activeIndex, 10) || 0;
      const count = parseInt(section.dataset.slideCount, 10) || 1;
      setActiveSlide(section, (current + 1) % count);
    });
  });

  /* ---------------------------------------------------------------------
     4. JUMP-NAV ACTIVE STATE — highlight the current category link
  --------------------------------------------------------------------- */
  const navLinks = document.querySelectorAll("[data-life-nav] a");
  if (navLinks.length && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === `#${id}`,
              );
            });
          }
        });
      }, {
        threshold: 0,
        rootMargin: "-45% 0px -45% 0px"
      },
    );
    sections.forEach((s) => navObserver.observe(s));
  }
})();
