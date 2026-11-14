const fs = require('fs');
const html = fs.readFileSync('scraped_gallery.html', 'utf8');
const galleryItems = [];
const itemRegex = /<div[^>]*class=["'][^"']*gallery-item[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
let m;
while ((m = itemRegex.exec(html)) !== null) {
  const content = m[1];
  const src = (content.match(/src=["']([^"']+)["']/) || [])[1];
  const caption = (content.match(/gallery-caption[^>]*>([^<]+)</) || [])[1] || '';
  galleryItems.push({ src, caption });
}
console.log('Gallery items extracted:', galleryItems.length);
if (galleryItems.length > 0) {
  console.log('Sample gallery items:', galleryItems.slice(0, 5));
} else {
  // Let's see what classes have gallery in them
  const tagMatches = html.match(/<[^>]+gallery[^\>]*>/gi) || [];
  console.log('Tags with gallery:', tagMatches.slice(0, 10));
}
