/* MaxManager site — optional enhancements, no dependencies.
   The gallery is complete without this file; filters are the only control
   hidden until the script is present. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");
  var isArabic = root.lang === "ar";
  var toggle = document.querySelector("[data-theme-toggle]");
  var themeMeta = document.querySelector("[data-theme-color]");

  var labels = isArabic
    ? {
        toDark: "التبديل إلى السمة الداكنة",
        toLight: "التبديل إلى السمة الفاتحة",
        darkTitle: "السمة الداكنة",
        lightTitle: "السمة الفاتحة"
      }
    : {
        toDark: "Switch to dark theme",
        toLight: "Switch to light theme",
        darkTitle: "Dark theme",
        lightTitle: "Light theme"
      };

  function currentTheme() {
    var value = root.getAttribute("data-theme");
    return value === "dark" ? "dark" : "light";
  }

  function paint(theme) {
    var dark = theme === "dark";

    root.setAttribute("data-theme", theme);

    if (themeMeta) {
      themeMeta.setAttribute("content", dark ? "#0a0c0b" : "#f2f4ef");
    }

    if (toggle) {
      toggle.setAttribute("aria-pressed", String(dark));
      toggle.setAttribute("aria-label", dark ? labels.toLight : labels.toDark);
      toggle.setAttribute("title", dark ? labels.lightTitle : labels.darkTitle);
    }

  }

  /* الوضع الافتراضي هو الافتراضي (أمر المالك، ٢٠٢٦-١١-١٧): لا استرجاع من
     `localStorage` ولا حفظ، فكل تحميل يبدأ على لوحة الموقع نفسها (الفاتحة)،
     ويبقى زرّ التبديل صالحًا لهذه الجلسة. */
  paint("light");

  if (toggle) {
    toggle.addEventListener("click", function () {
      paint(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  /* Reading progress: one property, no layout reads inside the frame loop. */
  var progress = document.querySelector("[data-progress]");
  var ticking = false;

  function updateProgress() {
    if (!progress) return;

    var extent = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = extent > 0 ? window.scrollY / extent : 0;
    ratio = Math.max(0, Math.min(1, ratio));
    progress.style.transform = "scaleX(" + ratio + ")";
  }

  /* The current section is the last one whose top has crossed the masthead. */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var navTargets = navLinks.map(function (link) {
    var href = link.getAttribute("href");
    if (!href || href.charAt(0) !== "#") return null;
    return document.getElementById(href.slice(1));
  });

  function updateActiveSection() {
    var line = window.scrollY + 150;
    var active = -1;

    navTargets.forEach(function (section, index) {
      if (section && section.offsetTop <= line) active = index;
    });

    navLinks.forEach(function (link, index) {
      var isActive = index === active;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  /* The bar stops looking welded to the page once content slides under it. */
  var masthead = document.querySelector(".masthead");
  var barIsLifted = null;

  function updateMasthead() {
    if (!masthead) return;

    var lifted = window.scrollY > 8;
    if (lifted === barIsLifted) return;

    barIsLifted = lifted;
    masthead.classList.toggle("is-scrolled", lifted);
  }

  function updateScrollState() {
    updateProgress();
    updateActiveSection();
    updateMasthead();
    ticking = false;
  }

  function requestScrollState() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateScrollState);
  }

  window.addEventListener("scroll", requestScrollState, { passive: true });
  window.addEventListener("resize", requestScrollState);
  updateScrollState();

  /* Menu closes after a choice and when the reader clicks outside it. */
  var menu = document.querySelector(".menu");

  Array.prototype.forEach.call(document.querySelectorAll(".menu__panel a"), function (link) {
    link.addEventListener("click", function () {
      if (menu) menu.removeAttribute("open");
    });
  });

  document.addEventListener("click", function (event) {
    if (!menu || !menu.hasAttribute("open")) return;
    if (!menu.contains(event.target)) menu.removeAttribute("open");
  });

  /* Gallery filters. Without this file every frame remains visible. */
  var filterBar = document.querySelector("[data-filters]");
  var shots = Array.prototype.slice.call(document.querySelectorAll("[data-shot-group]"));
  var gallery = document.querySelector("[data-gallery]");
  var dialog = document.getElementById("shot-dialog");

  if (filterBar && shots.length) {
    var filterButtons = Array.prototype.slice.call(
      filterBar.querySelectorAll("button[data-filter]")
    );

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-filter");

        filterButtons.forEach(function (other) {
          other.setAttribute("aria-pressed", String(other === button));
        });

        shots.forEach(function (shot) {
          shot.hidden =
            filter !== "all" && shot.getAttribute("data-shot-group") !== filter;
        });

        if (gallery) {
          gallery.classList.toggle("is-filtered", filter !== "all");
        }

        if (dialog && dialog.open) dialog.close();
      });
    });
  }

  /* The lightbox uses a native <dialog>, so Escape and focus restoration
     are handled by the browser. Previous/next stays inside what is visible. */
  var dialogImage = document.getElementById("shot-dialog-img");
  var dialogCaption = document.getElementById("shot-dialog-cap");
  var dialogPrev = document.querySelector("[data-dialog-prev]");
  var dialogNext = document.querySelector("[data-dialog-next]");
  var dialogTriggers = Array.prototype.slice.call(
    document.querySelectorAll("[data-lightbox]")
  );
  var currentIndex = 0;

  function visibleTriggers() {
    return dialogTriggers.filter(function (trigger) {
      return !trigger.hidden;
    });
  }

  function showShot(index) {
    var visible = visibleTriggers();
    if (!visible.length) return;

    currentIndex = Math.max(0, Math.min(index, visible.length - 1));

    var link = visible[currentIndex];
    var image = link.querySelector("img");

    if (dialogImage) {
      dialogImage.src = link.getAttribute("href");
      dialogImage.alt = image ? image.alt : "";
    }

    if (dialogCaption) {
      dialogCaption.textContent = link.getAttribute("data-caption") || "";
    }

    if (dialogPrev) dialogPrev.disabled = currentIndex === 0;
    if (dialogNext) dialogNext.disabled = currentIndex === visible.length - 1;
  }

  if (
    dialog &&
    dialogImage &&
    typeof dialog.showModal === "function" &&
    dialogTriggers.length
  ) {
    dialogTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        showShot(dialogTriggers.indexOf(trigger));

        if (!dialog.open) dialog.showModal();
      });
    });

    if (dialogPrev) {
      dialogPrev.addEventListener("click", function () {
        showShot(currentIndex - 1);
      });
    }

    if (dialogNext) {
      dialogNext.addEventListener("click", function () {
        showShot(currentIndex + 1);
      });
    }

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      event.preventDefault();
      var forward = event.key === "ArrowRight";
      if (isArabic) forward = !forward;
      showShot(currentIndex + (forward ? 1 : -1));
    });
  }
})();
