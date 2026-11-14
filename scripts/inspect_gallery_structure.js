const fs = require('fs');
const html = fs.readFileSync('scraped_gallery.html', 'utf8');

// look for elementor gallery or widgets
const galleryMatches = html.match(/class=["'][^"']*gallery[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi) || [];
console.log('Gallery matches:', galleryMatches.length);

// search for headings or text around images
const chunks = html.split('<div class="elementor-widget-wrap');
console.log('Widget wraps:', chunks.length);
chunks.forEach((chunk, i) => {
  if (chunk.includes('.jpg') || chunk.includes('.jpeg')) {
    const text = chunk.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text) console.log(`Wrap ${i}:`, text.slice(0, 150));
  }
});
