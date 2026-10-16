// @ts-nocheck
(function () {
  var noMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var noHover = matchMedia("(hover: none)").matches;
  if (noMotion || noHover) return;

  var targets = {
    ".skill-card": 8,
    ".experience-card": 5,
    ".projects-grid .project-card": 7,
    ".contact-box": 4,
    ".photo-frame": 14,
  };

  function bind(el, max) {
    el.classList.add("tilt");
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--gx", ((px + 0.5) * 100).toFixed(1) + "%");
      el.style.setProperty("--gy", ((py + 0.5) * 100).toFixed(1) + "%");
      el.classList.remove("is-leaving");
      el.classList.add("is-tilting");
      el.style.transform =
        "perspective(900px) rotateX(" +
        (-py * max).toFixed(2) +
        "deg) " +
        "rotateY(" +
        (px * max).toFixed(2) +
        "deg) translateY(-6px) scale(1.02)";
    });
    el.addEventListener("mouseleave", function () {
      el.classList.remove("is-tilting");
      el.classList.add("is-leaving");
      el.style.transform = "";
    });
  }

  function init() {
    Object.keys(targets).forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!el.classList.contains("tilt")) bind(el, targets[sel]);
      });
    });

    var hero = document.querySelector(".hero");
    if (!hero) return;
    var layers = [
      [".visual-glow", 18],
      [".visual-card", 38],
      [".react-badge", 55],
      [".web-badge", 55],
    ]
      .map(function (l) {
        return { el: hero.querySelector(l[0]), d: l[1] };
      })
      .filter(function (l) {
        return l.el;
      });

    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach(function (l) {
        l.el.style.transform =
          "translate3d(" +
          (x * l.d).toFixed(1) +
          "px," +
          (y * l.d).toFixed(1) +
          "px," +
          l.d +
          "px)";
      });
    });
    hero.addEventListener("mouseleave", function () {
      layers.forEach(function (l) {
        l.el.style.transform = "";
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(init, 300);
    });
  } else {
    setTimeout(init, 300);
  }
})();
