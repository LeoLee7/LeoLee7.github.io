import { VENUE, TOPICS, SCHOLAR, PROJECTS, OVERVIEW_EARLY, OVERVIEW, NEWS, EXPERIENCE, EDUCATION, GROUPS, PRIMARY, EDU_THEME, VIDEOS, PUBS, AVATAR, TEASERS, ART, LOGOS } from "./content.js?v=20261020e";
import { ABSTRACTS } from "./abstracts.js?v=20261020e";

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
const tbd = (links, inPage) => { const miss = (inPage ? ["Video", "Code"] : ["Project page", "Video", "Code"]).filter(k => !links.some(([n]) => n === k || (k === "Project page" && n === "Project"))); return miss.length ? `${miss.join(", ")}: TBD` : ""; };
/* ---------- lightbox ---------- */
const LB = [];
/* lightbox links: our own project page first (unless already on it), then the external links; an external project page becomes "Project website" so the two never share a label */
const lbLinks = (slug, links, onPage) => [...(slug && !onPage ? [["Project page", `#project-${slug}`]] : []), ...links.map(([n, u]) => [n === "Project page" ? "Project website" : n === "Page" ? "Paper page" : n, u])];
const lbBtn = (entry, cls, inner) => { LB.push(entry); return `<button class="${cls} zoomable" data-lb="${LB.length - 1}" aria-label="Enlarge figure: ${esc(entry.title)}">${inner}</button>`; };
function openLB(i) {
  const e = LB[i], d = document.getElementById("lb");
  d.querySelector(".lb-img").innerHTML = `<img src="${(TEASERS[e.img].full || TEASERS[e.img].a)}" alt="${esc(e.title)}">`;
  d.querySelector(".lb-img").classList.remove("zoomed"); d.querySelector(".lb-img").scrollTo(0, 0);
  d.querySelector(".lb-title").textContent = e.title;
  d.querySelector(".lb-sub").textContent = e.sub || "";
  d.querySelector(".lb-links").innerHTML = e.links.map(([n, u]) => lnk(u, n)).join("") + (e.todo ? `<span class="todo">${e.todo}</span>` : "");
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
  /* abstract, bibtex, phase 1 and TBD notes live on the project page; papers without one keep them in the full list */
  const extras = inPage || (tag === "p" && !pj);
  const links = sorted.map(([n, u]) => lnk(u, n === "Page" ? "Paper page" : n));
  const id = arxivId(p);
  if (extras && id && ABSTRACTS[id]) links.push(`<button class="text lbtn" data-open="abs-${i}" aria-expanded="false">${svgI("abs")}Abstract</button>`);
  if (extras) links.push(`<button class="text lbtn" data-open="bib-${i}" aria-expanded="false">${svgI("bib")}BibTeX</button>`);
  if (inPage && tbd(p.l, 1)) links.push(`<span class="todo">${tbd(p.l, 1)}</span>`);
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
    ${extras ? `<div class="drawer" id="bib-${i}" hidden><pre>${esc(bibtex(p))}</pre><button class="text" data-copy="bib-${i}" style="color:var(--accent)">Copy</button></div>` : ""}
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
      const g = list.filter(p => primary(p) === k);
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
function videoBlock(slug) {
  const v = VIDEOS[slug];
  if (!v) return "";
  const url = `https://youtu.be/${v.id}`;
  const embed = /github\.io$/.test(location.hostname)
    ? `<div class="vframe"><iframe src="https://www.youtube-nocookie.com/embed/${v.id}" title="Demo video" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`
    : `<a class="vframe vthumb" href="${url}" target="_blank" rel="noopener"><img src="${TEASERS[v.thumb].a}" alt="Demo video"><span class="vplay" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg></span></a>`;
  return `<h2>Video</h2>${embed}`;
}
function renderProject(p) {
  const pubs = p.pubs ? p.pubs.map(k => PUBS.find(x => x.t.startsWith(k))).filter(Boolean) : [PUBS.find(x => x.t.startsWith(p.pub))].filter(Boolean);
  const pub = pubs[0];
  const T = p.img && TEASERS[p.img];
  const updates = NEWS.filter(n => n.to === p.slug || (n.rel || []).includes(p.slug));
  const topics = [...new Set(pubs.flatMap(x => x.tags.filter(t => GNAME[t]).map(t => GNAME[t])))].join(", ");
  return `<article class="detail">
    <a class="back" href="#projects">All projects</a>
    <div class="d-eyebrow">${p.venue}</div><h1>${p.name}</h1>
    ${pubs.length === 1 ? `<p class="pp-authors">${authors(pub.a)}</p>` : ""}
    ${T ? lbBtn({ img: p.img, title: p.name, sub: p.venue, links: lbLinks(p.slug, p.links || [], 1) }, "pp-hero", `<img src="${T.full || T.a}" alt="${p.name} figure">`) : `<div class="pp-hero word"><span>${p.name}</span></div>`}
    <div class="d-body">
      <div class="d-main"><h2>Overview</h2>${(OVERVIEW[p.slug] || OVERVIEW_EARLY[p.slug] || [p.line]).map(x => `<p>${x}</p>`).join("")}
        ${(p.figs || []).map(([k, cap]) => `<figure class="pfig">${lbBtn({ img: k, title: p.name, sub: cap, links: lbLinks(p.slug, p.links || [], 1) }, "pimg", `<img src="${TEASERS[k].full || TEASERS[k].a}" alt="${esc(cap)}">`)}<figcaption>${cap}</figcaption></figure>`).join("")}
        ${videoBlock(p.slug)}
        ${pubs.length ? `<h2>${pubs.length > 1 ? "Papers" : "Paper"}</h2>${pubs.map(x => pubHTML(x, "pp")).join("")}` : ""}</div>
      <aside class="d-side">${facts([["Venue", p.venue], ...(topics ? [["Topics", topics]] : [])])}
        ${updates.length ? `<h3>Updates</h3><ul class="upd">${updates.map(n => `<li><time>${n.d}</time>${n.to === p.slug || n.inline ? `<span>${n.title}</span>` : `<a href="#news-${n.slug}">${n.title}</a>`}</li>`).join("")}</ul>` : ""}</aside>
    </div>
  </article>`;
}
const EXTRA = {
  pitchability: () => `<div class="stats side">${[["35+", "exhibitors"], ["8+", "countries"], ["6,000+", "recap readers"]].map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join("")}</div>`,
};
const facts = list => list && list.length ? `<dl class="facts">${list.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>` : "";
function renderPost(n) {
  const imgs = n.imgs.map(([k, cap]) => `<figure>${lbBtn({ img: k, title: n.title, sub: cap, links: [] }, "pimg", `<img src="${(TEASERS[k].full || TEASERS[k].a)}" alt="${esc(cap)}">`)}<figcaption>${cap}</figcaption></figure>`).join("");
  const btns = (n.rel || []).map(r => `<a class="lbtn" href="#project-${r}">${svgI("web")}${PROJECTS.find(p => p.slug === r).name} project</a>`).join("") + n.links.map(([t, u]) => lnk(u, t)).join("");
  return `<article class="detail">
    <a class="back" href="#news">All news</a>
    <div class="d-eyebrow">${n.d}</div><h1>${n.title}</h1>
    <div class="d-body">
      <div class="d-main">${n.body.map(p => `<p>${p}</p>`).join("")}${imgs ? `<div class="pgal ${n.imgs.length > 1 ? "two" : ""}">${imgs}</div>` : ""}</div>
      <aside class="d-side">${n.extra ? EXTRA[n.extra]() : ""}${facts(n.facts)}${btns ? `<div class="d-links">${btns}</div>` : ""}</aside>
    </div>
  </article>`;
}
/* ---------- about ---------- */
const logo = k => `<span class="logo ${k}"><img src="${LOGOS[k]}" alt=""></span>`;
let homeTopic = "all";
function homePubs() {
  const list = homeTopic === "all" ? PUBS.filter(p => p.sel) : PUBS.filter(p => p.tags.includes(homeTopic));
  const total = homeTopic === "all" ? PUBS.length : list.length;
  const n = k => k === "all" ? PUBS.filter(p => p.sel).length : PUBS.filter(p => p.tags.includes(k)).length;
  return `<div class="hfilter">${btn("data-home", "all", `Selected <span class="n">${n("all")}</span>`, homeTopic === "all")}${GROUPS.map(([k, nm]) => btn("data-home", k, `${nm} <span class="n">${n(k)}</span>`, homeTopic === k)).join("")}</div>
    ${list.slice(0, 5).map(p => pubHTML(p, "a")).join("")}
    <p class="more"><a href="#publications">${homeTopic === "all" ? `All ${total} publications` : `All ${total} papers on ${GNAME[homeTopic]}`}, by year or topic</a></p>`;
}
function renderAbout() {
  const hl = PROJECTS.slice(0, 4).map(p => `<a class="card" href="#project-${p.slug}">
      <span class="frame"><img src="${TEASERS[p.img].a}" alt=""></span>
      <span class="nm">${p.name}</span><span class="vn">${p.venue}</span>
      <span class="ln">${p.short}</span></a>`).join("");
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
    <div class="tl-foot" id="tl-foot">${tlDefault()}</div>
    </div>
  </section>`;
  document.getElementById("p-about").innerHTML = `
    <section class="hero">
      <div>
        <h1>Li Liu</h1>
        <div class="role">Ph.D. Candidate, Computer Science and Engineering, UC Santa Cruz</div>
        <p>I am fortunate to be advised by <a href="https://people.ucsc.edu/~lgilpin/">Prof. Leilani H. Gilpin</a>. I work on <b>spatial reasoning</b> in AI models and <b>human-agent collaboration</b>.</p>
        <p>I strengthen spatial intelligence in language and vision-language models (<a href="https://arxiv.org/abs/2604.14641">COLM 2026</a>, <a href="https://arxiv.org/abs/2411.00394">NeurIPS 2024</a>) and build agents that collaborate with people in physical space, such as <a href="https://arxiv.org/abs/2609.36404">TouchingSpace</a> for blind and low-vision map readers.</p>
        <div class="job"><svg class="smile" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 14.2c1 1.4 2.4 2.1 4 2.1s3-.7 4-2.1"/><circle cx="9" cy="9.6" r="1.1" class="eye"/><circle cx="15" cy="9.6" r="1.1" class="eye"/></svg><span>I am on the 2027 job market for Research Scientist, Applied Scientist, and ML Engineer roles. Happy to chat!</span></div>
      </div>
      <aside class="me">
        <img class="portrait" src="${AVATAR}" alt="Portrait of Li Liu">
        <ul class="contact">
          <li>${ICON.mail}<span class="mail">lliu112@ucsc.edu</span></li>
          <li>${ICON.scholar}${ext(SCHOLAR, "Google Scholar")}</li>
          <li>${ICON.github}${ext("https://github.com/LeoLee7", "GitHub")}</li>
          <li>${ICON.linkedin}${ext("https://www.linkedin.com/in/li-liu-a6a92b259/", "LinkedIn")}</li>
          <li>${ICON.cv}<a href="files/Li_Liu_resume.pdf" target="_blank" rel="noopener">CV (PDF)</a></li>
        </ul>
      </aside>
    </section>
    <div class="tl-sec">${timeline}</div>
    <section>
      <div class="sechead"><h2>News</h2><a href="#news">All news</a></div><ul class="news">${news}</ul>
    </section>
    <section>
      <div class="sechead"><h2>Research highlights</h2><a href="#projects">All projects</a></div>
      <div class="cards">${hl}</div>
    </section>
    <section>
      <div class="sechead"><h2>Publications</h2><a href="#publications">Full list</a></div>
      <div id="homepubs">${homePubs()}</div>
    </section>`;
}
/* ---------- projects ---------- */
function renderProjects() {
  document.getElementById("p-projects").innerHTML = `
    <h1>Projects</h1>
    <p class="lede">Systems, models, and benchmarks for spatial reasoning and human-agent collaboration.</p>
    ${[["Current research", PROJECTS.filter(p => p.slug && !p.early)], ["Earlier work", PROJECTS.filter(p => p.early)], ["Design", PROJECTS.filter(p => !p.slug)]].map(([h, list]) => `<h2 class="pgh">${h}</h2><div class="pgrid">${list.map(p => {
      const frame = p.img ? `<span class="frame"><img src="${TEASERS[p.img].a}" alt=""></span>`
        : p.photo ? `<span class="frame photo"><img src="${ART[p.photo]}" alt=""></span>` : `<span class="frame word"><span>${p.name}</span></span>`;
      if (p.slug) return `<a class="proj" href="#project-${p.slug}">${frame}<span class="nm">${p.name}</span><span class="vn">${p.venue}</span><p>${p.line}</p></a>`;
      return `<article class="proj">${frame}<div class="nm">${p.name}</div><div class="vn">${p.venue}</div><p>${p.line}</p><div class="lk">${p.links.map(([n, u]) => lnk(u, n)).join("")}</div></article>`;
    }).join("")}</div>`).join("")}`;
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
    <p class="lede">I enjoy drawing, photography, and visual design, and I like cooking, especially Sichuan cuisine.</p>
    <div class="art">${order.map(k => `<img src="${ART[k]}" alt="Artwork ${k}" loading="lazy">`).join("")}</div>`;
}

/* ---------- router ---------- */
const PAGES = ["about", "publications", "projects", "cv", "art", "news", "proj"];
function show() {
  const h = location.hash.replace("#", "");
  const post = h.startsWith("news-") && NEWS.find(n => "news-" + n.slug === h);
  const proj = h.startsWith("project-") && PROJECTS.find(p => "project-" + p.slug === h);
  if (proj) document.getElementById("p-proj").innerHTML = renderProject(proj);
  if (h === "news" || post) document.getElementById("p-news").innerHTML = post ? renderPost(post) : renderNewsIndex();
  const page = proj ? "proj" : h === "news" || post ? "news" : PAGES.includes(h) ? h : "about";
  PAGES.forEach(k => { document.getElementById("p-" + k).hidden = k !== page; });
  document.querySelectorAll(".top nav a").forEach(a => a.classList.toggle("on", a.dataset.page === (page === "news" ? "about" : page === "proj" ? "projects" : page)));
  window.scrollTo(0, 0);
}
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
  if (t.dataset.home) { homeTopic = t.dataset.home; document.getElementById("homepubs").innerHTML = homePubs(); return; }
  if (t.dataset.view) state.view = t.dataset.view;
  else if (t.dataset.first) state.firstOnly = !state.firstOnly;
  else if (t.dataset.scope) state.scope = t.dataset.scope;
  else if (t.dataset.topic) { state.topic = t.dataset.topic; if (location.hash !== "#publications") { renderPubs(); location.hash = "publications"; return; } }
  else return;
  renderPubs();
});
