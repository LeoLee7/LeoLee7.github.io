Lab project card assets

cards/ holds the finished project folders: hero.jpg (2160 x 2160), hero_print.jpg and hero_print.svg, info.txt, and posters.
cards/preview.html shows all cards.
source/original/ holds source posters and renders.
source/compose/ holds the HTML layouts and scripts used to build the hero images.

Render a layout with headless Chrome at 1080 x 1080 and device scale 4, then export at 2160 x 2160.
The compose scripts contain temporary paths from the session that created them; update paths before reuse.
