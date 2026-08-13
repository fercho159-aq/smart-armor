const fs = require('fs');
const cheerio = require('cheerio');

const indexContent = fs.readFileSync('index.html', 'utf-8');
const $index = cheerio.load(indexContent, { decodeEntities: false });

// Get outer HTML of the cotizador section
const cotizadorOuterHTML = $index.html($index('#cotizador'));

let serviciosContent = fs.readFileSync('servicios.html', 'utf-8');
let $servicios = cheerio.load(serviciosContent, { decodeEntities: false });

if ($servicios('main').length > 0) {
    if ($servicios('#cotizador').length === 0) {
        $servicios('main').append(cotizadorOuterHTML);
        fs.writeFileSync('servicios.html', $servicios.html());
        console.log('Appended cotizador to servicios.html');
    } else {
        console.log('Cotizador already exists in servicios.html');
    }
} else {
    // If no <main> exists, just append before footer
    if ($servicios('#cotizador').length === 0) {
        $servicios('footer').before(cotizadorOuterHTML);
        fs.writeFileSync('servicios.html', $servicios.html());
        console.log('Appended cotizador before footer in servicios.html');
    } else {
        console.log('Cotizador already exists in servicios.html');
    }
}
