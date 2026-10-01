/**
 * Portfolio interactivity.
 * Content for Skills, Projects and Experience comes from js/data.js.
 */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const data = window.PORTFOLIO_DATA || {};

  /* ---------- Helpers ---------- */
  const ICONS = {
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
    server: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>'
  };

  const icon = (name) =>
    `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.code}</svg>`;

  const escapeHTML = (value = "") =>
    String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const slugify = (value = "") =>
    String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Staggers cards within a row so they animate in one after another
  const stagger = (index) => `--delay: ${(index % 3) * 90}ms`;

  /* ---------- Theme toggle ---------- */
  function initTheme() {
    const button = $("#theme-toggle");
    if (!button) return;

    const root = document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = () => root.getAttribute("data-theme") || (systemDark.matches ? "dark" : "light");
    const syncLabel = () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      button.setAttribute("aria-label", `Switch to ${next} theme`);
    };

    button.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* storage unavailable (private mode) – theme still applies for this visit */
      }
      syncLabel();
    });

    systemDark.addEventListener("change", syncLabel);
    syncLabel();
  }

  /* ---------- Header: scroll state + mobile menu ---------- */
  function initHeader() {
    const header = $(".site-header");
    const toggle = $("#nav-toggle");
    const links = $("#nav-links");
    if (!header) return;

    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!toggle || !links) return;

    const isOpen = () => document.body.classList.contains("nav-open");
    const setOpen = (open) => {
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    toggle.addEventListener("click", () => setOpen(!isOpen()));
    links.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("click", (e) => {
      if (isOpen() && !header.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 821px)").addEventListener("change", (e) => {
      if (e.matches) setOpen(false);
    });
  }

  /* ---------- Highlight the nav link for the section in view ---------- */
  function initActiveLinks() {
    const navLinks = $$('.nav-links a[href^="#"]');
    const sections = $$("main section[id]");
    if (!navLinks.length || !sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === id;
            link.classList.toggle("is-active", active);
            if (active) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ---------- Typewriter effect in the hero ---------- */
  function initTyped() {
    const el = $("#typed");
    if (!el || reducedMotion) return;

    let words = [];
    try {
      words = JSON.parse(el.dataset.words || "[]");
    } catch (e) {
      return;
    }
    if (words.length < 2) return;

    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = true;

    const step = () => {
      const word = words[wordIndex];
      charIndex += deleting ? -1 : 1;
      el.textContent = word.slice(0, charIndex);

      let delay = deleting ? 45 : 90;
      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      }
      setTimeout(step, delay);
    };

    // The first word is already in the HTML; start erasing it after a pause
    setTimeout(step, 2200);
  }

  /* ---------- Render: Skills ---------- */
  function renderSkills() {
    const grid = $("#skills-grid");
    if (!grid || !Array.isArray(data.skills)) return;

    grid.innerHTML = data.skills
      .map(
        (group, i) => `
        <article class="skill-card reveal" style="${stagger(i)}">
          <div class="skill-icon">${icon(group.icon)}</div>
          <h3>${escapeHTML(group.category)}</h3>
          <ul class="chips">
            ${(group.items || []).map((item) => `<li class="chip">${escapeHTML(item)}</li>`).join("")}
          </ul>
        </article>`
      )
      .join("");
  }

  /* ---------- Render: Projects + filters ---------- */
  function projectThumb(project, index) {
    if (project.image) {
      return `<img src="${escapeHTML(project.image)}" alt="Screenshot of ${escapeHTML(project.title)}" loading="lazy" />`;
    }
    const hue = Number.isFinite(project.hue) ? project.hue : (240 + index * 47) % 360;
    return `
      <div class="thumb-placeholder" style="--h: ${hue}" aria-hidden="true">
        <div class="mock">
          <div class="mock-bar"><i></i><i></i><i></i></div>
          <div class="mock-body">
            <strong>${escapeHTML(project.title)}</strong>
            <span></span><span></span><span class="short"></span>
          </div>
        </div>
      </div>`;
  }

  function renderProjects() {
    const grid = $("#projects-grid");
    const filterBar = $("#project-filters");
    const projects = data.projects;
    if (!grid || !Array.isArray(projects)) return;

    grid.innerHTML = projects
      .map((project, i) => {
        const links = [
          project.live &&
            `<a href="${escapeHTML(project.live)}" target="_blank" rel="noopener noreferrer">${icon("external")} Live demo</a>`,
          project.code &&
            `<a href="${escapeHTML(project.code)}" target="_blank" rel="noopener noreferrer">${icon("github")} Source code</a>`
        ]
          .filter(Boolean)
          .join("");

        return `
        <article class="project-card reveal" data-category="${slugify(project.category)}" style="${stagger(i)}">
          <div class="project-thumb">
            ${projectThumb(project, i)}
            ${project.category ? `<span class="project-cat">${escapeHTML(project.category)}</span>` : ""}
          </div>
          <div class="project-body">
            <h3>${escapeHTML(project.title)}</h3>
            <p>${escapeHTML(project.description)}</p>
            <ul class="tags">
              ${(project.tags || []).map((tag) => `<li class="tag">${escapeHTML(tag)}</li>`).join("")}
            </ul>
            ${links ? `<div class="project-links">${links}</div>` : ""}
          </div>
        </article>`;
      })
      .join("");

    if (!filterBar) return;

    const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];
    if (categories.length < 2) {
      filterBar.remove();
      return;
    }

    filterBar.innerHTML = ["All", ...categories]
      .map(
        (label, i) =>
          `<button type="button" class="filter-btn" data-filter="${i === 0 ? "all" : slugify(label)}" aria-pressed="${i === 0}">${escapeHTML(label)}</button>`
      )
      .join("");

    filterBar.addEventListener("click", (e) => {
      const button = e.target.closest(".filter-btn");
      if (!button) return;

      const filter = button.dataset.filter;
      $$(".filter-btn", filterBar).forEach((b) => b.setAttribute("aria-pressed", String(b === button)));

      let shown = 0;
      $$(".project-card", grid).forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.hidden = !match;
        if (!match) return;

        // Replay the entrance animation for the cards that remain
        card.style.setProperty("--delay", `${shown++ * 70}ms`);
        card.classList.remove("is-visible");
        void card.offsetWidth; // force reflow so the animation restarts
        card.classList.add("is-visible");
      });
    });
  }

  /* ---------- Render: Experience timeline ---------- */
  function renderExperience() {
    const list = $("#timeline");
    if (!list || !Array.isArray(data.experience)) return;

    list.innerHTML = data.experience
      .map(
        (item) => `
        <li class="timeline-item reveal">
          <div class="timeline-card">
            <span class="timeline-period">${escapeHTML(item.period)}</span>
            <h3>${escapeHTML(item.role)}</h3>
            <p class="timeline-org">${escapeHTML(item.company)}${item.location ? ` · ${escapeHTML(item.location)}` : ""}</p>
            ${item.summary ? `<p class="timeline-summary">${escapeHTML(item.summary)}</p>` : ""}
            ${
              Array.isArray(item.highlights) && item.highlights.length
                ? `<ul class="timeline-points">${item.highlights.map((h) => `<li>${escapeHTML(h)}</li>`).join("")}</ul>`
                : ""
            }
          </div>
        </li>`
      )
      .join("");
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const items = $$(".reveal");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ---------- Count-up numbers in the About stats ---------- */
  function initCounters() {
    const counters = $$("[data-count]");
    if (!counters.length || reducedMotion || !("IntersectionObserver" in window)) return;

    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const duration = 1400;
      const start = performance.now();

      const frame = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((el) => {
      el.textContent = "0";
      observer.observe(el);
    });
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    const form = $("#contact-form");
    if (!form) return;

    const status = $("#form-status");
    const submitButton = form.querySelector('button[type="submit"]');
    const fields = $$("input, textarea", form).filter((f) => f.name !== "_gotcha");

    const setStatus = (message, type) => {
      if (!status) return;
      status.textContent = message;
      status.classList.toggle("is-success", type === "success");
      status.classList.toggle("is-error", type === "error");
    };

    const validateField = (field) => {
      const wrapper = field.closest(".field");
      const errorEl = wrapper && wrapper.querySelector(".field-error");
      const { validity } = field;

      let message = "";
      if (validity.valueMissing) message = "This field is required.";
      else if (validity.typeMismatch) message = "Please enter a valid email address.";
      else if (validity.tooShort) message = `Please write at least ${field.minLength} characters.`;

      if (wrapper) wrapper.classList.toggle("has-error", Boolean(message));
      field.setAttribute("aria-invalid", String(Boolean(message)));
      if (errorEl) errorEl.textContent = message;
      return !message;
    };

    fields.forEach((field) => {
      field.addEventListener("blur", () => field.value && validateField(field));
      field.addEventListener("input", () => {
        if (field.closest(".field.has-error")) validateField(field);
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const results = fields.map(validateField);
      if (results.includes(false)) {
        setStatus("Please fix the highlighted fields.", "error");
        const firstInvalid = fields.find((f) => f.getAttribute("aria-invalid") === "true");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const formData = new FormData(form);

      // Spam bots fill the hidden honeypot; pretend success and drop the message
      if (formData.get("_gotcha")) {
        form.reset();
        setStatus("Thanks! Your message has been sent.", "success");
        return;
      }

      const endpoint = form.dataset.endpoint;

      // No form service configured: hand the message to the visitor's email app
      if (!endpoint) {
        const name = formData.get("name");
        const subject = formData.get("subject") || `Portfolio enquiry from ${name}`;
        const body = `${formData.get("message")}\n\n${name}\n${formData.get("email")}`;
        window.location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus("Opening your email app...", "success");
        return;
      }

      submitButton.disabled = true;
      setStatus("Sending...");

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

        form.reset();
        fields.forEach((f) => f.removeAttribute("aria-invalid"));
        setStatus("Thanks! Your message has been sent. I'll reply soon.", "success");
      } catch (err) {
        console.error(err);
        setStatus("Something went wrong. Please try again or email me directly.", "error");
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  /* ---------- Footer year + back-to-top button ---------- */
  function initFooter() {
    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();

    const backToTop = $("#back-to-top");
    if (!backToTop) return;

    const toggle = () => backToTop.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.8);
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
  }

  /* ---------- Init ---------- */
  initTheme();
  initHeader();
  renderSkills();
  renderProjects();
  renderExperience();
  initActiveLinks();
  initTyped();
  initReveal();
  initCounters();
  initContactForm();
  initFooter();
})();
