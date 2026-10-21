/*
 * Illustrated stories on project pages: abstract geometric prints plus verbatim participant quotes,
 * in three layers: what the whole experience meant, how each sense works, and what changed afterwards.
 * Quotes come from the public arXiv paper (arXiv:2609.36404) and the study testimonials shared for PitchAbility 2026.
 * Speakers stay anonymous. Shapes use classes .k (ink), .a (accent), .g (soft gray), .ln (ink line), .al (accent line);
 * each print gets its own filter for a hand-cut edge and a grainy, printed fill.
 */
const print = (id, body) => `<svg viewBox="0 0 240 150" aria-hidden="true">
  <defs><filter id="tx${id}" x="-6%" y="-6%" width="112%" height="112%">
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="${id * 7}" result="w"/>
    <feDisplacementMap in="SourceGraphic" in2="w" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" seed="${id}" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.3 1.45" result="m"/>
    <feComposite in="d" in2="m" operator="in"/>
  </filter></defs>
  <g filter="url(#tx${id})">${body}</g></svg>`;

/* one point becomes many */
const SPOTS = print(1, `
  <circle class="g" cx="72" cy="76" r="34"/>
  <circle class="k" cx="72" cy="76" r="6"/>
  <circle class="a" cx="160" cy="54" r="11"/><circle class="k" cx="188" cy="70" r="6"/>
  <circle class="k" cx="150" cy="92" r="7"/><circle class="a" cx="182" cy="104" r="9"/>
  <circle class="k" cx="206" cy="46" r="4"/><circle class="k" cx="132" cy="64" r="4"/>
  <circle class="k" cx="210" cy="92" r="4.5"/>`);

/* a hum widening toward a place */
const HUM = print(2, `
  <rect class="a" x="138" y="34" width="72" height="56" rx="2"/>
  <path class="al" stroke-width="5" d="M96 112 a30 30 0 0 1 30 -30"/>
  <path class="al" stroke-width="3.5" d="M80 112 a46 46 0 0 1 46 -46" opacity=".7"/>
  <path class="al" stroke-width="2.5" d="M64 112 a62 62 0 0 1 62 -62" opacity=".45"/>
  <circle class="k" cx="96" cy="112" r="9"/>`);

/* streets drawn as an L, blocks along them */
const STREETS = print(3, `
  <circle class="g" cx="132" cy="76" r="62"/>
  <path class="ln" stroke-width="10" stroke-linecap="square" d="M70 26 V118 H206"/>
  <rect class="a" x="86" y="40" width="22" height="22"/><rect class="k" x="86" y="74" width="22" height="30"/>
  <rect class="a" x="124" y="84" width="32" height="20"/><rect class="k" x="168" y="90" width="18" height="14"/>`);

/* layers of a place, read further down */
const DEEPER = print(4, `
  <path class="k" d="M30 52 a22 22 0 0 1 44 0 z"/>
  <rect class="g" x="70" y="30" width="96" height="56"/>
  <rect class="g" x="92" y="52" width="96" height="56" opacity=".8"/>
  <rect class="a" x="114" y="74" width="96" height="56"/>`);

/* a grid, and the one square nobody asked for */
const UNASKED = print(5, `
  ${[0, 1, 2, 3, 4].flatMap(c => [0, 1, 2].map(r => (c === 3 && r === 1) ? "" : `<rect class="g" x="${34 + c * 36}" y="${22 + r * 38}" width="26" height="26"/>`)).join("")}
  <rect class="k" x="146" y="62" width="26" height="26" opacity=".85"/>
  <rect class="a" x="142" y="58" width="26" height="26"/>
  <circle class="al" stroke-width="2.5" cx="157" cy="73" r="27"/>`);

/* a route told to someone else, past named places */
const ROUTE = print(6, `
  <path class="ln" stroke-width="3" stroke-dasharray="1 9" stroke-linecap="round" d="M48 104 C 80 40, 116 130, 150 70 S 196 50, 196 50"/>
  <circle class="k" cx="48" cy="104" r="12"/>
  <circle class="al" stroke-width="5" cx="196" cy="50" r="12"/>
  <rect class="a" x="84" y="64" width="16" height="16"/><rect class="a" x="140" y="88" width="16" height="16"/>`);


/* the map coming into view under one fingertip */
const MAP = print(7, `
  ${[0, 1, 2, 3, 4, 5].flatMap(c => [0, 1, 2].map(r => `<rect class="g" x="${22 + c * 34}" y="${20 + r * 38}" width="${c % 2 ? 22 : 28}" height="${r % 2 ? 20 : 26}"/>`)).join("")}
  <rect class="a" x="90" y="58" width="28" height="20"/><rect class="a" x="124" y="96" width="22" height="26"/>
  <rect class="k" x="56" y="96" width="22" height="26" opacity=".85"/>
  <circle class="al" stroke-width="3" cx="118" cy="80" r="30" opacity=".6"/>
  <circle class="al" stroke-width="2" cx="118" cy="80" r="46" opacity=".3"/>
  <circle class="k" cx="118" cy="80" r="8"/>`);

/* a place with a felt edge */
const EDGE = print(8, `
  <rect class="a" x="62" y="34" width="116" height="82"/>
  <rect class="ln" stroke-width="3" x="54" y="26" width="132" height="98"/>
  <rect class="ln" stroke-width="1.5" x="46" y="18" width="148" height="114" opacity=".45"/>
  <circle class="k" cx="120" cy="75" r="8"/>`);

/* a place that speaks its name */
const NAME = print(9, `
  <circle class="a" cx="96" cy="75" r="34"/>
  <path class="ln" stroke-width="4" d="M146 58 v34 M160 48 v54 M174 62 v26 M188 54 v42"/>
  <circle class="k" cx="96" cy="75" r="7"/>`);

export const STORY = {
  touchingspace: {
    pull: "I didn't know how to read a map, but now I can.",
    pullNote: "A participant, whose words became the title of our paper.",
    pullArt: MAP,
    /* the whole experience, in participants' words; the first is set large */
    said: [
      { q: "I think of anything I've seen, this has the best possibility of doing that.", note: "On conveying how to approach a hard-to-find entrance." },
      { q: "I started getting a picture in my mind of where everything was." },
      { q: "I like that it's dynamic — not a static map where you constantly have to print something out... I could see this being something big." },
      { q: "This is the first time I've used something like this. So if it's not hard for me to get it, it's going to be pretty good for somebody else." },
      { q: "Se lo recomendaría como un excelente aparato para la vida diaria de uno que no mira.", tr: "I would recommend it as an excellent device for the daily life of someone who does not see." },
      { q: "I could use this all the time when I'm planning my trip, especially when I know that I'm going to go someplace I've never been before." },
      { q: "When I first came, one of the volunteers walked me to the bus stop for the first time. This map would have been very helpful for me." },
    ],
    /* one surface, four channels */
    senses: [
      { art: HUM, label: "Hum", line: "grows as the finger nears a place", quote: "It gets stronger and stronger as soon as you get near. It's like the radar on a car." },
      { art: EDGE, label: "Vibration", line: "marks the inside of a place", quote: "It's like a wall. So the vibration is inside only." },
      { art: NAME, label: "Name", line: "spoken when the finger arrives", quote: "It starts humming, and once you get there it says [the center]." },
      { art: DEEPER, label: "Conversation", line: "open questions about any place", quote: "Having the map and it spelling out each of the buildings, but then you're able to go deeper." },
    ],
    /* what changed afterwards */
    panels: [
      { art: SPOTS, title: "One spot became many",
        text: "A familiar place was often a single point. One participant knew a plaza only as the spot their family drives them to. By the end they could name four businesses in it.",
        quote: "In my mind there was only one spot... So now there are a lot of spots." },
      { art: STREETS, title: "A picture of the streets",
        text: "Tracing by hand, participants gave the area a shape of their own: an L of streets, a butterfly, a row of shops.",
        quote: "I thought it would be hard for me to build a mental map, but I was able to kind of draw that L-shape or square shape of the streets." },
      { art: UNASKED, title: "Places nobody asked for",
        text: "Seven participants found a place they had not asked about, and four changed a trip they already make. One learned that a pharmacy they reached by going home first was close to the center they visit.",
        quote: "And no one tells you. It could be that way forever." },
      { art: ROUTE, title: "Directions for a sighted friend",
        text: "After exploring, a participant could give directions past places the map had named, some of them a few doors from where they work.",
        quote: "Pass yoga — which I never knew there was one — the Bagelry restaurant... I can tell someone sighted how to get somewhere now." },
    ],
    close: { q: "Me sentí súper contento y libre de poder yo hacer las cosas yo solo.",
      tr: "I felt super happy and free to be able to do things by myself.",
      note: "A participant, speaking through a Spanish interpreter." },
  },
};
