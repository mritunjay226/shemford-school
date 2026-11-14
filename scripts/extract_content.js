const fs = require('fs');

function extractTextSections(html) {
  // Simple tag stripper / clean text extractor
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

const files = [
  'scraped_shemford.html',
  'scraped_about-us.html',
  'scraped_facilities.html',
  'scraped_infrastructure.html',
  'scraped_contact-us.html',
  'scraped_beyond-academics.html'
];

const summary = {};
files.forEach(f => {
  if (fs.existsSync(f)) {
    const raw = fs.readFileSync(f, 'utf8');
    summary[f] = extractTextSections(raw).slice(0, 3000);
  }
});

fs.writeFileSync('site_content_summary.json', JSON.stringify(summary, null, 2));
console.log('Summarized all scraped pages!');
