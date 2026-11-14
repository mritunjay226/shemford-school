const fs = require('fs');
const path = require('path');

const extra = 'https://shemfordsaharanpur.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-04-at-2.20.54-PM-scaled-1.jpeg';
fetch(extra).then(async res => {
  if (res.ok) {
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync('public/images/shemford/WhatsApp-Image-2025-03-04-at-2.20.54-PM-scaled-1.jpeg', buffer);
    console.log('Saved extra image:', buffer.length);
  }
}).catch(console.error);
