const fs = require('fs');
const html = fs.readFileSync('scraped_gallery.html', 'utf8');
const idx = html.indexOf('3106166970');
console.log(html.slice(Math.max(0, idx - 300), Math.min(html.length, idx + 500)));
