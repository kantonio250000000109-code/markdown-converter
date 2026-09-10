# Markdown → HTML Converter

A small, dependency-free markdown-to-HTML converter built with vanilla HTML, CSS, and JavaScript. No markdown library is used — all parsing is done with regular expressions in `script.js`.

## What it does

Type markdown into the left pane and it's converted live into HTML, shown both rendered (right pane) and as raw markup (the "view generated HTML" panel).

Supported syntax:

| Markdown | Result |
|---|---|
| `# `, `## `, `### ` | `<h1>`, `<h2>`, `<h3>` |
| `**text**` or `__text__` | `<strong>` |
| `*text*` or `_text_` | `<em>` |
| `![alt](url)` | `<img alt="alt" src="url">` |
| `[text](url)` | `<a href="url">text</a>` |
| `> text` | `<blockquote>` |
| anything else | wrapped in `<p>` |

## Files

- `index.html` — page structure and required element IDs (`#markdown-input`, `#html-output`, `#preview`)
- `style.css` — all styling
- `script.js` — the `convertMarkdown()` parsing logic and event wiring

## Running it locally

No build step needed — it's plain static files.

```bash
# from inside this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just double-click `index.html` to open it directly in a browser.

## Deploying to GitHub Pages

1. Create a new **public** repository on GitHub (e.g. `markdown-converter`).
2. Push these three files (`index.html`, `style.css`, `script.js`) to the repo's `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Markdown to HTML converter"
   git branch -M main
   git remote add origin https://github.com/<your-username>/markdown-converter.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`.
5. Save. GitHub will publish it at `https://<your-username>.github.io/markdown-converter` within a minute or two.

## Still to do on your end

This repo covers the coding requirement (item 2) and gives you the live site + source link (items 1–2 of the submission list) once you deploy it. The other two deliverables are tied to your personal freeCodeCamp account, so I can't generate them for you:

- **freeCodeCamp certification**: log into freecodecamp.org, work through the prerequisite modules, and submit your own solution to the "Build a Markdown to HTML Converter" lab there. You're welcome to use the logic in `script.js` as a reference, but paste/adapt it into FCC's own editor and run it against their test suite yourself — their hidden tests may check a few extra edge cases.
- **Public profile link**: found on your freeCodeCamp settings page once you're logged in.
- **Screenshot of green checkmarks**: take this yourself after the FCC test suite passes on their site.
