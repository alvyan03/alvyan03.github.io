// @ts-nocheck
export {};

(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var isTouch = matchMedia("(hover: none)").matches;
  var introDone = false;
  var titleEl = null;

  /* ================= 1. INTRO LOADING ================= */
  function runIntro() {
    var el = document.createElement("div");
    el.className = "intro";
    el.innerHTML =
      '<div class="intro-count"><b>0</b><span>%</span></div>' +
      '<div class="intro-bar"><i></i></div>' +
      '<div class="intro-label">Loading portfolio</div>';
    document.body.appendChild(el);
    document.documentElement.style.overflow = "hidden";

    var num = el.querySelector("b");
    var bar = el.querySelector("i");
    var start = performance.now();
    var dur = 1400;

    function tick(now) {
      var t = Math.min(1, (now - start) / dur);
      var e = 1 - Math.pow(1 - t, 3);
      num.textContent = Math.round(e * 100);
      bar.style.width = e * 100 + "%";
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(function () {
          el.classList.add("done");
          document.documentElement.style.overflow = "";
          introDone = true;
          if (titleEl) titleEl.classList.add("go");
          setTimeout(function () {
            el.remove();
          }, 1000);
        }, 250);
      }
    }
    requestAnimationFrame(tick);
  }

  /* ================= 2. TEKS HERO PER HURUF ================= */
  function splitTitle(el) {
    try {
      var i = 0;
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);

      nodes.forEach(function (node) {
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(" "));
            return;
          }
          var w = document.createElement("span");
          w.className = "word";
          part.split("").forEach(function (ch) {
            var c = document.createElement("span");
            c.className = "char";
            c.textContent = ch;
            c.style.setProperty("--i", i++);
            w.appendChild(c);
          });
          frag.appendChild(w);
        });
        node.parentNode.replaceChild(frag, node);
      });

      el.setAttribute("aria-label", el.textContent);
      el.classList.add("split");
      titleEl = el;
      if (introDone) el.classList.add("go");
    } catch (err) {}
  }

  function waitForTitle() {
    var tries = 0;
    var timer = setInterval(function () {
      var el = document.querySelector(".hero-title");
      tries++;
      if (el && !el.classList.contains("split")) {
        clearInterval(timer);
        splitTitle(el);
      } else if (tries > 40) {
        clearInterval(timer);
      }
    }, 75);
  }

  runIntro();
  waitForTitle();

  if (isTouch) return;

  /* ================= 3. CURSOR CUSTOM ================= */
  var dot = document.createElement("div");
  var ring = document.createElement("div");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  document.body.appendChild(ring);
  document.body.appendChild(dot);
  document.documentElement.classList.add("has-cursor");

  var cx = innerWidth / 2,
    cy = innerHeight / 2;
  var rx = cx,
    ry = cy;

  document.addEventListener("mousemove", function (e) {
    cx = e.clientX;
    cy = e.clientY;
    dot.style.opacity = "1";
    ring.style.opacity = "1";
    var hot =
      e.target.closest &&
      e.target.closest("a, button, input, .tilt, .carousel-arrow");
    ring.classList.toggle("hover", !!hot);
  });
  document.addEventListener("mouseleave", function () {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });

  (function follow() {
    rx += (cx - rx) * 0.16;
    ry += (cy - ry) * 0.16;
    dot.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
    ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
    requestAnimationFrame(follow);
  })();

  /* ================= 4. MAGNETIC BUTTON ================= */
  var MAG = ".button, .nav-talk, .nav-ai, .footer-socials a, .carousel-arrow";
  var cur = null;

  document.addEventListener("mousemove", function (e) {
    var el = e.target.closest && e.target.closest(MAG);
    if (cur && cur !== el) {
      cur.style.transform = "";
      cur = null;
    }
    if (!el) return;
    cur = el;
    var r = el.getBoundingClientRect();
    var x = (e.clientX - (r.left + r.width / 2)) * 0.3;
    var y = (e.clientY - (r.top + r.height / 2)) * 0.3;
    el.style.transform =
      "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
  });
})();
