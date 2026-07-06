/* admission.js — renders the fee structure tables from data and handles
   client-side validation + success state for the admission enquiry form. */
(function () {
  /* =====================================================================
     1. FEE STRUCTURE DATA & RENDER
  ===================================================================== */
  const FEE_DATA = {
    Play: {
      label: "Play (Nur. – Ukg)",
      rows: [
        { head: "Admission Fee (one-time)", amount: "₹8,000" },
        { head: "Tuition Fee (annual)", amount: "₹28,000" },
        { head: "Development Fee (annual)", amount: "₹4,500" },
        { head: "Transport Fee (annual, optional)", amount: "₹9,000" },
      ],
      total: "₹49,500",
    },   
     primary: {
      label: "Primary (I – V)",
      rows: [
        { head: "Admission Fee (one-time)", amount: "₹8,000" },
        { head: "Tuition Fee (annual)", amount: "₹28,000" },
        { head: "Development Fee (annual)", amount: "₹4,500" },
        { head: "Transport Fee (annual, optional)", amount: "₹9,000" },
      ],
      total: "₹49,500",
    },
    middle: {
      label: "Middle (VI – VIII)",
      rows: [
        { head: "Admission Fee (one-time)", amount: "₹9,000" },
        { head: "Tuition Fee (annual)", amount: "₹32,000" },
        { head: "Lab & Development Fee (annual)", amount: "₹6,000" },
        { head: "Transport Fee (annual, optional)", amount: "₹9,000" },
      ],
      total: "₹56,000",
    },
    secondary: {
      label: "Secondary (IX – X)",
      rows: [
        { head: "Admission Fee (one-time)", amount: "₹10,000" },
        { head: "Tuition Fee (annual)", amount: "₹36,000" },
        { head: "Lab & Exam Fee (annual)", amount: "₹7,500" },
        { head: "Transport Fee (annual, optional)", amount: "₹9,000" },
      ],
      total: "₹62,500",
    },
    senior: {
      label: "Senior Secondary (XI – XII)",
      rows: [
        { head: "Admission Fee (one-time)", amount: "₹12,000" },
        { head: "Tuition Fee (annual)", amount: "₹42,000" },
        { head: "Stream Lab & Practical Fee (annual)", amount: "₹9,500" },
        { head: "Transport Fee (annual, optional)", amount: "₹9,000" },
      ],
      total: "₹72,500",
    },
  };

  const tabsWrap = document.querySelector("[data-fee-tabs]");
  const panelsWrap = document.querySelector("[data-fee-panels]");

  if (tabsWrap && panelsWrap) {
    const keys = Object.keys(FEE_DATA);

    tabsWrap.innerHTML = keys
      .map(
        (key, i) =>
          `<button type="button" data-fee-tab="${key}" class="${i === 0 ? "is-active" : ""}">${FEE_DATA[key].label}</button>`,
      )
      .join("");

    panelsWrap.innerHTML = keys
      .map((key, i) => {
        const wing = FEE_DATA[key];
        return `
        <div class="fees__panel${i === 0 ? " is-active" : ""}" data-fee-panel="${key}">
          <div class="fees__table-wrap">
            <table class="fees__table">
              <thead>
              <tr><th>Fee Head — ${wing.label}</th><th>Amount</th></tr></thead>
              <tbody>
                ${wing.rows.map((r) => `<tr><td>${r.head}</td><td>${r.amount}</td></tr>`).join("")}
              </tbody>
              <tfoot><tr><td>Total Payable (approx., annual)</td><td>${wing.total}</td></tr></tfoot>
            </table>
          </div>
        </div>`;
      })
      .join("");

    tabsWrap.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-fee-tab]");
      if (!btn) return;
      const key = btn.getAttribute("data-fee-tab");

      tabsWrap
        .querySelectorAll("button")
        .forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      panelsWrap.querySelectorAll("[data-fee-panel]").forEach((p) => {
        p.classList.toggle(
          "is-active",
          p.getAttribute("data-fee-panel") === key,
        );
      });
    });
  }

  /* =====================================================================
     2. ADMISSION FORM — client-side validation + success state
  ===================================================================== */
  const form = document.querySelector("[data-admission-form]");
  if (form) {
    const successBox = document.querySelector("[data-form-success]");

    const validators = {
      studentName: (v) =>
        v.trim().length >= 3 || "Please enter the student's full name.",
      dob: (v) => !!v || "Please select a date of birth.",
      classApplying: (v) => !!v || "Please select the class being applied for.",
      parentName: (v) =>
        v.trim().length >= 3 || "Please enter a parent/guardian name.",
      phone: (v) =>
        /^[6-9]\d{9}$/.test(v.trim()) ||
        "Please enter a valid 10-digit phone number.",
      email: (v) =>
        v.trim() === "" ||
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ||
        "Please enter a valid email address.",
      address: (v) =>
        v.trim().length >= 8 || "Please enter a complete address.",
    };

    function setFieldError(field, message) {
      const wrap = field.closest(".adm-form__field");
      if (!wrap) return;
      const errorEl = wrap.querySelector(".adm-form__error");
      if (message) {
        wrap.classList.add("has-error");
        if (errorEl) errorEl.textContent = message;
      } else {
        wrap.classList.remove("has-error");
        if (errorEl) errorEl.textContent = "";
      }
    }

    function validateField(field) {
      const rule = validators[field.name];
      if (!rule) return true;
      const result = rule(field.value);
      if (result === true) {
        setFieldError(field, "");
        return true;
      }
      setFieldError(field, result);
      return false;
    }

    // Validate on blur for immediate feedback
    Object.keys(validators).forEach((name) => {
      const field = form.elements[name];
      if (field) field.addEventListener("blur", () => validateField(field));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;
      Object.keys(validators).forEach((name) => {
        const field = form.elements[name];
        if (field && !validateField(field)) isValid = false;
      });

      if (!isValid) {
        const firstError = form.querySelector(
          ".has-error input, .has-error select, .has-error textarea",
        );
        if (firstError) firstError.focus();
        return;
      }

      // No backend wired up — show a confirmation state and reset the form.
      // Replace this block with a real fetch()/API call when ready.
      form.reset();
      form.hidden = true;
      if (successBox) successBox.classList.add("is-visible");
    });
  }
})();
