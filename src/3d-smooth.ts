// @ts-nocheck
import Lenis from "lenis";

(function () {
  var noMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ================= 1. SMOOTH SCROLL (LENIS) ================= */
  if (!noMotion) {
    var lenis = new Lenis({
      lerp: 0.09,
      anchors: { offset: -76 }, // klik menu navbar ikut halus, dikurangi tinggi navbar
      prevent: function (node) {
        // modal, popup AI, dan dropdown CV tetap scroll normal
        return !!(
          node.closest &&
          node.closest(".modal-backdrop, .ai-popup, .cv-dropdown-menu")
        );
      },
    });

    // tahan scroll selama intro loading jalan
    lenis.stop();
    setTimeout(function () {
      lenis.start();
    }, 1700);

    // garis progress scroll di paling atas
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    lenis.on("scroll", function (e) {
      bar.style.transform = "scaleX(" + e.progress + ")";
    });

    var raf = function (t) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  /* ================= 2. PROJECT CAROUSEL 3D COVERFLOW ================= */
  function coverflow(grid) {
    var rect = grid.getBoundingClientRect();
    var center = rect.left + rect.width / 2;
    grid.querySelectorAll(".project-card").forEach(function (card) {
      var r = card.getBoundingClientRect();
      var d = (r.left + r.width / 2 - center) / r.width; // 0 = di tengah
      var a = Math.max(-1.6, Math.min(1.6, d));
      var abs = Math.abs(a);
      // pakai properti rotate/scale/translate terpisah supaya nggak bentrok sama tilt
      card.style.rotate = "0 1 0 " + (-a * 38).toFixed(1) + "deg";
      card.style.scale = (1 - abs * 0.1).toFixed(3);
      card.style.translate = "0 0 " + (-abs * 90).toFixed(0) + "px";
      card.style.filter = "brightness(" + (1 - abs * 0.3).toFixed(2) + ")";
    });
  }

  function bindCarousel(grid) {
    var ticking = false;
    function update() {
      ticking = false;
      coverflow(grid);
    }
    function schedule() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    grid.addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    update();
    setTimeout(update, 400);
    setTimeout(update, 1200);
  }

  // tombol panah: geser satu card per klik
  document.addEventListener(
    "click",
    function (e) {
      var btn =
        e.target.closest && e.target.closest(".carousel-prev, .carousel-next");
      if (!btn) return;
      var wrap = btn.closest(".projects-carousel");
      var grid = wrap && wrap.querySelector(".projects-grid");
      var card = grid && grid.querySelector(".project-card");
      if (!grid || !card) return;
      e.stopImmediatePropagation();
      e.preventDefault();
      var dir = btn.classList.contains("carousel-next") ? 1 : -1;
      grid.scrollBy({
        left: dir * (card.getBoundingClientRect().width + 24),
        behavior: "smooth",
      });
    },
    true,
  );

  // tunggu React selesai render carousel-nya
  var tries = 0;
  var timer = setInterval(function () {
    var grid = document.querySelector(".projects-grid");
    tries++;
    if (grid && grid.querySelector(".project-card")) {
      clearInterval(timer);
      bindCarousel(grid);
    } else if (tries > 60) {
      clearInterval(timer);
    }
  }, 100);
})();
