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
});
