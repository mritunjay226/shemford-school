const fs = require('fs');
const html = fs.readFileSync('scraped_gallery.html', 'utf8');
const regex = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']?([^"'>]*)["']?/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(m[1].split('/').pop(), 'ALT:', m[2]);
}
