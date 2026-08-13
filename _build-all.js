const fs = require('fs');
const path = require('path');
const base = 'C:/Users/alexi/Desktop/smart-armor';
const b64 = (f, t) => `data:image/${t};base64,${fs.readFileSync(path.join(base, f)).toString('base64')}`;

const logoW = b64('assets/images/logo-blanco.png', 'png');
const hero = b64('ss-hero.jpg', 'jpeg');
const cotizador = b64('ss-cotizador.jpg', 'jpeg');
const niveles = b64('ss-niveles.jpg', 'jpeg');

const SHARED_CSS = `
  @page { size: letter; margin: 12mm 16mm; }
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --blue: #0031ff; --navy: #00187e; --ink: #111114; --ink-2: #52525A;
    --ink-3: #72727E; --rule: #D1D1D8; --bg: #FFFFFF; --bg-alt: #F3F3F6;
    --font: 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif;
  }
  @media (prefers-color-scheme: dark) {
    :root { --ink:#E4E4EA;--ink-2:#A0A0AA;--ink-3:#7A7A86;--rule:#36363E;--bg:#141417;--bg-alt:#1E1E22; }
  }
  :root[data-theme="dark"]{--ink:#E4E4EA;--ink-2:#A0A0AA;--ink-3:#7A7A86;--rule:#36363E;--bg:#141417;--bg-alt:#1E1E22;}
  :root[data-theme="light"]{--ink:#111114;--ink-2:#52525A;--ink-3:#72727E;--rule:#D1D1D8;--bg:#FFFFFF;--bg-alt:#F3F3F6;}

  body{font-family:var(--font);color:var(--ink);background:var(--bg-alt);line-height:1.55;-webkit-font-smoothing:antialiased;}
  .page{max-width:700px;margin:36px auto;padding:40px 44px 36px;background:var(--bg);border-radius:2px;box-shadow:0 1px 3px rgba(0,0,0,.06),0 8px 24px rgba(0,0,0,.04);}
  .page+.page{margin-top:24px;}
  @media print{body{background:white;}.page{max-width:none;margin:0;padding:0;box-shadow:none;page-break-after:always;}.page:last-child{page-break-after:auto;}}

  .header-navy{display:flex;justify-content:space-between;align-items:center;background:var(--navy);padding:16px 24px;border-radius:6px;margin-bottom:24px;}
  .header-logo-w{height:28px;width:auto;}
  .header-navy-right{text-align:right;}
  .brand-tag-w{font-size:9px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.45);}
  .brand-name-w{font-size:13px;font-weight:600;color:#fff;}
  .doc-date-w{font-size:11px;color:rgba(255,255,255,.45);margin-top:2px;}

  .accent-thin{height:2px;background:var(--blue);border-radius:1px;margin-bottom:24px;opacity:.35;}
  hr{border:none;border-top:1px solid var(--rule);}
  .section-label{font-size:9.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--blue);margin-bottom:14px;}
  .body-text{font-size:12.8px;color:var(--ink-2);line-height:1.7;max-width:540px;margin-bottom:20px;}
  .doc-title{font-size:22px;font-weight:700;letter-spacing:-.01em;line-height:1.25;margin:24px 0 4px;}
  .doc-subtitle{font-size:13px;color:var(--ink-3);letter-spacing:.06em;margin-bottom:20px;}
  .page-footer{display:flex;justify-content:space-between;font-size:10px;color:var(--ink-3);padding-top:16px;}
  .mt-s{margin-top:20px;} .mt-m{margin-top:28px;} .mb-s{margin-bottom:20px;}
  .footnote{font-size:10.5px;color:var(--ink-3);margin-top:14px;line-height:1.6;font-style:italic;}
`;

const HEADER = (label, date) => `
  <div class="header-navy">
    <img src="${logoW}" alt="Smart Armor" class="header-logo-w">
    <div class="header-navy-right">
      <div class="brand-tag-w">${label}</div>
      <div class="brand-name-w">MAW Soluciones</div>
      <div class="doc-date-w">${date}</div>
    </div>
  </div>`;

// ============================================================
// 1. COTIZACIÓN (updated with white logo)
// ============================================================
const cotizacionHTML = `<title>Cotización Landing Page — Smart Armor</title>
<style>${SHARED_CSS}
  .ss-main{width:100%;border-radius:6px;border:1px solid var(--rule);margin-bottom:6px;display:block;}
  .ss-caption{font-size:10.5px;color:var(--ink-3);margin-bottom:18px;}
  .ss-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:6px;}
  .ss-grid img{width:100%;border-radius:5px;border:1px solid var(--rule);display:block;}
  .ss-grid-captions{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .ss-grid-captions span{font-size:10.5px;color:var(--ink-3);}
  .emphasis-box{position:relative;border:2px solid var(--blue);border-radius:7px;overflow:hidden;}
  .emphasis-label{position:absolute;top:8px;left:8px;background:var(--blue);color:white;font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:3px 8px;border-radius:3px;z-index:1;}
  .client-block{display:grid;grid-template-columns:76px 1fr;gap:6px 16px;margin:20px 0;font-size:13.5px;}
  .client-block dt{font-weight:600;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);padding-top:3px;}
  .client-block dd{font-weight:500;}
  .description{margin:18px 0;font-size:12.5px;color:var(--ink-2);line-height:1.7;max-width:520px;}
  .deliverables{width:100%;border-collapse:collapse;margin:10px 0 0;}
  .deliverables tr{border-bottom:1px solid var(--rule);}
  .deliverables tr:last-child{border-bottom:none;}
  .deliverables td{padding:10px 0;font-size:12px;vertical-align:top;line-height:1.5;}
  .del-name{width:120px;font-weight:600;font-size:11.5px;padding-right:16px;white-space:nowrap;}
  .del-detail{color:var(--ink-2);font-size:11.5px;}
  .investment{text-align:center;padding:22px 0 16px;}
  .price{font-size:32px;font-weight:700;letter-spacing:-.01em;line-height:1;font-variant-numeric:tabular-nums;}
  .price-currency{font-size:17px;font-weight:500;color:var(--ink-2);margin-left:2px;}
  .price-type{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--blue);margin-top:6px;font-weight:600;}
  .terms{font-size:11px;color:var(--ink-3);text-align:center;line-height:1.8;margin-bottom:20px;}
  .terms .sep{margin:0 6px;opacity:.35;}
  .footer{display:flex;justify-content:space-between;font-size:10.5px;color:var(--ink-3);padding-top:14px;}
</style>
<div class="page">
  ${HEADER('Propuesta por', 'Agosto 2026 &middot; COT-SA-001')}
  <div style="margin-top:4px">
    <div class="section-label">Preview del proyecto &mdash; Landing Page</div>
    <img src="${hero}" alt="Vista principal" class="ss-main">
    <div class="ss-caption">Vista principal: Hero con propuesta de valor y navegación profesional</div>
    <div class="ss-grid">
      <div class="emphasis-box"><span class="emphasis-label">Cotizador interactivo</span><img src="${cotizador}" alt="Cotizador" style="width:100%;display:block;"></div>
      <div><img src="${niveles}" alt="Niveles" style="width:100%;border-radius:5px;border:1px solid var(--rule);display:block;"></div>
    </div>
    <div class="ss-grid-captions">
      <span>Calculadora inteligente con recomendación en tiempo real</span>
      <span>Comparativa de niveles con especificaciones técnicas</span>
    </div>
  </div>
  <div class="page-footer"><span>MAW Soluciones</span><span>Página 1 de 2</span></div>
</div>
<div class="page">
  <div class="accent-thin"></div>
  <dl class="client-block"><dt>Cliente</dt><dd>Smart Armor</dd><dt>Proyecto</dt><dd>Landing Page Profesional</dd></dl>
  <p class="description">Diseño y desarrollo de una landing page de alto impacto, optimizada para convertir visitantes provenientes de campañas en Facebook y Google Ads. La estructura destaca los paquetes Shield, Diamond y Full con un diseño profesional orientado a generar solicitudes de cotización.</p>
  <hr>
  <div style="margin-top:18px">
    <div class="section-label">Alcance y entregables</div>
    <table class="deliverables">
      <tr><td class="del-name">Diseño UX / UI</td><td class="del-detail">Arquitectura de información y diseño visual centrado en el usuario, con flujo optimizado para maximizar conversiones.</td></tr>
      <tr><td class="del-name">Mapas de calor</td><td class="del-detail">Integración de heatmaps para medir clics, profundidad de scroll y zonas de mayor interacción en tiempo real.</td></tr>
      <tr><td class="del-name">SEO técnico</td><td class="del-detail">Meta tags, Open Graph, Schema markup, sitemap XML, robots.txt y optimización de velocidad de carga.</td></tr>
      <tr><td class="del-name">Analytics</td><td class="del-detail">Configuración completa de Google Analytics 4 y Google Search Console para rastreo de métricas y rendimiento orgánico.</td></tr>
      <tr><td class="del-name">Soporte 12 meses</td><td class="del-detail">Modificaciones y ajustes directos en la página durante un año completo, sin costos adicionales.</td></tr>
    </table>
  </div>
  <hr style="margin-top:18px">
  <div class="investment"><div class="price">$3,500 <span class="price-currency">MXN</span></div><div class="price-type">Inversión total &mdash; pago único</div></div>
  <div class="terms">50% anticipo para iniciar <span class="sep">&middot;</span> 50% contra entrega<br>Entrega estimada: 5–7 días hábiles <span class="sep">&middot;</span> Vigencia: 15 días naturales</div>
  <hr>
  <div class="footer"><span>contacto@mawsoluciones.com</span><span>mawsoluciones.com</span></div>
</div>`;

// ============================================================
// 2. PLAN GOOGLE ADS — $5,000 MXN/mes (datos reales)
// ============================================================
const googleAdsHTML = `<title>Plan Estratégico Google Ads — Smart Armor</title>
<style>${SHARED_CSS}
  .ad-mock{border:1px solid var(--rule);padding:14px 18px 16px;border-radius:6px;margin-bottom:12px;}
  .ad-mock:last-child{margin-bottom:0;}
  .ad-sponsored{display:inline-block;font-size:10px;font-weight:600;letter-spacing:.06em;color:var(--ink-3);border:1px solid var(--rule);border-radius:3px;padding:1px 5px;margin-bottom:5px;}
  .ad-url{font-size:11.5px;color:var(--ink-3);margin-bottom:3px;}
  .ad-headline{font-size:16px;font-weight:600;line-height:1.3;margin-bottom:4px;color:var(--blue);}
  .ad-desc{font-size:12px;color:var(--ink-2);line-height:1.55;}
  .callout{background:var(--bg-alt);border-left:3px solid var(--blue);padding:14px 18px;margin-top:20px;font-size:12px;color:var(--ink-2);line-height:1.65;}
  .callout strong{display:block;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);margin-bottom:4px;}
  .data-table{width:100%;border-collapse:collapse;font-size:12.5px;font-variant-numeric:tabular-nums;}
  .data-table thead th{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3);text-align:left;padding:0 0 10px;border-bottom:2px solid var(--blue);}
  .data-table thead th:not(:first-child){text-align:center;}
  .data-table thead th.highlight{color:var(--blue);}
  .data-table tbody td{padding:9px 0;border-bottom:1px solid var(--rule);vertical-align:middle;}
  .data-table tbody td:not(:first-child){text-align:center;}
  .data-table tbody tr:last-child td{border-bottom:none;font-weight:600;}
  .data-table .row-label{font-size:12px;color:var(--ink-2);}
  .data-table .col-highlight{background:rgba(0,49,255,.04);font-weight:600;}
  .kw-table{width:100%;border-collapse:collapse;font-size:12px;}
  .kw-table thead th{font-size:9.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);text-align:left;padding:0 0 8px;border-bottom:2px solid var(--blue);}
  .kw-table thead th:last-child{text-align:center;}
  .kw-table tbody td{padding:6px 0;border-bottom:1px solid var(--rule);vertical-align:middle;}
  .kw-table tbody td:last-child{text-align:center;font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;}
  .intent-alta{color:var(--blue);} .intent-media{color:var(--ink-3);}
  .neg-kw{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0 20px;}
  .neg-kw span{display:inline-block;font-size:11px;padding:3px 10px;border:1px solid var(--rule);border-radius:3px;color:var(--ink-2);}
  .loc-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:14px 0;}
  .loc-item{font-size:12.5px;line-height:1.55;}
  .loc-item strong{display:block;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);margin-bottom:2px;}
  .cta-block{background:var(--navy);color:white;padding:20px 24px;border-radius:6px;margin-top:24px;}
  .cta-block h3{font-size:14px;font-weight:600;margin-bottom:6px;}
  .cta-block p{font-size:12px;opacity:.85;line-height:1.6;}
  .bar-chart{margin:20px 0;}
  .bar-row{display:flex;align-items:center;gap:12px;margin-bottom:8px;}
  .bar-label{width:120px;font-size:11.5px;color:var(--ink-2);text-align:right;flex-shrink:0;}
  .bar-track{flex:1;height:22px;background:var(--bg-alt);border-radius:3px;overflow:hidden;}
  .bar-fill{height:100%;background:var(--navy);border-radius:3px;display:flex;align-items:center;justify-content:flex-end;padding-right:8px;min-width:36px;opacity:.55;}
  .bar-fill--rec{background:var(--blue);opacity:1;}
  .bar-value{font-size:11px;font-weight:600;color:white;font-variant-numeric:tabular-nums;}
</style>

<!-- PAGE 1: Overview + Ubicaciones + Anuncios -->
<div class="page">
  ${HEADER('Preparado por', 'Agosto 2026')}
  <div class="doc-title">Plan Estratégico<br>Google Ads</div>
  <div class="doc-subtitle">Campaña de búsqueda para Smart Armor &mdash; $5,000 MXN/mes</div>
  <p class="body-text">Estrategia diseñada para captar usuarios con intención de compra en CDMX y zona metropolitana que buscan servicios de blindaje vehicular. Los anuncios de búsqueda dirigirán tráfico calificado a la landing page, generando cotizaciones para los paquetes Shield, Diamond y Full.</p>
  <hr>
  <div class="mt-s">
    <div class="section-label">Segmentación geográfica</div>
    <div class="loc-grid">
      <div class="loc-item"><strong>Zona primaria (80% del presupuesto)</strong>CDMX: Miguel Hidalgo, Polanco, Santa Fe, Lomas, Pedregal, Del Valle, Coyoacán, Nápoles</div>
      <div class="loc-item"><strong>Zona secundaria (20%)</strong>Edo. de México: Huixquilucan, Interlomas, Satélite, Naucalpan. Querétaro y Puebla.</div>
      <div class="loc-item"><strong>Horarios activos</strong>Lunes a sábado, 7:00 AM – 10:00 PM. Domingos con puja reducida.</div>
      <div class="loc-item"><strong>Dispositivos</strong>Móvil 65% + Desktop 35%. Ajuste de puja +15% en iOS (perfil de mayor poder adquisitivo).</div>
    </div>
  </div>
  <hr>
  <div class="mt-s">
    <div class="section-label">Ejemplos de anuncios de búsqueda</div>
    <div class="ad-mock">
      <div class="ad-sponsored">Patrocinado</div>
      <div class="ad-url">www.smartarmor.mx/blindaje-cdmx</div>
      <div class="ad-headline">Blindaje Automotriz en CDMX — Desde $196,100 | Smart Armor</div>
      <div class="ad-desc">Cristales balísticos 14mm + Kevlar 9 capas. Paquetes Shield, Diamond y Full. Nivel NIJ II certificado. Cotiza confidencial hoy.</div>
    </div>
    <div class="ad-mock">
      <div class="ad-sponsored">Patrocinado</div>
      <div class="ad-url">www.smartarmor.mx/paquetes</div>
      <div class="ad-headline">Blinda Tu Camioneta — 3 Paquetes a Tu Medida | Smart Armor</div>
      <div class="ad-desc">Blindaje discreto sin modificar la estética. Sedán, SUV, Pick Up. Opciones de leasing disponibles. Col. Anáhuac, CDMX.</div>
    </div>
    <div class="ad-mock">
      <div class="ad-sponsored">Patrocinado</div>
      <div class="ad-url">www.smartarmor.mx/cotiza</div>
      <div class="ad-headline">¿Cuánto Cuesta Blindar Tu Auto en CDMX? — Smart Armor</div>
      <div class="ad-desc">Cotización en menos de 20 min. Protección contra 9mm, .357 y .38. Instalación profesional garantizada. ¡Agenda hoy!</div>
    </div>
  </div>
  <div class="page-footer"><span>MAW Soluciones &middot; Smart Armor</span><span>Página 1 de 3</span></div>
</div>

<!-- PAGE 2: Keywords + Negative Keywords -->
<div class="page">
  <div class="accent-thin"></div>
  <div class="section-label">Palabras clave principales</div>
  <table class="kw-table">
    <thead><tr><th>Palabra clave</th><th>Intención</th></tr></thead>
    <tbody>
      <tr><td>blindaje automotriz CDMX</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindaje vehicular CDMX</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindar camioneta CDMX</td><td class="intent-alta">Alta</td></tr>
      <tr><td>cuánto cuesta blindar un auto CDMX</td><td class="intent-alta">Alta</td></tr>
      <tr><td>empresa de blindaje en CDMX</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindaje nivel 2 NIJ</td><td class="intent-alta">Alta</td></tr>
      <tr><td>cristales blindados 14mm</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindaje kevlar puertas</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindaje discreto automotriz</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindaje parcial auto</td><td class="intent-alta">Alta</td></tr>
      <tr><td>leasing blindaje automotriz</td><td class="intent-media">Media</td></tr>
      <tr><td>blindaje suburban precio</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindaje pick up México</td><td class="intent-media">Media</td></tr>
      <tr><td>cotización blindaje vehicular</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindaje ligero certificado</td><td class="intent-media">Media</td></tr>
    </tbody>
  </table>

  <div class="section-label mt-m">Términos de búsqueda objetivo</div>
  <p class="body-text" style="max-width:100%;margin-bottom:10px">Frases que los usuarios realmente escriben en Google y que activarán nuestros anuncios:</p>
  <div class="neg-kw" style="margin-bottom:24px">
    <span>"quiero blindar mi camioneta"</span><span>"dónde blindar mi auto en CDMX"</span><span>"blindaje barato CDMX"</span><span>"cristales blindados para auto"</span><span>"cuánto cuesta blindar una suburban"</span><span>"blindaje sedán precio México"</span><span>"blindaje de puertas con kevlar"</span><span>"empresas de blindaje confiables CDMX"</span>
  </div>

  <div class="section-label">Palabras clave negativas</div>
  <p class="body-text" style="max-width:100%;margin-bottom:10px">Términos excluidos para proteger el presupuesto:</p>
  <div class="neg-kw">
    <span>gratis</span><span>empleo</span><span>trabajo</span><span>vacantes</span><span>curso</span><span>capacitación</span><span>escuela</span><span>película</span><span>serie</span><span>videojuego</span><span>GTA</span><span>blindaje espiritual</span><span>celular</span><span>pantalla</span><span>descargar</span><span>tesis</span><span>noticias</span><span>blindaje fiscal</span><span>blindaje político</span><span>blindaje de datos</span><span>blindaje informático</span><span>seminuevo</span><span>usado</span><span>accidente</span>
  </div>
  <div class="page-footer"><span>MAW Soluciones &middot; Smart Armor</span><span>Página 2 de 3</span></div>
</div>

<!-- PAGE 3: Projections -->
<div class="page">
  <div class="accent-thin"></div>
  <div class="section-label">Proyecciones de rendimiento mensual — $5,000 MXN</div>
  <table class="data-table">
    <thead><tr><th style="width:40%">Métrica</th><th class="highlight">Proyección</th></tr></thead>
    <tbody>
      <tr><td class="row-label">Inversión mensual (ad spend)</td><td class="col-highlight">$5,000 MXN</td></tr>
      <tr><td class="row-label">CPC promedio estimado</td><td class="col-highlight">$14 – $18 MXN</td></tr>
      <tr><td class="row-label">Clics estimados</td><td class="col-highlight">280 – 357</td></tr>
      <tr><td class="row-label">Impresiones estimadas</td><td class="col-highlight">7,000 – 10,200</td></tr>
      <tr><td class="row-label">CTR estimado</td><td class="col-highlight">3.5% – 4.5%</td></tr>
      <tr><td class="row-label">Tasa de conversión a lead</td><td class="col-highlight">6% – 8%</td></tr>
      <tr><td class="row-label">Leads estimados (cotizaciones)</td><td class="col-highlight">17 – 28</td></tr>
    </tbody>
  </table>
  <div class="footnote">*Proyecciones basadas en promedios del sector automotriz/seguridad en CDMX. Ticket promedio Smart Armor: $196K–$362K MXN. Con 1 cierre de cada 5 leads, se estiman 3–6 ventas/mes con un revenue potencial de $588K–$2.17M MXN.</div>

  <div class="section-label mt-m">Potencial de retorno mensual</div>
  <div class="bar-chart">
    <div class="bar-row"><span class="bar-label">Inversión</span><div class="bar-track"><div class="bar-fill" style="width:3%"><span class="bar-value">$5K</span></div></div></div>
    <div class="bar-row"><span class="bar-label">Revenue mín.</span><div class="bar-track"><div class="bar-fill bar-fill--rec" style="width:27%"><span class="bar-value">$588K</span></div></div></div>
    <div class="bar-row"><span class="bar-label">Revenue máx.</span><div class="bar-track"><div class="bar-fill bar-fill--rec" style="width:100%"><span class="bar-value">$2.17M</span></div></div></div>
  </div>

  <div class="callout">
    <strong>Optimización continua incluida</strong>
    Revisión semanal de términos de búsqueda, ajuste de pujas por ubicación y dispositivo, pruebas A/B de copy en anuncios, y reporte mensual de rendimiento con recomendaciones de escalamiento.
  </div>

  <div class="cta-block">
    <h3>Siguiente paso</h3>
    <p>Active su campaña con MAW Soluciones. La inversión publicitaria ($5,000 MXN/mes) se cobra directamente por Google. Nosotros nos encargamos de la estrategia, configuración, optimización y reportes para maximizar cada peso invertido.</p>
  </div>
  <div class="page-footer"><span>MAW Soluciones &middot; contacto@mawsoluciones.com</span><span>Página 3 de 3</span></div>
</div>`;

// ============================================================
// 3. PLAN TIKTOK ADS — $3,000 MXN/mes
// ============================================================
const tiktokAdsHTML = `<title>Plan Estratégico TikTok Ads — Smart Armor</title>
<style>${SHARED_CSS}
  .content-card{border:1px solid var(--rule);border-radius:8px;padding:16px 18px;margin-bottom:12px;}
  .content-card h4{font-size:13px;font-weight:600;margin-bottom:4px;}
  .content-card p{font-size:11.5px;color:var(--ink-2);line-height:1.55;}
  .content-card .tag{display:inline-block;font-size:9px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:2px 7px;border-radius:3px;background:rgba(0,49,255,.08);color:var(--blue);margin-bottom:8px;}
  .callout{background:var(--bg-alt);border-left:3px solid var(--blue);padding:14px 18px;margin-top:20px;font-size:12px;color:var(--ink-2);line-height:1.65;}
  .callout strong{display:block;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);margin-bottom:4px;}
  .data-table{width:100%;border-collapse:collapse;font-size:12.5px;font-variant-numeric:tabular-nums;}
  .data-table thead th{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3);text-align:left;padding:0 0 10px;border-bottom:2px solid var(--blue);}
  .data-table thead th:not(:first-child){text-align:center;}
  .data-table thead th.highlight{color:var(--blue);}
  .data-table tbody td{padding:9px 0;border-bottom:1px solid var(--rule);vertical-align:middle;}
  .data-table tbody td:not(:first-child){text-align:center;}
  .data-table tbody tr:last-child td{border-bottom:none;font-weight:600;}
  .data-table .row-label{font-size:12px;color:var(--ink-2);}
  .data-table .col-highlight{background:rgba(0,49,255,.04);font-weight:600;}
  .seg-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:14px 0;}
  .seg-item{font-size:12.5px;line-height:1.55;}
  .seg-item strong{display:block;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);margin-bottom:2px;}
  .cta-block{background:var(--navy);color:white;padding:20px 24px;border-radius:6px;margin-top:24px;}
  .cta-block h3{font-size:14px;font-weight:600;margin-bottom:6px;}
  .cta-block p{font-size:12px;opacity:.85;line-height:1.6;}
  .funnel{display:flex;gap:8px;margin:16px 0 20px;align-items:stretch;}
  .funnel-step{flex:1;background:var(--bg-alt);border-radius:6px;padding:14px 12px;text-align:center;position:relative;}
  .funnel-step::after{content:'→';position:absolute;right:-12px;top:50%;transform:translateY(-50%);color:var(--rule);font-size:16px;}
  .funnel-step:last-child::after{display:none;}
  .funnel-num{font-size:20px;font-weight:700;color:var(--blue);line-height:1;}
  .funnel-label{font-size:9.5px;color:var(--ink-3);margin-top:4px;text-transform:uppercase;letter-spacing:.08em;}
  .bar-chart{margin:20px 0;}
  .bar-row{display:flex;align-items:center;gap:12px;margin-bottom:8px;}
  .bar-label{width:120px;font-size:11.5px;color:var(--ink-2);text-align:right;flex-shrink:0;}
  .bar-track{flex:1;height:22px;background:var(--bg-alt);border-radius:3px;overflow:hidden;}
  .bar-fill{height:100%;background:var(--navy);border-radius:3px;display:flex;align-items:center;justify-content:flex-end;padding-right:8px;min-width:36px;opacity:.55;}
  .bar-fill--rec{background:var(--blue);opacity:1;}
  .bar-value{font-size:11px;font-weight:600;color:white;font-variant-numeric:tabular-nums;}
  .footnote{font-size:10.5px;color:var(--ink-3);margin-top:14px;line-height:1.6;font-style:italic;}
</style>

<!-- PAGE 1: Overview + Content Strategy -->
<div class="page">
  ${HEADER('Preparado por', 'Agosto 2026')}
  <div class="doc-title">Plan Estratégico<br>TikTok Ads</div>
  <div class="doc-subtitle">Campaña de video para Smart Armor &mdash; $3,000 MXN/mes</div>
  <p class="body-text">TikTok permite alcanzar a un público de alto poder adquisitivo en CDMX con contenido visual de impacto. A diferencia de Google (intención directa), TikTok genera <strong>demanda y reconocimiento de marca</strong> mediante videos cortos que muestran el proceso, la tecnología y los beneficios del blindaje Smart Armor.</p>
  <hr>
  <div class="mt-s">
    <div class="section-label">Conceptos creativos de video</div>
    <div class="content-card"><div class="tag">Proceso</div><h4>"Tu blindaje en 60 segundos"</h4><p>Time-lapse del proceso de instalación de cristales balísticos 14mm y lienzos de Kevlar. Desde la recepción del vehículo hasta la entrega. Muestra profesionalismo y taller real.</p></div>
    <div class="content-card"><div class="tag">Educativo</div><h4>"¿Cuánto cuesta proteger a tu familia?"</h4><p>Comparativa visual de los 3 paquetes (Shield, Diamond, Full) con precios reales. Desmitifica el costo — "Desde $196,100 MXN protección real para tu día a día."</p></div>
    <div class="content-card"><div class="tag">Demo</div><h4>"¿Tu cristal resiste esto? El nuestro sí."</h4><p>Demostración de resistencia balística del cristal 14mm vs cristal convencional. Contenido con alto potencial viral que genera conversación y shares.</p></div>
    <div class="content-card"><div class="tag">Confianza</div><h4>"La protección NO es un lujo"</h4><p>Narrativa emocional: ejecutivo, mamá, empresario — personas reales que eligieron proteger lo que importa. Cierra con CTA a WhatsApp para cotización confidencial.</p></div>
  </div>
  <div class="page-footer"><span>MAW Soluciones &middot; Smart Armor</span><span>Página 1 de 3</span></div>
</div>

<!-- PAGE 2: Targeting + Projections -->
<div class="page">
  <div class="accent-thin"></div>
  <div class="section-label">Segmentación de audiencia</div>
  <div class="seg-grid">
    <div class="seg-item"><strong>Edad</strong>28 – 55 años (concentración en 32–48)</div>
    <div class="seg-item"><strong>Ubicación</strong>CDMX y Área Metropolitana (radio 40km del taller)</div>
    <div class="seg-item"><strong>Intereses</strong>Autos, SUVs, seguridad personal, negocios, lifestyle premium, bienes raíces</div>
    <div class="seg-item"><strong>Dispositivos</strong>iOS prioridad (ajuste de puja +20% — perfil de mayor ingreso)</div>
    <div class="seg-item"><strong>Formato</strong>In-Feed Video Ads (9:16) de 15–30 segundos con CTA directo a WhatsApp</div>
    <div class="seg-item"><strong>Remarketing</strong>Audiencia personalizada: visitantes de la landing page que no completaron el formulario</div>
  </div>

  <hr>
  <div class="section-label mt-s">Proyecciones de rendimiento mensual — $3,000 MXN</div>
  <table class="data-table">
    <thead><tr><th style="width:45%">Métrica</th><th class="highlight">Proyección</th></tr></thead>
    <tbody>
      <tr><td class="row-label">Inversión mensual (ad spend)</td><td class="col-highlight">$3,000 MXN</td></tr>
      <tr><td class="row-label">CPM promedio</td><td class="col-highlight">$55 – $70 MXN</td></tr>
      <tr><td class="row-label">Impresiones</td><td class="col-highlight">42,000 – 54,500</td></tr>
      <tr><td class="row-label">Visualizaciones de video (6s+)</td><td class="col-highlight">14,000 – 22,000</td></tr>
      <tr><td class="row-label">Clics al sitio / WhatsApp</td><td class="col-highlight">400 – 650</td></tr>
      <tr><td class="row-label">CTR estimado</td><td class="col-highlight">0.9% – 1.3%</td></tr>
      <tr><td class="row-label">Leads estimados (WhatsApp + form)</td><td class="col-highlight">8 – 18</td></tr>
    </tbody>
  </table>
  <div class="footnote">*TikTok opera como canal de awareness y consideración. Los leads tienen un ciclo de decisión más largo pero mayor afinidad de marca. Combinado con Google Ads, se potencia el efecto de búsqueda post-exposición.</div>

  <div class="section-label mt-m">Embudo de conversión estimado</div>
  <div class="funnel">
    <div class="funnel-step"><div class="funnel-num">48K</div><div class="funnel-label">Impresiones</div></div>
    <div class="funnel-step"><div class="funnel-num">18K</div><div class="funnel-label">Views 6s+</div></div>
    <div class="funnel-step"><div class="funnel-num">525</div><div class="funnel-label">Clics</div></div>
    <div class="funnel-step"><div class="funnel-num">13</div><div class="funnel-label">Leads</div></div>
  </div>

  <div class="page-footer"><span>MAW Soluciones &middot; Smart Armor</span><span>Página 2 de 3</span></div>
</div>

<!-- PAGE 3: Synergy + Calendar + CTA -->
<div class="page">
  <div class="accent-thin"></div>
  <div class="section-label">Sinergia Google Ads + TikTok Ads</div>
  <div class="bar-chart">
    <div class="bar-row"><span class="bar-label">Google Ads</span><div class="bar-track"><div class="bar-fill bar-fill--rec" style="width:62%"><span class="bar-value">$5,000</span></div></div></div>
    <div class="bar-row"><span class="bar-label">TikTok Ads</span><div class="bar-track"><div class="bar-fill" style="width:38%"><span class="bar-value">$3,000</span></div></div></div>
  </div>
  <div class="callout">
    <strong>Efecto combinado</strong>
    Google Ads captura a usuarios que YA buscan blindaje (intención alta). TikTok genera demanda entre usuarios que AÚN NO buscan pero son público ideal (awareness). Cuando un usuario expuesto en TikTok busca después en Google, el anuncio de Smart Armor aparece — cerrando el ciclo. Inversión total: $8,000 MXN/mes para un alcance completo.
  </div>

  <div class="section-label mt-m">Calendario de contenido — Mes 1</div>
  <table class="data-table">
    <thead><tr><th>Semana</th><th>Video</th><th>Objetivo</th></tr></thead>
    <tbody>
      <tr><td class="row-label">Semana 1–2</td><td>"Tu blindaje en 60s"</td><td>Awareness + alcance</td></tr>
      <tr><td class="row-label">Semana 2–3</td><td>"¿Cuánto cuesta protegerte?"</td><td>Consideración + clics</td></tr>
      <tr><td class="row-label">Semana 3–4</td><td>"Demo cristal balístico"</td><td>Engagement + shares</td></tr>
      <tr><td class="row-label">Semana 4</td><td>"La protección no es un lujo"</td><td>Conversión + WhatsApp</td></tr>
    </tbody>
  </table>

  <div class="callout" style="margin-top:20px">
    <strong>Optimización incluida</strong>
    Análisis semanal de métricas, rotación de creativos según rendimiento, ajuste de audiencias por engagement, y escalamiento de los videos con mejor performance. Reporte mensual con métricas y recomendaciones.
  </div>

  <div class="cta-block">
    <h3>Siguiente paso</h3>
    <p>Active ambas campañas con MAW Soluciones. La inversión publicitaria ($5,000 Google + $3,000 TikTok = $8,000 MXN/mes) se cobra directamente por cada plataforma. Nosotros gestionamos estrategia, creativos, optimización y reportes.</p>
  </div>
  <div class="page-footer"><span>MAW Soluciones &middot; contacto@mawsoluciones.com</span><span>Página 3 de 3</span></div>
</div>`;

// Write all files
fs.writeFileSync(path.join(base, 'cotizacion-smart-armor.html'), cotizacionHTML, 'utf8');
fs.writeFileSync(path.join(base, 'plan-google-ads-smart-armor.html'), googleAdsHTML, 'utf8');
fs.writeFileSync(path.join(base, 'plan-tiktok-ads-smart-armor.html'), tiktokAdsHTML, 'utf8');
console.log('3 files written: cotizacion, google-ads, tiktok-ads');
