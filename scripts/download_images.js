const fs = require('fs');
const path = require('path');

const list = JSON.parse(fs.readFileSync('images_list.json', 'utf8'));
const targetDir = path.join(__dirname, '..', 'public', 'images', 'shemford');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadAll() {
  const downloaded = [];
  for (let i = 0; i < list.length; i++) {
    const url = list[i];
    try {
      const urlObj = new URL(url);
      let filename = path.basename(urlObj.pathname);
      // clean filename
      filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
      const destPath = path.join(targetDir, filename);

      console.log(`[${i + 1}/${list.length}] Downloading ${url} -> ${filename}`);
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`Failed to fetch ${url}: status ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(destPath, buffer);
      downloaded.push({
        originalUrl: url,
        filename: filename,
        localPath: `/images/shemford/${filename}`,
        size: buffer.length
      });
    } catch (e) {
      console.error(`Error downloading ${url}:`, e.message);
    }
  }

  fs.writeFileSync(path.join(targetDir, 'manifest.json'), JSON.stringify(downloaded, null, 2));
  console.log(`\nSuccessfully downloaded ${downloaded.length} images to ${targetDir}!`);
}

downloadAll();
