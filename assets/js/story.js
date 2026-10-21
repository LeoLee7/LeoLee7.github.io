/*
 * Illustrated stories on project pages: abstract geometric prints plus verbatim participant quotes,
 * in three layers: what the whole experience meant, how each sense works, and what changed afterwards.
 * Quotes come from the public arXiv paper (arXiv:2609.36404), the study testimonials shared for PitchAbility 2026,
 * and the study session transcripts, used with Li Liu's approval.
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

/* planning ahead: a day laid out before leaving */
const PLAN = print(10, `
  <rect class="g" x="40" y="30" width="160" height="18"/><rect class="g" x="40" y="58" width="120" height="18"/>
  <rect class="a" x="40" y="86" width="140" height="18"/><rect class="g" x="40" y="114" width="90" height="18"/>
  <circle class="k" cx="206" cy="95" r="9"/>`);

/* the neighborhood around a point, filled in */
const NEAR = print(11, `
  <circle class="g" cx="120" cy="75" r="56"/>
  <circle class="k" cx="120" cy="75" r="7"/>
  <rect class="a" x="70" y="40" width="16" height="16"/><rect class="a" x="152" y="96" width="18" height="18"/>
  <rect class="k" x="160" y="44" width="12" height="12" opacity=".85"/><rect class="a" x="84" y="100" width="12" height="12"/>
  <circle class="al" stroke-width="2.5" cx="120" cy="75" r="68" opacity=".45"/>`);

/* several senses meeting on one place */
const MULTI = print(12, `
  <rect class="a" x="96" y="44" width="72" height="62"/>
  <rect class="ln" stroke-width="2.5" x="88" y="36" width="88" height="78"/>
  <path class="al" stroke-width="4" d="M62 120 a26 26 0 0 1 26 -26"/>
  <path class="al" stroke-width="2.5" d="M48 120 a40 40 0 0 1 40 -40" opacity=".55"/>
  <path class="ln" stroke-width="3.5" d="M190 58 v34 M202 50 v50 M214 64 v22"/>
  <circle class="k" cx="62" cy="120" r="7"/>`);

/* nothing but the pad already under the hand */
const PAD = print(13, `
  <rect class="g" x="40" y="22" width="160" height="70" rx="3"/>
  <rect class="g" x="28" y="98" width="184" height="36" rx="3" opacity=".7"/>
  <rect class="a" x="94" y="104" width="52" height="24" rx="2"/>
  <circle class="k" cx="120" cy="116" r="5"/>`);

/* a map that changes: layers added and taken away */
const LAYERS = print(14, `
  ${[0, 1, 2, 3].flatMap(c => [0, 1].map(r => `<rect class="g" x="${36 + c * 44}" y="${30 + r * 46}" width="30" height="30"/>`)).join("")}
  <rect class="a" x="80" y="30" width="30" height="30"/><rect class="a" x="168" y="76" width="30" height="30"/>
  <path class="ln" stroke-width="3" d="M52 128 h40 M148 128 h40 M168 118 v20"/>`);

/* where other tools stop: a list on one side, a place you can read on the other */
const BEYOND = print(15, `
  <rect class="g" x="30" y="34" width="62" height="12"/><rect class="g" x="30" y="56" width="62" height="12" opacity=".7"/>
  <rect class="g" x="30" y="78" width="62" height="12" opacity=".45"/><rect class="g" x="30" y="100" width="62" height="12" opacity=".3"/>
  <rect class="ln" stroke-width="2.5" x="124" y="28" width="88" height="92"/>
  <circle class="k" cx="146" cy="52" r="5"/><circle class="k" cx="190" cy="62" r="4"/><circle class="k" cx="158" cy="100" r="4"/>
  <rect class="a" x="174" y="84" width="22" height="22"/>`);

export const STORY = {
  touchingspace: {
    pull: "I didn't know how to read a map, but now I can.",
    pullNote: "A participant, whose words became the title of our paper.",
    pullArt: MAP,
    /* the whole experience, from blind and low-vision participants after using the system.
       One quote at a time in a spotlight; the [[...]] part is set in the accent color. */
    saidNote: "Real feedback from blind and low-vision participants after using TouchingSpace, in their own words.",
    said: [
      { q: "It'll help many people, [[maybe even millions]]." },
      { q: "I think of anything I've seen, this has [[the best possibility]] of doing that.", note: "On conveying how to approach a hard-to-find entrance." },
      { q: "Really nice work. It's going to [[help a lot of people]]." },
      { q: "I started getting [[a picture in my mind]] of where everything was." },
      { q: "It made me feel [[confident]]." },
      { q: "It's a lot more helpful to read a map and find [[a bigger understanding of where you are]]." },
      { q: "I could see this being [[something big]]." },
      { q: "Está súper bien esta aplicación. [[Me parece magnífico.]] Porque a veces se encuentra uno desorientado. Y desubicado de su ubicación.", tr: "This app is really great. I think it is magnificent. Because sometimes you find yourself disoriented, and lost from where you are." },
      { q: "Se lo recomendaría como un [[excelente aparato para la vida diaria]] de uno que no mira.", tr: "I would recommend it as an excellent device for the daily life of someone who does not see." },
      { q: "This is the first time I've used something like this. So if it's not hard for me to get it, it's going to be [[pretty good for somebody else]]." },
      { q: "It's to the point, it's basic, and it gives you [[all the information that you need]] on the moment or on the go." },
      { q: "I love that I can [[really explore what's around a location]]." },
      { q: "That is really cool. [[I'm impressed]] with that. I would love that." },
      { q: "When I first came, one of the volunteers walked me to the bus stop for the first time. This map would have been [[very helpful for me]]." },
      { q: "If you had a map of Trader Joe's, I think people would be able to have confidence and know their surroundings and [[walk in there independently]]." },
      { q: "Honestly, glad that young students are thinking about how to [[change life for people with disabilities]]." },
    ],
    /* what makes it work: four aspects, one quote each */
    sensesTitle: "What makes it work",
    senses: [
      { art: MULTI, label: "Multi-sensory", line: "A hum as the finger nears a place, a vibration at its edge, and its name when the finger arrives.",
        quote: "I think it's good to have a multimodal way because you're going to remember it more in general." },
      { art: DEEPER, label: "Conversation", line: "A conversational agent answers open questions about any place.",
        quote: "I really love that chatbot... having the map and it spelling out each of the buildings, but then you're able to go deeper." },
      { art: PAD, label: "No extra hardware", line: "It runs on the trackpad of an everyday laptop. Nothing to buy, print, or carry.",
        quote: "I can have it on my computer... the product itself is just software." },
      { art: LAYERS, label: "A digital map", line: "Any place can be loaded, and layers of places can be added or taken away.",
        quote: "I like that it's dynamic — not a static map where you constantly have to print something out." },
    ],
    /* what changed afterwards; each with one or more quotes */
    panels: [
      { art: SPOTS, title: "One spot became many",
        text: "A familiar place was often a single point, the spot someone drives you to. Tracing around it, the point filled with places.",
        quotes: ["In my mind there was only one spot... So now there are a lot of spots."] },
      { art: STREETS, title: "A picture of the streets",
        text: "Tracing by hand, participants gave the area a shape of their own: an L of streets, a butterfly, a row of shops.",
        quotes: ["I thought it would be hard for me to build a mental map, but I was able to kind of draw that L-shape or square shape of the streets."] },
      { art: NEAR, title: "Knowing the neighborhood",
        text: "Knowing what is around matters most when something goes wrong: where to sit down, where to ask for help. Around places they already visit, participants learned what else was there.",
        quotes: ["I think it gives me a better knowledge of maps in general, and directions, and being aware of my surroundings and getting to know more of the neighborhood or the area.", "What if you're feeling sick? At least you know, okay, I know what's around me. I need to go sit down... Just to know what's around you, I think it does help the independent traveler feel more safe and confident."] },
      { art: UNASKED, title: "Places nobody asked for",
        text: "You cannot ask about a place you do not know is there. On the map, places nobody asked for came up on their own, and some changed trips people already make.",
        quotes: ["Now that I know [the pharmacy] is right there and it's on my way home, I just stop there instead of going all the way home and coming all the way back.", "And no one tells you. It could be that way forever."] },
      { art: ROUTE, title: "Passing it on",
        text: "What one person learned could reach others. At a front desk staffed by blind people, the most common call is how to get there, and they could barely answer it themselves.",
        quotes: ["We have blind people who work here and they get phone calls. One of the biggest questions is \u201chow do I get here?\u201d... We don't know what's around here. We can barely answer that question ourselves.",
          "The only thing we know is our address... That's it. Period. Nothing else.",
          "I can tell someone sighted how to get somewhere now."] },
      { art: PLAN, title: "Planning before the trip",
        text: "Participants placed the reading before travel: lunch near where they are going, a bus stop to find, a place to go if a plan fails.",
        quotes: ["This exploration is done before you leave your house.", "I could use this all the time when I'm planning my trip, especially when I know that I'm going to go someplace I've never been before."] },
      { art: BEYOND, title: "Where other tools stop",
        text: "The apps participants already use give a route or a list of results. They rarely say what lies around a place, and they often assume you drive.",
        quotes: ["With [another map app] I tried to explore the place but it doesn't work well... it just zooms the area but doesn't say the names of the places or the statue. This is the first time I know there is a statue for Nikola Tesla.",
          "It always wants to tell you what's nearby with a car... I don't drive.",
          "Between the existing ones... compared to this prototype, I'd say this prototype in particular is a lot more helpful, especially the way it vibrates and hums as soon as you reach a destination."] },
    ],
    close: { q: "Me va alzando las ubicaciones y las cosas que están alrededor mías como si lo estuviera mirando. Me sentí súper contento y libre de poder yo hacer las cosas yo solo.",
      tr: "It keeps raising up for me the locations and the things that are around me, as if I were looking at it. I felt super happy and free to be able to do things by myself.",
      note: "A Spanish speaker, after using our system." },
  },
};
