/* Learning to Draw ASCII project page.
 * 1. Try it: the visitor answers in their head, draws the layout, and reads the answer off their own sketch,
 *    which walks through what the paper asks of models.
 * 2. A scene to drag: a slug, a tree, and a bird on an ASCII ground in perspective, with a live top-down ASCII sketch
 *    and the relations as text. Pointing at a sentence lights up its two objects.
 * 3. Four roles of the sketch (RQ1 to RQ4), each with one number from the paper, drawn as glyph bars.
 * The puzzle and both model
 * sketches: the paper's worked example (Qwen3-30B-A3B). Numbers: camera-ready Tables 1 to 4 and 10. */


/* the paper's worked example (Text2Space id-4432). Its own question, "Where is C relative to E?", is stated outright in
   sentence 4, so we ask about a pair that needs two sentences combined instead. Relations: [X, Y, dx, dy] means X is (dx, dy) of Y, with y growing downward */
const LAB = {
  objs: ["A", "B", "C", "D", "E", "F"],
  sents: [
    ["D is at the 9 o'clock position from F.", ["D", "F", -1, 0]],
    ["A is at 10 o'clock from F.", ["A", "F", -1, -1]],
    ["C is south of F.", ["C", "F", 0, 1]],
    ["E is eastward of C.", ["E", "C", 1, 0]],
    ["B is at 6 o'clock from C.", ["B", "C", 0, 1]],
    ["D is underneath A.", ["D", "A", 0, 1]],
  ],
  q: ["E", "F"], answer: "lower-right", W: 4, H: 4,
  /* Qwen3-30B-A3B on this instance: zero-shot breaks sentences 4 and 5; after construction training it is exact */
  /* the ground-truth layout, as [column, row] */
  truth: { A: [0, 0], D: [0, 1], F: [1, 1], C: [1, 2], E: [2, 2], B: [1, 3] },
  zero: "+--+--+--+\n|A |  |  |\n+--+--+--+\n|D |  |F |\n+--+--+--+\n|  |B |C |\n+--+--+--+\n|  |  |E |\n+--+--+--+",
  tuned: "+--+--+--+\n|A |  |  |\n+--+--+--+\n|D |F |  |\n+--+--+--+\n|  |C |E |\n+--+--+--+\n|  |B |  |\n+--+--+--+",
};

const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
const NOISE = "#%&*+=-:.<>/\\|";
const relName = (dx, dy) => !dx && !dy ? "the same cell" : !dx ? (dy < 0 ? "above" : "below") : !dy ? (dx < 0 ? "left" : "right") : (dy < 0 ? "upper-" : "lower-") + (dx < 0 ? "left" : "right");
/* "C is above E", "C is left of E", "C is in the same cell as E" */
const relOf = (dx, dy, y) => !dx && !dy ? `in the same cell as ${y}` : !dx ? `${relName(dx, dy)} ${y}` : `${relName(dx, dy)} of ${y}`;
const gridText = (W, H) => { const rule = "+" + "--+".repeat(W); return Array.from({ length: H }, () => rule + "\n|" + "  |".repeat(W)).join("\n") + "\n" + rule; };

/* decode a line of plain text into place, the way a terminal redraws it */
function decode(el, text) {
  if (still || !text) { el.textContent = text; return; }
  const t0 = performance.now(), id = (el._dec = (el._dec || 0) + 1);
  (function tick(now) {
    if (el._dec !== id) return;
    const k = (now - t0) / 9;
    el.textContent = [...text].map((c, i) => c === " " || i < k - 6 ? c : i < k ? NOISE[(Math.random() * NOISE.length) | 0] : "").join("");
    if (k < text.length + 6) requestAnimationFrame(tick); else el.textContent = text;
  })(t0);
}

export function asciiHeroHTML() {
  return `<section class="ax-sec" aria-labelledby="ax-pad"><div class="ax-head"><h2 id="ax-pad">From a scene to a sketch</h2>
    <p>ASCII turns a scene into a layout you can read. Drag the slug <code>S</code>, the tree <code>T</code>, and the bird <code>B</code> around the ground. The sketch on the right follows them from above, marking each by its letter, and writes their relations out as text, the two forms Text2Space pairs.</p></div>
  <div class="ax-world">
    <div class="ax-view" tabindex="0" aria-label="A slug, a tree, and a bird on a ground grid. Drag them, or click one and use the arrow keys."><canvas aria-hidden="true"></canvas></div>
    <div class="ax-side">
      <div class="ax-k">top-down sketch</div>
      <pre class="ax-top" aria-label="Top-down ASCII sketch"></pre>
      <div class="ax-k">as text</div>
      <ul class="ax-rels" aria-live="polite">${[0, 1, 2].map(i => `<li data-i="${i}"></li>`).join("")}</ul>
    </div>
  </div></section>`;
}

/* glyph bars on a 0 to 100 scale, one block per 4 points */
const bars = rows => `<div class="ax-bars">${rows.map(([k, v, hi]) => `<div class="ax-br${hi ? " hi" : ""}"><span>${k}</span><code data-v="${v}"></code><b>${v.toFixed(1)}</b></div>`).join("")}</div>`;
const mini = (g, bad = []) => `<pre class="ax-mini">${g.replace(/[A-F]/g, c => bad.includes(c) ? `<em>${c}</em>` : `<b>${c}</b>`)}</pre>`;

export function asciiLabHTML() {
  const cells = [];
  for (let r = 0; r < LAB.H; r++) for (let c = 0; c < LAB.W; c++) cells.push(`<button type="button" class="ax-cell" data-c="${c}" data-r="${r}" style="--c:${c};--r:${r}" aria-label="Row ${r + 1}, column ${c + 1}, empty"></button>`);
  const comp = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) comp.push(r === 1 && c === 1 ? `<span class="ax-cell e" style="--c:1;--r:1">F</span>` : `<button type="button" class="ax-cell" data-dx="${c - 1}" data-dy="${r - 1}" style="--c:${c};--r:${r}" aria-label="E is ${relName(c - 1, r - 1)} of F"></button>`);
  return `<section class="ax-lab" aria-labelledby="ax-try">
  <div class="ax-head"><h2 id="ax-try">Try it yourself</h2>
    <p>Humans sketch to reason about space. Here is a description from our test set, with a question that needs two of its sentences combined. Do what we ask of the models, in three steps.</p></div>
  <div class="ax-acts" role="group" aria-label="Answer"><button type="button" data-act="show">Show the answer</button><button type="button" data-act="clear">Clear</button></div>
  <div class="ax-play" data-step="1">
    <div class="ax-desc">
      <div class="ax-k">Description</div>
      <ol class="ax-sents">${LAB.sents.map(([s], i) => `<li data-i="${i}"><span class="ax-mark" aria-hidden="true"></span><span>${s.replace(/\b([A-F])\b/g, "<b>$1</b>")}</span><span class="ax-st" data-st></span></li>`).join("")}</ol>
      <div class="ax-k">Question</div>
      <p class="ax-qq">Where is <b>E</b> relative to <b>F</b>?</p>
    </div>
    <ol class="ax-steps">
      <li class="ax-step" data-s="1"><h3><span>1</span>Answer in your head</h3>
        <p>No drawing yet. Click where E is, around F.</p>
        <div class="ax-grid ax-compass" role="group" aria-label="Where is E around F"><pre aria-hidden="true">${gridText(3, 3)}</pre>${comp.join("")}</div>
        <p class="ax-said" aria-live="polite"></p></li>
      <li class="ax-step" data-s="2"><h3><span>2</span>Now draw it</h3>
        <p>Pick a letter, then a cell. Each sentence is checked against your sketch, the way we score a model's.</p>
        <div class="ax-tray" role="group" aria-label="Objects to place">${LAB.objs.map(o => `<button type="button" class="ax-tok" data-o="${o}" aria-pressed="false">${o}</button>`).join("")}</div>
        <div class="ax-grid ax-board"><pre aria-hidden="true">${gridText(LAB.W, LAB.H)}</pre>${cells.join("")}</div>
        <p class="ax-score" aria-live="polite"></p></li>
      <li class="ax-step" data-s="3"><h3><span>3</span>Read your sketch</h3>
        <div class="ax-read" aria-live="polite"><p>Place E and F to read the answer off your sketch.</p></div></li>
    </ol>
  </div>

</section>`;
}

export function asciiRolesHTML() {
  return `<section class="ax-sec ax-rolesec">
  <div class="ax-head"><h2>Four roles of an ASCII sketch</h2>
    <p>A sketch can play four roles. The paper asks about each of them for language models.</p></div>
  <div class="ax-roles">
    <article><div class="ax-rq">RQ1 · Representation</div><h3>Can models draw a layout from text, and read one?</h3>
      <p>They read layouts well but struggle to draw them. Each of six models reads better than it draws, by 13 to 27 points.</p>
      ${bars([["Read", 57.0, 1], ["Draw", 38.8]])}<p class="ax-src">Relations correct (%), mean of six models</p></article>
    <article><div class="ax-rq">RQ2 · Reasoning step</div><h3>Does a sketch help models answer?</h3>
      <p>An oracle sketch helps. The model's own sketch hurts: its drawing errors carry into the answer, as a wrong sketch did in step 3.</p>
      ${bars([["Text only", 75.0], ["+ oracle sketch", 83.7, 1], ["+ own sketch", 66.6]])}<p class="ax-src">Answer accuracy (%), Qwen3-30B</p></article>
    <article><div class="ax-rq">RQ3 · Signal</div><h3>Does agreement between sketch and answer show which answers to trust?</h3>
      <p>With no answer key, compare the model's sketch with its answer, as you compared yours. Agreeing answers are right far more often.</p>
      ${bars([["Agree", 88.5, 1], ["Disagree", 56.2]])}<p class="ax-src">Answer accuracy (%), Qwen3-30B</p></article>
    <article><div class="ax-rq">RQ4 · Training goal</div><h3>Does learning to draw improve reasoning from text?</h3>
      <p>Training only to draw lifts text-only reasoning from 75.0% to 82.2%, with no sketch at test time, and the gains transfer to StepGame, bAbI-19, and SpartQA.</p>
      <div class="ax-pair"><figure>${mini(LAB.zero, ["B", "E"])}<figcaption>Zero-shot: 4 of 6 hold</figcaption></figure><figure>${mini(LAB.tuned)}<figcaption>Trained to draw: 6 of 6</figcaption></figure></div>
      <p class="ax-src">Qwen3-30B's own sketches of the puzzle above</p></article>
  </div>
</section>`;
}

/* ---------- a scene to drag around, and its sketch ---------- */
/* ground: an N x N grid seen in perspective; row 0 is the far (north) edge */
const N = 5;
const SCENE = [
  { id: "S", name: "slug", art: ["   \\  \\", "  __o__o", " /      \\__", "(__________)"], lift: 0 },
  { id: "T", name: "tree", art: ["   /\\", "  /**\\", " /****\\", "/******\\", "   ||"], lift: 0 },
  { id: "B", name: "bird", art: ["  __", "<(o )___", " ( ._> /", "  `---'"], lift: 1.1 },
];
const compass = (dx, dy) => (dy < 0 ? "north" : dy > 0 ? "south" : "") + (dx < 0 ? "west" : dx > 0 ? "east" : "");
const PAIRS = [["B", "T"], ["B", "S"], ["T", "S"]];
const nameOf = id => SCENE.find(o => o.id === id).name;

function world(root) {
  const box = root.querySelector(".ax-world"); if (!box) return;
  const cv = box.querySelector("canvas"), ctx = cv.getContext("2d"), view = box.querySelector(".ax-view");
  const top = box.querySelector(".ax-top"), rels = box.querySelector(".ax-rels");
  const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';
  const acc = getComputedStyle(document.body).getPropertyValue("--accent").trim() || "#33507a";
  const pos = { S: [1, 3], T: [3, 1], B: [2, 2] };
  let W = 0, H = 0, f = 1, h = 1, y0 = 0, Z0 = 5, cw = 7, lh = 13, drag = null, sel = null, pair = [], raf = 0, vis = true;
  const ZF = Z0 + N;
  /* camera: eye at height h, horizon at y0, focal length f; ground point (x, z) -> screen */
  const proj = (x, z) => [W / 2 + f * x / z, y0 + f * h / z];
  const unproj = (sx, sy) => { const z = f * h / Math.max(1, sy - y0); return [(sx - W / 2) * z / f, z]; };
  const cellCenter = ([c, r]) => [c - N / 2 + 0.5, ZF - r - 0.5];
  const cellAt = (sx, sy) => { const [x, z] = unproj(sx, sy); return [Math.max(0, Math.min(N - 1, Math.floor(x + N / 2))), Math.max(0, Math.min(N - 1, Math.floor(ZF - z)))]; };
  function measure() {
    const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `12px ${MONO}`; cw = ctx.measureText("M").width; lh = 13;
    y0 = -H * 0.22; f = W * 0.9; h = (H * 0.96 - y0) * Z0 / f;
  }
  const occupant = (c, r, except) => Object.keys(pos).find(k => k !== except && pos[k][0] === c && pos[k][1] === r);

  function draw(now) {
    raf = 0; if (!vis) return;
    const t = now / 1000;
    ctx.clearRect(0, 0, W, H); ctx.textBaseline = "top"; ctx.font = `12px ${MONO}`;
    const hot = drag ? drag.cell : null;
    /* ground: one glyph per character cell, chosen by where it lands on the grid */
    for (let sy = Math.max(0, y0 + lh * 0.5); sy < H; sy += lh) for (let sx = 0; sx < W; sx += cw) {
      const [x, z] = unproj(sx + cw / 2, sy + lh / 2), gx = x + N / 2, gz = ZF - z;
      const inside = gx >= -0.02 && gx <= N + 0.02 && gz >= -0.02 && gz <= N + 0.02;
      const fade = Math.max(0.15, Math.min(1, 1.6 - z / ZF));
      if (!inside) { if (((sx * 7 + sy * 13) | 0) % 9 === 0) { ctx.fillStyle = `rgba(15,26,42,${0.10 * fade})`; ctx.fillText(".", sx, sy); } continue; }
      const ex = Math.abs(gx - Math.round(gx)) < cw * z / f * 0.5, ez = Math.abs(gz - Math.round(gz)) < lh * z * z / (f * h) * 0.5;
      const c = Math.floor(gx), r = Math.floor(gz), mine = hot && hot[0] === c && hot[1] === r;
      let ch = ex && ez ? "+" : ez ? "-" : ex ? (x < -0.4 ? "/" : x > 0.4 ? "\\" : "|")   : mine ? ":" : (((sx * 3 + sy * 7) | 0) % 11 === 0 ? "." : "");
      if (!ch) continue;
      ctx.fillStyle = mine ? acc : ex || ez ? `rgba(15,26,42,${0.42 * fade})` : `rgba(15,26,42,${0.14 * fade})`;
      ctx.fillText(ch, sx, sy);
    }
    /* objects, far to near */
    const order = Object.keys(pos).sort((a, b) => cellCenter(pos[b])[1] - cellCenter(pos[a])[1]);
    box._hit = [];
    for (const id of order) {
      const o = SCENE.find(s => s.id === id), [x, z] = drag && drag.id === id ? drag.xz : cellCenter(pos[id]);
      const [gx, gy] = proj(x, z), fs = Math.max(9, 19 * Z0 / z), lw = fs * 0.62, lhh = fs * 1.05;
      const wid = Math.max(...o.art.map(l => l.length)) * lw, hgt = o.art.length * lhh;
      const up = o.lift ? o.lift * fs * (1 + 0.08 * Math.sin(t * 2.2)) : 0;
      /* a flying object: its shadow marks the cell, and a dotted line ties it to the shadow */
      if (o.lift) {
        ctx.font = `${fs * 0.8}px ${MONO}`; ctx.fillStyle = "rgba(15,26,42,.28)";
        const sw = ctx.measureText("(____)").width; ctx.fillText("(____)", gx - sw / 2, gy - fs * 0.7);
        ctx.fillStyle = "rgba(15,26,42,.22)"; for (let yy = gy - fs * 1.3; yy > gy - up - fs * 0.2; yy -= fs * 0.55) ctx.fillText(":", gx - fs * 0.2, yy);
      }
      const x0 = gx - wid / 2, y1 = gy - hgt - up;
      const on = (drag && drag.id === id) || sel === id || pair.includes(id);
      ctx.font = `${fs}px ${MONO}`; ctx.fillStyle = on ? acc : "#0f1a2a";
      o.art.forEach((l, i) => ctx.fillText(l, x0, y1 + i * lhh));
      ctx.font = `700 ${Math.max(10, fs * 0.7)}px ${MONO}`; ctx.fillStyle = on ? acc : "rgba(15,26,42,.6)";
      const lf = Math.max(10, fs * 0.7); ctx.fillText(o.id, gx - ctx.measureText(o.id).width / 2, y1 - lf * 1.25);
      box._hit.push({ id, x0, y0: y1 - fs, x1: x0 + wid, y1: gy + 4 });
    }
    raf = requestAnimationFrame(draw);
  }

  /* the sketch and the sentences */
  function sync() {
    const g = Array.from({ length: N }, () => Array(N).fill(" "));
    for (const [id, [c, r]] of Object.entries(pos)) g[r][c] = id;
    const rule = "+" + "--+".repeat(N);
    top.innerHTML = g.map(row => rule + "\n|" + row.map(c => c === " " ? "  |" : `<b${sel === c || drag?.id === c || pair.includes(c) ? ' class="on"' : ""}>${c}</b> |`).join("")).join("\n") + "\n" + rule;
    const rel = (a, b) => [Math.sign(pos[a][0] - pos[b][0]), Math.sign(pos[a][1] - pos[b][1])];
    const say = (a, b) => `The ${nameOf(a)} is ${compass(...rel(a, b))} of the ${nameOf(b)}.`;
    PAIRS.forEach(([a, b], i) => { const li = rels.children[i], txt = say(a, b); if (li._t !== txt) { li._t = txt; decode(li, txt); } });
  }
  view.addEventListener("pointerdown", e => {
    const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    const hit = [...(box._hit || [])].reverse().find(b => x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1);
    if (!hit) { if (sel) { sel = null; sync(); } return; }
    e.preventDefault(); cv.setPointerCapture(e.pointerId);
    drag = { id: hit.id, xz: cellCenter(pos[hit.id]), cell: pos[hit.id] }; sel = hit.id; sync();
  });
  view.addEventListener("pointermove", e => {
    const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = Math.max(y0 + 8, e.clientY - r.top);
    if (!drag) { const over = (box._hit || []).some(b => x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1); view.style.cursor = over ? "grab" : ""; return; }
    const [wx, wz] = unproj(x, y);
    drag.xz = [Math.max(-N / 2 + 0.3, Math.min(N / 2 - 0.3, wx)), Math.max(Z0 + 0.3, Math.min(ZF - 0.3, wz))];
    drag.cell = cellAt(...proj(...drag.xz));
    view.style.cursor = "grabbing";
  });
  const drop = () => {
    if (!drag) return;
    const [c, r] = drag.cell, other = occupant(c, r, drag.id);
    if (other) pos[other] = pos[drag.id];
    pos[drag.id] = [c, r]; drag = null; view.style.cursor = ""; sync();
  };
  view.addEventListener("pointerup", drop); view.addEventListener("pointercancel", drop);
  /* keyboard: click an object, then arrow keys move it one cell */
  box.addEventListener("keydown", e => {
    const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
    if (!d || !sel) return; e.preventDefault();
    const c = Math.max(0, Math.min(N - 1, pos[sel][0] + d[0])), r = Math.max(0, Math.min(N - 1, pos[sel][1] + d[1]));
    const other = occupant(c, r, sel); if (other) pos[other] = pos[sel];
    pos[sel] = [c, r]; sync();
  });
  /* pointing at a sentence lights up its two objects in the scene and the sketch */
  [...rels.children].forEach((li, i) => { li.addEventListener("pointerenter", () => { pair = PAIRS[i]; sync(); }); li.addEventListener("pointerleave", () => { pair = []; sync(); }); });
  new ResizeObserver(measure).observe(cv);
  new IntersectionObserver(es => { vis = es[0].isIntersecting; if (vis && !raf) raf = requestAnimationFrame(draw); }).observe(cv);
  measure(); sync();
}

/* ---------- try it ---------- */
function lab(root) {
  const sec = root.querySelector(".ax-lab"); if (!sec) return;
  const play = sec.querySelector(".ax-play"), score = sec.querySelector(".ax-score"), read = sec.querySelector(".ax-read"), said = sec.querySelector(".ax-said");
  const board = sec.querySelector(".ax-board"), compass = sec.querySelector(".ax-compass");
  const pos = {}; let sel = null, guess = null, shown = false, lastRead = "";
  const at = (c, r) => Object.keys(pos).find(o => pos[o][0] === c && pos[o][1] === r);
  const rel = (a, b) => [Math.sign(pos[a][0] - pos[b][0]), Math.sign(pos[a][1] - pos[b][1])];
  function render() {
    board.querySelectorAll(".ax-cell").forEach(b => {
      const o = at(+b.dataset.c, +b.dataset.r);
      if (b.textContent !== (o || "")) { b.textContent = o || ""; if (o) { b.classList.remove("in"); void b.offsetWidth; b.classList.add("in"); } }
      b.classList.toggle("has", !!o); b.classList.toggle("sel", !!o && o === sel);
      b.setAttribute("aria-label", `Row ${+b.dataset.r + 1}, column ${+b.dataset.c + 1}, ${o || "empty"}`);
    });
    /* the picked letter shows as a faint ghost in the cell under the pointer */
    board.classList.toggle("picking", !!sel); if (sel) board.style.setProperty("--ghost", `"${sel}"`);
    sec.querySelectorAll(".ax-tok").forEach(b => { b.classList.toggle("placed", b.dataset.o in pos); b.classList.toggle("sel", sel === b.dataset.o); b.setAttribute("aria-pressed", sel === b.dataset.o); });
    let ok = 0, judged = 0;
    LAB.sents.forEach(([, [X, Y, dx, dy]], i) => {
      const li = sec.querySelector(`.ax-sents li[data-i="${i}"]`), st = li.querySelector("[data-st]");
      if (!(X in pos) || !(Y in pos)) { li.classList.remove("ok", "bad"); st.textContent = ""; return; }
      judged++;
      const [sx, sy] = rel(X, Y), good = sx === dx && sy === dy; ok += good;
      const msg = good ? "" : `your sketch has ${X} ${relOf(sx, sy, Y)}`;
      li.classList.toggle("ok", good); li.classList.toggle("bad", !good);
      if (st.textContent !== msg) decode(st, msg);
    });
    const n = LAB.sents.length;
    const sc = !judged ? "" : ok === n ? `[${"#".repeat(n)}] all ${n} sentences hold` : `[${"#".repeat(ok)}${".".repeat(n - ok)}] ${ok} of ${n} hold${judged < n ? " so far" : ""}`;
    if (score.textContent !== sc) decode(score, sc);
    score.classList.toggle("done", ok === n);
    /* step 3: the answer read off the sketch, set against the guess and the truth */
    const [a, b] = LAB.q;
    let html;
    if (a in pos && b in pos) {
      const r2 = rel(a, b), ans = relName(...r2), right = ans === LAB.answer, agree = guess && guess[0] === ans;
      html = `<p>Your sketch says ${a} is <b class="${right ? "ok" : "bad"}">${relOf(...r2, b)}</b>.${guess && !shown ? ` In your head you said <b>${relOf(...guess[1], b)}</b>, so the two <b>${agree ? "agree" : "disagree"}</b>.` : ""}</p>
        <p class="ax-truth">The answer is <b>${LAB.answer}</b>. ${right ? (ok === n ? "Your sketch is right, and so is what you read off it." : "Right, though your sketch still breaks a sentence.") : "A wrong sketch carried into a wrong answer."}</p>
        <p class="ax-tie">${guess && !shown ? "Models are checked the same way, without an answer key: " : "Models are checked by comparing their sketch with their answer: "}Qwen3-30B is right on 88.5% of answers that agree with its sketch, and 56.2% of those that do not.</p>`;
      play.dataset.step = "3";
    } else {
      html = `<p>Place E and F to read the answer off your sketch.</p>`;
      play.dataset.step = guess ? "2" : "1";
    }
    if (html !== lastRead) { read.innerHTML = html; lastRead = html; read.classList.remove("in"); void read.offsetWidth; read.classList.add("in"); }
  }
  function place(o, c, r) {
    const other = at(c, r);
    if (other && other !== o) { if (o in pos) pos[other] = pos[o]; else delete pos[other]; }
    pos[o] = [c, r]; sel = null; render();
  }
  sec.addEventListener("click", e => {
    const tok = e.target.closest(".ax-tok"), dir = e.target.closest(".ax-compass button"), cell = e.target.closest(".ax-board .ax-cell");
    if (dir) {
      const d = [+dir.dataset.dx, +dir.dataset.dy]; guess = [relName(...d), d]; shown = false;
      compass.querySelectorAll("button").forEach(b => { b.textContent = b === dir ? LAB.q[0] : ""; b.classList.toggle("has", b === dir); });
      decode(said, `> you said: ${LAB.q[0]} is ${relOf(...guess[1], LAB.q[1])}`);
      return render();
    }
    const act = e.target.closest("[data-act]");
    if (act) {
      /* show: the true direction in step 1 and the true layout in step 2; clear: both steps empty */
      const show = act.dataset.act === "show";
      Object.keys(pos).forEach(k => delete pos[k]); sel = null;
      if (show) Object.assign(pos, JSON.parse(JSON.stringify(LAB.truth)));
      const [a, b] = LAB.q, d = show ? [Math.sign(LAB.truth[a][0] - LAB.truth[b][0]), Math.sign(LAB.truth[a][1] - LAB.truth[b][1])] : null;
      guess = d ? [relName(...d), d] : null; shown = show;
      compass.querySelectorAll("button").forEach(x => { const on = !!d && +x.dataset.dx === d[0] && +x.dataset.dy === d[1]; x.textContent = on ? a : ""; x.classList.toggle("has", on); });
      decode(said, d ? `> answer: ${a} is ${relOf(...d, b)}` : "");
      return render();
    }
    if (tok) { sel = sel === tok.dataset.o ? null : tok.dataset.o; return render(); }
    if (cell) {
      const o = at(+cell.dataset.c, +cell.dataset.r);
      if (sel) place(sel, +cell.dataset.c, +cell.dataset.r);
      else if (o) { sel = o; render(); }
    }
  });
  /* pointing at a sentence lights up the two objects it relates */
  const hot = li => { const [X, Y] = li ? LAB.sents[+li.dataset.i][1] : []; board.querySelectorAll(".ax-cell").forEach(b => b.classList.toggle("x", !!li && (b.textContent === X || b.textContent === Y))); };
  sec.querySelectorAll(".ax-sents li").forEach(li => { li.addEventListener("pointerenter", () => hot(li)); li.addEventListener("pointerleave", () => hot(null)); });
  render();
}

/* ---------- glyph bars type themselves out when scrolled into view ---------- */
function glyphBars(root) {
  const els = [...root.querySelectorAll(".ax-bars code")]; if (!els.length) return;
  const PART = " ▏▎▍▌▋▊▉";
  const fill = (el, f) => { const v = +el.dataset.v * Math.min(1, f) / 4, whole = Math.floor(v);
    el.textContent = "█".repeat(whole) + (f < 1 ? NOISE[(Math.random() * NOISE.length) | 0] : PART[Math.round((v - whole) * 8)] || "").trimEnd() + (f < 1 ? "" : ""); };
  if (still) return els.forEach(el => fill(el, 1));
  els.forEach(el => { el.textContent = ""; });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const el = e.target, t0 = performance.now();
    (function tick(now) { const f = (now - t0) / 900; fill(el, f); if (f < 1) requestAnimationFrame(tick); })(t0);
  }), { threshold: 0.6 });
  els.forEach(el => io.observe(el));
}

export function mountAscii(root) { if (!root.querySelector(".ax-world, .ax-lab")) return; world(root); lab(root); glyphBars(root); }
