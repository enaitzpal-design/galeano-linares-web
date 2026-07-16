// Recorta a cuadrado (cover-fit) y comprime las fotos del hero con Puppeteer/canvas — no hay
// ImageMagick/sharp instalados, pero Chromium ya está aquí y hace el trabajo igual de bien.
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'Fotos hero');
const OUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'images', 'hero');
const SIZE = 960; // 2x de los 480px máx del colage, para pantallas retina
const QUALITY = 0.8;

const FILES = [
  { file: 'bermix-studio-iwz5tmhjl7o-unsplash.jpg', out: 'hero-obra.jpg' },
  { file: 'julian-hochgesang-ihx1LdtnGXw-unsplash.jpg', out: 'hero-calor.jpg' },
  { file: 'samuel-ramos-rtRfBBOzDU8-unsplash.jpg', out: 'hero-agua.jpg' },
  { file: 'steffen-lemmerzahl-fu3iLPBe964-unsplash.jpg', out: 'hero-comunitats.jpg' },
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: SIZE, height: SIZE });

  for (const { file, out } of FILES) {
    const srcPath = path.join(SRC_DIR, file);
    const buf = fs.readFileSync(srcPath);
    const dataUrl = 'data:image/jpeg;base64,' + buf.toString('base64');

    const resultDataUrl = await page.evaluate(async (src, size, quality) => {
      const img = await new Promise((resolve, reject) => {
        const im = new Image();
        im.onload = () => resolve(im);
        im.onerror = reject;
        im.src = src;
      });
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      // cover-fit: escalar para cubrir el cuadrado y recortar el sobrante centrado
      const scale = Math.max(size / img.width, size / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = (size - dw) / 2;
      const dy = (size - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
      return canvas.toDataURL('image/jpeg', quality);
    }, dataUrl, SIZE, QUALITY);

    const outBuf = Buffer.from(resultDataUrl.split(',')[1], 'base64');
    const outPath = path.join(OUT_DIR, out);
    fs.writeFileSync(outPath, outBuf);
    console.log(`-> ${out} (${(outBuf.length / 1024).toFixed(0)} KB)`);
  }

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
