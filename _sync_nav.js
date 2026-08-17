const fs = require('fs');

const files = [
    'index.html',
    'nosotros.html',
    'servicios.html',
    'casos-exito.html',
    'preguntas-frecuentes.html',
    'contacto.html'
];

const headerTemplate = (activePage) => `
    <header>
        <div class="container navbar">
            <a href="index.html" class="logo-container" id="navLogo">
                <img src="assets/images/logo-blanco.png" alt="Smart Armor de México" class="logo-img">
            </a>

            <ul class="nav-menu">
                <li class="nav-item"><a href="index.html" class="nav-link ${activePage === 'index.html' ? 'active' : ''}">Inicio</a></li>
                <li class="nav-item"><a href="nosotros.html" class="nav-link ${activePage === 'nosotros.html' ? 'active' : ''}">Nosotros</a></li>
                <li class="nav-item"><a href="servicios.html" class="nav-link ${activePage === 'servicios.html' ? 'active' : ''}">Servicios</a></li>
                <li class="nav-item"><a href="casos-exito.html" class="nav-link ${activePage === 'casos-exito.html' ? 'active' : ''}">Casos de Éxito</a></li>
                <li class="nav-item"><a href="preguntas-frecuentes.html" class="nav-link ${activePage === 'preguntas-frecuentes.html' ? 'active' : ''}">FAQ</a></li>
                <li class="nav-item"><a href="contacto.html" class="nav-link ${activePage === 'contacto.html' ? 'active' : ''}">Contacto</a></li>
            </ul>

            <div class="header-cta">
                <a href="contacto.html" class="btn btn-primary" id="headerCtaBtn">Cotizar Confidencial</a>
            </div>

            <button class="menu-toggle" id="menuToggle" aria-label="Abrir menú de navegación">☰</button>
        </div>
    </header>
`;

const mobileNavTemplate = (activePage) => `
    <div class="mobile-nav" id="mobileNav">
        <div class="mobile-nav-header">
            <a href="index.html" class="logo-container">
                <img src="assets/images/logo-blanco.png" alt="Smart Armor de México" class="logo-img" style="height: 35px; width: auto;">
            </a>
            <button class="close-menu" id="closeMenu" aria-label="Cerrar menú">×</button>
        </div>
        
        <ul class="mobile-nav-links">
            <li><a href="index.html" ${activePage === 'index.html' ? 'class="active"' : ''}>Inicio</a></li>
            <li><a href="nosotros.html" ${activePage === 'nosotros.html' ? 'class="active"' : ''}>Nosotros</a></li>
            <li><a href="servicios.html" ${activePage === 'servicios.html' ? 'class="active"' : ''}>Servicios</a></li>
            <li><a href="casos-exito.html" ${activePage === 'casos-exito.html' ? 'class="active"' : ''}>Casos de Éxito</a></li>
            <li><a href="preguntas-frecuentes.html" ${activePage === 'preguntas-frecuentes.html' ? 'class="active"' : ''}>FAQ</a></li>
            <li><a href="contacto.html" ${activePage === 'contacto.html' ? 'class="active"' : ''}>Contacto</a></li>
        </ul>

        <div class="mobile-nav-footer">
            <a href="contacto.html" class="btn btn-primary">Cotizar Blindaje</a>
            <a href="https://wa.me/5215528502758" target="_blank" class="btn btn-whatsapp">WhatsApp Asistencia</a>
        </div>
    </div>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace <header>
    const headerStart = content.indexOf('<header>');
    const headerEnd = content.indexOf('</header>') + 9;
    if (headerStart !== -1 && headerEnd !== -1) {
        content = content.substring(0, headerStart) + headerTemplate(file).trim() + content.substring(headerEnd);
    }
    
    // Replace mobile-nav
    const mobileStart = content.indexOf('<div class="mobile-nav" id="mobileNav">');
    const mobileEnd = content.indexOf('<!-- MAIN CONTENT -->');
    if (mobileStart !== -1 && mobileEnd !== -1) {
        content = content.substring(0, mobileStart) + mobileNavTemplate(file).trim() + '\n\n    ' + content.substring(mobileEnd);
    }
    
    fs.writeFileSync(file, content);
});

console.log('Headers and mobile navs standardized.');
