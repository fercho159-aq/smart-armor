const fs = require('fs');
const cheerio = require('cheerio');

const files = [
    'index.html',
    'contacto.html',
    'casos-exito.html',
    'nosotros.html',
    'preguntas-frecuentes.html',
    'servicios.html'
];

const desktopNavHTML = `
            <ul class="nav-menu">
                <li class="nav-item"><a href="index.html" class="nav-link">Inicio</a></li>
                <li class="nav-item"><a href="nosotros.html" class="nav-link">Nosotros</a></li>
                <li class="nav-item"><a href="servicios.html" class="nav-link">Servicios</a></li>
                <li class="nav-item"><a href="casos-exito.html" class="nav-link">Casos de Éxito</a></li>
                <li class="nav-item"><a href="preguntas-frecuentes.html" class="nav-link">FAQ</a></li>
                <li class="nav-item"><a href="contacto.html" class="nav-link">Contacto</a></li>
            </ul>
`;

const mobileNavHTML = `
        <ul class="mobile-nav-links">
            <li><a href="index.html">Inicio</a></li>
            <li><a href="nosotros.html">Nosotros</a></li>
            <li><a href="servicios.html">Servicios y Paquetes</a></li>
            <li><a href="casos-exito.html">Casos de Éxito</a></li>
            <li><a href="preguntas-frecuentes.html">FAQ</a></li>
            <li><a href="contacto.html">Contacto</a></li>
        </ul>
`;

const footerNavHTML = `
                <ul class="footer-links">
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="nosotros.html">Nosotros</a></li>
                    <li><a href="servicios.html">Servicios y Cotizador</a></li>
                    <li><a href="casos-exito.html">Casos de Éxito</a></li>
                    <li><a href="preguntas-frecuentes.html">Preguntas Frecuentes</a></li>
                    <li><a href="contacto.html">Contacto</a></li>
                </ul>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    let $ = cheerio.load(content, { decodeEntities: false });

    // Update Desktop Nav
    $('.nav-menu').replaceWith(desktopNavHTML);
    
    // Update Mobile Nav
    $('.mobile-nav-links').replaceWith(mobileNavHTML);

    // Update Footer Nav (columna "Menú de Navegación" o "Navegación")
    // Let's find the footer column that has "Navegación" in its h3
    $('footer .footer-col').each(function() {
        let h3Text = $(this).find('h3').text().trim().toLowerCase();
        if (h3Text.includes('navegación')) {
            $(this).find('.footer-links').replaceWith(footerNavHTML);
        }
    });

    // Add "active" class to the correct link based on current file
    let currentFileName = file;
    // Desktop active class
    $('.nav-menu a').each(function() {
        if ($(this).attr('href') === currentFileName) {
            $(this).addClass('active');
        }
    });
    // Mobile active class
    $('.mobile-nav-links a').each(function() {
        if ($(this).attr('href') === currentFileName) {
            $(this).addClass('active');
        }
    });

    // En servicios.html, the cotizador will be appended via another script, 
    // but here we just ensure the menus are updated.
    
    fs.writeFileSync(file, $.html());
    console.log(`Updated menus in ${file}`);
});
