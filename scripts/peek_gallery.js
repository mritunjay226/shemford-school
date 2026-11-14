const fs = require('fs');
const html = fs.readFileSync('scraped_gallery.html', 'utf8');
const idx = html.indexOf('gallery');
console.log(html.slice(idx, idx + 1000));
