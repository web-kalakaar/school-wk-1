/* achievements.js — renders all achievement cards from data and drives the
   topper carousels + "View All" modal (with stream filtering for Class XII). */
(function () {
  /* =====================================================================
     1. DATA
  ===================================================================== */
  const AWARDS = [
    {
      year: "2025",
      title: "Best School Excellence Award",
      image: "logo.png",
      desc: "Honoured for exceptional academic performance, modern teaching methods, and outstanding board examination results.",
    },
    {
      year: "2024",
      title: "Excellence in Science Education",
      image: "logo.png",
      desc: "Recognised for state-of-the-art science laboratories, innovation projects, and remarkable achievements in science competitions.",
    },
    {
      year: "2024",
      title: "Green Campus Recognition",
      image: "logo.png",
      desc: "Awarded for creating an eco-friendly campus through tree plantation, rainwater harvesting, and sustainable environmental initiatives.",
    },
  ];
  // Class X toppers — no stream grouping
  const TOPPERS_10 = [
    {
      session: "2025–26",
      name: "Ananya Sharma",
      percentage: "98.4%",
      img: "demoprofile/pfp1.jpg",
    },
    {
      session: "2025–26",
      name: "Rohit Meena",
      percentage: "97.8%",
      img: "demoprofile/pfp2.jpg",
    },
    {
      session: "2025–26",
      name: "Priya Gupta",
      percentage: "97.2%",
      img: "demoprofile/pfp3.jpg",
    },
    {
      session: "2024–25",
      name: "Karan Yadav",
      percentage: "98.0%",
      img: "demoprofile/pfp4.jpg",
    },
    {
      session: "2024–25",
      name: "Simran Kaur",
      percentage: "97.6%",
      img: "demoprofile/pfp5.jpg",
    },
    {
      session: "2024–25",
      name: "Aditya Rathore",
      percentage: "96.9%",
      img: "demoprofile/pfp6.jpg",
    },
    {
      session: "2023–24",
      name: "Neha Choudhary",
      percentage: "97.4%",
      img: "demoprofile/pfp7.jpg",
    },
    {
      session: "2023–24",
      name: "Vikram Singh",
      percentage: "96.8%",
      img: "demoprofile/pfp8.jpg",
    },
    {
      session: "2025–26",
      name: "Ananya Sharma",
      percentage: "98.4%",
      img: "demoprofile/pfp1.jpg",
    },
    {
      session: "2025–26",
      name: "Rohit Meena",
      percentage: "97.8%",
      img: "demoprofile/pfp2.jpg",
    },
    {
      session: "2025–26",
      name: "Priya Gupta",
      percentage: "97.2%",
      img: "demoprofile/pfp3.jpg",
    },
    {
      session: "2024–25",
      name: "Karan Yadav",
      percentage: "98.0%",
      img: "demoprofile/pfp4.jpg",
    },
    {
      session: "2024–25",
      name: "Simran Kaur",
      percentage: "97.6%",
      img: "demoprofile/pfp5.jpg",
    },
    {
      session: "2024–25",
      name: "Aditya Rathore",
      percentage: "96.9%",
      img: "demoprofile/pfp6.jpg",
    },
    {
      session: "2023–24",
      name: "Neha Choudhary",
      percentage: "97.4%",
      img: "demoprofile/pfp7.jpg",
    },
    {
      session: "2023–24",
      name: "Vikram Singh",
      percentage: "96.8%",
      img: "demoprofile/pfp8.jpg",
    },
  ];

  // Class XII toppers — grouped by stream: Science / Commerce / Arts
  const TOPPERS_12 = [
    {
      session: "2025–26",
      name: "Ishaan Verma",
      percentage: "96.6%",
      stream: "Science",
      img: "demoprofile/pfp3.jpg",
    },
    {
      session: "2025–26",
      name: "Riya Agarwal",
      percentage: "95.8%",
      stream: "Commerce",
      img: "demoprofile/pfp7.jpg",
    },
    {
      session: "2025–26",
      name: "Meera Joshi",
      percentage: "94.9%",
      stream: "Arts",
      img: "demoprofile/pfp2.jpg",
    },
    {
      session: "2024–25",
      name: "Aryan Kapoor",
      percentage: "97.1%",
      stream: "Science",
      img: "demoprofile/pfp8.jpg",
    },
    {
      session: "2024–25",
      name: "Tanya Bansal",
      percentage: "95.4%",
      stream: "Commerce",
      img: "demoprofile/pfp1.jpg",
    },
    {
      session: "2024–25",
      name: "Devansh Rana",
      percentage: "94.2%",
      stream: "Arts",
      img: "demoprofile/pfp5.jpg",
    },
    {
      session: "2023–24",
      name: "Kritika Solanki",
      percentage: "96.3%",
      stream: "Science",
      img: "demoprofile/pfp4.jpg",
    },
    {
      session: "2023–24",
      name: "Nikhil Chauhan",
      percentage: "94.7%",
      stream: "Commerce",
      img: "demoprofile/pfp6.jpg",
    },
    {
      session: "2023–24",
      name: "Sanya Malhotra",
      percentage: "93.9%",
      stream: "Arts",
      img: "demoprofile/pfp2.jpg",
    },
    {
      session: "2025–26",
      name: "Ishaan Verma",
      percentage: "96.6%",
      stream: "Science",
      img: "demoprofile/pfp3.jpg",
    },
    {
      session: "2025–26",
      name: "Riya Agarwal",
      percentage: "95.8%",
      stream: "Commerce",
      img: "demoprofile/pfp7.jpg",
    },
    {
      session: "2025–26",
      name: "Meera Joshi",
      percentage: "94.9%",
      stream: "Arts",
      img: "demoprofile/pfp2.jpg",
    },
    {
      session: "2024–25",
      name: "Aryan Kapoor",
      percentage: "97.1%",
      stream: "Science",
      img: "demoprofile/pfp8.jpg",
    },
    {
      session: "2024–25",
      name: "Tanya Bansal",
      percentage: "95.4%",
      stream: "Commerce",
      img: "demoprofile/pfp1.jpg",
    },
    {
      session: "2024–25",
      name: "Devansh Rana",
      percentage: "94.2%",
      stream: "Arts",
      img: "demoprofile/pfp5.jpg",
    },
    {
      session: "2023–24",
      name: "Kritika Solanki",
      percentage: "96.3%",
      stream: "Science",
      img: "demoprofile/pfp4.jpg",
    },
    {
      session: "2023–24",
      name: "Nikhil Chauhan",
      percentage: "94.7%",
      stream: "Commerce",
      img: "demoprofile/pfp6.jpg",
    },
    {
      session: "2023–24",
      name: "Sanya Malhotra",
      percentage: "93.9%",
      stream: "Arts",
      img: "demoprofile/pfp2.jpg",
    },
  ];

  // Students' own achievements outside school — national/state level
  const STUDENT_ACHIEVEMENTS = [
    {
      name: "Arjun Mehta",
      cls: "Class X",
      level: "National",
      title: "National Chess Championship — Runner-Up",
      desc: "Represented Rajasthan at the National School Chess Championship, finishing as runner-up in the under-16 category.",
      img: "demoprofile/pfp2.jpg",
    },
    {
      name: "Diya Patel",
      cls: "Class XII",
      level: "State",
      title: "State-Level Painting Competition — Gold Medal",
      desc: "Won gold at the Rajasthan State Art Talent Search for an original painting on environmental conservation.",
      img: "demoprofile/pfp4.jpg",
    },
    {
      name: "Yash Rathi",
      cls: "Class IX",
      level: "National",
      title: "National Mathematics Olympiad — Top 50",
      desc: "Ranked among the top 50 nationally in the National Mathematics Olympiad, out of over 40,000 participants.",
      img: "demoprofile/pfp6.jpg",
    },
    {
      name: "Anjali Soni",
      cls: "Class XI",
      level: "State",
      title: "State Athletics Meet — 400m Gold",
      desc: "Won gold in the 400m sprint at the Rajasthan State School Athletics Meet, qualifying for national trials.",
      img: "demoprofile/pfp8.jpg",
    },
    {
      name: "Rehan Khan",
      cls: "Class X",
      level: "National",
      title: "National Robotics Challenge — Finalist",
      desc: "Reached the national finals of a robotics and coding challenge with a self-built line-following robot.",
      img: "demoprofile/pfp3.jpg",
    },
    {
      name: "Pooja Nair",
      cls: "Class XII",
      level: "State",
      title: "State Classical Dance Competition — Gold",
      desc: "Awarded gold in Kathak at the Rajasthan State Inter-School Classical Dance Competition.",
      img: "demoprofile/pfp1.jpg",
    },
  ];

  /* =====================================================================
     2. AWARDS GRID
  ===================================================================== */
  const awardsGrid = document.querySelector("[data-awards-grid]");
  if (awardsGrid) {
    awardsGrid.innerHTML = AWARDS.map(
      (a, i) => `
<article class="award-card card" data-reveal="up" style="--i:${i % 6}">
    
    <div class="award-card__image">
        <img src="${a.image}" alt="${a.title}">
        <span class="award-card__year">${a.year}</span>
    </div>

    <div class="award-card__body">
        <h3>${a.title}</h3>
        <p>${a.desc}</p>
    </div>

</article>
`,
    ).join("");
  }

  /* =====================================================================
     3. STUDENT ACHIEVEMENTS GRID
  ===================================================================== */
  const studentGrid = document.querySelector("[data-student-ach-grid]");
  if (studentGrid) {
    studentGrid.innerHTML = STUDENT_ACHIEVEMENTS.map(
      (s, i) => `
      <article class="sach-card card" data-reveal="up" style="--i:${i % 6}">
        <div class="sach-card__media">
 
          <img src="${s.img}" alt="${s.name} — ${s.title}" loading="lazy">
        </div>
        <div class="sach-card__body">
          <h4>${s.title}</h4>
          <div class="sach-card__meta"><span>${s.name}</span><span class="sep"></span><span>${s.cls}</span></div>
          <p>${s.desc}</p>
        </div>
      </article>`,
    ).join("");
  }

  /* =====================================================================
     4. TOPPER CARD TEMPLATE
  ===================================================================== */
  function topperCard(t) {
    const classStream = t.stream
      ? `12th – ${t.stream}`
      : t.classLabel || "10th";
    return `
      <article class="topper-card card">
        <span class="topper-card__session">${t.session}</span>
        <div class="topper-card__media">
          <img src="${t.img}" alt="${t.name}, ${classStream} topper, ${t.percentage}" loading="lazy">
        </div>
        <div class="topper-card__body">          <span class="topper-card__percent">${t.percentage}</span>

          <h4>${t.name}</h4>
          <span>${classStream}</span>
        </div>
      </article>`;
  }

  /* =====================================================================
     5. CAROUSEL SETUP (used for both 10th and 12th default views) 
  ===================================================================== */
 
 

function setupCarousel(trackSelector, prevSelector, nextSelector, data) {
  const track = document.querySelector(trackSelector);
  if (!track) return;

  const viewport = track.parentElement;
  const prevBtn = document.querySelector(prevSelector);
  const nextBtn = document.querySelector(nextSelector);

  // Duplicate data for seamless loop
  const loopedData = [...data, ...data];
  track.innerHTML = loopedData.map(topperCard).join("");

  // Force the track to behave like a marquee strip
  track.style.willChange = "transform";
  track.style.transition = "none";
  viewport.style.overflow = "hidden";     // we drive it manually now

  let offset = 0;              // current translateX in px (negative = moved left)
  let halfWidth = 0;           // width of ONE copy of the data set
  const SPEED = 40;            // pixels per SECOND (try 30–80)
  let lastTime = performance.now();
  let paused = false;

  function measure() {
    // total width of track / 2  = width of one full data set
    halfWidth = track.scrollWidth / 2;
  }

  function cardStep() {
    const card = track.querySelector(".topper-card");
    if (!card) return 240;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return card.offsetWidth + gap;
  }

  function apply() {
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
  }

  function tick(now) {
    const dt = (now - lastTime) / 1000;   // seconds
    lastTime = now;

    if (!paused) {
      offset -= SPEED * dt;               // move left continuously
      if (-offset >= halfWidth) offset += halfWidth;  // seamless wrap
      apply();
    }
    requestAnimationFrame(tick);
  }

  // Arrow navigation — animate a step, then let auto resume
  function stepBy(direction) {
    const step = cardStep();
    const target = offset - direction * step;
    // smooth transition just for this jump
    track.style.transition = "transform 400ms cubic-bezier(.22,.61,.36,1)";
    offset = target;
    if (-offset >= halfWidth) offset += halfWidth;
    if (offset > 0) offset -= halfWidth;
    apply();
    setTimeout(() => (track.style.transition = "none"), 420);
  }

  prevBtn?.addEventListener("click", () => stepBy(-1));
  nextBtn?.addEventListener("click", () => stepBy(1));

  // Pause on hover / touch
  viewport.addEventListener("mouseenter", () => (paused = true));
  viewport.addEventListener("mouseleave", () => (paused = false));
  viewport.addEventListener("touchstart", () => (paused = true), { passive: true });
  viewport.addEventListener("touchend",   () => (paused = false));

  // Drag support (updates offset instead of scrollLeft)
  let isDown = false, startX = 0, startOffset = 0;

  viewport.addEventListener("mousedown", (e) => {
    isDown = true;
    paused = true;
    startX = e.pageX;
    startOffset = offset;
    viewport.classList.add("dragging");
    track.style.transition = "none";
  });
  window.addEventListener("mouseup", () => {
    if (!isDown) return;
    isDown = false;
    paused = false;
    viewport.classList.remove("dragging");
  });
  viewport.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    offset = startOffset + (e.pageX - startX);
    if (-offset >= halfWidth) offset += halfWidth;
    if (offset > 0) offset -= halfWidth;
    apply();
  });

  viewport.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    startOffset = offset;
  }, { passive: true });
  viewport.addEventListener("touchmove", (e) => {
    offset = startOffset + (e.touches[0].pageX - startX);
    if (-offset >= halfWidth) offset += halfWidth;
    if (offset > 0) offset -= halfWidth;
    apply();
  }, { passive: true });

  // Boot
  window.addEventListener("resize", measure);
  // Wait for images so widths are correct
  const imgs = track.querySelectorAll("img");
  let loaded = 0;
  if (imgs.length === 0) {
    measure();
    requestAnimationFrame(tick);
  } else {
    imgs.forEach((img) => {
      if (img.complete) done();
      else {
        img.addEventListener("load", done);
        img.addEventListener("error", done);
      }
    });
  }
  function done() {
    if (++loaded >= imgs.length) {
      measure();
      requestAnimationFrame(tick);
    }
  }
}
  setupCarousel(
    '[data-track="10"]',
    '[data-arrow="10-prev"]',
    '[data-arrow="10-next"]',
    TOPPERS_10,
  );

  setupCarousel(
    '[data-track="12"]',
    '[data-arrow="12-prev"]',
    '[data-arrow="12-next"]',
    TOPPERS_12,
  );
  /* =====================================================================
     6. VIEW ALL MODAL (with stream filter for Class XII)
  ===================================================================== */
  const modal = document.querySelector("[data-toppers-modal]");
  if (modal) {
    const panelTitle = modal.querySelector("[data-modal-title]");
    const panelSub = modal.querySelector("[data-modal-sub]");
    const filtersWrap = modal.querySelector("[data-modal-filters]");
    const grid = modal.querySelector("[data-modal-grid]");
    const closeBtn = modal.querySelector("[data-modal-close]");
    const backdrop = modal.querySelector("[data-modal-backdrop]");

    let currentClass = null;

    function renderGrid(cls, stream) {
      let data = cls === "10" ? TOPPERS_10 : TOPPERS_12;
      if (cls === "12" && stream && stream !== "All") {
        data = data.filter((t) => t.stream === stream);
      }
      grid.innerHTML = data.map(topperCard).join("");
    }

    function openModal(cls) {
      currentClass = cls;
      const isTwelfth = cls === "12";

      panelTitle.textContent = isTwelfth
        ? "Class XII Toppers — All Sessions"
        : "Class X Toppers — All Sessions";
      panelSub.textContent = isTwelfth
        ? "Browse every Class XII topper, filterable by stream."
        : "Browse every Class X topper across recent sessions.";

      filtersWrap.classList.toggle("is-visible", isTwelfth);
      if (isTwelfth) {
        filtersWrap.innerHTML = ["All", "Science", "Commerce", "Arts"]
          .map(
            (s, i) =>
              `<button type="button" data-filter="${s}" class="${i === 0 ? "is-active" : ""}">${s}</button>`,
          )
          .join("");
      } else {
        filtersWrap.innerHTML = "";
      }

      renderGrid(cls, "All");
      modal.classList.add("is-open");
      document.documentElement.style.overflow = "hidden";
      modal.setAttribute("aria-hidden", "false");
    }

    function closeModal() {
      modal.classList.remove("is-open");
      document.documentElement.style.overflow = "";
      modal.setAttribute("aria-hidden", "true");
    }

    document.querySelectorAll("[data-viewall]").forEach((btn) => {
      btn.addEventListener("click", () =>
        openModal(btn.getAttribute("data-viewall")),
      );
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open"))
        closeModal();
    });

    filtersWrap.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      filtersWrap
        .querySelectorAll("button")
        .forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderGrid(currentClass, btn.getAttribute("data-filter"));
    });
  }
})();
