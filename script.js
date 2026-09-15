function convertMarkdown() {
  const markdownInput = document.getElementById('markdown-input');
  const text = markdownInput ? markdownInput.value : '';

  let lines = text.split('\n').map(line => {

    if (/^\s*###\s+(.*)$/.test(line)) {
      line = line.replace(/^\s*###\s+(.*)$/, '<h3>$1</h3>');
    } else if (/^\s*##\s+(.*)$/.test(line)) {
      line = line.replace(/^\s*##\s+(.*)$/, '<h2>$1</h2>');
    } else if (/^\s*#\s+(.*)$/.test(line)) {
      line = line.replace(/^\s*#\s+(.*)$/, '<h1>$1</h1>');
    }

    else if (/^\s*>\s+(.*)$/.test(line)) {
      line = line.replace(/^\s*>\s+(.*)$/, '<blockquote>$1</blockquote>');
    }
    return line;
  });

  let html = lines.join('');

  html = html.replace(/!\[([^\]])\]\(([^)])\)/g, '<img alt="$1" src="$2">');

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  html = html.replace(/\\(.?)\\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

  html = html.replace(/\(.?)\*/g, '<em>$1</em>');
  html = html.replace(/(.*?)/g, '<em>$1</em>');

  const htmlOutput = document.getElementById('html-output');
  const preview = document.getElementById('preview');

  if (htmlOutput) {
    if (htmlOutput.tagName === 'TEXTAREA' || htmlOutput.tagName === 'INPUT') {
      htmlOutput.value = html;
    } else {
      htmlOutput.textContent = html;
    }
  }

  if (preview) {
    preview.innerHTML = html;
  }

  return html;
}

function init() {
  const markdownInput = document.getElementById('markdown-input');
  if (markdownInput) {
    markdownInput.addEventListener('input', convertMarkdown);
    convertMarkdown(); // Run once on load
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}    });
  }
});
