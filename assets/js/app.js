import { VENUE, HIGHLIGHTS, TOPICS, SCHOLAR, PROJECTS, OVERVIEW_EARLY, OVERVIEW, NEWS, EXPERIENCE, EDUCATION, GROUPS, THEMES, TIER, PRIMARY, EDU_THEME, VIDEOS, PUBS, AVATAR, TEASERS, ART, LOGOS, TECH, HB, KEY, ECHO, HEADLINE, PHOTOS } from "./content.js?v=20261024b";
import { ABSTRACTS } from "./abstracts.js?v=20261024b";
import { STORY } from "./story.js?v=20261024b";
import { guideHTML, mountGuide } from "./guide-demo.js?v=20261024b";
import { printScrollHTML, mountPrintScroll } from "./print-scroll.js?v=20261024b";

const state = { scope: "sel", topic: "all" };
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const authors = a => esc(a).replace(/Li Liu\*?/, m => `<b>${m}</b>`);
const ext = (u, label) => `<a href="${u}" target="_blank" rel="noopener">${label}</a>`;

const LI = {
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  pdf: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M12 11v6M9.5 14.5 12 17l2.5-2.5"/>',
  play: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor"/>',
  code: '<path d="M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 2.3 5.8 2.6 5.8 2.6a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
  demo: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  data: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
  abs: '<path d="M4 6h16M4 10h16M4 14h10M4 18h7"/>',
  bib: '<path d="M7 7h4v4c0 3-1.5 5-4 6M15 7h4v4c0 3-1.5 5-4 6"/>',
  web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
};
const iconFor = n => /video/i.test(n) ? "play" : /^pdf/i.test(n) ? "pdf" : /code/i.test(n) ? "code" : /demo|tool/i.test(n) ? "demo" : /dataset/i.test(n) ? "data" : /abstract/i.test(n) ? "abs" : /bibtex/i.test(n) ? "bib" : /event|page|project/i.test(n) ? "web" : "doc";
const svgI = k => `<svg class="li" viewBox="0 0 24 24" aria-hidden="true">${LI[k]}</svg>`;
const lnk = (u, n) => `<a class="lbtn" href="${u}"${u.startsWith("#") ? "" : ' target="_blank" rel="noopener"'}>${svgI(iconFor(n))}${n}</a>`;
const projOf = p => PROJECTS.find(x => (x.pub && p.t.startsWith(x.pub)) || (x.pubs || []).some(k => p.t.startsWith(k)));
/* ---------- lightbox ---------- */
const LB = [];
/* lightbox links: our own project page first (unless already on it), then the external links; an external project page becomes "Project website" so the two never share a label */
const lbLinks = (slug, links, onPage) => [...(slug && !onPage ? [["Project page", `#project-${slug}`]] : []), ...links.map(([n, u]) => [n === "Project page" ? "Project website" : n === "Page" ? "Paper page" : n, u])];
const lbBtn = (entry, cls, inner) => { LB.push(entry); return `<button class="${cls} zoomable" data-lb="${LB.length - 1}" aria-label="Enlarge figure: ${esc(entry.title)}">${inner}</button>`; };
function openLB(i) {
  const e = LB[i], d = document.getElementById("lb");
  d.querySelector(".lb-img").innerHTML = `<img src="${e.src || TEASERS[e.img].full || TEASERS[e.img].a}" alt="${esc(e.title)}">`;
  d.querySelector(".lb-img").classList.remove("zoomed"); d.querySelector(".lb-img").scrollTo(0, 0);
  d.querySelector(".lb-title").textContent = e.title;
  d.querySelector(".lb-sub").textContent = e.sub || "";
  d.querySelector(".lb-links").innerHTML = e.links.map(([n, u]) => lnk(u, n)).join("");
  d.querySelectorAll('.lb-links a[href^="#"]').forEach(a => a.addEventListener("click", () => d.close()));
  d.showModal();
}
/* ---------- publications ---------- */
function arxivId(p) { if (p.arx) return p.arx; const l = p.l.find(([, u]) => /arxiv\.org\/abs\//.test(u)); return l ? l[1].split("/abs/")[1] : null; }
function bibtex(p) {
  const id = arxivId(p);
  const key = p.a.split(",")[0].trim().split(" ").pop().toLowerCase().replace(/\W/g, "") + p.y + p.t.replace(/[^A-Za-z ]/g, "").split(" ").find(w => w.length > 3).toLowerCase();
  const au = p.a.replace(/\*/g, "").split(",").map(x => x.trim()).join(" and ");
  const venue = VENUE[p.v] || p.v;
  const lines = [`  title = {${p.t}}`, `  author = {${au}}`, `  year = {${p.y}}`];
  if (p.v === "arXiv") { lines.push(`  journal = {arXiv preprint arXiv:${id}}`); return `@article{${key},\n${lines.join(",\n")}\n}`; }
  const journal = /Journal|Transactions|Sensors|Radiology|Cognitive/.test(venue);
  lines.push(`  ${journal ? "journal" : "booktitle"} = {${venue}}`);
  if (id && !id.startsWith("oa-")) lines.push(`  eprint = {${id}}`, `  archivePrefix = {arXiv}`);
  return `@${journal ? "article" : "inproceedings"}{${key},\n${lines.join(",\n")}\n}`;
}
function pubHTML(p, tag) {
  const i = PUBS.indexOf(p) + tag;
  const order = ["Project page", "Project", "arXiv", "PDF", "Paper", "IEEE", "MDPI", "Page", "Video", "Demo", "Code", "Dataset"];
  const sorted = [...p.l].sort((x, y) => order.indexOf(x[0]) - order.indexOf(y[0]));
  const main = (sorted[0] || [])[1];
  const pj = projOf(p);
  const inPage = tag === "pp";
  /* abstract, bibtex and phase 1 live on the project page; papers without one keep them in the full list */
  const extras = inPage || (tag === "p" && !pj);
  const links = sorted.map(([n, u]) => lnk(u, n === "Page" ? "Paper page" : n));
  const id = arxivId(p);
  if (extras && id && ABSTRACTS[id]) links.push(`<button class="text lbtn" data-open="abs-${i}" aria-expanded="false">${svgI("abs")}Abstract</button>`);
  const hasBib = extras && !(p.v === "Under review" && !id);
  if (hasBib) links.push(`<button class="text lbtn" data-open="bib-${i}" aria-expanded="false">${svgI("bib")}BibTeX</button>`);
  const T = p.img && TEASERS[p.img];
  const thumb = T ? lbBtn({ img: p.img, title: p.t, sub: `${VENUE[p.v] || p.v}, ${p.y}`, links: lbLinks(pj && pj.slug, sorted, inPage) }, "thumb", `<img src="${T.a}" alt="">`) : "";
  const title = inPage ? `<span class="t">${esc(p.t)}</span>` : pj ? `<a class="t" href="#project-${pj.slug}">${esc(p.t)}</a>` : main ? `<a class="t" href="${main}" target="_blank" rel="noopener">${esc(p.t)}</a>` : `<span class="t">${esc(p.t)}</span>`;
  const ph = p.phase1;
  return `<article class="pub ${T ? "" : "plain"}">${thumb}<div>
    <div>${title}</div><div class="au">${authors(p.a)}</div>
    <div class="ve"><em>${VENUE[p.v] || p.v}</em>, ${p.y}<span class="tp">${p.tags.filter(t => GNAME[t]).map(t => `<button class="text" data-topic="${t}">${GNAME[t]}</button>`).join(" · ")}</span></div>
    <div class="lk">${links.join("")}</div>
    ${inPage && ph ? `<details class="phase"><summary>Phase 1 paper</summary><div class="ph1"><div class="t">${esc(ph.t)}</div><div class="au">${authors(ph.a)}</div><div class="ve"><em>arXiv preprint</em>, ${ph.y}</div><div class="lk">${lnk(ph.u, "arXiv")}</div></div></details>` : ""}
    ${extras && id && ABSTRACTS[id] ? `<div class="drawer" id="abs-${i}" hidden><p>${esc(ABSTRACTS[id])}</p></div>` : ""}
    ${hasBib ? `<div class="drawer" id="bib-${i}" hidden><pre>${esc(bibtex(p))}</pre><button class="text" data-copy="bib-${i}" style="color:var(--accent)">Copy</button></div>` : ""}
  </div></article>`;
}
const btn = (attr, val, label, on) => `<button class="text" ${attr}="${val}" aria-pressed="${on}">${label}</button>`;
/* primary group per paper, matched by title prefix */
const primary = p => (PRIMARY.find(([k]) => p.t.startsWith(k)) || [, "hea"])[1];
const GNAME = Object.fromEntries(GROUPS.map(([k, n]) => [k, n]));
PUBS.forEach(p => { const k = primary(p); p.tags = [k, ...p.tags.filter(t => t !== k && GNAME[t])]; });
Object.assign(state, { scope: "all", view: "year", topic: "all", firstOnly: false });

function renderPubs() {
  const list = PUBS.filter(p => (state.scope === "all" || p.sel) && (state.topic === "all" || p.tags.includes(state.topic)) && (!state.firstOnly || p.first));
  let body = "";
  if (!list.length) body = `<p class="foot">No papers match these filters.</p>`;
  else if (state.view === "topic") {
    for (const [k, n, d] of GROUPS) {
      const g = list.filter(p => primary(p) === k).sort((x, y) => (TIER[x.v] || 9) - (TIER[y.v] || 9) || (y.first || 0) - (x.first || 0) || y.y - x.y);
      if (!g.length) continue;
      body += `<div class="group"><div class="gh"><h3>${n}</h3><span>${g.length}</span></div><p class="gd">${d}</p>${g.map(p => pubHTML(p, "p")).join("")}</div>`;
    }
  } else {
    let y = null;
    for (const p of list) { if (p.y !== y) { body += `<div class="year">${p.y}</div>`; y = p.y; } body += pubHTML(p, "p"); }
  }
  const count = k => PUBS.filter(p => (state.scope === "all" || p.sel) && (k === "all" || p.tags.includes(k)) && (!state.firstOnly || p.first)).length;
  document.getElementById("p-publications").innerHTML = `
    <h1>Publications</h1>

    <div class="filters">
      <div class="grp"><span class="lab">Show</span>${btn("data-scope", "all", "All papers", state.scope === "all")}${btn("data-scope", "sel", "Selected", state.scope === "sel")}${btn("data-first", "1", "First author", state.firstOnly)}</div>
      <div class="grp"><span class="lab">Group by</span>${btn("data-view", "year", "Year", state.view === "year")}${btn("data-view", "topic", "Topic", state.view === "topic")}</div>
      <div class="grp"><span class="lab">Topic</span>${btn("data-topic", "all", `All <span class="n">${count("all")}</span>`, state.topic === "all")}${GROUPS.map(([k, n]) => btn("data-topic", k, `${n} <span class="n">${count(k)}</span>`, state.topic === k)).join("")}</div>
    </div>
    <div>${body}</div>`;
}
const ICON = {
  mail: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/></svg>`,
  scholar: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 9.5 12 4l10 5.5-10 5.5z"/><path d="M6 12v4.5c1.7 1.6 3.7 2.4 6 2.4s4.3-.8 6-2.4V12"/></svg>`,
  github: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1.3-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.8 2.3 5.8 2.6 5.8 2.6a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V16M8 7.6v.1M12 16v-3.2c0-1.4.9-2.3 2.1-2.3S16 11.4 16 12.8V16M12 10.5V16"/></svg>`,
  cv: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>`,
};
const TL_TITLE = `<b class="tt">My path so far</b>`;
const tlDefault = () => `<div class="fd prompt">Hover or click each experience to see more.</div>`;
const kv = (k, v, cls = "") => `<span class="kv ${cls}"><i>${k}</i>${v}</span>`;
const eduDetail = i => { const e = EDU_THEME[i]; return `<div class="fd"><b class="ttl">${e.deg}</b>${kv("Location", i === 2 ? "Santa Cruz, CA, USA" : "Hangzhou, China")}${kv("Years", i === 2 ? "Sep 2022 to May 2027 (expected)" : e.org)}${i === 2 ? kv("Advisor", "Leilani H. Gilpin") : ""}<span class="br"></span>${kv("Research theme", e.theme, "hl")}</div>`; };
function tlDetail(i) {
  const e = EXPERIENCE[i];
  return `<div class="fd"><b class="ttl">${e.org}, summer internship</b>${kv("Role", e.role)}${kv("Location", e.place + ", USA")}${kv("Dates", e.dates)}<span class="br"></span>${kv("Project", e.topic, "hl")}</div>`;
}
function newsList(items) {
  return items.map(n => {
    const text = n.h.replace(/<a [^>]*>|<\/a>/g, "");
    if (n.inline) return `<li><time>${n.d}</time><div class="nrow"><span class="ntext">${text}</span></div></li>`;
    const href = n.to ? `#project-${n.to}` : `#news-${n.slug}`;
    return `<li><time>${n.d}</time><a class="nrow" href="${href}"><span class="ntext">${text}</span><span class="narrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg></span></a></li>`;
  }).join("");
}
function renderNewsIndex() {
  return `<a class="back" href="#about">Back to About</a><h1>News</h1><p class="lede">Updates on papers, talks, and internships.</p><ul class="news big">${newsList(NEWS)}</ul>`;
}
function videoBlock(slug, bare) {
  const v = VIDEOS[slug];
  if (!v) return "";
  const url = `https://youtu.be/${v.id}`;
  const embed = /github\.io$/.test(location.hostname)
    ? `<div class="vframe"><iframe src="https://www.youtube-nocookie.com/embed/${v.id}" title="Demo video" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`
    : `<a class="vframe vthumb" href="${url}" target="_blank" rel="noopener"><img src="${TEASERS[v.thumb].a}" alt="Demo video"><span class="vplay" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg></span></a>`;
  return bare ? embed : `<h2>Video</h2>${embed}`;
}
/* illustrated story: hero quote, a spotlight of participant feedback, what makes it work, what changed */
const mark = q => q.replace(/\[\[(.+?)\]\]/g, "<mark>$1</mark>");
function storyBlock(s) {
  const n = s.said.length;
  return `<section class="st">
    <h2>The story</h2>
    <div class="st-hero"><blockquote><p>&ldquo;${s.pull}&rdquo;</p><cite>${s.pullNote}</cite></blockquote><div class="sart">${s.pullArt}</div></div>
    <h3 class="st-h">What it could mean</h3>
    <p class="st-sub">${s.saidNote}</p>
    <div class="st-flow" role="region" aria-label="Participant quotes, scrolling">
      <div class="st-track">${[0, 1].map(k => s.said.map(x => `<figure${k ? ' aria-hidden="true"' : ""}><p>${mark(x.q)}</p>${x.tr ? `<span class="tr">${x.tr}</span>` : ""}${x.note ? `<figcaption>${x.note}</figcaption>` : ""}</figure>`).join("")).join("")}</div>
    </div>
    <div class="st-ctl"><button class="st-btn" data-step="-1" aria-label="Previous quote"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><button class="st-btn" data-step="1" aria-label="Next quote"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button><button class="st-btn" data-pause aria-pressed="false" aria-label="Pause scrolling"><svg viewBox="0 0 24 24"><path d="M9 6v12M15 6v12"/></svg></button><button class="st-all" data-flow aria-expanded="false">Show all ${n}</button></div>
    <h3 class="st-h">${s.sensesTitle}</h3>
    <ul class="st-senses">${s.senses.map(x => `<li><div class="sart">${x.art}</div><b>${x.label}</b><span>${x.line}</span><q>${x.quote}</q></li>`).join("")}</ul>
    <h3 class="st-h">What changed</h3>
    <ol class="story">${s.panels.map((x, i) => `<li><div class="sart">${x.art}</div><div class="stext"><h4><span>${i + 1}</span>${x.title}</h4><p>${x.text}</p>
      <blockquote>${x.quotes.map(q => `<p>&ldquo;${q}&rdquo;</p>`).join("")}</blockquote></div></li>`).join("")}</ol>
    <blockquote class="st-close"><p>&ldquo;${s.close.q}&rdquo;</p><span class="tr">&ldquo;${s.close.tr}&rdquo;</span><cite>${s.close.note}</cite></blockquote>
  </section>`;
}
/* feedback flow: quotes drift by on their own (paused on hover); arrows jump one quote and hold a few seconds; Show all lays them out together */
const FLOW_SPEED = 30, FLOW_HOLD = 4000, FLOW_INSET = 40;
const flowState = el => el._f || (el._f = { x: 0, until: 0 });
function flowSpan(el) { const figs = el.querySelectorAll(".st-track figure"), n = figs.length / 2; return figs[n].offsetLeft - figs[0].offsetLeft; }
function flowSet(el, x, smooth) {
  const f = flowState(el), span = flowSpan(el), t = el.querySelector(".st-track");
  f.x = ((x % span) + span) % span;
  t.style.transition = smooth ? "transform .6s ease" : "none";
  t.style.transform = `translateX(${-f.x}px)`;
}
function flowStep(el, d) {
  const f = flowState(el), stops = [...el.querySelectorAll(".st-track figure:not([aria-hidden])")].map(g => g.offsetLeft - FLOW_INSET);
  const cur = f.x, i = stops.findLastIndex(v => v <= cur + 2);
  let to = d > 0 ? (stops[i + 1] ?? flowSpan(el) - FLOW_INSET) : (cur - stops[Math.max(i, 0)] > 8 ? stops[Math.max(i, 0)] : (stops[i - 1] ?? stops[stops.length - 1] - flowSpan(el)));
  if (d > 0 && cur < stops[0]) to = stops[0] > cur + 2 ? stops[0] : stops[1];
  flowSet(el, to, true);
  f.until = performance.now() + FLOW_HOLD;
}
document.addEventListener("click", e => {
  const s = e.target.closest("[data-step]"); if (s) return flowStep(s.closest(".st").querySelector(".st-flow"), +s.dataset.step);
  const pz = e.target.closest("[data-pause]");
  if (pz) { const f = pz.closest(".st").querySelector(".st-flow"), on = !f.dataset.paused; if (on) f.dataset.paused = 1; else delete f.dataset.paused;
    pz.setAttribute("aria-pressed", on); pz.setAttribute("aria-label", on ? "Resume scrolling" : "Pause scrolling");
    pz.innerHTML = on ? '<svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z"/></svg>' : '<svg viewBox="0 0 24 24"><path d="M9 6v12M15 6v12"/></svg>'; return; }
  const b = e.target.closest("[data-flow]"); if (!b) return;
  const f = b.closest(".st").querySelector(".st-flow"), open = f.classList.toggle("all");
  b.closest(".st-ctl").classList.toggle("open", open);
  b.setAttribute("aria-expanded", open); b.textContent = open ? "Show less" : `Show all ${f.querySelectorAll("figure:not([aria-hidden])").length}`;
});
const flowStill = matchMedia("(prefers-reduced-motion: reduce)").matches;
let flowT = performance.now();
(function flowTick(now) {
  const dt = Math.min(now - flowT, 100) / 1000; flowT = now;
  if (!flowStill) document.querySelectorAll(".st-flow:not(.all)").forEach(el => {
    if (!el.offsetParent || el.matches(":hover") || el.closest(".st").matches(":focus-within") || el.dataset.paused || now < flowState(el).until) return;
    flowSet(el, flowState(el).x + FLOW_SPEED * dt, false);
  });
  requestAnimationFrame(flowTick);
})(flowT);
/* one portrait photo on the left, two landscape photos stacked on the right; one caption for the group */
const photoMosaic = (p, m) => `<figure class="pmosaic">${m.items.map(([src, alt]) => lbBtn({ src, title: p.name, sub: alt, links: [] }, "pimg", `<img src="${src}" alt="${esc(alt)}" loading="lazy">`)).join("")}<figcaption>${m.cap}</figcaption></figure>`;
function renderProject(p) {
  const pubs = p.pubs ? p.pubs.map(k => PUBS.find(x => x.t.startsWith(k))).filter(Boolean) : [PUBS.find(x => x.t.startsWith(p.pub))].filter(Boolean);
  const pub = pubs[0];
  const T = p.img && TEASERS[p.img];
  const updates = NEWS.filter(n => n.to === p.slug || (n.rel || []).includes(p.slug));
  const topics = [...new Set(pubs.flatMap(x => x.tags.filter(t => GNAME[t]).map(t => GNAME[t])))].join(", ");
  return `<article class="detail">
    <a class="back" href="#projects">All projects</a>
    <div class="d-eyebrow">${HEADLINE[p.slug] ? `${p.name} · ` : ""}${p.venue}</div><h1>${HEADLINE[p.slug] || p.name}</h1>
    ${pubs.length === 1 ? `<p class="pp-authors">${authors(pub.a)}</p>` : ""}
    ${VIDEOS[p.slug] ? `<div class="pp-video">${videoBlock(p.slug, 1)}</div>` : T ? lbBtn({ img: p.img, title: p.name, sub: p.venue, links: lbLinks(p.slug, p.links || [], 1) }, "pp-hero", `<img src="${T.full || T.a}" alt="${p.name} figure">`) : `<div class="pp-hero word"><span>${p.name}</span></div>`}
    ${p.scene === "print-scroll" ? printScrollHTML() : ""}
    ${p.slug === "right-this-way" ? guideHTML() : ""}
    <div class="d-body">
      <div class="d-main">${KEY[p.slug] ? `<p class="key"><b>Key finding.</b> ${KEY[p.slug]}</p>` : ""}<h2>Overview</h2>${(OVERVIEW[p.slug] || OVERVIEW_EARLY[p.slug] || [p.line]).map(x => `<p>${x}</p>`).join("")}
        ${ECHO[p.slug] ? `<div class="echo" role="note"><h3>${ECHO[p.slug].title}</h3><p>${ECHO[p.slug].text}</p><p class="echo-l">${ECHO[p.slug].links.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join("")}</p></div>` : ""}
        ${TECH[p.slug] ? `<h2>How it works</h2><dl class="tech">${TECH[p.slug].map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>` : ""}
        ${PHOTOS[p.slug] ? photoMosaic(p, PHOTOS[p.slug]) : ""}
        ${(VIDEOS[p.slug] && T && !p.videoHero ? [[p.img, ""], ...(p.figs || [])] : p.figs || []).map(([k, cap]) => `<figure class="pfig">${lbBtn({ img: k, title: p.name, sub: cap, links: lbLinks(p.slug, p.links || [], 1) }, "pimg", `<img src="${TEASERS[k].full || TEASERS[k].a}" alt="${esc(cap || p.name)}">`)}${cap ? `<figcaption>${cap}</figcaption>` : ""}</figure>`).join("")}
        ${pubs.length ? `<h2>${pubs.length > 1 ? "Papers" : "Paper"}</h2>${pubs.map(x => pubHTML(x, "pp")).join("")}` : ""}
        ${STORY[p.slug] ? storyBlock(STORY[p.slug]) : ""}</div>
      <div class="d-side">${facts([[pubs.length ? "Venue" : "Context", p.venue], ...(topics ? [["Topics", topics]] : [])])}
        ${updates.length ? `<h3>Updates</h3><ul class="upd">${updates.map(n => `<li><time>${n.d}</time>${n.to === p.slug || n.inline ? (n.links?.[0] ? `<a href="${n.links[0][1]}" target="_blank" rel="noopener">${n.title}</a>` : `<span>${n.title}</span>`) : `<a href="#news-${n.slug}">${n.title}</a>`}</li>`).join("")}</ul>` : ""}</div>
    </div>
  </article>`;
}
const EXTRA = {
  pitchability: () => `<div class="stats side">${[["35+", "exhibitors"], ["8+", "countries"], ["6,000+", "recap readers"]].map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join("")}</div>`,
};
const facts = list => list && list.length ? `<dl class="facts">${list.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>` : "";
/* a short project summary inside a news post: overview, key figure, and video */
function aboutProject(slug, noVideo) {
  const p = PROJECTS.find(x => x.slug === slug), T = TEASERS[p.img];
  return `<h2>About ${p.name}</h2>${(OVERVIEW[slug] || [p.line]).map(x => `<p>${x}</p>`).join("")}
    <figure class="pfig">${lbBtn({ img: p.img, title: p.name, sub: p.venue, links: lbLinks(p.slug, p.links || []) }, "pimg", `<img src="${T.full || T.a}" alt="${esc(p.name)} overview">`)}<figcaption>${p.line}</figcaption></figure>
    ${noVideo ? "" : videoBlock(slug)}`;
}
function renderPost(n) {
  /* a post's own video, else its project's video, sits at the top */
  const vid = VIDEOS[n.slug] ? n.slug : n.about && VIDEOS[n.about] ? n.about : null;
  const imgs = n.imgs.map(([k, cap]) => `<figure>${lbBtn({ img: k, title: n.title, sub: cap, links: [] }, "pimg", `<img src="${(TEASERS[k].full || TEASERS[k].a)}" alt="${esc(cap)}">`)}<figcaption>${cap}</figcaption></figure>`).join("");
  const btns = (n.rel || []).map(r => `<a class="lbtn" href="#project-${r}">${svgI("web")}${PROJECTS.find(p => p.slug === r).name} project</a>`).join("") + n.links.map(([t, u]) => lnk(u, t)).join("");
  return `<article class="detail">
    <a class="back" href="#news">All news</a>
    <div class="d-eyebrow">${n.d}</div><h1>${n.title}</h1>
    ${vid ? `<div class="pp-video">${videoBlock(vid, 1)}</div>` : ""}
    <div class="d-body">
      <div class="d-main">${n.body.map(p => `<p>${p}</p>`).join("")}${imgs ? `<div class="pgal ${n.imgs.length > 1 ? "two" : ""}">${imgs}</div>` : ""}${n.about ? aboutProject(n.about, !!vid) : ""}${n.about && STORY[n.about] ? storyBlock(STORY[n.about]) : ""}</div>
      <div class="d-side">${n.extra ? EXTRA[n.extra]() : ""}${facts(n.facts)}${btns ? `<div class="d-links">${btns}</div>` : ""}</div>
    </div>
  </article>`;
}
/* ---------- about ---------- */
const logo = k => `<span class="logo ${k}"><img src="${LOGOS[k]}" alt=""></span>`;
function renderAbout() {
  const hl = HIGHLIGHTS.map(k => PROJECTS.find(p => p.slug === k)).map(p => `<a class="proj" href="#project-${p.slug}">
      <span class="frame"><img src="${TEASERS[p.img].a}" alt=""></span>
      <span class="pt"><span class="nm">${HEADLINE[p.slug] || p.name}</span><span class="vn">${HEADLINE[p.slug] ? `${p.name} · ` : ""}${p.venue}</span>
      ${HB[p.slug] ? `<ul class="hb">${HB[p.slug].map(b => `<li>${b}</li>`).join("")}</ul>` : `<p>${p.short}</p>`}</span></a>`).join("");
  const news = newsList(NEWS.slice(0, 6));
  /* roadmap: two lanes on one year grid; past years squeezed into 24%, Ph.D. years fill the rest */
  const d = new Date(), GRAD = 2027.37, START = 2022.67;
  const NOW = Math.min(GRAD - 0.05, Math.max(START + 0.05, d.getFullYear() + (d.getMonth() + d.getDate() / 31) / 12));
  const P = t => t <= START ? (t - 2015.6) / (START - 2015.6) * 24 : 24 + (t - START) / (GRAD - START) * 76;
  const X = t => P(t).toFixed(2) + "%";
  const W = (t0, t1, g = 0) => `left:calc(${X(t0)} + ${g}px);width:calc(${(P(t1) - P(t0)).toFixed(2)}% - ${2 * g}px)`;
  const cols = [[2015.6, 2019.55, "2015 to 2019"], [2019.55, START, "2019 to 2022"], [START, 2023, "2022"], [2023, 2024, "2023"], [2024, 2025, "2024"], [2025, 2026, "2025"], [2026, 2027, "2026"], [2027, GRAD, "Est. May 2027", "end"]];
  const scale = cols.map(([a, b, l, c]) => `<span class="sc ${c || ""}" style="${W(a, b)}">${l}</span>`).join("");
  const grid = [2023, 2024, 2025, 2026, 2027].map(y => `<span class="gl" style="left:${X(y)}"></span>`).join("");
  const interns = EXPERIENCE.map((e, i) => `<div class="tl-int" data-ti="${i}" tabindex="0" style="${W(+e.y, +e.y + 1, 5)}">
      <span class="ihead">${logo(e.logo)}<b>${e.org.replace(" Research Center", "")}</b></span><span class="role">${e.role}</span></div>`).join("");
  const nowPct = ((NOW - START) / (GRAD - START) * 100).toFixed(1);
  const timeline = `<section>
    <div class="sechead"><h2>My path so far</h2></div>
    <div class="tl-wrap" aria-label="Timeline of internships and education">
    <div class="tl-scroll"><div class="tl">
      <span class="lane-lab" style="top:42px">Industry</span>
      ${interns}
      <div class="ed past" data-edu="0" tabindex="0" style="${W(2015.6, 2019.55, 2)}">${logo("zju")}<span>B.S. @ ZJU</span></div>
      <div class="ed past" data-edu="1" tabindex="0" style="${W(2019.55, START, 2)}">${logo("zju")}<span>M.Eng. @ ZJU</span></div>
      <div class="ed phd" data-edu="2" tabindex="0" style="${W(START, GRAD, 2)};--p:${nowPct}%">${logo("ucsc")}<span>Ph.D. @ UC Santa Cruz</span></div>
      ${EXPERIENCE.map((e, i) => `<span class="istem" data-ti="${i}" style="left:${X((e.t0 + e.t1) / 2)}"></span><span class="idot" data-ti="${i}" style="left:${X((e.t0 + e.t1) / 2)}"></span>`).join("")}
      <div class="nowline" style="left:${X(NOW)}"><span>Now</span></div>
      ${scale}
    </div></div>
    <div class="tl-foot" id="tl-foot" aria-live="polite">${tlDefault()}</div>
    </div>
  </section>`;
  document.getElementById("p-about").innerHTML = `
    <section class="hero">
      <div>
        <h1>Li Liu</h1>
        <div class="role">Ph.D. Candidate, Computer Science and Engineering, UC Santa Cruz</div>
        <p>I am fortunate to be advised by <a href="https://people.ucsc.edu/~lgilpin/">Prof. Leilani H. Gilpin</a>. I study spatial intelligence in multimodal models and the agents built on them: how models perceive space, build an internal map of it, and act when what they see is not enough.</p>
        <ul class="bio-pts">
          <li><b>Perceive.</b> Vision-language models answer even when an image cannot support an answer; I trained them to say how to move the camera instead (<a href="https://arxiv.org/abs/2411.00394">NeurIPS 2024</a>).</li>
          <li><b>Represent.</b> Language models read spatial layouts far better than they build them; learning to build layouts improves their spatial reasoning (<a href="https://arxiv.org/abs/2604.14641">COLM 2026</a>).</li>
          <li><b>Act.</b> I built from zero a real-time voice-and-touch agent on Gemini native audio that grounds its answers in a map, and tested it in studies with 14 blind and low-vision adults (<a href="https://arxiv.org/abs/2609.36404">TouchingSpace</a>).</li>
        </ul>
        <div class="job"><svg class="smile" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 14.2c1 1.4 2.4 2.1 4 2.1s3-.7 4-2.1"/><circle cx="9" cy="9.6" r="1.1" class="eye"/><circle cx="15" cy="9.6" r="1.1" class="eye"/></svg><span>I am on the 2027 job market for Research Scientist, Applied Scientist, and ML Engineer roles. Happy to chat!</span></div>
      </div>
      <div class="me">
        <img class="portrait" src="${AVATAR}" alt="Portrait of Li Liu">
        <ul class="contact">
          <li>${ICON.mail}<span class="mail">lliu112@ucsc.edu</span></li>
          <li>${ICON.scholar}${ext(SCHOLAR, "Google Scholar")}</li>
          <li>${ICON.github}${ext("https://github.com/LeoLee7", "GitHub")}</li>
          <li>${ICON.linkedin}${ext("https://www.linkedin.com/in/li-liu-a6a92b259/", "LinkedIn")}</li>
          <li>${ICON.cv}<a href="files/Li_Liu_resume.pdf" target="_blank" rel="noopener">CV (PDF)</a></li>
        </ul>
      </div>
    </section>
    <div class="tl-sec">${timeline}</div>
    <section>
      <div class="sechead"><h2>News</h2><a href="#news">All news</a></div><ul class="news">${news}</ul>
    </section>
    <section>
      <div class="sechead"><h2>Research highlights</h2><a href="#projects">All projects</a></div>
      <p class="seclead">Spatial intelligence in multimodal models, and the agents built on it.</p>
      <div class="pgrid home">${hl}</div>
    </section>`;
}
/* ---------- projects ---------- */
function renderProjects() {
  document.getElementById("p-projects").innerHTML = `
    <h1>Projects</h1>
    <p class="lede">I work on spatial intelligence for multimodal models and agents, and on collaboration that runs both ways: agents that guide people through space, and people who inspect and correct what agents know. Across projects, the common piece is an explicit representation that both can read and check: a camera direction, an ASCII layout, a map under the finger, a typed agent skill.</p>
    <div class="pwrap"><div class="prail"><nav class="psnav" aria-label="Project categories"><span class="psnav-h">Categories</span>${THEMES.map(([k, h, , ks, , nav]) => `<button class="text" data-sec="${k}">${nav || h}<span class="n">${PROJECTS.filter(p => (ks || [k]).includes(p.theme)).length}</span></button>`).join("")}</nav></div><div>
    ${THEMES.map(([k, h, d, ks, q]) => `<section class="ptheme" id="sec-${k}"><h2 class="pgh">${h}</h2>${q ? `<span class="pfield">${q}</span>` : ""}<p class="pgd">${d}</p><div class="pgrid${ks ? " compact" : ""}">${PROJECTS.filter(p => (ks || [k]).includes(p.theme)).map(p => {
      const frame = p.art ? `<span class="frame"><img src="${ART[p.art]}" alt=""></span>`
        : p.img ? `<span class="frame${p.cover ? " photo" : ""}"><img src="${TEASERS[p.img].a}" alt=""></span>` : `<span class="frame word"><span>${p.name}</span></span>`;
      const href = p.art ? "#art" : `#project-${p.slug}`;
      return `<a class="proj" href="${href}">${frame}<span class="pt"><span class="nm">${HEADLINE[p.slug] || p.name}</span><span class="vn">${HEADLINE[p.slug] ? `${p.name} · ` : ""}${p.venue}</span><p>${p.line}</p></span></a>`;
    }).join("")}</div></section>`).join("")}</div></div>`;
  /* highlight the category in view */
  addEventListener("scroll", markSection, { passive: true });
}
function markSection() {
  const page = document.getElementById("p-projects");
  if (page.hidden) return;
  const secs = [...page.querySelectorAll(".ptheme")];
  const atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
  let cur = secs[0];
  for (const s of secs) if (s.getBoundingClientRect().top < 160) cur = s;
  if (atEnd) cur = secs[secs.length - 1];
  page.querySelectorAll(".psnav button").forEach(b => b.classList.toggle("on", "sec-" + b.dataset.sec === cur.id));
}

/* ---------- CV ---------- */
function renderCV() {
  const exp = EXPERIENCE.map(e => `<div class="entry withlogo">${logo(e.logo)}<div><div class="hd"><b>${e.role}, ${e.org}</b><span class="y">${e.y}</span></div>
    <div class="sub">${e.place}, ${e.dates}</div>${e.bullets.length ? `<ul>${e.bullets.map(b => `<li>${b}</li>`).join("")}</ul>` : `<div class="todo">${e.todo}</div>`}</div></div>`).join("");
  const edu = EDUCATION.map(e => `<div class="entry withlogo">${logo(e.logo)}<div><div class="hd"><b>${e.role}</b><span class="y">${e.y}</span></div><div class="sub">${e.org}${e.sub ? `. ${e.sub}` : ""}</div></div></div>`).join("");
  document.getElementById("p-cv").innerHTML = `
    <h1>CV</h1>
    <p class="lede"><a href="files/Li_Liu_resume.pdf" target="_blank" rel="noopener">One-page resume (PDF)</a>, updated September 2026.</p>
    <div class="cvsec"><h2>Education</h2><div>${edu}</div></div>
    <div class="cvsec"><h2>Experience</h2><div>${exp}</div></div>
    <div class="cvsec"><h2>Publications</h2><div>${PUBS.length} papers at venues including COLM, NeurIPS, MICCAI, ASSETS, and WWW. <a href="#publications">Full list</a></div></div>
    <div class="cvsec"><h2>Service</h2><div>19 reviews as an invited reviewer: CVPR (5), NeurIPS (4), ICLR (3), ECCV (3), WACV (2), CIKM (2).</div></div>
    <div class="cvsec"><h2>Teaching</h2><div>
      <div class="entry"><div class="hd"><b>Teaching Assistant, UC Santa Cruz</b></div><div class="sub">CSE 164 Computer Vision; CSE 20 and CSE 30, Programming with Python</div></div>
      <div class="entry"><div class="hd"><b>Mentor, SIP 2023, UC Santa Cruz</b></div></div>
    </div></div>`;
}

/* ---------- art ---------- */
function renderArt() {
  const order = ["01", "08", "09", "10", "11", "12", "02", "03", "04", "05", "06", "07"];
  document.getElementById("p-art").innerHTML = `
    <h1>Art</h1>
    <p class="lede">I like making things by hand: painting, photography, visual design, and physical prototypes such as the <a href="#project-lotus-pavilion">Lotus Pavilion</a>. I also love cooking, especially Sichuan cuisine.</p>
    ${(p => `<a class="artfeat" href="#project-${p.slug}"><span class="frame photo"><img src="${TEASERS[p.img].a}" alt=""></span><span class="af-text"><span class="nm">${p.name}</span><span class="vn">${p.venue}</span><span class="af-line">${p.line}</span></span></a>`)(PROJECTS.find(p => p.slug === "lotus-pavilion"))}
    <div class="art">${order.map(k => lbBtn({ src: ART[k], title: "Art", links: [] }, "artimg", `<img src="${ART[k]}" alt="Artwork ${k}" loading="lazy">`)).join("")}</div>`;
}

/* ---------- router ---------- */
const PAGES = ["about", "publications", "projects", "cv", "art", "news", "proj"];
/* old project slugs that were split or renamed */
const MOVED = { "project-clinical-ai": "project-trilight", "project-biosignals": "project-taste-xuser", "project-enose": "project-cpsc" };
function show() {
  if (MOVED[location.hash.slice(1)]) { location.replace("#" + MOVED[location.hash.slice(1)]); return; }
  const h = location.hash.replace("#", "");
  const post = h.startsWith("news-") && NEWS.find(n => "news-" + n.slug === h);
  const proj = h.startsWith("project-") && PROJECTS.find(p => "project-" + p.slug === h);
  if (proj) document.getElementById("p-proj").innerHTML = renderProject(proj), mountGuide(document.getElementById("p-proj")), mountPrintScroll(document.getElementById("p-proj"));
  if (h === "news" || post) document.getElementById("p-news").innerHTML = post ? renderPost(post) : renderNewsIndex();
  const page = proj ? "proj" : h === "news" || post ? "news" : PAGES.includes(h) ? h : "about";
  PAGES.forEach(k => { document.getElementById("p-" + k).hidden = k !== page; });
  document.querySelectorAll(".top nav a").forEach(a => a.classList.toggle("on", a.dataset.page === (page === "news" ? "about" : page === "proj" ? "projects" : page)));
  window.scrollTo(0, 0);
  markSection();
  const pg = document.getElementById("p-" + page), h1 = pg.querySelector("h1");
  document.title = page === "about" ? BASE_TITLE : `${h1 ? h1.textContent : page} | Li Liu`;
  if (routed && h1) { h1.tabIndex = -1; h1.focus({ preventScroll: true }); }
  routed = true;
}
const BASE_TITLE = document.title;
let routed = false;
renderAbout(); renderPubs(); renderProjects(); renderCV(); renderArt();
window.addEventListener("hashchange", show);
function tlShow(target) {
  const box = document.getElementById("tl-foot");
  if (!box) return;
  const it = target.closest && target.closest(".tl-int, .idot"), ed = target.closest && target.closest(".tl [data-edu]");
  if (!it && !ed) return;
  if (it) { box.innerHTML = tlDetail(+it.dataset.ti); }
  else if (ed) { box.innerHTML = eduDetail(+ed.dataset.edu); }
}
document.addEventListener("mouseover", e => tlShow(e.target));
document.addEventListener("focusin", e => tlShow(e.target));
document.addEventListener("pointerdown", e => { if (e.target.closest(".tl")) tlShow(e.target); });
const lbEl = document.getElementById("lb");
lbEl.addEventListener("click", e => { if (e.target === lbEl) lbEl.close(); });
/* zoom to the clicked point; drag to pan while zoomed */
const box = lbEl.querySelector(".lb-img");
let drag = null;
box.addEventListener("pointerdown", e => {
  if (!box.classList.contains("zoomed")) return;
  drag = { x: e.clientX, y: e.clientY, sl: box.scrollLeft, st: box.scrollTop, moved: false };
  box.setPointerCapture(e.pointerId);
});
box.addEventListener("pointermove", e => {
  if (!drag) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
  box.scrollLeft = drag.sl - dx; box.scrollTop = drag.st - dy;
});
box.addEventListener("pointerup", () => { setTimeout(() => { drag = null; }, 0); });
box.addEventListener("click", e => {
  if (drag && drag.moved) return;
  const img = box.querySelector("img");
  if (!img) return;
  if (box.classList.contains("zoomed")) { box.classList.remove("zoomed"); img.style.width = ""; box.scrollTo(0, 0); return; }
  const r = img.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
  const fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
  /* show the original pixels (sharp on retina), never stretch past the source */
  const dpr = window.devicePixelRatio || 1;
  const w = Math.min(img.naturalWidth, Math.max(img.naturalWidth / dpr, r.width * 2));
  box.classList.add("zoomed");
  img.style.width = w + "px";
  const h = w * img.naturalHeight / img.naturalWidth;
  box.scrollLeft = fx * w + 16 - box.clientWidth / 2;
  box.scrollTop = fy * h + 16 - box.clientHeight / 2;
});
show();

document.addEventListener("click", e => {
  const t = e.target.closest("button");
  if (!t) return;
  if (t.dataset.lb) { openLB(+t.dataset.lb); return; }
  if (t.classList.contains("lb-close")) { document.getElementById("lb").close(); return; }
  if (t.dataset.open) {
    const d = document.getElementById(t.dataset.open), open = d.hidden, box = d.parentElement;
    box.querySelectorAll(".drawer").forEach(x => { x.hidden = true; });
    box.querySelectorAll("[data-open]").forEach(x => x.setAttribute("aria-expanded", "false"));
    d.hidden = !open; t.setAttribute("aria-expanded", open);
    return;
  }
  if (t.dataset.copy) {
    const pre = document.getElementById(t.dataset.copy).querySelector("pre");
    navigator.clipboard.writeText(pre.textContent).then(() => { t.textContent = "Copied"; setTimeout(() => { t.textContent = "Copy"; }, 1500); },
      () => { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); });
    return;
  }
  if (t.dataset.sec) { const s = document.getElementById("sec-" + t.dataset.sec); scrollTo({ top: s.getBoundingClientRect().top + scrollY - 84, behavior: "smooth" }); return; }
  if (t.dataset.view) state.view = t.dataset.view;
  else if (t.dataset.first) state.firstOnly = !state.firstOnly;
  else if (t.dataset.scope) state.scope = t.dataset.scope;
  else if (t.dataset.topic) { state.topic = t.dataset.topic; if (location.hash !== "#publications") { renderPubs(); location.hash = "publications"; return; } }
  else return;
  renderPubs();
});
