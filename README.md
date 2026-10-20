# leolee7.github.io

Personal academic homepage of Li Liu, served by GitHub Pages as a plain static site (no build step, no Jekyll).

## Structure

```
index.html              page shell, metadata, page containers
404.html                redirects unknown paths to the homepage
.nojekyll               tells GitHub Pages to serve files as-is
favicon.svg
assets/css/site.css     all styles (design tokens at the top)
assets/js/content.js    all site content: publications, projects, news, timeline
assets/js/abstracts.js  paper abstracts used by the Abstract buttons
assets/js/app.js        rendering and hash routing (#publications, #project-<slug>, #news-<slug>)
assets/img/             images (papers, posters, news, logos, art)
files/                  downloadable files (CV)
```

## Common edits

- **Add a news item**: add an entry at the top of `NEWS` in `assets/js/content.js`.
  Set `to: "<project slug>"` to link it to a project page; otherwise give it `title`, `body`,
  and optional `imgs`, `facts`, `links` to get its own post at `#news-<slug>`.
- **Add a paper**: add an entry to `PUBS` in `assets/js/content.js`. Add `sel: 1` to show it on the homepage.
  Put the thumbnail in `assets/img/papers/` and register it in `TEASERS`.
- **Add a project page**: add an entry with a `slug` to `PROJECTS` and its paragraphs to `OVERVIEW`.
- **Update the CV**: replace `files/Li_Liu_resume.pdf`.

## Local preview

ES modules need a web server (opening `index.html` from disk will not work):

```
python3 -m http.server 8000
```

then open http://localhost:8000.

The previous academicpages (Jekyll) version of the site is kept on the `legacy-academicpages` branch.
