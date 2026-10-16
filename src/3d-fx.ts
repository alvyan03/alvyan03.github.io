// @ts-nocheck
export {};

(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var isTouch = matchMedia("(hover: none)").matches;
  var C = "139,124,246";

  /* ================= 1. PARTIKEL JARINGAN INTERAKTIF ================= */
  var canvas = document.createElement("canvas");
  canvas.id = "net2d";
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  var W, H;

  function resize() {
    var dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth;
    H = innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  addEventListener("resize", resize);

  var N = innerWidth < 768 ? 35 : 75;
  var ps = [];
  for (var i = 0; i < N; i++) {
    ps.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1 + Math.random() * 1.6,
    });
  }

  var mx = -9999,
    my = -9999;
  addEventListener("mousemove", function (e) {
    mx = e.clientX;
    my = e.clientY;
  });
  document.addEventListener("mouseleave", function () {
    mx = -9999;
    my = -9999;
  });

  /* ================= 2. SPOTLIGHT NGIKUTIN MOUSE ================= */
  var spot = null;
  var sx = W / 2,
    sy = H / 2;
  if (!isTouch) {
    spot = document.createElement("div");
    spot.className = "spotlight";
    document.body.appendChild(spot);
  }

  var lastScroll = scrollY;
  var running = true;

  function frame() {
    if (!running) return;
    requestAnimationFrame(frame);

    ctx.clearRect(0, 0, W, H);

    // sedikit parallax pas scroll
    var ds = (scrollY - lastScroll) * 0.15;
    lastScroll = scrollY;

    var p, q, dx, dy, dist, f, k;
    for (k = 0; k < ps.length; k++) {
      p = ps[k];

      // menghindar dari mouse
      dx = p.x - mx;
      dy = p.y - my;
      dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150 && dist > 0.1) {
        f = (150 - dist) / 150;
        p.x += (dx / dist) * f * 2.4;
        p.y += (dy / dist) * f * 2.4;
      }

      p.x += p.vx;
      p.y += p.vy - ds;
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;
    }

    // garis antar partikel yang berdekatan
    ctx.lineWidth = 1;
    ctx.shadowBlur = 0;
    for (var a = 0; a < ps.length; a++) {
      for (var b = a + 1; b < ps.length; b++) {
        dx = ps[a].x - ps[b].x;
        dy = ps[a].y - ps[b].y;
        dist = dx * dx + dy * dy;
        if (dist < 14400) {
          // 120px
          ctx.strokeStyle =
            "rgba(" + C + "," + (0.16 * (1 - dist / 14400)).toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(ps[a].x, ps[a].y);
          ctx.lineTo(ps[b].x, ps[b].y);
          ctx.stroke();
        }
      }
      // garis ke mouse
      dx = ps[a].x - mx;
      dy = ps[a].y - my;
      dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 190) {
        ctx.strokeStyle =
          "rgba(" + C + "," + (0.45 * (1 - dist / 190)).toFixed(3) + ")";
        ctx.beginPath();
        ctx.moveTo(ps[a].x, ps[a].y);
        ctx.lineTo(mx, my);
        ctx.stroke();
      }
    }

    // titik dengan glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(" + C + ",0.9)";
    ctx.fillStyle = "rgba(" + C + ",0.85)";
    for (k = 0; k < ps.length; k++) {
      ctx.beginPath();
      ctx.arc(ps[k].x, ps[k].y, ps[k].r, 0, 6.2832);
      ctx.fill();
    }

    if (spot && mx > -9000) {
      sx += (mx - sx) * 0.12;
      sy += (my - sy) * 0.12;
      spot.style.setProperty("--sx", sx.toFixed(0) + "px");
      spot.style.setProperty("--sy", sy.toFixed(0) + "px");
    }
  }

  document.addEventListener("visibilitychange", function () {
    var was = running;
    running = !document.hidden;
    if (running && !was) frame();
  });
  frame();

  /* ================= 3. TEKS SCRAMBLE ================= */
  var CH = "!<>-_/[]{}=+*^?#ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

  function scramble(el) {
    if (el._scr) return;
    if (!el.dataset.orig) el.dataset.orig = el.textContent;
    var text = el.dataset.orig;
    var len = text.length;
    var frameNo = 0;
    var total = 24;
    el._scr = true;
    if (getComputedStyle(el).display !== "inline") {
      el.style.minWidth = el.offsetWidth + "px";
    }
    (function step() {
      var p = frameNo / total;
      var out = "";
      for (var i = 0; i < len; i++) {
        if (text[i] === " " || i < Math.floor(p * len * 1.15)) out += text[i];
        else out += CH[(Math.random() * CH.length) | 0];
      }
      el.textContent = out;
      frameNo++;
      if (frameNo <= total) {
        setTimeout(step, 32);
      } else {
        el.textContent = text;
        el._scr = false;
      }
    })();
  }

  // label section: scramble sekali pas pertama kali kelihatan
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          io.unobserve(en.target);
          scramble(en.target);
        }
      });
    },
    { threshold: 0.6 },
  );

  var scanQueued = false;
  function scan() {
    scanQueued = false;
    document
      .querySelectorAll(".section-label, .eyebrow")
      .forEach(function (el) {
        if (el.dataset.scr || el.children.length) return;
        el.dataset.scr = "1";
        io.observe(el);
      });
  }
  new MutationObserver(function () {
    if (!scanQueued) {
      scanQueued = true;
      requestAnimationFrame(scan);
    }
  }).observe(document.body, { childList: true, subtree: true });
  scan();

  // menu navbar: scramble pas di-hover
  if (!isTouch) {
    document.addEventListener("mouseover", function (e) {
      var a = e.target.closest && e.target.closest(".nav-links a");
      if (!a || a.children.length) return;
      if (a.contains(e.relatedTarget)) return;
      scramble(a);
    });
  }
})();
