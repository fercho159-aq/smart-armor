const fs = require('fs');
const path = require('path');
const base = 'C:/Users/alexi/Desktop/smart-armor';
const b64 = (f, t) => `data:image/${t};base64,${fs.readFileSync(path.join(base, f)).toString('base64')}`;
const tryB64 = (f, t) => { try { return b64(f, t); } catch { return null; } };
const logoW = b64('assets/images/logo-blanco.png', 'png');
const tt1 = tryB64('tiktok/Screenshot_1.png', 'png');
const tt2 = tryB64('tiktok/Screenshot_2.png', 'png');
const tt3 = tryB64('tiktok/Screenshot_3.png', 'png');
const capCotizador = b64('captura-cotizador.png', 'png');
const capHeroDesktop = b64('captura-hero-desktop.png', 'png');

const ttSlot = (img, label, views) => img
  ? `<div class="tt-slot"><img src="${img}" alt="${label}"><div class="tt-meta"><span class="tt-views">▶ ${views} reproducciones</span></div></div>`
  : `<div class="tt-slot tt-slot--ph"><div class="tt-ph-label">${label}</div><div class="tt-meta"><span class="tt-views">▶ ${views}</span></div></div>`;

const CSS = `
@page { size: letter; margin: 12mm 16mm; }
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
:root {
  --blue: #0031ff; --navy: #00187e; --ink: #111114; --ink-2: #52525A;
  --ink-3: #72727E; --rule: #D1D1D8; --bg: #FFFFFF; --bg-alt: #F3F3F6;
  --font: 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif;
}
body { font-family:var(--font); color:var(--ink); background:var(--bg-alt); line-height:1.5; -webkit-font-smoothing:antialiased; }
.page { max-width:700px; margin:36px auto; padding:40px 44px 32px; background:var(--bg); border-radius:2px; box-shadow:0 1px 3px rgba(0,0,0,.06),0 8px 24px rgba(0,0,0,.04); }
.page+.page { margin-top:24px; }
@media print { body{background:white;} .page{max-width:none;margin:0;padding:0;box-shadow:none;page-break-after:always;} .page:last-child{page-break-after:auto;} }

/* Header */
.hdr { display:flex; justify-content:space-between; align-items:center; background:var(--navy); padding:14px 22px; border-radius:6px; margin-bottom:22px; }
.hdr img { height:28px; }
.hdr-r { text-align:right; }
.hdr-tag { font-size:9px; font-weight:600; letter-spacing:.22em; text-transform:uppercase; color:rgba(255,255,255,.4); }
.hdr-name { font-size:12.5px; font-weight:600; color:#fff; }
.hdr-date { font-size:10.5px; color:rgba(255,255,255,.4); margin-top:1px; }

/* Typography */
.title { font-size:24px; font-weight:700; letter-spacing:-.01em; line-height:1.2; margin-bottom:4px; }
.subtitle { font-size:13px; color:var(--ink-3); margin-bottom:18px; }
.section { font-size:9.5px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--blue); margin-bottom:12px; }
.body { font-size:12.5px; color:var(--ink-2); line-height:1.65; max-width:540px; margin-bottom:16px; }
.accent { height:2px; background:var(--blue); border-radius:1px; margin-bottom:22px; opacity:.3; }
hr { border:none; border-top:1px solid var(--rule); }
.ft { display:flex; justify-content:space-between; font-size:10px; color:var(--ink-3); padding-top:14px; margin-top:auto; }
.mt-s{margin-top:16px;} .mt-m{margin-top:24px;} .mb-s{margin-bottom:16px;} .mb-m{margin-bottom:22px;}
.note { font-size:10.5px; color:var(--ink-3); line-height:1.55; font-style:italic; margin-top:10px; }

/* Cover budget cards */
.budget-bar { display:flex; gap:12px; margin:18px 0; }
.b-card { flex:1; border:1px solid var(--rule); border-radius:8px; padding:16px 18px; text-align:center; }
.b-card--tt { border-color:var(--ink); }
.b-card--gg { border-color:var(--blue); }
.b-icon { font-size:22px; margin-bottom:4px; }
.b-platform { font-size:10px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-3); }
.b-amount { font-size:22px; font-weight:700; margin:4px 0 2px; }
.b-obj { font-size:10.5px; color:var(--ink-2); }
.b-total { text-align:center; margin:12px 0 0; }
.b-total-val { font-size:14px; font-weight:700; }
.b-total-label { font-size:10px; color:var(--ink-3); letter-spacing:.1em; text-transform:uppercase; }
.cover-detail { display:grid; grid-template-columns:1fr 1fr; gap:10px 20px; margin:20px 0; font-size:12.5px; }
.cover-detail dt { font-size:9.5px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-3); padding-top:2px; }
.cover-detail dd { font-weight:500; }

/* Segmentation grid */
.seg { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:12px 0 16px; }
.seg-item { font-size:12px; line-height:1.5; }
.seg-item strong { display:block; font-size:9.5px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-3); margin-bottom:2px; }

/* TikTok ad screenshots */
.tt-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin:14px 0; }
.tt-slot { border-radius:12px; overflow:hidden; background:#000; position:relative; }
.tt-slot img { width:100%; height:auto; display:block; }
.tt-slot--ph { aspect-ratio:9/16; display:flex; flex-direction:column; align-items:center; justify-content:center; border:2px dashed var(--rule); background:var(--bg-alt); border-radius:12px; }
.tt-ph-label { font-size:10px; color:var(--ink-3); text-align:center; padding:0 12px; letter-spacing:.05em; text-transform:uppercase; }
.tt-meta { position:absolute; bottom:0; left:0; right:0; padding:8px 12px; background:linear-gradient(transparent,rgba(0,0,0,.6)); }
.tt-slot--ph .tt-meta { position:static; background:none; text-align:center; padding:8px 0 0; }
.tt-views { font-size:10px; color:rgba(255,255,255,.85); font-weight:500; }
.tt-slot--ph .tt-views { color:var(--ink-3); }
.tt-cta { display:inline-block; background:var(--blue); color:#fff; font-size:11px; font-weight:600; padding:6px 18px; border-radius:4px; margin-top:10px; }

/* Projection table */
.proj { width:100%; border-collapse:collapse; font-size:12px; font-variant-numeric:tabular-nums; }
.proj thead th { font-size:9.5px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-3); text-align:left; padding:0 0 8px; border-bottom:2px solid var(--blue); }
.proj thead th:not(:first-child) { text-align:center; }
.proj thead th.hl { color:var(--blue); }
.proj tbody td { padding:7px 0; border-bottom:1px solid var(--rule); }
.proj tbody td:not(:first-child) { text-align:center; font-weight:600; }
.proj tbody tr:last-child td { border-bottom:none; }
.proj .lbl { color:var(--ink-2); }

/* Google ad mock */
.g-ad { border:1px solid var(--rule); padding:14px 18px; border-radius:6px; margin-bottom:10px; }
.g-ad:last-child { margin-bottom:0; }
.g-spon { display:inline-block; font-size:10px; font-weight:600; color:var(--ink-3); border:1px solid var(--rule); border-radius:3px; padding:1px 5px; margin-bottom:4px; }
.g-url { font-size:11px; color:var(--ink-3); margin-bottom:2px; }
.g-h { font-size:15.5px; font-weight:600; color:var(--blue); line-height:1.25; margin-bottom:3px; }
.g-d { font-size:11.5px; color:var(--ink-2); line-height:1.5; }
.g-ext { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
.g-ext span { font-size:10.5px; color:var(--blue); border-bottom:1px solid rgba(0,49,255,.25); }

/* RSA builder */
.rsa-box { border:1px solid var(--rule); border-radius:8px; padding:14px 16px; margin-bottom:14px; }
.rsa-title { font-size:10px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-3); margin-bottom:8px; }
.rsa-list { list-style:none; }
.rsa-list li { font-size:11px; padding:4px 0; border-bottom:1px solid var(--bg-alt); display:flex; align-items:baseline; gap:6px; }
.rsa-list li:last-child { border-bottom:none; }
.rsa-idx { font-size:8px; font-weight:600; color:var(--ink-3); background:var(--bg-alt); border-radius:3px; padding:1px 4px; flex-shrink:0; }
.rsa-pin { font-size:7px; font-weight:600; color:var(--blue); background:rgba(0,49,255,.08); border-radius:2px; padding:1px 4px; margin-left:auto; flex-shrink:0; }

/* Keywords pills */
.kw { display:flex; flex-wrap:wrap; gap:5px; margin:8px 0 14px; }
.kw span { font-size:10.5px; padding:3px 9px; border:1px solid var(--rule); border-radius:3px; color:var(--ink-2); }

/* CTA block */
.cta { background:var(--navy); color:white; padding:20px 24px; border-radius:6px; margin-top:16px; }
.cta h3 { font-size:14px; font-weight:600; margin-bottom:6px; }
.cta p { font-size:12px; opacity:.85; line-height:1.6; }

/* LP screenshots */
.lp-slots { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:12px 0; }
.lp-slot { border:1px solid var(--rule); border-radius:6px; overflow:hidden; background:var(--bg-alt); }
.lp-slot img { width:100%; height:auto; display:block; }
.lp-slot-label { font-size:9px; color:var(--ink-3); letter-spacing:.08em; text-transform:uppercase; text-align:center; padding:6px 0; }
`;

const HEADER = `
<div class="hdr">
  <img src="${logoW}" alt="Smart Armor">
  <div class="hdr-r">
    <div class="hdr-tag">Preparado por</div>
    <div class="hdr-name">MAW Soluciones</div>
    <div class="hdr-date">Agosto 2026</div>
  </div>
</div>`;

const html = `<title>Propuesta Publicidad Digital — Smart Armor</title>
<style>${CSS}</style>

<!-- ============ PAGE 1: COVER ============ -->
<div class="page">
  ${HEADER}
  <div class="title">Propuesta de<br>Publicidad Digital</div>
  <div class="subtitle">Estrategia de captación de clientes para Smart Armor</div>

  <dl class="cover-detail">
    <dt>Cliente</dt><dd>Smart Armor</dd>
    <dt>Industria</dt><dd>Blindaje Automotriz</dd>
    <dt>Periodo</dt><dd>17 de agosto – 15 de septiembre 2026</dd>
    <dt>Ubicación</dt><dd>Ciudad de México</dd>
  </dl>
  <hr>

  <div class="section mt-s">Distribución de inversión</div>
  <div class="budget-bar">
    <div class="b-card b-card--tt">
      <div class="b-icon">▶</div>
      <div class="b-platform">TikTok Ads</div>
      <div class="b-amount">$3,000 <span style="font-size:13px;font-weight:500;color:var(--ink-2)">MXN</span></div>
      <div class="b-obj">Llenado de formulario</div>
    </div>
    <div class="b-card b-card--gg">
      <div class="b-icon">G</div>
      <div class="b-platform">Google Ads</div>
      <div class="b-amount">$5,000 <span style="font-size:13px;font-weight:500;color:var(--ink-2)">MXN</span></div>
      <div class="b-obj">Búsqueda responsiva</div>
    </div>
  </div>
  <div class="b-total">
    <div class="b-total-val">$8,000 MXN</div>
    <div class="b-total-label">Inversión total del periodo</div>
  </div>

  <hr class="mt-m">
  <p class="body mt-s">Smart Armor ofrece blindaje vehicular profesional con certificación NIJ Nivel II, cristales balísticos de 14mm y Kevlar de 9 capas. Esta propuesta combina <strong>TikTok Ads</strong> (generación de demanda y formularios) con <strong>Google Ads</strong> (captura de intención de búsqueda) para maximizar la captación de leads calificados en CDMX.</p>
  <p class="body">Ambas campañas correrán exclusivamente de <strong>lunes a viernes</strong>, enfocadas en las 5 alcaldías de mayor rendimiento para este sector.</p>

  <div class="ft"><span>MAW Soluciones</span><span>Página 1 de 4</span></div>
</div>

<!-- ============ PAGE 2: TIKTOK ADS ============ -->
<div class="page">
  <div class="accent"></div>
  <div class="section">Campaña 1 — TikTok Ads &middot; $3,000 MXN</div>
  <div class="title" style="font-size:18px;margin-bottom:2px;">Llenado de Formulario</div>
  <div class="subtitle">Objetivo: generar solicitudes de cotización a través de formularios nativos de TikTok</div>

  <div class="section">Segmentación</div>
  <div class="seg">
    <div class="seg-item"><strong>Ubicación (5 alcaldías)</strong>Miguel Hidalgo &middot; Benito Juárez &middot; Cuajimalpa de Morelos &middot; Álvaro Obregón &middot; Coyoacán</div>
    <div class="seg-item"><strong>Edad</strong>28 – 55 años</div>
    <div class="seg-item"><strong>Género</strong>Hombres y mujeres</div>
    <div class="seg-item"><strong>Horarios</strong>Lunes a viernes &middot; 7:00 AM – 10:00 PM</div>
  </div>

  <hr>
  <div class="section mt-s">Anuncios a correr</div>
  <div class="tt-grid">
    ${ttSlot(tt1, 'Tu tranquilidad no tiene precio', '179')}
    ${ttSlot(tt2, '36 meses sin intereses', '201')}
    ${ttSlot(tt3, 'La prevención marca la diferencia', '620')}
  </div>

  <hr class="mt-s">
  <div class="section mt-s">Proyecciones estimadas</div>
  <table class="proj">
    <thead><tr><th>Métrica</th><th class="hl">Estimado</th></tr></thead>
    <tbody>
      <tr><td class="lbl">Inversión</td><td>$3,000 MXN</td></tr>
      <tr><td class="lbl">Costo por formulario</td><td>~$35 MXN</td></tr>
      <tr><td class="lbl">Formularios llenados</td><td>~85</td></tr>
      <tr><td class="lbl">Alcance estimado</td><td>25,000 – 35,000</td></tr>
      <tr><td class="lbl">Impresiones</td><td>35,000 – 50,000</td></tr>
    </tbody>
  </table>
  <p class="note">*Proyecciones basadas en un CPL de $35 MXN. El alcance puede variar según la optimización de la plataforma.</p>

  <div class="ft"><span>MAW Soluciones &middot; Smart Armor</span><span>Página 2 de 4</span></div>
</div>

<!-- ============ PAGE 3: GOOGLE ADS — SEGMENTACIÓN + PREVIEWS ============ -->
<div class="page">
  <div class="accent"></div>
  <div class="section">Campaña 2 — Google Ads &middot; $5,000 MXN</div>
  <div class="title" style="font-size:18px;margin-bottom:2px;">Búsqueda Responsiva</div>
  <div class="subtitle">Captar usuarios con intención de compra mediante anuncios de búsqueda en Google (sin Display)</div>

  <div class="section">Segmentación</div>
  <div class="seg">
    <div class="seg-item"><strong>Ubicación (5 alcaldías)</strong>Miguel Hidalgo &middot; Benito Juárez &middot; Cuajimalpa &middot; Álvaro Obregón &middot; Coyoacán</div>
    <div class="seg-item"><strong>Edad / Género</strong>25 – 55 años &middot; Hombres y mujeres</div>
    <div class="seg-item"><strong>Horarios</strong>Lunes a viernes &middot; 7 AM – 10 PM</div>
    <div class="seg-item"><strong>Extensiones</strong>Sitelinks &middot; Callouts &middot; Llamada &middot; Ubicación</div>
  </div>

  <div class="section">Palabras clave</div>
  <div class="kw">
    <span>blindaje automotriz CDMX</span><span>blindaje vehicular CDMX</span><span>blindar camioneta CDMX</span><span>cuánto cuesta blindar un auto</span><span>empresa de blindaje CDMX</span><span>cristales blindados</span><span>blindaje kevlar</span><span>cotización blindaje vehicular</span>
  </div>

  <hr>
  <div class="section mt-s">Así se verán tus anuncios en Google</div>
  <div class="g-ad">
    <div class="g-spon">Patrocinado</div>
    <div class="g-url">smartarmor.com.mx</div>
    <div class="g-h">Blindaje Automotriz en CDMX — Desde $196,100 | Smart Armor</div>
    <div class="g-d">Blindaje vehicular profesional en CDMX. Cristales balísticos 14mm + Kevlar 9 capas. ¡Cotiza ahora!</div>
    <div class="g-ext"><span>Paquete Shield</span><span>Paquete Diamond</span><span>Paquete Full</span><span>Cotizar Ahora</span></div>
  </div>
  <div class="g-ad">
    <div class="g-spon">Patrocinado</div>
    <div class="g-url">smartarmor.com.mx</div>
    <div class="g-h">Smart Armor | Blindaje Profesional — Cotiza Sin Compromiso Hoy</div>
    <div class="g-d">Paquetes desde $196,100. Sedán, SUV y Pick Up. Instalación discreta sin modificar estética.</div>
    <div class="g-ext"><span>Nivel NIJ II</span><span>Leasing Disponible</span><span>Sin Modificar Estética</span><span>+52 55 2850 2758</span></div>
  </div>
  <p class="note" style="margin-top:4px;">*Google combina automáticamente títulos y descripciones del RSA para generar variaciones optimizadas.</p>

  <div class="ft"><span>MAW Soluciones &middot; Smart Armor</span><span>Página 3 de 4</span></div>
</div>

<!-- ============ PAGE 4: PROYECCIONES + CAPTURAS + CIERRE ============ -->
<div class="page">
  <div class="accent"></div>
  <div class="section">Proyecciones estimadas — Google Ads</div>
  <table class="proj">
    <thead><tr><th>Métrica</th><th class="hl">Estimado</th></tr></thead>
    <tbody>
      <tr><td class="lbl">Inversión</td><td>$5,000 MXN</td></tr>
      <tr><td class="lbl">CPC promedio</td><td>~$25 MXN</td></tr>
      <tr><td class="lbl">Clics estimados</td><td>~200</td></tr>
      <tr><td class="lbl">Impresiones</td><td>4,000 – 5,000</td></tr>
      <tr><td class="lbl">Leads estimados</td><td>20 – 30</td></tr>
    </tbody>
  </table>

  <hr class="mt-s">
  <div class="section mt-s">Landing page del proyecto</div>
  <p class="body" style="margin-bottom:10px;">Demo en línea: <a href="https://www.blindajesmartarmor.com" style="color:var(--blue);font-weight:600;">www.blindajesmartarmor.com</a></p>
  <div class="lp-slots">
    <div class="lp-slot"><img src="${capCotizador}" alt="Cotizador interactivo"><div class="lp-slot-label">Cotizador interactivo</div></div>
    <div class="lp-slot"><img src="${capHeroDesktop}" alt="Hero desktop"><div class="lp-slot-label">Hero principal</div></div>
  </div>

  <div class="cta">
    <h3>Resumen de la inversión</h3>
    <p style="opacity:1;font-size:13px;font-weight:600;margin-bottom:8px;">
      TikTok Ads: $3,000 &nbsp;+&nbsp; Google Ads: $5,000 &nbsp;=&nbsp; $8,000 MXN/mes
    </p>
    <p>Periodo: 17 de agosto – 15 de septiembre 2026. La inversión publicitaria se cobra directamente por cada plataforma. MAW Soluciones se encarga de la estrategia, configuración, segmentación, optimización y reportes de rendimiento.</p>
  </div>

  <div class="ft"><span>MAW Soluciones &middot; contacto@mawsoluciones.com</span><span>Página 4 de 4</span></div>
</div>`;

fs.writeFileSync(path.join(base, 'propuesta-smart-armor.html'), html, 'utf8');
console.log('propuesta-smart-armor.html written');
if (!tt1 || !tt2 || !tt3) {
  console.log('\n⚠️  Faltan imágenes de TikTok. Guarda las 3 capturas como:');
  if (!tt1) console.log('   tiktok-1.png (o .jpg) — "Tu tranquilidad no tiene precio"');
  if (!tt2) console.log('   tiktok-2.png (o .jpg) — "36 meses sin intereses"');
  if (!tt3) console.log('   tiktok-3.png (o .jpg) — "La prevención marca la diferencia"');
  console.log('   en: C:\\Users\\alexi\\Desktop\\smart-armor\\');
  console.log('   Luego corre: node _build-propuesta.js');
}
