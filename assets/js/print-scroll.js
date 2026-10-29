/* Scroll scene for the tactile-annotation project page: the cover pose, the hand lifts, the print separates into its
 * Braille layer and base, the ATC label resolves into a place, and the camera pulls back over the surrounding map.
 * The scene is a pure function of scroll progress, so scrolling back reassembles the print.
 * Geometry: the printed De Anza map and its Braille dot groups (int16, 0.01 mm). Hand: WebXR generic hand model (MIT).
 * Surrounding map: OpenStreetMap, aligned to the print by a fit on labeled buildings. three.js r147 loads on demand. */
const DIR = "assets/scene/print/";
const VENDOR = ["assets/vendor/three-r147.min.js", "assets/vendor/GLTFLoader-r147.js"];
const POSTER = "assets/img/full/named-places.png";
const FFLATE = "assets/vendor/fflate-0.8.2.min.js"; // gzip fallback for browsers without DecompressionStream (Safari < 16.4)

export function printScrollHTML() {
  return `<section class="ps" data-sec="idea" aria-label="How a Braille label turns an anonymous shape into a named place">
  <div class="ps-stage">
    <img class="ps-poster" src="${POSTER}" alt="A hand reads the Braille label of one building on a 3D-printed campus map; a callout names it ATC, Advanced Technology Center.">
    <canvas class="ps-gl" aria-hidden="true"></canvas>
    <div class="ps-ov">
      <div class="ps-copy"><h2>From anonymous shapes to <em>named places</em></h2><p>On a 3D-printed tactile map, a building under the finger is just a shape.</p></div>
      <div class="ps-copy off"><h2>Labels live on their own layer</h2><p>Braille is added after the map is generated, as a layer that sits on the roofs of the printed base.</p></div>
      <div class="ps-copy off"><h2>Each label links a shape to a place</h2><p>Three Braille cells, a code, a name, and what the map knows about that building.</p></div>
      <div class="ps-copy off"><h2>The print is one piece of a larger map</h2><p>The base comes from OpenStreetMap, so other areas can be printed and labeled the same way.</p></div>
      <svg class="ps-lead" aria-hidden="true"></svg>
      <div class="ps-tag left" data-t="hand" aria-hidden="true"><b>Hand</b><span>reads by touch</span></div>
      <div class="ps-tag amber" data-t="br" aria-hidden="true"><b>Braille layer</b><span>one label per building</span></div>
      <div class="ps-tag" data-t="base" aria-hidden="true"><b>Printed base</b><span>footprints without names</span></div>
      <div class="ps-tag" data-t="wide" aria-hidden="true"><b>OpenStreetMap</b><span>the area around the print</span></div>
      <div class="ps-card" role="note" aria-label="The ATC label">
        <div class="ps-row"><span class="k">Braille</span><span class="v br" aria-label="Braille cells a, t, c">⠁⠞⠉</span></div>
        <div class="ps-row"><span class="k">Code</span><span class="v code">ATC</span></div>
        <div class="ps-row"><span class="k">Name</span><span class="v">Advanced Technology Center</span></div>
        <div class="ps-row"><span class="k">From OSM</span><dl><dt>Type</dt><dd>College building</dd><dt>Floors</dt><dd>2, plus 1 below ground</dd><dt>Height</dt><dd>11 m</dd><dt>Location</dt><dd>37.3211, &minus;122.0446</dd></dl></div>
      </div>
      <div class="ps-credit">Map data &copy; OpenStreetMap contributors</div>
    </div>
  </div>
</section>`;
}

const LOADING = {};
const loadScript = src => LOADING[src] || (LOADING[src] = new Promise((res, rej) => {
  const s = document.createElement("script"); s.src = src; s.dataset.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s);
}));
const gunzip = async url => {
  const r = await fetch(url);
  if ("DecompressionStream" in window) return new Response(r.body.pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
  await loadScript(FFLATE);
  const u = window.fflate.gunzipSync(new Uint8Array(await r.arrayBuffer()));
  return u.buffer.slice(u.byteOffset, u.byteOffset + u.byteLength);
};

export function mountPrintScroll(root) {
  const el = root.querySelector(".ps");
  if (!el || el.dataset.on) return;
  el.dataset.on = 1;
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (RM) return board(el);
  const gl = (() => { try { const c = document.createElement("canvas"); return c.getContext("webgl2") || c.getContext("webgl"); } catch (e) { return null; } })();
  if (!gl) return frames(el);
  // load only when the section comes near
  const io = new IntersectionObserver(es => {
    if (!es[0].isIntersecting) return;
    io.disconnect();
    (async () => {
      for (const s of VENDOR) await loadScript(s);
      const [blank, dots, meta, wide, hand] = await Promise.all([gunzip(DIR + "blank.i16.gz"), gunzip(DIR + "dots.i16.gz"),
        fetch(DIR + "print.json").then(r => r.json()), fetch(DIR + "wide.json").then(r => r.json()), fetch(DIR + "hand.glb").then(r => r.arrayBuffer())]);
      build(el, { blank: new Int16Array(blank), dots: new Int16Array(dots), meta, wide, hand }, RM);
    })().catch(e => { console.warn("print scene", e); frames(el); });
  }, { rootMargin: "600px 0px" });
  io.observe(el);
}

/* Fallbacks drawn from 40 frames pre-rendered from this same scene (assets/scene/print/frames).
 * frames(): no WebGL or the scene failed to load; scroll scrubs through the frames, so the story still plays.
 * board(): reduced motion; four key frames side by side, nothing moves. */
const FRAMES = 40, FRAME = i => `${DIR}frames/f${String(i).padStart(2, "0")}.jpg`;
const BOARD = [[0, 0], [12, 1], [23, 2], [33, 3]];
function frames(el) {
  if (el.classList.contains("seq")) return;
  el.classList.add("seq");
  const stage = el.querySelector(".ps-stage"), img = new Image(), have = [];
  img.className = "ps-seq"; img.alt = ""; img.setAttribute("aria-hidden", "true"); stage.appendChild(img);
  const pick = () => {
    const r = el.getBoundingClientRect(), run = r.height - stage.offsetHeight, top = parseFloat(getComputedStyle(stage).top) || 0;
    const want = Math.round(Math.max(0, Math.min(1, run > 0 ? (top - r.top) / run : 0)) * (FRAMES - 1));
    for (let d = 0; d < FRAMES; d++) for (const i of [want - d, want + d]) if (have[i]) { if (img.dataset.i !== String(i)) { img.src = FRAME(i); img.dataset.i = i; } return; }
  };
  for (let i = 0; i < FRAMES; i++) { const f = new Image(); f.onload = () => { have[i] = true; if (!el.classList.contains("ready")) el.classList.add("ready"); pick(); }; f.src = FRAME(i); }
  addEventListener("scroll", pick, { passive: true }); addEventListener("resize", pick);
}
function board(el) {
  el.classList.add("board");
  const copies = [...el.querySelectorAll(".ps-copy")];
  const figs = BOARD.map(([i, c]) => `<figure><img src="${FRAME(i)}" alt="" loading="lazy"><figcaption><b>${copies[c].querySelector("h2").textContent}</b> ${copies[c].querySelector("p").textContent}</figcaption></figure>`).join("");
  el.querySelector(".ps-stage").insertAdjacentHTML("beforeend", `<div class="ps-board">${figs}</div>`);
}

function build(el, data, RM) {
  const THREE = window.THREE;
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const ease = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  // cubic-bezier(x1, y1, x2, y2) as in CSS, solved by bisection on x
  const bezier = (x1, y1, x2, y2) => { const B = (t, a, b) => 3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3;
    return x => { x = clamp(x); let lo = 0, hi = 1, t = x; for (let i = 0; i < 24; i++) { t = (lo + hi) / 2; B(t, x1, x2) < x ? lo = t : hi = t; } return B(t, y1, y2); }; };
  // easing per move, never linear: a quick start and a long, firm settle
  const EASE = { move: bezier(.3, .05, .1, 1), pull: bezier(.35, 0, .15, 1), out3: x => 1 - Math.pow(1 - clamp(x), 3) };
  const seg = (p, a, b, f = ease) => f((p - a) / (b - a));
  const mix = (a, b, k) => a + (b - a) * k;
  // beats: each move is one short beat of scroll, with brief holds between them
  const BEAT = { lift: [.03, .10, EASE.out3], open: [.10, .31, EASE.move], tags: [.24, .31], focus: [.33, .46, EASE.move], card: [.37, .42], rows: [.40, .45, .50, .55], wide: [.59, .92, EASE.pull], copy: [.07, .33, .59] };
  const STILL = .57;

  const canvas = el.querySelector(".ps-gl");
  let R3;
  try { R3 = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { frames(el); return; }
  // phones and low-power devices: no real-time shadows and a lower pixel ratio, about half the GPU work
  const LOW = matchMedia("(pointer: coarse)").matches || innerWidth < 760 || (navigator.hardwareConcurrency || 8) <= 4;
  canvas.addEventListener("webglcontextlost", () => frames(el));
  THREE.ColorManagement.legacyMode = false;
  R3.outputEncoding = THREE.sRGBEncoding; R3.shadowMap.enabled = !LOW; R3.shadowMap.type = THREE.PCFSoftShadowMap;
  R3.setClearColor(0xffffff, 0); R3.toneMapping = THREE.ACESFilmicToneMapping; R3.toneMappingExposure = 1.05;
  const S = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 16 / 9, 5, 40000); cam.up.set(0, 0, 1);
  S.add(new THREE.HemisphereLight(0xfff8f0, 0x2a2f38, .65), new THREE.AmbientLight(0xffffff, .12));
  const key = new THREE.DirectionalLight(0xfff3e4, 1.7); key.position.set(-700, -600, 1200); key.castShadow = true;
  Object.assign(key.shadow.camera, { left: -900, right: 900, top: 900, bottom: -900, near: 100, far: 4000 }); key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0003; key.shadow.radius = 3;
  const rim = new THREE.DirectionalLight(0xa9c8ff, .3); rim.position.set(800, 900, 500); S.add(key, rim);

  // print: millimetres -> world (x5), centred on the plate
  const K = 5, Q = data.meta.scale, MX = x => (x - 100) * K, MY = y => (y - 100) * K, MZ = z => z * K;
  const PRINT = new THREE.MeshStandardMaterial({ color: "#EEE9E0", roughness: .82, metalness: 0 });
  const DOT0 = new THREE.Color("#EEE9E0"), DOT1 = new THREE.Color("#B8AC9A");
  const DOTMAT = new THREE.MeshStandardMaterial({ color: "#EEE9E0", roughness: .7, transparent: true });
  const DOTHI = new THREE.MeshStandardMaterial({ color: "#F2B544", roughness: .6, emissive: "#5a3c00", emissiveIntensity: .25 });
  const world = new THREE.Group(); S.add(world);
  function meshFrom(arr, mat) {
    const g = new THREE.BufferGeometry(), p = new Float32Array(arr.length);
    for (let i = 0; i < arr.length; i += 3) { p[i] = MX(arr[i] * Q); p[i + 1] = MY(arr[i + 1] * Q); p[i + 2] = MZ(arr[i + 2] * Q); }
    g.setAttribute("position", new THREE.BufferAttribute(p, 3)); g.computeVertexNormals();
    const m = new THREE.Mesh(g, mat); m.castShadow = m.receiveShadow = true; return m;
  }
  world.add(meshFrom(data.blank, PRINT));
  const BRAILLE = new THREE.Group(); world.add(BRAILLE);
  const GROUPS = data.meta.groups.map(gr => {
    const m = meshFrom(data.dots.subarray(gr.start * 9, (gr.start + gr.count) * 9), gr.code === "ATC" ? DOTHI : DOTMAT);
    BRAILLE.add(m); return { ...gr, m, x: MX(gr.cx), y: MY(gr.cy) };
  });
  const ATC = GROUPS.find(g => g.code === "ATC"), ROOF = MZ(3.5);

  // a faint sheet under the dots, so the lifted Braille reads as one layer
  const SHEET = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0, depthWrite: false, toneMapped: false }));
  SHEET.position.z = ROOF - 1; BRAILLE.add(SHEET);
  const SHEETEDGE = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints([[-500, -500], [500, -500], [500, 500], [-500, 500]].map(([x, y]) => new THREE.Vector3(x, y, ROOF - 1))),
    new THREE.LineBasicMaterial({ color: "#D5682A", transparent: true, opacity: 0, toneMapped: false }));
  BRAILLE.add(SHEETEDGE);

  // the ATC footprint on the base and a beam from its label
  const atcPts = data.wide.atc.map(([x, y]) => new THREE.Vector2(x * K, y * K));
  const FOOT = new THREE.Mesh(new THREE.ShapeGeometry(new THREE.Shape(atcPts)), new THREE.MeshBasicMaterial({ color: "#F2B544", transparent: true, opacity: 0, depthWrite: false, toneMapped: false }));
  FOOT.position.z = ROOF + .8; world.add(FOOT);
  const FOOTLINE = new THREE.Line(new THREE.BufferGeometry().setFromPoints(atcPts.map(v => new THREE.Vector3(v.x, v.y, ROOF + 1))), new THREE.LineBasicMaterial({ color: "#D5682A", transparent: true, opacity: 0, toneMapped: false }));
  world.add(FOOTLINE);
  const BEAMGEO = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
  const BEAM = new THREE.Line(BEAMGEO, new THREE.LineDashedMaterial({ color: "#D5682A", dashSize: 8, gapSize: 6, transparent: true, opacity: 0, toneMapped: false }));
  world.add(BEAM);

  // the surrounding map: real OSM drawn once to a texture, feathered toward its edges
  const WEXT = 2400, WPX = 2048;
  const GROUND = (() => {
    const c = document.createElement("canvas"); c.width = c.height = WPX; const x = c.getContext("2d"), s = WPX / (2 * WEXT), W = data.wide;
    const P = ([mx, my]) => [(mx * K + WEXT) * s, (WEXT - my * K) * s];
    const path = (pts, close) => { x.beginPath(); pts.forEach((p, i) => { const q = P(p); i ? x.lineTo(q[0], q[1]) : x.moveTo(q[0], q[1]); }); if (close) x.closePath(); };
    x.fillStyle = "#F1EEE8"; x.fillRect(0, 0, WPX, WPX);
    x.fillStyle = "#E4E9DC"; W.g.forEach(g => { path(g, true); x.fill(); });
    x.lineCap = x.lineJoin = "round"; x.strokeStyle = "#ffffff";
    W.r.sort((a, b) => a[0] - b[0]).forEach(([w, pts]) => { path(pts); x.lineWidth = Math.max(1, w * K * s * 1.4); x.stroke(); });
    x.fillStyle = "#DDD6CC"; W.b.forEach(b => { path(b, true); x.fill(); });
    x.globalCompositeOperation = "destination-in";
    const gr = x.createRadialGradient(WPX / 2, WPX / 2, WPX * .16, WPX / 2, WPX / 2, WPX * .5);
    gr.addColorStop(0, "rgba(0,0,0,1)"); gr.addColorStop(.55, "rgba(0,0,0,.55)"); gr.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = gr; x.fillRect(0, 0, WPX, WPX);
    const tex = new THREE.CanvasTexture(c); tex.encoding = THREE.sRGBEncoding; tex.anisotropy = 8;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(2 * WEXT, 2 * WEXT), new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }));
    m.renderOrder = -2; S.add(m); return m;
  })();

  // the hand, in a pointing pose, with a sleeve that hides the wrist cut
  const HAND = { root: null, bones: {}, ready: false, mat: new THREE.MeshStandardMaterial({ color: "#E6CDBA", roughness: .62, metalness: 0, transparent: true }) };
  const SLEEVE = new THREE.MeshStandardMaterial({ color: "#3E4652", roughness: .85, transparent: true });
  const ARM = new THREE.Mesh(new THREE.CylinderGeometry(74, 86, 1400, 48, 1, false), SLEEVE); ARM.castShadow = true;
  const ARMJ = new THREE.Mesh(new THREE.SphereGeometry(70, 32, 16), HAND.mat); ARMJ.castShadow = true; S.add(ARM, ARMJ); ARM.visible = ARMJ.visible = false;
  const handReady = new Promise(res => new THREE.GLTFLoader().parse(data.hand, "", gl => {
    const r = gl.scene; r.traverse(o => { if (o.isBone) HAND.bones[o.name] = o; if (o.isMesh || o.isSkinnedMesh) { o.material = HAND.mat; o.frustumCulled = false; o.renderOrder = 10; o.castShadow = true; } });
    Object.values(HAND.bones).forEach(b => b.userData.q0 = b.quaternion.clone());
    HAND.root = new THREE.Group(); HAND.root.add(r); HAND.root.scale.setScalar(3000); S.add(HAND.root); HAND.ready = true; pose(); res();
  }, () => res()));
  function pose() {
    const B = HAND.bones, r = HAND.root; Object.values(B).forEach(b => { b.quaternion.copy(b.userData.q0); if (!b.userData.p0) b.userData.p0 = b.position.clone(); b.position.copy(b.userData.p0); });
    const arm = B.wrist.parent; r.quaternion.identity(); r.position.set(0, 0, 0); r.updateMatrixWorld(true);
    const aq = new THREE.Quaternion(); arm.getWorldQuaternion(aq); const toArm = v => v.clone().applyQuaternion(aq.clone().invert()).normalize();
    const chain = (names, angles, axisW) => { const ax = toArm(axisW); names.forEach((n, j) => { const a = angles[j] || 0; if (!a) return; const R = new THREE.Quaternion().setFromAxisAngle(ax, a), piv = B[n].position.clone();
      for (let k = j; k < names.length; k++) { const b = B[names[k]]; if (k > j) b.position.sub(piv).applyQuaternion(R).add(piv); b.quaternion.premultiply(R); } }); };
    const Zw = new THREE.Vector3(0, 0, 1), Xw = new THREE.Vector3(1, 0, 0);
    ["middle", "ring", "pinky"].forEach((f, i) => chain(["proximal", "intermediate", "distal", "tip"].map(x => f + "-finger-" + (x === "tip" ? "tip" : "phalanx-" + x)), [-(.95 + i * .05), -1.05, -.6], Zw));
    chain(["index-finger-phalanx-proximal", "index-finger-phalanx-intermediate", "index-finger-phalanx-distal", "index-finger-tip"], [-.1, -.12, -.05], Zw);
    chain(["thumb-metacarpal", "thumb-phalanx-proximal", "thumb-phalanx-distal", "thumb-tip"], [-.5, -.5, -.3], Xw);
    r.updateMatrixWorld(true);
  }
  // place the hand so the index tip sits on (x, y, z), finger along F, back of the hand up
  function placeHand(x, y, z, F = [-.82, .12, -.56]) {
    const h = HAND.root; F = new THREE.Vector3(...F).normalize();
    const Z = new THREE.Vector3(0, 0, 1), U = Z.clone().sub(F.clone().multiplyScalar(Z.dot(F))).normalize(), Yl = F.clone().negate(), Zl = new THREE.Vector3().crossVectors(U, Yl);
    h.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(U, Yl, Zl)); h.position.set(0, 0, 0); h.updateMatrixWorld(true);
    const tip = new THREE.Vector3(); HAND.bones["index-finger-tip"].getWorldPosition(tip); h.position.set(x - tip.x, y - tip.y, z - tip.z); h.updateMatrixWorld(true);
    const w = new THREE.Vector3(), m = new THREE.Vector3(); HAND.bones.wrist.getWorldPosition(w); HAND.bones["middle-finger-metacarpal"].getWorldPosition(m);
    const d = w.clone().sub(m).normalize().add(new THREE.Vector3(0, 0, .15)).normalize();
    ARM.scale.set(1.12, 1, 1.12); ARM.position.copy(w).add(d.clone().multiplyScalar(706)); ARM.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), d);
    ARMJ.scale.setScalar(1.12); ARMJ.position.copy(w).add(d.clone().multiplyScalar(-40));
  }
  const atcBox = new THREE.Box3().setFromObject(ATC.m);
  const TIP = [atcBox.max.x - 6, (atcBox.min.y + atcBox.max.y) / 2, atcBox.max.z + 1];

  // camera keyframes; the cover pose matches the project's cover image
  const CAMS = {
    cover: { p: [280, -1780, 1520], t: [-10, 40, 0], f: 30 },
    open: { p: [700, -2700, 1700], t: [0, 60, 260], f: 30 },
    focus: { p: [430, -1900, 1500], t: [20, 120, 190], f: 30 },
    wide: { p: [200, -3900, 4300], t: [0, 120, 0], f: 34 },
  };
  const lerp3 = (a, b, k) => a.map((v, i) => mix(v, b[i], k));

  // overlay
  const copies = [...el.querySelectorAll(".ps-copy")];
  const tag = t => el.querySelector(`.ps-tag[data-t="${t}"]`);
  const tags = { hand: tag("hand"), br: tag("br"), base: tag("base"), wide: tag("wide") };
  const card = el.querySelector(".ps-card"), rows = [...card.querySelectorAll(".ps-row")], lead = el.querySelector(".ps-lead");
  let W = 1, H = 1;
  const v3 = new THREE.Vector3();
  const proj = (x, y, z) => { v3.set(x, y, z).project(cam); return [(v3.x + 1) / 2 * W, (1 - v3.y) / 2 * H]; };
  const place = (e, xy, a) => { if (!e.classList.contains("left")) xy = [Math.min(xy[0], W - e.offsetWidth - 14), xy[1]]; e.style.left = xy[0].toFixed(1) + "px"; e.style.top = xy[1].toFixed(1) + "px"; e.style.opacity = a.toFixed(3); };
  function size() { W = canvas.clientWidth; H = canvas.clientHeight; R3.setPixelRatio(Math.min(devicePixelRatio || 1, LOW ? 1.5 : 2)); R3.setSize(W, H, false); cam.aspect = W / H; }

  function render(p) {
    const kLift = seg(p, ...BEAT.lift), kOpen = seg(p, ...BEAT.open), kFocus = seg(p, ...BEAT.focus), kWide = seg(p, ...BEAT.wide);
    // camera: cover -> open -> focus -> wide; on wide screens the scene sits right of the copy, on phones below it
    let c = { p: lerp3(CAMS.cover.p, CAMS.open.p, kOpen), t: lerp3(CAMS.cover.t, CAMS.open.t, kOpen) };
    c = { p: lerp3(c.p, CAMS.focus.p, kFocus), t: lerp3(c.t, CAMS.focus.t, kFocus) };
    c = { p: lerp3(c.p, CAMS.wide.p, kWide), t: lerp3(c.t, CAMS.wide.t, kWide) };
    const wideScreen = W > 760, fov = mix(30, 34, kWide) * (wideScreen ? 1 : 1.35) * (W / H < 1 && wideScreen ? 1.25 : 1);
    cam.fov = fov; cam.position.set(...c.p); cam.lookAt(...c.t);
    cam.setViewOffset(W, H, wideScreen ? -0.17 * W * (1 - kWide) : 0, wideScreen ? 0 : -0.14 * H, W, H); cam.updateProjectionMatrix(); cam.updateMatrixWorld();
    // layers apart: Braille rises, the base stays, the map sinks in beneath
    const brZ = 230 * kOpen; BRAILLE.position.z = brZ;
    SHEET.material.opacity = .32 * kOpen * (1 - kWide * .6); SHEETEDGE.material.opacity = .55 * kOpen * (1 - kWide);
    GROUND.position.z = -6 - 150 * kOpen; GROUND.material.opacity = Math.max(.75 * kOpen, kWide);
    // ATC resolves: the other labels dim, its footprint lights on the base
    DOTMAT.opacity = 1 - .72 * kFocus; DOTMAT.color.copy(DOT0).lerp(DOT1, kOpen);
    FOOT.material.opacity = .45 * kFocus * (1 - kWide * .5); FOOTLINE.material.opacity = kFocus;
    BEAMGEO.setFromPoints([new THREE.Vector3(ATC.x, ATC.y, ROOF + brZ), new THREE.Vector3(ATC.x, ATC.y, ROOF + 1)]); BEAM.computeLineDistances();
    BEAM.material.opacity = kFocus * (kOpen > .5 ? 1 : 0) * (1 - kWide);
    // the hand rests on ATC, lifts, floats above the Braille layer, and is gone in the wide view
    let tip = null;
    if (HAND.ready) {
      tip = [TIP[0] + 60 * kLift, TIP[1], TIP[2] + 170 * kLift + brZ + 40 * kOpen]; placeHand(...tip);
      const a = 1 - clamp(kWide * 3.5); HAND.mat.opacity = SLEEVE.opacity = a; HAND.root.visible = ARM.visible = ARMJ.visible = a > .01;
    }
    R3.render(S, cam);

    const which = BEAT.copy.filter(t => p >= t).length;
    copies.forEach((e, i) => e.classList.toggle("off", i !== which));
    const tagA = seg(p, ...BEAT.tags) * (1 - kFocus);
    place(tags.br, proj(510, -40, ROOF + brZ), tagA);
    place(tags.base, proj(510, -40, ROOF * .5), tagA);
    place(tags.wide, proj(700, -420, GROUND.position.z), kWide);
    place(tags.hand, tip ? proj(tip[0] - 30, tip[1], tip[2] + 10) : [0, 0], tip ? tagA * (1 - clamp(kWide * 3.5)) : 0);
    const cardA = seg(p, ...BEAT.card) * (1 - clamp(kWide * 3)), at = proj(ATC.x - 40, ATC.y, ROOF + brZ + 4);
    const cx = copies[0].offsetLeft, cy = wideScreen ? H * .5 : H - 300;
    card.style.left = cx + "px"; card.style.top = cy + "px"; card.style.opacity = cardA.toFixed(3); card.style.visibility = cardA > .01 ? "visible" : "hidden";
    const ex = cx + card.offsetWidth, ey = cy + 28;
    lead.innerHTML = cardA > .01 ? `<path d="M${ex} ${ey} L${at[0].toFixed(1)} ${at[1].toFixed(1)}" stroke="#D5682A" stroke-width="2" fill="none" opacity="${cardA}"/><circle cx="${at[0].toFixed(1)}" cy="${at[1].toFixed(1)}" r="4.5" fill="#D5682A" opacity="${cardA}"/>` : "";
    BEAT.rows.forEach((t, i) => rows[i].classList.toggle("hide", p < t));
  }

  // scroll driver: the scene chases scroll progress with damping, so moves keep momentum and settle; render only on change
  const stage = el.querySelector(".ps-stage");
  let last = -1, want = 0, cur = 0, ticking = false, dead = false;
  const progress = () => { const r = el.getBoundingClientRect(), top = parseFloat(getComputedStyle(stage).top) || 0, run = r.height - stage.offsetHeight; return run > 0 ? clamp((top - r.top) / run) : 0; };
  function teardown() { dead = true; removeEventListener("scroll", onScroll); removeEventListener("resize", onResize); R3.dispose(); R3.forceContextLoss(); }
  function tick() {
    ticking = false;
    if (!el.isConnected) return teardown();
    if (el.offsetParent === null) return;
    cur += (want - cur) * .14; if (Math.abs(want - cur) < 2e-4) cur = want;
    if (Math.abs(cur - last) > 1e-5) { last = cur; render(cur); }
    if (cur !== want) { ticking = true; requestAnimationFrame(tick); }
  }
  function onScroll() { if (dead) return; if (!el.isConnected) return teardown(); want = RM ? STILL : progress(); if (!ticking) { ticking = true; requestAnimationFrame(tick); } }
  function onResize() { if (dead) return; size(); last = -1; onScroll(); }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onResize);
  el.__render = p => { size(); last = cur = want = p; render(p); };
  size();
  handReady.then(() => { cur = want = RM ? STILL : progress(); last = -1; render(cur); el.classList.add("ready"); });
}
