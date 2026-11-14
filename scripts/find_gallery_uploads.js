const fs = require('fs');
const html = fs.readFileSync('scraped_gallery.html', 'utf8');
const links = html.match(/https:\/\/shemfordsaharanpur\.com\/wp-content\/uploads\/[^\s"'<>]+\.(jpg|jpeg|png|webp)/gi) || [];
console.log('Unique uploads in gallery:', Array.from(new Set(links)));
