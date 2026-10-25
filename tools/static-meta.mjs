/*
 * Writes the parts of the site that crawlers and AI agents read without running JavaScript:
 * JSON-LD (Person + papers) and the <noscript> summary in index.html, plus llms.txt.
 * Run after editing assets/js/content.js:  node tools/static-meta.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { PUBS, PROJECTS, HEADLINE, VENUE, SCHOLAR } from "../assets/js/content.js";

const SITE = "https://leolee7.github.io/";
const strip = s => s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const BIO = "Li Liu is a Ph.D. candidate in Computer Science and Engineering at UC Santa Cruz, advised by Prof. Leilani H. Gilpin. Li studies spatial intelligence in multimodal models and the agents built on them: how models perceive space, build an internal map of it, and act when what they see is not enough. Li has interned three times as an Applied Scientist at Amazon and is on the 2027 job market for Research Scientist, Applied Scientist, and ML Engineer roles.";
const POINTS = [
  "Perceive: vision-language models answer even when an image cannot support an answer; Right This Way (NeurIPS 2024) trains them to say how to move the camera instead.",
  "Represent: language models read spatial layouts far better than they build them; learning to build layouts improves their spatial reasoning (Learning to Draw ASCII, COLM 2026).",
  "Act: TouchingSpace, a real-time voice-and-touch agent on Gemini native audio that grounds its answers in a map, built from zero and tested with 14 blind and low-vision adults.",
];
const SAME = [SCHOLAR, "https://github.com/LeoLee7", "https://www.linkedin.com/in/li-liu-a6a92b259/"];
const url = p => (p.l.find(([n]) => /arxiv|paper|doi/i.test(n)) || p.l[0] || [])[1];

const person = {
  "@type": "Person", "@id": SITE + "#li-liu", name: "Li Liu", url: SITE, email: "mailto:lliu112@ucsc.edu",
  image: SITE + "assets/img/avatar.jpg", jobTitle: "Ph.D. Candidate, Computer Science and Engineering",
  affiliation: { "@type": "CollegeOrUniversity", name: "University of California, Santa Cruz" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Zhejiang University" },
  sameAs: SAME, description: BIO,
  knowsAbout: ["Spatial intelligence", "Multimodal large language models", "Vision-language models", "AI agents", "Spatial reasoning", "Tactile interfaces", "Haptics", "Accessibility", "Human-in-the-loop systems", "Conformal prediction"],
};
const papers = PUBS.filter(p => url(p)).map(p => ({
  "@type": "ScholarlyArticle", headline: strip(p.t), author: p.a.replace(/\*/g, "").split(/,\s*/).map(n => ({ "@type": "Person", name: n })),
  datePublished: String(p.y), isPartOf: VENUE[p.v] || p.v, url: url(p),
}));
const ld = JSON.stringify({ "@context": "https://schema.org", "@graph": [person, ...papers] }, null, 0);

const projLines = PROJECTS.filter(p => !p.art).map(p => `${HEADLINE[p.slug] || p.name} (${p.name}, ${p.venue})`);
const noscript = `<noscript><div class="wrap" style="padding-block:40px"><h1>Li Liu</h1><p>${esc(BIO)} Email: lliu112@ucsc.edu. <a href="${SCHOLAR}">Google Scholar</a>. <a href="files/Li_Liu_resume.pdf">CV</a>.</p><ul>${POINTS.map(x => `<li>${esc(x)}</li>`).join("")}</ul><h2>Projects</h2><ul>${projLines.map(x => `<li>${esc(x)}</li>`).join("")}</ul><h2>Publications</h2><ul>${PUBS.map(p => `<li>${esc(strip(p.t))}. ${esc(p.a.replace(/\*/g, ""))}. ${esc(VENUE[p.v] || p.v)}, ${p.y}.${url(p) ? ` <a href="${url(p)}">Link</a>` : ""}</li>`).join("")}</ul><p>This site needs JavaScript for the full experience.</p></div></noscript>`;

let html = readFileSync("index.html", "utf8");
html = html.replace(/<!-- ld:begin -->[\s\S]*?<!-- ld:end -->\n?/, "");
html = html.replace("</head>", `<!-- ld:begin --><script type="application/ld+json">${ld}</script><!-- ld:end -->\n</head>`);
html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, noscript);
writeFileSync("index.html", html);

const md = `# Li Liu

> ${BIO}

Homepage: ${SITE} · Email: lliu112@ucsc.edu · Google Scholar: ${SCHOLAR} · GitHub: https://github.com/LeoLee7 · CV: ${SITE}files/Li_Liu_resume.pdf

## Research
${POINTS.map(x => `- ${x}`).join("\n")}

## Projects
${PROJECTS.filter(p => !p.art).map(p => `- [${HEADLINE[p.slug] || p.name}](${SITE}#project-${p.slug}) (${p.name}, ${p.venue}): ${strip(p.line)}`).join("\n")}

## Publications
${PUBS.map(p => `- ${strip(p.t)}. ${p.a.replace(/\*/g, "")}. ${VENUE[p.v] || p.v}, ${p.y}.${url(p) ? ` ${url(p)}` : ""}`).join("\n")}
`;
writeFileSync("llms.txt", md);
console.log(`index.html: ${papers.length} papers in JSON-LD; llms.txt: ${md.length} chars`);
