const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('scraped_shemford.html', 'utf8');

// Find all image URLs
const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
let match;
const images = new Set();
while ((match = imgRegex.exec(html)) !== null) {
  images.add(match[1]);
}

// Find data-src or background-image
const dataSrcRegex = /data-src=["']([^"']+)["']/gi;
while ((match = dataSrcRegex.exec(html)) !== null) {
  images.add(match[1]);
}

const bgRegex = /url\(['"]?([^'"\)]+)['"]?\)/gi;
while ((match = bgRegex.exec(html)) !== null) {
  if (match[1].match(/\.(png|jpg|jpeg|gif|webp|svg)/i)) {
    images.add(match[1]);
  }
}

// Links
const linkRegex = /<a[^>]+href=["']([^"']+)["']/gi;
const links = new Set();
while ((match = linkRegex.exec(html)) !== null) {
  links.add(match[1]);
}

console.log('Total images found in homepage:', images.size);
console.log('Images:');
Array.from(images).forEach(img => console.log(' - ' + img));

console.log('\nTotal links found:', links.size);
Array.from(links).forEach(l => console.log(' - ' + l));
