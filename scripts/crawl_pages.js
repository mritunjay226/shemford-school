const fs = require('fs');
const path = require('path');

const pages = [
  'https://shemfordsaharanpur.com/gallery/',
  'https://shemfordsaharanpur.com/about-us/',
  'https://shemfordsaharanpur.com/facilities/',
  'https://shemfordsaharanpur.com/infrastructure/',
  'https://shemfordsaharanpur.com/contact-us/',
  'https://shemfordsaharanpur.com/beyond-academics/'
];

async function fetchAll() {
  const allImages = new Set();
  const pageContents = {};

  // First read scraped_shemford.html (homepage)
  const homeHtml = fs.readFileSync('scraped_shemford.html', 'utf8');
  extractImages(homeHtml, allImages);

  for (const url of pages) {
    try {
      console.log(`Fetching ${url}...`);
      const res = await fetch(url);
      const text = await res.text();
      const slug = url.replace('https://shemfordsaharanpur.com/', '').replace('/', '') || 'home';
      fs.writeFileSync(`scraped_${slug}.html`, text);
      extractImages(text, allImages);
      console.log(`Saved scraped_${slug}.html, found so far: ${allImages.size} images`);
    } catch (e) {
      console.error(`Error fetching ${url}:`, e.message);
    }
  }

  const validImages = Array.from(allImages).filter(img => 
    img.startsWith('http') && 
    (img.endsWith('.jpg') || img.endsWith('.jpeg') || img.endsWith('.png') || img.endsWith('.webp') || img.includes('/uploads/')) &&
    !img.includes('litespeed') && !img.includes('jquery') && !img.includes('.js') && !img.includes('.css')
  );

  console.log(`\nTotal valid unique images to download: ${validImages.length}`);
  fs.writeFileSync('images_list.json', JSON.stringify(validImages, null, 2));
}

function extractImages(html, set) {
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    set.add(match[1]);
  }
  const hrefImgRegex = /<a[^>]+href=["']([^"']+\.(?:jpe?g|png|webp))["']/gi;
  while ((match = hrefImgRegex.exec(html)) !== null) {
    set.add(match[1]);
  }
  const dataSrcRegex = /data-src=["']([^"']+)["']/gi;
  while ((match = dataSrcRegex.exec(html)) !== null) {
    set.add(match[1]);
  }
}

fetchAll();
