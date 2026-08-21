import sharp from 'sharp';

async function convert() {
  try {
    await sharp('C:\\Users\\jagad\\.gemini\\antigravity-ide\\brain\\5fe9824d-1ed5-4ea7-aba4-be05e6ca24b0\\luxury_hero_bg_1787316444501.jpg')
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile('c:\\Users\\jagad\\OneDrive\\Documents\\Projects\\SaiGouravRE\\public\\luxury_hero_bg.webp');
    console.log('Conversion successful');
  } catch (err) {
    console.error('Error during conversion:', err);
  }
}

convert();
