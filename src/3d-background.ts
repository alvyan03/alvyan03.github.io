// @ts-nocheck
import * as THREE from "three";

(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var isMobile = innerWidth < 768;
  var ACCENT = 0x8b7cf6;

  var canvas = document.createElement("canvas");
  canvas.id = "bg3d";
  document.body.prepend(canvas);

  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setSize(innerWidth, innerHeight);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    60,
    innerWidth / innerHeight,
    0.1,
    120,
  );
  camera.position.z = 14;
  scene.add(camera); // wajib, karena blob jadi anak kamera

  var world = new THREE.Group();
  scene.add(world);

  /* ---------- partikel (nyebar di sepanjang jalur kamera) ---------- */
  var count = isMobile ? 500 : 1400;
  var pos = new Float32Array(count * 3);
  for (var i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 40;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
  }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  world.add(
    new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: ACCENT,
        size: 0.07,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      }),
    ),
  );

  /* ---------- bentuk wireframe melayang ---------- */
  var shapeGeos = [
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.TorusGeometry(0.8, 0.25, 8, 24),
  ];
  var shapes = [];
  var n = isMobile ? 6 : 14;
  for (var j = 0; j < n; j++) {
    var m = new THREE.Mesh(
      shapeGeos[j % 3],
      new THREE.MeshBasicMaterial({
        color: ACCENT,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      }),
    );
    m.position.set(
      (Math.random() - 0.5) * 26,
      (Math.random() - 0.5) * 16,
      6 - Math.random() * 28,
    );
    m.scale.setScalar(0.7 + Math.random() * 1.4);
    m.userData = {
      sx: (Math.random() - 0.5) * 0.01,
      sy: (Math.random() - 0.5) * 0.01,
      off: Math.random() * 6.28,
      y: m.position.y,
    };
    world.add(m);
    shapes.push(m);
  }

  /* ---------- blob di hero (nempel ke kamera) ---------- */
  var vertexShader =
    "uniform float uTime; varying vec3 vNormal; varying vec3 vView;" +
    "float n(vec3 p){ return sin(p.x*1.7+uTime)*sin(p.y*1.9+uTime*1.1)*sin(p.z*1.5+uTime*0.9); }" +
    "void main(){" +
    "  float d = n(position*1.2)*0.38 + n(position*2.6)*0.12;" +
    "  vec3 p = position + normal*d;" +
    "  vec4 mv = modelViewMatrix*vec4(p,1.0);" +
    "  vNormal = normalize(normalMatrix*normal);" +
    "  vView = normalize(-mv.xyz);" +
    "  gl_Position = projectionMatrix*mv;" +
    "}";
  var fragmentShader =
    "varying vec3 vNormal; varying vec3 vView;" +
    "void main(){" +
    "  float f = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.4);" +
    "  vec3 base = vec3(0.35,0.28,0.85);" +
    "  vec3 rim = vec3(0.78,0.72,1.0);" +
    "  gl_FragColor = vec4(mix(base*0.3, rim, f), 0.3 + f*0.7);" +
    "}";

  var blobMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    depthWrite: false,
  });
  var blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 32), blobMat);
  blob.position.z = -9;
  camera.add(blob);

  var baseX = 0,
    baseY = 0,
    baseScale = 1;
  function layoutBlob() {
    var halfH = Math.tan((camera.fov * Math.PI) / 360) * 9;
    var halfW = halfH * camera.aspect;
    if (innerWidth < 900) {
      baseX = 0;
      baseY = halfH * 0.1;
      baseScale = 0.8;
    } else {
      baseX = halfW * 0.48;
      baseY = 0;
      baseScale = 1;
    }
  }
  layoutBlob();

  /* ---------- input ---------- */
  var mx = 0,
    my = 0;
  addEventListener("mousemove", function (e) {
    mx = e.clientX / innerWidth - 0.5;
    my = e.clientY / innerHeight - 0.5;
  });
  addEventListener("resize", function () {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    layoutBlob();
  });

  var running = true;
  var clock = new THREE.Clock();
  var smoothProg = 0;

  function loop() {
    if (!running) return;
    requestAnimationFrame(loop);
    var t = clock.getElapsedTime();

    // progress scroll 0..1, di-smooth biar "terbangnya" halus
    var maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - innerHeight,
    );
    var prog = Math.min(1, Math.max(0, scrollY / maxScroll));
    smoothProg += (prog - smoothProg) * 0.06;

    // kamera terbang menembus dunia + goyang kiri-kanan + ngikutin mouse
    var a = smoothProg * Math.PI * 2;
    var tx = Math.sin(a) * 4 + mx * 3;
    var ty = (Math.cos(a) - 1) * 1.5 - my * 2;
    var tz = 14 - smoothProg * 34;
    camera.position.x += (tx - camera.position.x) * 0.05;
    camera.position.y += (ty - camera.position.y) * 0.05;
    camera.position.z += (tz - camera.position.z) * 0.05;
    camera.lookAt(
      camera.position.x * 0.4,
      camera.position.y * 0.4,
      camera.position.z - 10,
    );

    world.rotation.y = t * 0.015;

    shapes.forEach(function (s) {
      s.rotation.x += s.userData.sx;
      s.rotation.y += s.userData.sy;
      s.position.y = s.userData.y + Math.sin(t * 0.6 + s.userData.off) * 0.6;
    });

    // blob: ngecil dan ngilang pas scroll turun, gerak halus ngikutin mouse
    var fade = Math.max(0, 1 - scrollY / (innerHeight * 0.8));
    blob.visible = fade > 0.01;
    if (blob.visible) {
      blobMat.uniforms.uTime.value = t * 0.8;
      blob.scale.setScalar(baseScale * (0.4 + fade * 0.6));
      blob.position.x += (baseX + mx * 1.2 - blob.position.x) * 0.06;
      blob.position.y += (baseY - my * 0.8 - blob.position.y) * 0.06;
      blob.rotation.y = t * 0.15 + mx * 1.5;
      blob.rotation.x = t * 0.1 - my * 1.2;
    }

    renderer.render(scene, camera);
  }

  document.addEventListener("visibilitychange", function () {
    var was = running;
    running = !document.hidden;
    if (running && !was) loop();
  });

  loop();
})();
