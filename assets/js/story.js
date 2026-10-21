/*
 * Illustrated stories on project pages: minimal line drawings plus verbatim participant quotes.
 * Quotes come from the public arXiv paper (arXiv:2609.36404); P-numbers are the paper's participant ids.
 * Drawings use currentColor for lines and the .ac class for the accent color.
 */
const svg = body => `<svg viewBox="0 0 240 150" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const HOME = svg(`
  <path d="M24 58 L120 16 L216 58"/>
  <path d="M36 128 H204"/><path d="M58 128 V112 H182 V128"/>
  <circle cx="74" cy="64" r="10"/>
  <path d="M74 75 C64 80 61 94 62 112"/>
  <path d="M70 86 C82 92 96 98 108 104"/>
  <path d="M48 52 L58 112"/>
  <path class="ac" d="M116 104 L120 76 L160 76 L164 104 Z"/>
  <path d="M108 106 H172"/>
  <path class="ac" d="M176 72 a10 10 0 0 1 0 16 M184 66 a18 18 0 0 1 0 28"/>`);

const WHERE = svg(`
  <rect x="34" y="22" width="172" height="108" rx="12"/>
  <rect class="acf" x="118" y="46" width="62" height="44" rx="4"/>
  <path class="ac" d="M70 92 a16 16 0 0 1 22 -22 M62 98 a28 28 0 0 1 36 -36"/>
  <path d="M96 106 c-4 -10 2 -22 10 -26 c6 -3 12 2 10 8 l-6 14 c-3 6 -10 8 -14 4 z"/>
  <path class="ac" d="M112 50 l-5 4 l5 4 l-5 4 M186 66 l5 4 l-5 4 l5 4"/>`);

const WHAT = svg(`
  <rect x="22" y="58" width="104" height="72" rx="10"/>
  <rect class="acf" x="62" y="80" width="38" height="28" rx="3"/>
  <path d="M74 118 c-3 -8 1 -17 8 -20 c5 -2 9 2 8 6 l-4 10 c-2 5 -8 7 -12 4 z"/>
  <path d="M36 16 H148 a8 8 0 0 1 8 8 V40 a8 8 0 0 1 -8 8 H60 L48 58 V48 H36 a8 8 0 0 1 -8 -8 V24 a8 8 0 0 1 8 -8 z"/>
  <text x="92" y="37" text-anchor="middle" stroke="none" fill="currentColor" font-size="13" font-family="inherit">What's around me?</text>
  <path class="ac" d="M150 72 H214 a8 8 0 0 1 8 8 V118 a8 8 0 0 1 -8 8 H150 a8 8 0 0 1 -8 -8 V96 L132 90 L142 86 V80 a8 8 0 0 1 8 -8 z"/>
  <path class="ac" d="M156 90 H208 M156 102 H200 M156 114 H186"/>`);

const FOUND = svg(`
  <path d="M20 46 H220 M20 104 H220 M78 16 V134 M162 16 V134"/>
  <rect x="28" y="56" width="40" height="38" rx="3"/>
  <rect x="88" y="56" width="64" height="38" rx="3"/>
  <rect x="172" y="114" width="40" height="18" rx="3"/>
  <rect x="88" y="114" width="64" height="18" rx="3"/>
  <rect class="acf" x="172" y="56" width="40" height="38" rx="3"/>
  <path class="ac" d="M192 66 V84 M183 75 H201"/>
  <path class="ac" d="M200 30 l3 -8 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 z"/>
  <path d="M48 75 C 90 30, 140 30, 166 68" stroke-dasharray="2 7"/>
  <path d="M40 66 L48 58 L56 66 V82 H40 Z"/>`);

export const STORY = {
  touchingspace: {
    pull: "I didn't know how to read a map, but now I can.",
    pullNote: "P13, whose words became the title of our paper.",
    panels: [
      { art: HOME, title: "At home, before the trip",
        text: "Fifteen blind and low-vision participants each explored a place they chose, on an everyday laptop trackpad, with the reading done before they set out.",
        quote: "This exploration is done before you leave your house.", who: "P14" },
      { art: WHERE, title: "Where, by touch",
        text: "Each place sits at a fixed position on the pad. A hum grows as the finger nears a place, and a vibration marks its edge.",
        quote: "It's like the radar on a car.", who: "P13" },
      { art: WHAT, title: "What, by asking",
        text: "The pad speaks each place's name, and a conversational agent answers questions about it. Nearly every participant asked about hours, menus, prices, and more.",
        quote: "having the map and it spelling out each of the buildings, but then you're able to go deeper.", who: "P02" },
      { art: FOUND, title: "Places nobody asked for",
        text: "Seven participants found a place they had not asked about, and four changed a trip they already make.",
        quote: "now that I know [the pharmacy] is right there and it's on my way home, I just stop there instead of going all the way home and coming all the way back.", who: "P06" },
    ],
  },
};
