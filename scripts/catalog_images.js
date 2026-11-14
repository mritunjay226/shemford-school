const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync('public/images/shemford/manifest.json', 'utf8'));

// Check occurrence in scraped html files to get captions or alt text
const htmlFiles = [
  'scraped_shemford.html',
  'scraped_gallery.html',
  'scraped_about-us.html',
  'scraped_facilities.html',
  'scraped_infrastructure.html'
];

const htmlContents = htmlFiles.map(f => fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '');

const categorized = manifest.map(item => {
  let context = '';
  for (const html of htmlContents) {
    const idx = html.indexOf(item.filename.split('-')[0]);
    if (idx !== -1) {
      context = html.slice(Math.max(0, idx - 100), Math.min(html.length, idx + 200));
      break;
    }
  }
  return {
    filename: item.filename,
    localPath: item.localPath,
    size: item.size,
    context: context.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 100)
  };
});

fs.writeFileSync('public/images/shemford/catalog.json', JSON.stringify(categorized, null, 2));
console.log('Created image catalog with contexts!');
