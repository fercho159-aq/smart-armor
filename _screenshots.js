const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle2', timeout: 15000 });

  // 1. Hero
  await page.screenshot({ path: 'C:/Users/alexi/Desktop/smart-armor/screenshot-hero.png' });
  console.log('1. Hero done');

  // 2. Cotizador — scroll into view then screenshot viewport
  await page.evaluate(() => {
    const el = document.querySelector('#cotizador');
    if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'C:/Users/alexi/Desktop/smart-armor/screenshot-cotizador.png' });
  console.log('2. Cotizador done');

  // 3. Niveles de blindaje
  await page.evaluate(() => {
    const sections = document.querySelectorAll('section');
    for (const s of sections) {
      if (s.textContent.includes('Nivel 3') && s.textContent.includes('Nivel 4') && s.textContent.includes('Nivel 5')) {
        s.scrollIntoView({ block: 'start', behavior: 'instant' });
        break;
      }
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'C:/Users/alexi/Desktop/smart-armor/screenshot-niveles.png' });
  console.log('3. Niveles done');

  await browser.close();
  console.log('All done');
})();
