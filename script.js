/* ===========================================================
   Markdown → HTML Converter
   Pure regex/string parsing — no markdown library used.
   Required elements (per project spec):
     #markdown-input  -> textarea holding the raw markdown
     #html-output     -> shows the generated HTML as text
     #preview         -> shows the generated HTML, rendered
   Required function:
     convertMarkdown() -> takes no parameters, returns the
     generated HTML string, and updates the DOM above.
=========================================================== */

/**
 * Applies inline-level markdown rules (images, links, bold, italic)
 * to a single string. Order matters:
 *   1. images   ![alt](url)   — must run before links, shares [] () syntax
 *   2. links    [text](url)
 *   3. bold     **text** / __text__ — must run before italic
 *   4. italic   *text*  / _text_
 */
function parseInline(text) {
  // Images: ![alt](src)
  text = text.replace(/!\[([^\]]*)\]\(([^)]*)\)/g, '<img alt="$1" src="$2">');

  // Links: [text](href) — negative lookbehind stops it eating the "!" of an image
  text = text.replace(/(?<!!)\[([^\]]*)\]\(([^)]*)\)/g, '<a href="$2">$1</a>');

  // Bold: **text** or __text__
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');

  // Italic: *text* or _text_ (single markers only — bold already consumed the doubles)
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  text = text.replace(/_([^_]+)_/g, '<em>$1</em>');

  return text;
}

/**
 * Converts a single line of markdown into a block-level HTML string.
 * Headings and blockquotes only count if the marker is at the very
 * start of the line; everything else falls back to a paragraph.
 */
function parseLine(line) {
  if (line.trim() === "") return "";

  let match;

  if ((match = line.match(/^### (.*)$/))) {
    return `<h3>${parseInline(match[1])}</h3>`;
  }
  if ((match = line.match(/^## (.*)$/))) {
    return `<h2>${parseInline(match[1])}</h2>`;
  }
  if ((match = line.match(/^# (.*)$/))) {
    return `<h1>${parseInline(match[1])}</h1>`;
  }
  if ((match = line.match(/^> (.*)$/))) {
    return `<blockquote>${parseInline(match[1])}</blockquote>`;
  }

  return `<p>${parseInline(line)}</p>`;
}

/**
 * Required entry point. Reads #markdown-input, builds the HTML,
 * writes it into #html-output (raw text) and #preview (rendered),
 * and returns the generated HTML string.
 */
function convertMarkdown() {
  const input = document.getElementById("markdown-input");
  const rawOutput = document.getElementById("html-output");
  const preview = document.getElementById("preview");

  const lines = input.value.split("\n");
  const html = lines.map(parseLine).join("");

  if (rawOutput) rawOutput.textContent = html;
  if (preview) preview.innerHTML = html;

  return html;
}

/* ---------- wire everything up ---------- */

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("markdown-input");
  const toggleBtn = document.getElementById("toggle-raw");
  const rawOutput = document.getElementById("html-output");

  // live update as the user types
  input.addEventListener("input", convertMarkdown);

  // render once immediately so the preview isn't empty on load
  convertMarkdown();

  // show/hide the raw HTML panel
  if (toggleBtn && rawOutput) {
    toggleBtn.addEventListener("click", () => {
      const isHidden = rawOutput.hasAttribute("hidden");
      if (isHidden) {
        rawOutput.removeAttribute("hidden");
        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.textContent = "hide generated HTML";
      } else {
        rawOutput.setAttribute("hidden", "");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.textContent = "view generated HTML";
      }
    });
  }
});
