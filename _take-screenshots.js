const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

  // Screenshot 1: Cotizador (desktop)
  await page.goto('http://localhost:8080/index.html#cotizador', { waitUntil: 'networkidle0' });
  await page.waitForSelector('#cotizador');
  const cotizador = await page.$('#cotizador');
  if (cotizador) {
    await cotizador.screenshot({ path: path.join(__dirname, 'captura-cotizador.png') });
    console.log('captura-cotizador.png saved');
  }

  // Screenshot 2: Hero (desktop)
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.hero');
  const hero = await page.$('.hero');
  if (hero) {
    await hero.screenshot({ path: path.join(__dirname, 'captura-hero-desktop.png') });
    console.log('captura-hero-desktop.png saved');
  }

  await browser.close();
  console.log('Done');
})();
