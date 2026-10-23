/* Right This Way motivation demo: a dim, blurred room where only the phone screen is in focus.
   Take a photo to ask; the AI then guides the camera live until the object is in frame.
   Object boxes are in the pixel space of the source photo (1224 x 1632). */
const IMG = { w: 1224, h: 1632, src: "assets/img/demo/vizwiz-room.jpg" };
/* screen hole in hand.webp (1098 x 1913; forearms extended and faded below the original crop), slightly expanded so the hand covers the edges */
const HAND = { src: "assets/img/demo/hand.webp", w: 1098, h: 1913, x0: 458, y0: 84, x1: 707, y1: 619, r: 22 };
const PH_W = 470; /* phone screen width, in source-photo pixels */
const PH_H = PH_W * (HAND.y1 - HAND.y0) / (HAND.x1 - HAND.x0);
const ZOOM = 1.25; /* the camera view is magnified on the screen */
const FOV_W = PH_W / ZOOM, FOV_H = PH_H / ZOOM; /* what the camera captures */
const FOUND = 0.98; /* the object must sit fully inside the clearly visible part of the screen */
const SAFE_X = .12, SAFE_Y = .07; /* feathered edges and the bezel hide this much of each side */
const SW = FOV_W * (1 - 2 * SAFE_X), SH = FOV_H * (1 - 2 * SAFE_Y); /* clearly visible view */
const EDGE_X = .06, EDGE_Y = .04; /* how far past the photo edge the screen may go */
const NEAR = 1.35; /* outline shows once the object is within this many view sizes */
const EDGE = 36; /* px band at the room edge where the pointer is released */
const BLUR_SPEED = 1400; /* room px per second */
const TILT = 4, YAW = 14, PITCH = 10; /* degrees */
const LIVE_MS = 220;
const QUESTIONS = [
  { t: "What does the sign say?", q: "What does the sign above the fireplace say?", n: "the sign", b: [492, 28, 748, 262], a: "It says \u201cGood all the time.\u201d" },
  { t: "Is the fire on?", q: "Is the fireplace on?", n: "the fire", b: [470, 752, 742, 896], a: "No. The logs behind the glass are dark, and there is no flame." },
  { t: "Where is the monkey?", q: "Where is the stuffed monkey?", n: "the stuffed monkey", b: [1030, 928, 1185, 1068], a: "To the right of the fireplace, draped over the green storage bin." },
  { t: "What's on the mantel?", q: "What is on the right end of the mantel?", n: "the right end of the mantel", b: [832, 30, 1008, 172], a: "A black iron candle holder with three candles." },
  { t: "What's on the stand?", q: "What is on the stand at the left end of the mantel?", n: "the stand", b: [212, 72, 338, 208], a: "A decorative plate with a blue floral pattern, propped on a stack of books." },
  { t: "What's on the counter?", q: "What is on the counter above the right bookshelf?", n: "that counter", b: [1000, 410, 1148, 538], a: "A large blue glass jar with a lid." },
  { t: "What's this card?", q: "What is the card on the left shelf?", n: "the card", b: [24, 390, 110, 496], a: "A handmade card with a flower on it." },
];
const ARROW = '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M18 50h58M56 28l22 22-22 22"/></svg>';
export const guideHTML = () => `<section class="rw" aria-labelledby="rw-t">
  <div class="rw-head"><h2 id="rw-t">Try it: when the photo is not enough</h2>
    <p>For blind and low-vision users, a well-framed photo is hard to take. AI assistants answer well once the object is in frame, but getting it in frame is the hard part. Here only the phone screen is in focus: take a photo, then follow the guidance.</p></div>
  <div class="rw-stage">
    <div class="rw-ask"><div class="rw-ask-top"><span class="rw-ask-l" id="rw-ask">Ask a question</span><button class="rw-skipdemo">Skip the demo<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M4 9l4 4 4-4"/></svg></button></div><div class="rw-tabs" role="tablist" aria-labelledby="rw-ask">${QUESTIONS.map((x, i) => `<button role="tab" data-q="${i}" aria-selected="false">${x.t}<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"/></svg></button>`).join("")}</div></div>
    <div class="rw-room free" tabindex="0" aria-label="Demo room. Arrow keys move the phone, Enter takes a photo.">
      <div class="rw-bg" style="background-image:url(${IMG.src})"></div>
      <img class="rw-scene" src="${IMG.src}" alt="" draggable="false">
      <div class="rw-rig">
        <i class="rw-glow"></i>
        <div class="rw-vf"><div class="rw-view"><img src="${IMG.src}" alt="" draggable="false"><i class="rw-box"></i></div><i class="rw-gloss"></i>
          <span class="rw-cam"><i class="rw-hint">Click to take a photo</i><i class="rw-shut"></i></span>
          <span class="rw-arrow" hidden>${ARROW}</span><i class="rw-flash"></i></div>
        <img class="rw-hand" src="${HAND.src}" alt="" draggable="false">
      </div>
      <div class="rw-think"><span class="rw-lbl">Wondering</span><p class="rw-q"></p><i></i><i></i></div>
      <div class="rw-ai" aria-live="polite"><span class="rw-lbl">AI</span><div class="rw-ai-b"><canvas width="64" height="140" aria-hidden="true"></canvas><p class="rw-r">Take a photo, and I will look.</p></div></div>
      <i class="rw-dot" aria-hidden="true"></i>
      <div class="rw-tip" aria-hidden="true">Move the phone. Click to take a photo.</div>
      <div class="rw-free" aria-hidden="true">Pointer released. Move inward to hold the phone again.</div>
    </div>
  </div>
  <div class="rw-bar"><p class="rw-note">Photo by a blind user, from <a href="https://vizwiz.org/" target="_blank" rel="noopener">VizWiz</a> (VizWiz_train_00023341, living room, CC BY 4.0). A concept demo.</p><span class="rw-btns"><button class="rw-shoot">Take photo</button></span></div>
</section>`;
const dirText = (h, v) => !v ? h : !h ? v : `${v} and to the ${h}`;
const lim = (v, m) => Math.max(-m, Math.min(m, v));
export function mountGuide(root) {
  const el = root.querySelector(".rw");
  if (!el || el.dataset.on) return;
  el.dataset.on = 1;
  const $ = s => el.querySelector(s);
  const room = $(".rw-room"), scene = $(".rw-scene"), rig = $(".rw-rig"), vf = $(".rw-vf"), view = $(".rw-view"), sharp = view.querySelector("img"), box = $(".rw-box");
  const hand = $(".rw-hand"), glow = $(".rw-glow"), arrow = $(".rw-arrow"), qEl = $(".rw-q"), rEl = $(".rw-r"), cv = $("canvas");
  const think = $(".rw-think"), bubbles = [$(".rw-ai")], tabs = [...el.querySelectorAll(".rw-tabs button")], tip = $(".rw-tip"), flash = $(".rw-flash"), dot = $(".rw-dot");
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let L = null, cur = { x: IMG.w / 2, y: IMG.h * .62 }, aim = { ...cur }, tilt = 0, yaw = 0, pitch = 0;
  let fadeAt = 0, last = [], qi = -1, shots = 0, done = false, live = false, seen = false, liveAt = 0, liveKey = "";
  const memo = QUESTIONS.map(() => null); /* per question: shots, seen, done, reply html, thumbnail */
  /* the screen may run past the photo only by a thin feathered band, so the photo edge never shows as a hard line */
  const MX = FOV_W * (.5 - EDGE_X), MY = FOV_H * (.5 - EDGE_Y);
  const clamp = p => ({ x: Math.min(IMG.w - MX, Math.max(MX, p.x)), y: Math.min(IMG.h - MY, Math.max(MY, p.y)) });
  function layout() {
    const w = room.clientWidth, h = room.clientHeight, k = Math.min(w / IMG.w, h / IMG.h);
    L = { w, h, k, ox: (w - IMG.w * k) / 2, oy: (h - IMG.h * k) / 2, m: PH_W * k / (HAND.x1 - HAND.x0), vw: PH_W * k, vh: PH_H * k };
    scene.style.width = IMG.w * k + "px"; scene.style.height = IMG.h * k + "px"; scene.style.left = L.ox + "px"; scene.style.top = L.oy + "px";
    view.style.width = IMG.w * k * ZOOM + "px"; view.style.height = IMG.h * k * ZOOM + "px";
    hand.style.width = HAND.w * L.m + "px";
    hand.style.transform = `translate(${-HAND.x0 * L.m}px,${-HAND.y0 * L.m}px)`;
    vf.style.width = L.vw + "px"; vf.style.height = L.vh + "px"; vf.style.borderRadius = HAND.r * L.m + "px";
    vf.style.setProperty("--f", Math.max(6, L.vw * .09) + "px"); vf.style.setProperty("--vw", L.vw + "px");
    rig.style.transformOrigin = `${L.vw / 2}px ${L.vh / 2}px`;
    glow.style.width = L.vw * 2.6 + "px"; glow.style.height = L.vh * 1.5 + "px";
    glow.style.left = -L.vw * .8 + "px"; glow.style.top = -L.vh * .25 + "px";
    el.classList.toggle("rw-sm", L.ox < 190); measure();
    outline(); place();
  }
  /* the phone turns in perspective with its position and motion; the magnified view counter-rolls so the room stays level */
  function place() {
    const { k, ox, oy, vw, vh } = L, sx = ox + cur.x * k - vw / 2, sy = oy + cur.y * k - vh / 2;
    rig.style.transform = `translate(${sx}px,${sy}px) perspective(1100px) rotateY(${yaw}deg) rotateX(${pitch}deg) rotate(${tilt}deg)`;
    follow(sx, sy);
    view.style.transform = `translate(${vw / 2}px,${vh / 2}px) rotate(${-tilt}deg) translate(${-cur.x * k * ZOOM}px,${-cur.y * k * ZOOM}px)`;
  }
  /* the question bubble rides beside the phone, on whichever side has room */
  let tw = 0, th = 0;
  const measure = () => { tw = think.offsetWidth; th = think.offsetHeight; };
  function follow(sx, sy) {
    if (el.classList.contains("rw-sm")) { think.style.transform = ""; return; }
    let x = sx - tw - 22, right = x < 12;
    if (right) x = sx + L.vw + 22;
    x = Math.max(12, Math.min(L.w - tw - 12, x));
    const y = Math.max(12, Math.min(L.h - th - 12, sy + L.vh * .08));
    think.style.transform = `translate(${x}px,${y}px)`;
    think.classList.toggle("r", right);
  }
  function outline() {
    if (qi < 0 || !L) return;
    const [x0, y0, x1, y1] = QUESTIONS[qi].b, s = L.k * ZOOM, pad = 10 / ZOOM;
    Object.assign(box.style, { left: (x0 - pad) * s + "px", top: (y0 - pad) * s + "px", width: (x1 - x0 + 2 * pad) * s + "px", height: (y1 - y0 + 2 * pad) * s + "px" });
  }
  const toScene = e => { const r = room.getBoundingClientRect(); return { x: (e.clientX - r.left - L.ox) / L.k, y: (e.clientY - r.top - L.oy) / L.k }; };
  /* what the camera sees at p: the visible fraction of the object, and which way to move */
  function assess(p) {
    const [x0, y0, x1, y1] = QUESTIONS[qi].b;
    const r = { x0: p.x - SW / 2, y0: p.y - SH / 2, x1: p.x + SW / 2, y1: p.y + SH / 2 };
    const ix = Math.max(0, Math.min(x1, r.x1) - Math.max(x0, r.x0)), iy = Math.max(0, Math.min(y1, r.y1) - Math.max(y0, r.y0));
    const f = ix * iy / ((x1 - x0) * (y1 - y0)), dx = (x0 + x1) / 2 - p.x, dy = (y0 + y1) / 2 - p.y;
    let h = "", v = "";
    if (f > 0) {
      if (x0 < r.x0) h = "left"; else if (x1 > r.x1) h = "right";
      if (y0 < r.y0) v = "up"; else if (y1 > r.y1) v = "down";
    } else {
      if (Math.abs(dx) > SW * .3) h = dx < 0 ? "left" : "right";
      if (Math.abs(dy) > SH * .3) v = dy < 0 ? "up" : "down";
    }
    const near = Math.abs(dx) < SW * NEAR && Math.abs(dy) < SH * NEAR;
    return { r, f, h, v, near };
  }
  const save = () => { if (qi >= 0) memo[qi] = { shots, seen, done, html: rEl.innerHTML, thumb: cv.classList.contains("on") ? cv.toDataURL() : "" }; };
  function ask(i) {
    save();
    qi = i; const m = memo[i] || { shots: 0, seen: false, done: false, html: "Take a photo, and I will look.", thumb: "" };
    ({ shots, seen, done } = m); live = shots > 0 && !done; liveKey = "";
    qEl.textContent = QUESTIONS[i].q; measure();
    rEl.innerHTML = m.html;
    const c = cv.getContext("2d"); c.clearRect(0, 0, cv.width, cv.height); cv.classList.toggle("on", !!m.thumb);
    if (m.thumb) { const im = new Image(); im.onload = () => c.drawImage(im, 0, 0); im.src = m.thumb; }
    arrow.hidden = true; box.className = "rw-box" + (done ? " on in" : seen ? " on" : ""); outline(); count();
    tabs.forEach((b, k) => { b.setAttribute("aria-selected", k === i); b.tabIndex = k === i ? 0 : -1; });
  }
  const count = () => {};
  function point(h, v) {
    if (!h && !v) { arrow.hidden = true; return; }
    const a = Math.atan2(v === "up" ? -1 : v === "down" ? 1 : 0, h === "left" ? -1 : h === "right" ? 1 : 0) * 180 / Math.PI;
    arrow.style.setProperty("--a", a + "deg");
    if (arrow.hidden) { arrow.hidden = false; arrow.classList.remove("go"); void arrow.offsetWidth; arrow.classList.add("go"); }
  }
  /* guidance text and visuals for a view; the outline appears once the object is near or has been seen */
  function guide(s, photo) {
    if (s.f > 0) seen = true;
    box.classList.toggle("on", seen || s.near);
    box.classList.toggle("in", s.f >= FOUND);
    const t = QUESTIONS[qi], go = `<b>Move the camera ${dirText(s.h, s.v) || "a little"}.</b>`;
    if (s.f >= FOUND) { arrow.hidden = true; rEl.innerHTML = photo ? "" : `${t.n[0].toUpperCase() + t.n.slice(1)} is in view. <b>Hold still and take the photo.</b>`; return; }
    point(s.h, s.v);
    rEl.innerHTML = `${s.f > 0 ? `I can see part of ${t.n}, but it is cut off.` : `I don't see ${t.n} ${photo ? "in this photo" : "yet"}.`} ${go}`;
  }
  function shoot(blurry) {
    if (done) return;
    tip.classList.add("off");
    shots++; count();
    const s = assess(cur), c = cv.getContext("2d");
    c.save(); c.filter = blurry ? "blur(3px)" : "none";
    c.drawImage(sharp, cur.x - FOV_W / 2, cur.y - FOV_H / 2, FOV_W, FOV_H, 0, 0, cv.width, cv.height); c.restore();
    cv.classList.add("on");
    if (!calm) { flash.classList.remove("go"); void flash.offsetWidth; flash.classList.add("go"); }
    if (blurry) { rEl.innerHTML = "This photo is blurry. <b>Hold the phone still and try again.</b>"; arrow.hidden = true; return; }
    live = true; liveKey = "";
    if (s.f >= FOUND) {
      done = true; live = false; guide(s, true);
      rEl.innerHTML = `${QUESTIONS[qi].a} <span class="rw-n">Answered with ${shots} photo${shots > 1 ? "s" : ""}.</span>`;
      tabs[qi].classList.add("done"); save();
    } else guide(s, true);
  }
  /* pointer: inside the room the hand follows the pointer and a dot marks the pointer itself;
     near the edge, over a bubble, or outside, the phone is set down and the normal cursor returns */
  let down = null, free = true;
  const release = on => { if (on === free) return; free = on; room.classList.toggle("free", on); if (on) last = []; else room.classList.add("held"); };
  room.addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse" && !down) return;
    const b = room.getBoundingClientRect(), px = e.clientX - b.left, py = e.clientY - b.top;
    const edge = e.pointerType === "mouse" && (px < EDGE || py < EDGE || px > b.width - EDGE || py > b.height - EDGE);
    release(edge || !!e.target.closest(".rw-ai"));
    if (free) return;
    dot.style.transform = `translate(${px}px,${py}px)`;
    aim = clamp(toScene(e)); tip.classList.add("off");
    const now = performance.now(); last.push([now, e.clientX, e.clientY]); while (last.length && now - last[0][0] > 100) last.shift();
  });
  room.addEventListener("pointerleave", () => release(true));
  room.addEventListener("pointerdown", e => { if (e.pointerType === "mouse" && free) return; down = { x: e.clientX, y: e.clientY }; if (e.pointerType !== "mouse" && !e.target.closest(".rw-ai")) room.setPointerCapture(e.pointerId); });
  room.addEventListener("pointercancel", () => { down = null; });
  room.addEventListener("pointerup", e => {
    if (!down) return;
    const tap = Math.hypot(e.clientX - down.x, e.clientY - down.y) < 8; down = null;
    if (!tap) return;
    /* touch: drag or tap to move the phone, tap its screen to take the photo */
    if (e.pointerType !== "mouse") {
      if (e.target.closest(".rw-ai")) return;
      const v = vf.getBoundingClientRect();
      if (e.clientX > v.left && e.clientX < v.right && e.clientY > v.top && e.clientY < v.bottom) return shoot(false);
      aim = clamp(toScene(e)); tip.classList.add("off"); return;
    }
    if (free) return;
    let v = 0;
    if (last.length > 1) { const a = last[0], b = last[last.length - 1]; v = Math.hypot(b[1] - a[1], b[2] - a[2]) / Math.max(16, b[0] - a[0]) * 1000; }
    shoot(v > BLUR_SPEED);
  });
  room.addEventListener("keydown", e => {
    const s = e.shiftKey ? 160 : 60, mv = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] }[e.key];
    if (mv) { e.preventDefault(); aim = clamp({ x: aim.x + mv[0], y: aim.y + mv[1] }); tip.classList.add("off"); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); cur = { ...aim }; place(); shoot(false); }
  });
  $(".rw-shoot").addEventListener("click", () => { cur = { ...aim }; place(); shoot(false); });
  tabs.forEach((b, k) => b.addEventListener("click", () => ask(k)));
  $(".rw-skipdemo").addEventListener("click", () => { const n = el.nextElementSibling; if (n) { const top = document.querySelector(".top"); window.scrollTo({ top: n.getBoundingClientRect().top + scrollY - (top ? top.offsetHeight : 0) - 16, behavior: calm ? "auto" : "smooth" }); const f = n.querySelector("h2"); if (f) { f.tabIndex = -1; f.focus({ preventScroll: true }); } } });
  el.querySelector(".rw-tabs").addEventListener("keydown", e => {
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!d) return;
    e.preventDefault(); const k = (qi + d + tabs.length) % tabs.length; ask(k); tabs[k].focus();
  });
  const tick = now => {
    if (!el.isConnected) return;
    const a = calm ? 1 : .2, dx = (aim.x - cur.x) * a, dy = (aim.y - cur.y) * a;
    /* resting pose turns the phone toward the room's center; motion adds sway */
    const wy = calm ? 0 : lim((cur.x / IMG.w - .5) * -16 + dx * .2, YAW), wp = calm ? 0 : lim((cur.y / IMG.h - .5) * 12 - dy * .2, PITCH), wt = calm ? 0 : lim(dx * .12, TILT);
    if (Math.abs(dx) + Math.abs(dy) > .2 || Math.abs(wy - yaw) + Math.abs(wp - pitch) + Math.abs(wt - tilt) > .05) {
      cur = { x: cur.x + dx, y: cur.y + dy }; tilt += (wt - tilt) * .15; yaw += (wy - yaw) * .12; pitch += (wp - pitch) * .12; place();
    }
    /* after the first photo, the guidance follows the live view; text changes only when the advice changes */
    if (live && now - liveAt > LIVE_MS) {
      liveAt = now;
      const s = assess(cur), key = `${s.f >= FOUND}|${s.f > 0}|${s.h}|${s.v}|${s.near}`;
      if (key !== liveKey) { liveKey = key; guide(s, false); }
    }
    /* a bubble fades while the phone screen is under it, so it never hides what the camera sees */
    if (now - fadeAt > 120) {
      fadeAt = now;
      const v = vf.getBoundingClientRect();
      for (const b of bubbles) { const r = b.getBoundingClientRect(); b.classList.toggle("dim", !(r.right < v.left || r.left > v.right || r.bottom < v.top || r.top > v.bottom)); }
    }
    requestAnimationFrame(tick);
  };
  new ResizeObserver(layout).observe(room);
  if (matchMedia("(hover: none)").matches) { $(".rw-hint").textContent = "Tap the screen to take a photo"; tip.textContent = "Drag to move the phone."; }
  ask(0); layout(); requestAnimationFrame(tick);
}