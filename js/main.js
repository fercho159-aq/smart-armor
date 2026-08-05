document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // MENÚ RESPONSIVE (DRAWER VERTICAL Y OVERLAY)
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('overlay');

    if (menuToggle && mobileNav && overlay) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Evita scroll de fondo
        });
    }

    const closeMobileMenu = () => {
        if (mobileNav && overlay) {
            mobileNav.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (closeMenu) closeMenu.addEventListener('click', closeMobileMenu);
    if (overlay) overlay.addEventListener('click', closeMobileMenu);

    // Cerrar menú al hacer click en un enlace
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        // Ignorar enlaces que abran submenús si existieran
        if (!link.classList.contains('submenu-toggle')) {
            link.addEventListener('click', closeMobileMenu);
        }
    });

    // ==========================================================================
    // CAROUSEL DE TESTIMONIOS
    // ==========================================================================
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentSlide = 0;
    let autoSlideInterval;

    if (slides.length > 0) {
        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
            resetAutoSlide();
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
            resetAutoSlide();
        };

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Auto-carrusel cada 8 segundos
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(nextSlide, 8000);
        };

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        // Mostrar primer slide e iniciar
        showSlide(currentSlide);
        startAutoSlide();
    }

    // ==========================================================================
    // ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
    // ==========================================================================
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Cerrar todos los demás ítems (estilo acordeón estricto)
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
                const body = faqItem.querySelector('.faq-body');
                if (body) body.style.maxHeight = null;
            });

            // Si no estaba activo, abrirlo
            if (!isActive) {
                item.classList.add('active');
                const body = item.querySelector('.faq-body');
                if (body) {
                    // Calculamos la altura real del contenido interno
                    body.style.maxHeight = body.scrollHeight + 'px';
                }
            }
        });
    });

    // ==========================================================================
    // FORMULARIO DE CAPTACIÓN DE LEAD (GOOGLE ADS OPTIMIZADO)
    // ==========================================================================
    const quoteForms = document.querySelectorAll('.quote-form');

    quoteForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Deshabilitar botón para evitar envíos múltiples
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Enviar';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Procesando...';
            }

            // Obtener valores del formulario
            const name = form.querySelector('[name="nombre"]').value;
            const email = form.querySelector('[name="email"]').value;
            const phone = form.querySelector('[name="telefono"]').value;
            const vehicle = form.querySelector('[name="vehiculo"]').value;
            const message = form.querySelector('[name="mensaje"]') ? form.querySelector('[name="mensaje"]').value : '';

            // Simular petición AJAX de envío
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }

                // Mostrar mensaje de éxito premium
                alert(`¡Gracias ${name}! Tu solicitud de cotización para blindaje de ${vehicle} ha sido recibida con éxito. Un especialista de Smart Armor se comunicará contigo confidencialmente por teléfono (${phone}) o correo electrónico en menos de 20 minutos.`);
                
                // Limpiar formulario
                form.reset();
            }, 1500);
        });
    });

    // ==========================================================================
    // COTIZADOR INTERACTIVO DE BLINDAJE
    // ==========================================================================
    const vehicleCards = document.querySelectorAll('.calc-option-card');
    const threatCards = document.querySelectorAll('.threat-card');
    const coverageCards = document.querySelectorAll('.coverage-card');

    if (vehicleCards.length > 0) {
        let selectedVehicle = 'sedan';
        let selectedThreat = 'low';
        let selectedCoverage = 'glass';

        const updateCalculator = () => {
            const levelTitle = document.getElementById('calc-result-level');
            const glassText = document.getElementById('calc-result-glass');
            const opaqueText = document.getElementById('calc-result-opaque');
            const resistanceText = document.getElementById('calc-result-resistance');
            const weightText = document.getElementById('calc-result-weight');
            const suspensionText = document.getElementById('calc-result-suspension');
            const priceText = document.getElementById('calc-result-price');
            const whatsappBtn = document.getElementById('calc-whatsapp-btn');

            let level = '';
            let glass = '';
            let opaque = '';
            let resistance = '';
            let weight = '';
            let suspension = '';
            let price = '';
            
            // Textos amigables para WhatsApp
            let vehicleLabel = '';
            let threatLabel = '';
            let coverageLabel = '';

            // Vehículo Label
            switch(selectedVehicle) {
                case 'sedan': vehicleLabel = 'Sedán / Hatchback'; break;
                case 'suv-light': vehicleLabel = 'SUV Mediana / Crossover'; break;
                case 'suv-heavy': vehicleLabel = 'SUV Grande (Suburban/Tahoe)'; break;
                case 'pickup': vehicleLabel = 'Pick-Up'; break;
            }

            // Cobertura Label
            if (selectedCoverage === 'glass') {
                coverageLabel = 'Sólo Cristales';
            } else {
                coverageLabel = 'Integral (Cristales + Opaco)';
            }

            // Determinación de Nivel según Amenaza
            if (selectedThreat === 'low') {
                level = 'Nivel 3 (Antiasalto Urbano)';
                threatLabel = 'Bajo / Delincuencia Común';
                glass = 'Vidrios Multicapa de 14mm';
                resistance = 'Armas cortas: Calibres 9mm, .357 Magnum, .38 Especial y menores.';
                
                if (selectedCoverage === 'glass') {
                    opaque = 'Sin blindaje opaco estructural.';
                    price = '$18,000';
                    switch(selectedVehicle) {
                        case 'sedan': weight = '+75 kg'; suspension = 'No Requerida'; break;
                        case 'suv-light': weight = '+90 kg'; suspension = 'No Requerida'; break;
                        case 'suv-heavy': weight = '+115 kg'; suspension = 'No Requerida'; break;
                        case 'pickup': weight = '+105 kg'; suspension = 'No Requerida'; break;
                    }
                } else {
                    opaque = 'Fibras de Aramida / Kevlar (9 capas) en puertas y postes.';
                    price = '$35,000';
                    switch(selectedVehicle) {
                        case 'sedan': weight = '+170 kg'; suspension = 'Opcional'; break;
                        case 'suv-light': weight = '+210 kg'; suspension = 'Recomendada'; break;
                        case 'suv-heavy': weight = '+280 kg'; suspension = 'Recomendada'; break;
                        case 'pickup': weight = '+260 kg'; suspension = 'Recomendada'; break;
                    }
                }
            } else if (selectedThreat === 'medium') {
                level = 'Nivel 4 (Secuestro / Violencia)';
                threatLabel = 'Medio / Robo con Violencia';
                glass = 'Vidrios Balísticos de 21mm';
                resistance = 'Asalto Organizado: Magnum .44, Subametralladoras 9mm y Escopetas Cal. 12.';
                
                if (selectedCoverage === 'glass') {
                    opaque = 'Sin blindaje opaco estructural.';
                    price = '$23,000';
                    switch(selectedVehicle) {
                        case 'sedan': weight = '+125 kg'; suspension = 'No Requerida'; break;
                        case 'suv-light': weight = '+150 kg'; suspension = 'Recomendada'; break;
                        case 'suv-heavy': weight = '+190 kg'; suspension = 'Recomendada'; break;
                        case 'pickup': weight = '+180 kg'; suspension = 'Recomendada'; break;
                    }
                } else {
                    opaque = 'Kevlar UD combinado con placas de acero balístico sueco SSAB en puntos clave.';
                    price = '$48,000';
                    switch(selectedVehicle) {
                        case 'sedan': weight = '+260 kg'; suspension = 'Recomendada'; break;
                        case 'suv-light': weight = '+340 kg'; suspension = 'Obligatoria'; break;
                        case 'suv-heavy': weight = '+440 kg'; suspension = 'Obligatoria'; break;
                        case 'pickup': weight = '+410 kg'; suspension = 'Obligatoria'; break;
                    }
                }
            } else {
                level = 'Nivel 5 (Atentado / Militar)';
                threatLabel = 'Alto / Armas Largas';
                glass = 'Vidrios Balísticos de 42mm';
                resistance = 'Fusiles de Asalto: AR-15 (5.56x45), AK-47 (7.62x39), FAL (7.62x51 NATO) y menores.';
                
                if (selectedCoverage === 'glass') {
                    opaque = 'Sin blindaje opaco estructural.';
                    price = '$35,000';
                    switch(selectedVehicle) {
                        case 'sedan': weight = '+210 kg'; suspension = 'Recomendada'; break;
                        case 'suv-light': weight = '+250 kg'; suspension = 'Recomendada'; break;
                        case 'suv-heavy': weight = '+310 kg'; suspension = 'Obligatoria'; break;
                        case 'pickup': weight = '+295 kg'; suspension = 'Obligatoria'; break;
                    }
                } else {
                    opaque = 'Acero Balístico Sueco de 6.5mm en habitáculo completo y traslapes. RunFlats en llantas.';
                    price = '$72,000';
                    switch(selectedVehicle) {
                        case 'sedan': weight = '+420 kg'; suspension = 'Obligatoria'; break;
                        case 'suv-light': weight = '+520 kg'; suspension = 'Obligatoria'; break;
                        case 'suv-heavy': weight = '+680 kg'; suspension = 'Obligatoria'; break;
                        case 'pickup': weight = '+630 kg'; suspension = 'Obligatoria'; break;
                    }
                }
            }

            // Actualizar interfaz
            if (levelTitle) levelTitle.textContent = level;
            if (glassText) glassText.textContent = glass;
            if (opaqueText) opaqueText.textContent = opaque;
            if (resistanceText) resistanceText.textContent = resistance;
            if (weightText) weightText.textContent = `${weight} aprox.`;
            if (suspensionText) suspensionText.textContent = suspension;
            if (priceText) priceText.innerHTML = `${price} <span>USD</span>`;

            // Construir enlace de WhatsApp
            const messageText = `Hola Smart Armor, utilicé el cotizador en línea y me interesa una cotización formal.
Vehículo: *${vehicleLabel}*
Amenaza / Riesgo: *${threatLabel}*
Tipo de Blindaje: *${coverageLabel}*
Recomendación sugerida: *${level}*
Inversión aproximada: *${price} USD*`;

            if (whatsappBtn) {
                whatsappBtn.href = `https://wa.me/525500000000?text=${encodeURIComponent(messageText)}`;
            }
        };

        // Listeners Vehículos
        vehicleCards.forEach(card => {
            card.addEventListener('click', () => {
                vehicleCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedVehicle = card.getAttribute('data-vehicle');
                updateCalculator();
            });
        });

        // Listeners Amenazas
        threatCards.forEach(card => {
            card.addEventListener('click', () => {
                threatCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedThreat = card.getAttribute('data-threat');
                updateCalculator();
            });
        });

        // Listeners Cobertura
        coverageCards.forEach(card => {
            card.addEventListener('click', () => {
                coverageCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedCoverage = card.getAttribute('data-coverage');
                updateCalculator();
            });
        });

        // Inicializar
        updateCalculator();
    }
});
