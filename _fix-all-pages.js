const fs = require('fs');
const path = require('path');
const base = 'C:/Users/alexi/Desktop/smart-armor';

const FILES = [
  'casos-exito.html',
  'contacto.html',
  'nosotros.html',
  'preguntas-frecuentes.html',
  'servicios.html'
];

const replacements = [
  // ===== MEGA MENU =====
  [
    /<h3>Niveles de Blindaje<\/h3>\s*<ul>\s*<li><a href="servicios\.html#nivel3">Nivel 3 - Protección Urbana \(Armas Cortas\)<\/a><\/li>\s*<li><a href="servicios\.html#nivel4">Nivel 4 - Asalto Organizado<\/a><\/li>\s*<li><a href="servicios\.html#nivel5">Nivel 5 - Táctico \/ Militar \(Armas Largas\)<\/a><\/li>\s*<\/ul>/g,
    `<h3>Paquetes de Blindaje</h3>
                            <ul>
                                <li><a href="index.html#paquetes">Shield — Cristales + Kevlar en puertas</a></li>
                                <li><a href="index.html#paquetes">Diamond — Perímetro completo de cristales</a></li>
                                <li><a href="index.html#paquetes">Full — Blindaje total cristales + Kevlar</a></li>
                            </ul>`
  ],
  [
    /<h3>Blindaje Especializado<\/h3>\s*<ul>\s*<li><a href="servicios\.html#cristales">Blindaje de Cristales y Puertas<\/a><\/li>\s*<li><a href="servicios\.html#mantenimiento">Mantenimiento de Unidades<\/a><\/li>\s*<li><a href="servicios\.html#reemplazos">Reemplazo de Cristales Balísticos<\/a><\/li>\s*<\/ul>/g,
    `<h3>Especificaciones</h3>
                            <ul>
                                <li><a href="index.html#paquetes">Cristales Balísticos 14mm</a></li>
                                <li><a href="index.html#paquetes">Kevlar 9 Capas en Puertas</a></li>
                                <li><a href="index.html#paquetes">Certificación NIJ Nivel II</a></li>
                            </ul>`
  ],
  [
    /<h3>Disponibilidad CDMX<\/h3>\s*<ul>\s*<li><a href="servicios\.html#seminuevos">Vehículos Blindados Entrega Inmediata<\/a><\/li>\s*<li><a href="servicios\.html#leasing">Esquemas de Leasing Dedu[cs]ibles<\/a><\/li>\s*<\/ul>/g,
    `<h3>Vehículos</h3>
                            <ul>
                                <li><a href="index.html#cotizador">Sedán · SUV · Pick Up</a></li>
                                <li><a href="index.html#cotizador">Esquemas de Leasing Deducibles</a></li>
                            </ul>`
  ],
  // Mega menu CTA
  [/Cotiza de manera discreta y 100% confidencial en menos de 20 min\./g,
   'Cotiza de manera discreta y 100% confidencial. Respuesta en menos de 2 horas.'],

  // ===== MOBILE NAV SUBMENU =====
  [
    /<li><a href="servicios\.html#nivel3">Nivel 3 - Protección Urbana<\/a><\/li>\s*<li><a href="servicios\.html#nivel4">Nivel 4 - Asalto Organizado<\/a><\/li>\s*<li><a href="servicios\.html#nivel5">Nivel 5 - Militar \/ Táctico<\/a><\/li>\s*(<li><a href="servicios\.html#seminuevos">Vehículos Disponibles<\/a><\/li>\s*)?/g,
    `<li><a href="index.html#paquetes">Shield — Cristales + Kevlar</a></li>
                    <li><a href="index.html#paquetes">Diamond — Perímetro de cristales</a></li>
                    <li><a href="index.html#paquetes">Full — Blindaje total</a></li>
                    `
  ],

  // ===== DESKTOP NAV ITEMS =====
  [/<a href="servicios\.html" class="nav-link(?: active)?">Servicios v<\/a>/g,
   '<a href="index.html#paquetes" class="nav-link">Paquetes v</a>'],
  [/<a href="servicios\.html">Servicios<\/a>/g,
   '<a href="index.html#paquetes">Paquetes</a>'],
  [/<li class="nav-item"><a href="casos-exito\.html" class="nav-link">Casos de Éxito<\/a><\/li>/g,
   '<li class="nav-item"><a href="index.html#cotizador" class="nav-link">Cotizador</a></li>'],
  [/<li class="nav-item"><a href="nosotros\.html" class="nav-link">Nosotros<\/a><\/li>/g, ''],
  [/<li class="nav-item"><a href="preguntas-frecuentes\.html" class="nav-link">FAQ<\/a><\/li>/g, ''],
  [/<li class="nav-item"><a href="contacto\.html" class="nav-link(?: active)?">Contacto<\/a><\/li>/g,
   '<li class="nav-item"><a href="index.html#contacto" class="nav-link">Contacto</a></li>'],

  // ===== HEADER CTA =====
  [/<a href="contacto\.html" class="btn btn-primary">Cotizar Confidencial<\/a>/g,
   '<a href="index.html#contacto" class="btn btn-primary">Cotizar Confidencial</a>'],
  [/<a href="contacto\.html" class="btn btn-primary"/g,
   '<a href="index.html#contacto" class="btn btn-primary"'],

  // ===== MOBILE NAV FOOTER =====
  [/<a href="contacto\.html" class="btn btn-primary">Cotizar Blindaje<\/a>/g,
   '<a href="index.html#contacto" class="btn btn-primary">Cotizar Blindaje</a>'],

  // ===== WHATSAPP LINKS =====
  [/wa\.me\/525500000000/g, 'wa.me/5215528502758'],

  // ===== FOOTER LINKS =====
  [
    /<li><a href="servicios\.html#nivel3">Blindaje Nivel 3<\/a><\/li>\s*<li><a href="servicios\.html#nivel4">Blindaje Nivel 4<\/a><\/li>\s*<li><a href="servicios\.html#nivel5">Blindaje Nivel 5<\/a><\/li>\s*(<li><a href="servicios\.html#cristales">Vidrios Blindados<\/a><\/li>\s*)?(<li><a href="servicios\.html#seminuevos">Seminuevos Entrega Inmediata<\/a><\/li>\s*)?/g,
    `<li><a href="index.html#paquetes">Paquete Shield</a></li>
                    <li><a href="index.html#paquetes">Paquete Diamond</a></li>
                    <li><a href="index.html#paquetes">Paquete Full</a></li>
                    <li><a href="index.html#cotizador">Cotizador en Línea</a></li>
                    <li><a href="index.html#paquetes">Esquemas de Leasing</a></li>
                    `
  ],

  // ===== FOOTER CONTACT INFO =====
  [/Calle Campos Elíseos, Polanco, Miguel Hidalgo, 11560 Ciudad de México, CDMX/g,
   'Lago Onega 236, Int 1, Col. Anáhuac I Sección, Alc. Miguel Hidalgo, C.P. 11320, CDMX'],
  [/\+52 \(55\) 1234-5678 \(Oficina CDMX\)/g,
   '+52 1 55 2850 2758 (WhatsApp CDMX)'],
  [/contacto@smartarmormexico\.com/g, 'j.herrera@smartarmor.com.mx'],

  // ===== FOOTER NAV LINKS =====
  [/<li><a href="servicios\.html">Servicios y Niveles<\/a><\/li>/g,
   '<li><a href="index.html#paquetes">Paquetes de Blindaje</a></li>'],
  [/<li><a href="casos-exito\.html">Casos de Éxito<\/a><\/li>/g,
   '<li><a href="index.html#cotizador">Cotizador en Línea</a></li>'],
  [/<li><a href="nosotros\.html">Sobre Nosotros<\/a><\/li>/g, ''],
  [/<li><a href="preguntas-frecuentes\.html">Preguntas Frecuentes<\/a><\/li>/g, ''],
  [/<li><a href="contacto\.html">Contacto<\/a><\/li>/g,
   '<li><a href="index.html#contacto">Contacto</a></li>'],

  // ===== CONTACTO.HTML FORM SELECT =====
  [
    /<option value="Nivel 3 \(Urbano\)">Nivel 3 - Protección Urbana \(Antiasalto\)<\/option>\s*<option value="Nivel 4 \(Secuestro\)">Nivel 4 - Crimen Organizado<\/option>\s*<option value="Nivel 5 \(Atentado\)">Nivel 5 - Táctico \/ Militar<\/option>/g,
    `<option value="Shield">Shield (Cristales laterales + Kevlar en puertas)</option>
                                    <option value="Diamond">Diamond (Perímetro completo de cristales)</option>
                                    <option value="Full">Full (Cristales + Kevlar — blindaje total)</option>`
  ],

  // ===== CASOS-EXITO: Nivel 3 reference in testimonial =====
  [/blindaje Nivel 3 de Smart Armor/g, 'blindaje Smart Armor'],

  // ===== NOSOTROS: Remove military-grade references =====
  [/Superponemos solapas de acero balístico y Kevlar en todas las uniones de puertas, postes y parabrisas, evitando cualquier vulnerabilidad en el ángulo de impacto\./g,
   'Instalamos cristales balísticos de 14mm y Kevlar de 9 capas en las zonas más vulnerables del vehículo, garantizando una protección NIJ Nivel II completa y discreta.'],
  [/Acero balístico termotratado de alta dureza utilizado para proteger postes, bisagras y coronas de puertas\./g,
   'Cristales balísticos de 14mm certificados NIJ Nivel II para protección perimetral del vehículo.'],
  [/RunFlats de Acero/g, 'Integración Discreta'],

  // ===== FAQ: level references =====
  [/blindaje Nivel 3/g, 'blindaje (paquete Shield o Full)'],
  [/Nivel 3 o blindaje de Cristales y Puertas parcial/g, 'paquete Shield o Diamond'],
  [/Nivel 4 o Nivel 5/g, 'paquete Full'],
  [/niveles de alta protección como Nivel 4 o Nivel 5, el proceso puede demorar entre 25 y 35 días hábiles\. Esto se debe a que estos niveles requieren una reingeniería completa de bisagras, refuerzos de chasis y la calibración fina de sistemas de suspensión reforzada\./g,
   'paquete Full con cristales perimetrales y Kevlar, el proceso puede extenderse algunos días adicionales por la cobertura completa del blindaje.'],

  // ===== FAQ meta keywords =====
  [/tramite ssp blindaje automotriz mexico, peso blindaje nivel 3 cdmx, mantenimiento autos blindados mexico, garantia de cristales balisticos/g,
   'blindaje automotriz cdmx, paquete shield diamond full, cristales blindados 14mm, kevlar 9 capas, NIJ nivel II, smart armor'],

  // ===== SERVICIOS meta =====
  [/Conoce nuestros niveles de blindaje automotriz\. Nivel 3 antiasalto urbano, Nivel 4, Nivel 5 y blindaje de cristales y puertas\. Unidades seminuevas disponibles en CDMX\./g,
   'Paquetes de blindaje automotriz Smart Armor: Shield, Diamond y Full. Cristales balísticos 14mm, Kevlar 9 capas, certificación NIJ Nivel II. CDMX.'],
  [/blindaje nivel 3 precio cdmx, camionetas blindadas seminuevas mexico, blindar cristales auto cdmx, blindaje nivel 4 mexico, smart armor servicios/g,
   'paquete shield blindaje cdmx, paquete diamond cristales, paquete full blindaje total, blindaje NIJ II cdmx, smart armor paquetes'],
];

let totalChanges = 0;

FILES.forEach(file => {
  const filePath = path.join(base, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let fileChanges = 0;

  replacements.forEach(([pattern, replacement]) => {
    const matches = content.match(pattern);
    if (matches) {
      fileChanges += matches.length;
      content = content.replace(pattern, replacement);
    }
  });

  if (fileChanges > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`${file}: ${fileChanges} replacements`);
    totalChanges += fileChanges;
  } else {
    console.log(`${file}: no changes needed`);
  }
});

console.log(`\nTotal: ${totalChanges} replacements across ${FILES.length} files`);
