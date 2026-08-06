const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle2', timeout: 15000 });

  await page.screenshot({ path: 'C:/Users/alexi/Desktop/smart-armor/ss-hero.jpg', type: 'jpeg', quality: 82 });

  await page.evaluate(() => {
    document.querySelector('#cotizador')?.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'C:/Users/alexi/Desktop/smart-armor/ss-cotizador.jpg', type: 'jpeg', quality: 82 });

  await page.evaluate(() => {
    const sections = document.querySelectorAll('section');
    for (const s of sections) {
      if (s.textContent.includes('Nivel 3') && s.textContent.includes('Nivel 5')) {
        s.scrollIntoView({ block: 'start', behavior: 'instant' });
        break;
      }
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'C:/Users/alexi/Desktop/smart-armor/ss-niveles.jpg', type: 'jpeg', quality: 82 });

  await browser.close();
  console.log('done');
})();
