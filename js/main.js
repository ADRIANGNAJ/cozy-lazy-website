/* ============================================
   COZY LAZY - Main JavaScript
   ============================================ */

// Custom Cursor Follower
const follower = document.getElementById('follower');

if (follower) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        follower.style.left = x + 'px';
        follower.style.top = y + 'px';
    });

    // Expand cursor on interactive elements
    const interactiveElements = document.querySelectorAll('.pill, .glass-card, .product-card, a, button');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.width = '500px';
            follower.style.height = '500px';
            follower.style.background = 'radial-gradient(circle, rgba(240, 98, 146, 0.25) 0%, transparent 70%)';
        });

        el.addEventListener('mouseleave', () => {
            follower.style.width = '300px';
            follower.style.height = '300px';
            follower.style.background = 'radial-gradient(circle, rgba(240, 98, 146, 0.15) 0%, transparent 70%)';
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});

// === Animated Navigation System ===
let isNavigating = false;

function navigateToSection(sectionId) {
    // Prevent multiple simultaneous navigations
    if (isNavigating) return;

    isNavigating = true;
    const overlay = document.querySelector('.logo-transition-overlay');
    const targetSection = document.querySelector(sectionId);

    if (!overlay || !targetSection) {
        isNavigating = false;
        return;
    }

    // Step 1: Show overlay with logo
    overlay.classList.add('active');

    // Step 2: Wait for logo animation, then scroll
    setTimeout(() => {
        // Scroll to section (hidden behind overlay)
        targetSection.scrollIntoView({ behavior: 'auto', block: 'start' });

        // Step 3: Start exit animation
        overlay.classList.add('exiting');

        // Step 4: Hide overlay after exit animation
        setTimeout(() => {
            overlay.classList.remove('active', 'exiting');
            isNavigating = false;
        }, 400);
    }, 800);
}

// Setup navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('[data-nav-link]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            navigateToSection(targetId);
        });
    });
});

// Log initialization
console.log('🌸 COZY LAZY initialized');
console.log('✨ Plush velvet aesthetic loaded');
console.log('🎬 Animated navigation ready');

// ============================================
// FUNCIONES DE RESERVA Y COMPRA (PREVIEW)
// ============================================

// Función para reservar evento
function reservarEvento() {
    // Crear modal de confirmación
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;

    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(40, 40, 40, 0.95) 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 50px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        ">
            <div style="font-size: 60px; margin-bottom: 20px;">✨</div>
            <h2 style="font-size: 28px; margin-bottom: 15px; color: white;">¡Reserva Confirmada!</h2>
            <p style="font-size: 16px; opacity: 0.8; margin-bottom: 10px; color: white;">
                Pilates Experience con Amy Altamirano
            </p>
            <p style="font-size: 14px; opacity: 0.6; margin-bottom: 30px; color: white;">
                Sábado 11 de Abril, 2026 • 9:00 AM
            </p>
            <div style="background: rgba(240, 98, 146, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <p style="font-size: 14px; opacity: 0.7; margin-bottom: 10px; color: white;">Total a pagar</p>
                <p style="font-size: 36px; font-weight: 800; color: var(--accent-primary);">$1,850 MXN</p>
            </div>
            <p style="font-size: 14px; opacity: 0.6; margin-bottom: 30px; color: white;">
                📧 Recibirás un correo de confirmación con todos los detalles<br>
                💳 Enlace de pago incluido en el correo
            </p>
            <button onclick="this.closest('div[style*=fixed]').remove()" style="
                background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
                color: white;
                border: none;
                padding: 16px 40px;
                border-radius: 50px;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                width: 100%;
            ">
                ENTENDIDO
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Cerrar al hacer click fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    console.log('🎯 Reserva de evento simulada');
}

// Función para comprar set
function comprarSet(nombreSet, precio) {
    // Crear modal de confirmación
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;

    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(40, 40, 40, 0.95) 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 50px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        ">
            <div style="font-size: 60px; margin-bottom: 20px;">🛍️</div>
            <h2 style="font-size: 28px; margin-bottom: 15px; color: white;">¡Agregado a Lista de Espera!</h2>
            <p style="font-size: 18px; opacity: 0.9; margin-bottom: 10px; color: white; font-weight: 700;">
                ${nombreSet}
            </p>
            <p style="font-size: 14px; opacity: 0.6; margin-bottom: 30px; color: white;">
                Colección Limitada COZY LAZY
            </p>
            <div style="background: rgba(240, 98, 146, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <p style="font-size: 14px; opacity: 0.7; margin-bottom: 10px; color: white;">Precio de preventa</p>
                <p style="font-size: 36px; font-weight: 800; color: var(--accent-primary);">$${precio.toLocaleString()} MXN</p>
            </div>
            <p style="font-size: 14px; opacity: 0.6; margin-bottom: 30px; color: white;">
                📧 Te notificaremos cuando inicie la preventa<br>
                🎁 Acceso prioritario garantizado<br>
                ✨ Descuento exclusivo del 15% para lista de espera
            </p>
            <button onclick="this.closest('div[style*=fixed]').remove()" style="
                background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
                color: white;
                border: none;
                padding: 16px 40px;
                border-radius: 50px;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                width: 100%;
            ">
                PERFECTO
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Cerrar al hacer click fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    console.log(`🛍️ Set agregado a lista: ${nombreSet} - $${precio}`);
}

