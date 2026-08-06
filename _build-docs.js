const fs = require('fs');
const path = require('path');

const base = 'C:/Users/alexi/Desktop/smart-armor';
const b64 = (f, type) => `data:image/${type};base64,${fs.readFileSync(path.join(base, f)).toString('base64')}`;

const logo = b64('logo.png', 'png');
const logoW = b64('assets/images/logo-blanco.png', 'png');
const hero = b64('ss-hero.jpg', 'jpeg');
const cotizador = b64('ss-cotizador.jpg', 'jpeg');
const niveles = b64('ss-niveles.jpg', 'jpeg');

// ============================================================
// COTIZACIÓN (2 pages: showcase + quote)
// ============================================================
const cotizacionHTML = `<title>Cotización Landing Page — Smart Armor</title>
<style>
  @page { size: letter; margin: 12mm 16mm; }
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --blue: #0031ff;
    --navy: #00187e;
    --ink: #111114;
    --ink-2: #52525A;
    --ink-3: #72727E;
    --rule: #D1D1D8;
    --bg: #FFFFFF;
    --bg-alt: #F3F3F6;
    --font: 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif;
  }
  @media (prefers-color-scheme: dark) {
    :root { --ink: #E4E4EA; --ink-2: #A0A0AA; --ink-3: #7A7A86; --rule: #36363E; --bg: #141417; --bg-alt: #1E1E22; }
  }
  :root[data-theme="dark"] { --ink: #E4E4EA; --ink-2: #A0A0AA; --ink-3: #7A7A86; --rule: #36363E; --bg: #141417; --bg-alt: #1E1E22; }
  :root[data-theme="light"] { --ink: #111114; --ink-2: #52525A; --ink-3: #72727E; --rule: #D1D1D8; --bg: #FFFFFF; --bg-alt: #F3F3F6; }

  body { font-family: var(--font); color: var(--ink); background: var(--bg-alt); line-height: 1.55; -webkit-font-smoothing: antialiased; }
  .page { max-width: 680px; margin: 36px auto; padding: 40px 44px 36px; background: var(--bg); border-radius: 2px; box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.04); }
  .page + .page { margin-top: 24px; }
  @media print { body { background: white; } .page { max-width: none; margin: 0; padding: 0; box-shadow: none; page-break-after: always; } .page:last-child { page-break-after: auto; } }

  .accent-bar-thin { height: 2px; background: var(--blue); border-radius: 1px; margin-bottom: 24px; opacity: 0.35; }

  .header-navy { display: flex; justify-content: space-between; align-items: center; background: var(--navy); padding: 16px 24px; border-radius: 6px; margin-bottom: 24px; }
  .header-logo-w { height: 28px; width: auto; }
  .header-navy-right { text-align: right; }
  .brand-tag-w { font-size: 9px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.45); }
  .brand-name-w { font-size: 13px; font-weight: 600; color: #ffffff; }
  .doc-date-w { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 2px; }

  hr { border: none; border-top: 1px solid var(--rule); }

  .section-label { font-size: 9.5px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--blue); margin-bottom: 14px; }

  /* Screenshots */
  .ss-main { width: 100%; border-radius: 6px; border: 1px solid var(--rule); margin-bottom: 6px; display: block; }
  .ss-caption { font-size: 10.5px; color: var(--ink-3); margin-bottom: 18px; }
  .ss-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 6px; }
  .ss-grid img { width: 100%; border-radius: 5px; border: 1px solid var(--rule); display: block; }
  .ss-grid-captions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .ss-grid-captions span { font-size: 10.5px; color: var(--ink-3); }

  .emphasis-box { position: relative; border: 2px solid var(--blue); border-radius: 7px; overflow: hidden; }
  .emphasis-label { position: absolute; top: 8px; left: 8px; background: var(--blue); color: white; font-size: 9px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 8px; border-radius: 3px; z-index: 1; }

  /* Client info */
  .client-block { display: grid; grid-template-columns: 76px 1fr; gap: 6px 16px; margin: 20px 0; font-size: 13.5px; }
  .client-block dt { font-weight: 600; font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); padding-top: 3px; }
  .client-block dd { font-weight: 500; }
  .description { margin: 18px 0; font-size: 12.5px; color: var(--ink-2); line-height: 1.7; max-width: 520px; }

  /* Deliverables */
  .deliverables { width: 100%; border-collapse: collapse; margin: 10px 0 0; }
  .deliverables tr { border-bottom: 1px solid var(--rule); }
  .deliverables tr:last-child { border-bottom: none; }
  .deliverables td { padding: 10px 0; font-size: 12px; vertical-align: top; line-height: 1.5; }
  .del-name { width: 120px; font-weight: 600; font-size: 11.5px; padding-right: 16px; white-space: nowrap; }
  .del-detail { color: var(--ink-2); font-size: 11.5px; }

  .investment { text-align: center; padding: 22px 0 16px; }
  .price { font-size: 32px; font-weight: 700; letter-spacing: -0.01em; line-height: 1; font-variant-numeric: tabular-nums; }
  .price-currency { font-size: 17px; font-weight: 500; color: var(--ink-2); margin-left: 2px; }
  .price-type { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--blue); margin-top: 6px; font-weight: 600; }
  .terms { font-size: 11px; color: var(--ink-3); text-align: center; line-height: 1.8; margin-bottom: 20px; }
  .terms .sep { margin: 0 6px; opacity: 0.35; }
  .footer { display: flex; justify-content: space-between; font-size: 10.5px; color: var(--ink-3); padding-top: 14px; }
</style>

<!-- PAGE 1: Visual Showcase -->
<div class="page">
  <div class="accent-bar"></div>
  <div class="header">
    <div class="header-left">
      <img src="${logo}" alt="Smart Armor" class="header-logo">
      <span class="header-client">Smart Armor</span>
    </div>
    <div class="header-right">
      <div class="brand-tag">Propuesta por</div>
      <div class="brand-name">MAW Soluciones</div>
      <div class="doc-date">Agosto 2026 &middot; COT-SA-001</div>
    </div>
  </div>
  <hr>
  <div style="margin-top:20px">
    <div class="section-label">Preview del proyecto &mdash; Landing Page</div>
    <img src="${hero}" alt="Vista principal del sitio" class="ss-main">
    <div class="ss-caption">Vista principal: Hero con propuesta de valor y navegación profesional</div>

    <div class="ss-grid">
      <div class="emphasis-box">
        <span class="emphasis-label">Cotizador interactivo</span>
        <img src="${cotizador}" alt="Cotizador inteligente" style="width:100%; display:block;">
      </div>
      <div>
        <img src="${niveles}" alt="Niveles de blindaje" style="width:100%; border-radius:5px; border:1px solid var(--rule); display:block;">
      </div>
    </div>
    <div class="ss-grid-captions">
      <span>Calculadora inteligente de blindaje con recomendación en tiempo real</span>
      <span>Comparativa de niveles de blindaje con especificaciones técnicas</span>
    </div>
  </div>
  <div class="footer">
    <span>MAW Soluciones &middot; Desarrollo & Marketing Digital</span>
    <span>Página 1 de 2</span>
  </div>
</div>

<!-- PAGE 2: Formal Quote -->
<div class="page">
  <div class="accent-bar-thin"></div>
  <dl class="client-block">
    <dt>Cliente</dt><dd>Smart Armor</dd>
    <dt>Proyecto</dt><dd>Landing Page Profesional</dd>
  </dl>
  <p class="description">
    Diseño y desarrollo de una landing page de alto impacto, optimizada para convertir visitantes
    provenientes de campañas en Facebook y Google Ads. La estructura destaca los diferentes tipos
    de blindaje disponibles con un diseño profesional orientado a generar solicitudes de cotización.
  </p>
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
  <div class="investment">
    <div class="price">$3,500 <span class="price-currency">MXN</span></div>
    <div class="price-type">Inversión total &mdash; pago único</div>
  </div>
  <div class="terms">
    50% anticipo para iniciar <span class="sep">&middot;</span> 50% contra entrega<br>
    Entrega estimada: 5–7 días hábiles <span class="sep">&middot;</span> Vigencia: 15 días naturales
  </div>
  <hr>
  <div class="footer">
    <span>contacto@mawsoluciones.com</span>
    <span>mawsoluciones.com</span>
  </div>
</div>
`;

// ============================================================
// PLAN GOOGLE ADS (3 pages)
// ============================================================
const planHTML = `<title>Plan de Arranque Google Ads — Smart Armor</title>
<style>
  @page { size: letter; margin: 14mm 18mm; }
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --blue: #0031ff;
    --navy: #00187e;
    --ink: #111114;
    --ink-2: #52525A;
    --ink-3: #72727E;
    --rule: #D1D1D8;
    --bg: #FFFFFF;
    --bg-alt: #F3F3F6;
    --font: 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif;
  }
  @media (prefers-color-scheme: dark) {
    :root { --ink: #E4E4EA; --ink-2: #A0A0AA; --ink-3: #7A7A86; --rule: #36363E; --bg: #141417; --bg-alt: #1E1E22; }
  }
  :root[data-theme="dark"] { --ink: #E4E4EA; --ink-2: #A0A0AA; --ink-3: #7A7A86; --rule: #36363E; --bg: #141417; --bg-alt: #1E1E22; }
  :root[data-theme="light"] { --ink: #111114; --ink-2: #52525A; --ink-3: #72727E; --rule: #D1D1D8; --bg: #FFFFFF; --bg-alt: #F3F3F6; }

  body { font-family: var(--font); color: var(--ink); background: var(--bg-alt); line-height: 1.55; -webkit-font-smoothing: antialiased; }
  .page { max-width: 700px; margin: 36px auto; padding: 44px 48px 40px; background: var(--bg); border-radius: 2px; box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.04); }
  .page + .page { margin-top: 24px; }
  @media print { body { background: white; } .page { max-width: none; margin: 0; padding: 0; box-shadow: none; page-break-after: always; } .page:last-child { page-break-after: auto; } }

  .accent-bar { height: 3px; background: var(--blue); border-radius: 1px; margin-bottom: 28px; }
  .accent-bar-thin { height: 2px; background: var(--blue); border-radius: 1px; margin-bottom: 28px; opacity: 0.35; }

  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
  .header-left { display: flex; align-items: center; gap: 14px; }
  .header-logo { height: 30px; width: auto; }
  .header-client { font-size: 17px; font-weight: 700; letter-spacing: 0.04em; }
  .header-right { text-align: right; }
  .brand-tag { font-size: 9px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-3); }
  .brand-name { font-size: 13px; font-weight: 600; color: var(--ink-2); }
  .doc-date { font-size: 11px; color: var(--ink-3); margin-top: 2px; }

  hr { border: none; border-top: 1px solid var(--rule); }

  .doc-title { font-size: 22px; font-weight: 700; letter-spacing: -0.01em; line-height: 1.25; margin: 24px 0 4px; }
  .doc-subtitle { font-size: 13px; color: var(--ink-3); letter-spacing: 0.06em; margin-bottom: 20px; }
  .section-label { font-size: 9.5px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--blue); margin-bottom: 14px; }
  .body-text { font-size: 12.8px; color: var(--ink-2); line-height: 1.7; max-width: 540px; margin-bottom: 20px; }

  .ad-mock { border: 1px solid var(--rule); padding: 14px 18px 16px; border-radius: 6px; margin-bottom: 12px; }
  .ad-mock:last-child { margin-bottom: 0; }
  .ad-sponsored { display: inline-block; font-size: 10px; font-weight: 600; letter-spacing: 0.06em; color: var(--ink-3); border: 1px solid var(--rule); border-radius: 3px; padding: 1px 5px; margin-bottom: 5px; }
  .ad-url { font-size: 11.5px; color: var(--ink-3); margin-bottom: 3px; }
  .ad-headline { font-size: 16px; font-weight: 600; line-height: 1.3; margin-bottom: 4px; color: var(--blue); }
  .ad-desc { font-size: 12px; color: var(--ink-2); line-height: 1.55; }

  .callout { background: var(--bg-alt); border-left: 3px solid var(--blue); padding: 14px 18px; margin-top: 20px; font-size: 12px; color: var(--ink-2); line-height: 1.65; }
  .callout strong { display: block; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); margin-bottom: 4px; }

  .data-table { width: 100%; border-collapse: collapse; font-size: 12.5px; font-variant-numeric: tabular-nums; }
  .data-table thead th { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); text-align: left; padding: 0 0 10px; border-bottom: 2px solid var(--blue); }
  .data-table thead th:not(:first-child) { text-align: center; }
  .data-table thead th.highlight { color: var(--blue); }
  .data-table tbody td { padding: 9px 0; border-bottom: 1px solid var(--rule); vertical-align: middle; }
  .data-table tbody td:not(:first-child) { text-align: center; }
  .data-table tbody tr:last-child td { border-bottom: none; font-weight: 600; }
  .data-table .row-label { font-size: 12px; color: var(--ink-2); }
  .data-table .col-highlight { background: rgba(0,49,255,0.04); font-weight: 600; }

  .bar-chart { margin: 24px 0 20px; }
  .bar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  .bar-label { width: 100px; font-size: 11.5px; color: var(--ink-2); text-align: right; flex-shrink: 0; }
  .bar-track { flex: 1; height: 24px; background: var(--bg-alt); border-radius: 3px; overflow: hidden; }
  .bar-fill { height: 100%; background: var(--navy); border-radius: 3px; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; min-width: 36px; opacity: 0.55; }
  .bar-fill--rec { background: var(--blue); opacity: 1; }
  .bar-value { font-size: 11px; font-weight: 600; color: white; font-variant-numeric: tabular-nums; }

  .seg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 14px 0; }
  .seg-item { font-size: 12.5px; line-height: 1.55; }
  .seg-item strong { display: block; font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 2px; }

  .kw-table { width: 100%; border-collapse: collapse; font-size: 12px; }
  .kw-table thead th { font-size: 9.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3); text-align: left; padding: 0 0 8px; border-bottom: 2px solid var(--blue); }
  .kw-table thead th:last-child { text-align: center; }
  .kw-table tbody td { padding: 6px 0; border-bottom: 1px solid var(--rule); vertical-align: middle; }
  .kw-table tbody td:last-child { text-align: center; font-size: 10px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }
  .intent-alta { color: var(--blue); }
  .intent-media { color: var(--ink-3); }

  .neg-kw { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0 20px; }
  .neg-kw span { display: inline-block; font-size: 11px; padding: 3px 10px; border: 1px solid var(--rule); border-radius: 3px; color: var(--ink-2); }

  .cta-block { background: var(--navy); color: white; padding: 20px 24px; border-radius: 6px; margin-top: 24px; }
  .cta-block h3 { font-size: 14px; font-weight: 600; margin-bottom: 6px; }
  .cta-block p { font-size: 12px; opacity: 0.85; line-height: 1.6; }

  .footnote { font-size: 10.5px; color: var(--ink-3); margin-top: 14px; line-height: 1.6; font-style: italic; }
  .page-footer { display: flex; justify-content: space-between; font-size: 10px; color: var(--ink-3); padding-top: 16px; margin-top: auto; }
  .mt-s { margin-top: 20px; }
  .mt-m { margin-top: 28px; }
</style>

<!-- PAGE 1 -->
<div class="page">
  <div class="accent-bar"></div>
  <div class="header">
    <div class="header-left">
      <img src="${logo}" alt="Smart Armor" class="header-logo">
      <span class="header-client">Smart Armor</span>
    </div>
    <div class="header-right">
      <div class="brand-tag">Preparado por</div>
      <div class="brand-name">MAW Soluciones</div>
      <div class="doc-date">Agosto 2026</div>
    </div>
  </div>
  <hr>
  <div class="doc-title">Plan de Arranque<br>Google Ads</div>
  <div class="doc-subtitle">Estrategia de posicionamiento en buscadores para Smart Armor</div>
  <p class="body-text">Estrategia diseñada para posicionar a Smart Armor en los primeros resultados de Google cuando usuarios en todo México busquen servicios de blindaje vehicular. Los anuncios generarán tráfico calificado hacia la landing page, donde el diseño optimizado convertirá visitas en solicitudes de cotización.</p>
  <hr>
  <div class="mt-s">
    <div class="section-label">Ejemplos de anuncios de búsqueda</div>
    <div class="ad-mock">
      <div class="ad-sponsored">Patrocinado</div>
      <div class="ad-url">www.smartarmor.mx/blindaje</div>
      <div class="ad-headline">Blindaje Automotriz Certificado — Smart Armor</div>
      <div class="ad-desc">Protege tu vehículo con blindaje de nivel mundial. Materiales certificados y garantía total. Solicita tu cotización sin compromiso.</div>
    </div>
    <div class="ad-mock">
      <div class="ad-sponsored">Patrocinado</div>
      <div class="ad-url">www.smartarmor.mx/servicios</div>
      <div class="ad-headline">Blinda Tu Auto — Expertos en Nivel II, III y IIIA</div>
      <div class="ad-desc">Más de 10 años blindando vehículos en México. Atención personalizada y financiamiento disponible. Agenda tu cita hoy.</div>
    </div>
    <div class="ad-mock">
      <div class="ad-sponsored">Patrocinado</div>
      <div class="ad-url">www.smartarmor.mx/cotiza</div>
      <div class="ad-headline">¿Cuánto Cuesta Blindar Tu Auto? — Smart Armor</div>
      <div class="ad-desc">Paquetes de blindaje desde nivel II hasta nivel V. Cotiza en línea en minutos. Calidad certificada a precios competitivos.</div>
    </div>
  </div>
  <div class="callout">
    <strong>Sinergia con la landing page</strong>
    Cada anuncio dirige al usuario a la sección relevante de la landing page. El mensaje, tono y propuesta de valor se mantienen consistentes desde el anuncio hasta el formulario de contacto, reduciendo la fricción y aumentando la tasa de conversión.
  </div>
  <div class="page-footer"><span>MAW Soluciones</span><span>Página 1 de 3</span></div>
</div>

<!-- PAGE 2 -->
<div class="page">
  <div class="accent-bar-thin"></div>
  <div class="section-label">Proyecciones de rendimiento mensual</div>
  <table class="data-table">
    <thead><tr><th style="width:36%">Métrica</th><th>Conservador</th><th class="highlight">Recomendado</th><th>Agresivo</th></tr></thead>
    <tbody>
      <tr><td class="row-label">Inversión mensual</td><td>$5,000</td><td class="col-highlight">$8,000</td><td>$15,000</td></tr>
      <tr><td class="row-label">CPC promedio</td><td>$16</td><td class="col-highlight">$14</td><td>$12</td></tr>
      <tr><td class="row-label">Clics estimados</td><td>312</td><td class="col-highlight">571</td><td>1,250</td></tr>
      <tr><td class="row-label">Impresiones</td><td>~8,900</td><td class="col-highlight">~13,600</td><td>~26,000</td></tr>
      <tr><td class="row-label">CTR estimado</td><td>3.5%</td><td class="col-highlight">4.2%</td><td>4.8%</td></tr>
      <tr><td class="row-label">Tasa de conversión</td><td>5%</td><td class="col-highlight">7%</td><td>8%</td></tr>
      <tr><td class="row-label">Leads estimados</td><td>16</td><td class="col-highlight">40</td><td>100</td></tr>
    </tbody>
  </table>
  <div class="footnote">*Proyecciones basadas en promedios del sector automotriz y seguridad en México. Montos en MXN. Resultados reales pueden variar.</div>
  <div class="section-label mt-m">Leads estimados por escenario</div>
  <div class="bar-chart">
    <div class="bar-row"><span class="bar-label">Conservador</span><div class="bar-track"><div class="bar-fill" style="width:16%"><span class="bar-value">16</span></div></div></div>
    <div class="bar-row"><span class="bar-label">Recomendado</span><div class="bar-track"><div class="bar-fill bar-fill--rec" style="width:40%"><span class="bar-value">40</span></div></div></div>
    <div class="bar-row"><span class="bar-label">Agresivo</span><div class="bar-track"><div class="bar-fill" style="width:100%"><span class="bar-value">100</span></div></div></div>
  </div>
  <hr>
  <div class="section-label mt-s">Segmentación de la campaña</div>
  <div class="seg-grid">
    <div class="seg-item"><strong>Cobertura geográfica</strong>República Mexicana — todas las ciudades y estados</div>
    <div class="seg-item"><strong>Dispositivos</strong>Móvil (prioridad 70%) + Desktop (30%)</div>
    <div class="seg-item"><strong>Horarios activos</strong>Lunes a sábado, 7:00 AM – 10:00 PM</div>
    <div class="seg-item"><strong>Audiencia objetivo</strong>Propietarios de vehículos, empresarios, ejecutivos y familias</div>
  </div>
  <div class="page-footer"><span>MAW Soluciones</span><span>Página 2 de 3</span></div>
</div>

<!-- PAGE 3 -->
<div class="page">
  <div class="accent-bar-thin"></div>
  <div class="section-label">Palabras clave principales</div>
  <table class="kw-table">
    <thead><tr><th>Palabra clave</th><th>Intención</th></tr></thead>
    <tbody>
      <tr><td>blindaje automotriz</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindaje vehicular</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindar auto</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindaje de autos</td><td class="intent-alta">Alta</td></tr>
      <tr><td>cuánto cuesta blindar un auto</td><td class="intent-alta">Alta</td></tr>
      <tr><td>empresa de blindaje</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindaje de camionetas</td><td class="intent-alta">Alta</td></tr>
      <tr><td>cotización blindaje vehicular</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindaje nivel III</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindaje nivel IIIA</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindaje antibalas</td><td class="intent-alta">Alta</td></tr>
      <tr><td>blindaje certificado</td><td class="intent-alta">Alta</td></tr>
      <tr><td>taller de blindaje</td><td class="intent-media">Media</td></tr>
      <tr><td>autos blindados México</td><td class="intent-media">Media</td></tr>
      <tr><td>blindaje balístico</td><td class="intent-media">Media</td></tr>
    </tbody>
  </table>
  <div class="section-label mt-m">Palabras clave negativas</div>
  <p class="body-text" style="max-width:100%;margin-bottom:10px">Términos excluidos para evitar clics irrelevantes y proteger el presupuesto de la campaña:</p>
  <div class="neg-kw">
    <span>gratis</span><span>empleo</span><span>trabajo</span><span>vacantes</span><span>curso</span><span>capacitación</span><span>escuela</span><span>película</span><span>serie</span><span>videojuego</span><span>juego</span><span>GTA</span><span>blindaje espiritual</span><span>celular</span><span>pantalla</span><span>descargar</span><span>pdf</span><span>tesis</span><span>noticias</span><span>wikipedia</span><span>seminuevo</span><span>usado</span><span>accidente</span><span>choque</span>
  </div>
  <div class="cta-block">
    <h3>Siguiente paso</h3>
    <p>Active su campaña con MAW Soluciones. La inversión publicitaria se cobra directamente por Google — nosotros nos encargamos de la estrategia, configuración, optimización continua y reportes de rendimiento para que cada peso invertido genere resultados.</p>
  </div>
  <div class="page-footer"><span>MAW Soluciones &middot; contacto@mawsoluciones.com</span><span>Página 3 de 3</span></div>
</div>
`;

fs.writeFileSync(path.join(base, 'cotizacion-smart-armor.html'), cotizacionHTML, 'utf8');
fs.writeFileSync(path.join(base, 'plan-google-ads-smart-armor.html'), planHTML, 'utf8');
console.log('Both files written successfully');
