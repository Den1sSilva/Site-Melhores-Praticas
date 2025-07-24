document.addEventListener("DOMContentLoaded", function () {
    initNavLinkHover();
    initMobileMenu();
    initCarousel();
    initSmoothScroll();
    initAccordion();
    initCardAnimations();
});

// 🌿 Hover animado nos links da árvore
function initNavLinkHover() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.classList.add('shadow-xl', 'scale-110');
        });
        link.addEventListener('mouseleave', function () {
            this.classList.remove('shadow-xl', 'scale-110');
        });
    });
}

// 📱 Menu mobile (alerta simples ou lógica futura)
function initMobileMenu() {
    const buttons = document.querySelectorAll('button.md\\:hidden, button');

    buttons.forEach(button => {
        
    });
}

// 🎠 Carrossel funcional com setas e dots
function initCarousel() {
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.fa-chevron-left')?.parentElement;
    const nextBtn = document.querySelector('.fa-chevron-right')?.parentElement;
    const dots = document.querySelectorAll('.carousel-dot');

    if (!carousel || items.length === 0 || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const totalItems = items.length;

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.toggle('opacity-100', index === currentIndex);
            item.classList.toggle('opacity-0', index !== currentIndex);
            item.classList.toggle('z-10', index === currentIndex);
        });
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.remove('bg-green-300');
                dot.classList.add('bg-green-600', 'w-4');
            } else {
                dot.classList.add('bg-green-300');
                dot.classList.remove('bg-green-600', 'w-4');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.getAttribute('data-index'));
            updateCarousel();
        });
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 10000);

    updateCarousel(); // estado inicial
}

// 🧭 Rolagem suave para links com #
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            } else if (targetId === '#footer') {
                e.preventDefault();
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ⬇️ Acordeão: abre/fecha seções
function initAccordion() {
    document.querySelectorAll('section:last-of-type button').forEach(button => {
        button.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');

            if (content) content.classList.toggle('hidden');
            if (icon) icon.classList.toggle('rotate-180');
        });
    });
}

// ✨ Animações de entrada nos cards
function initCardAnimations() {
    const cards = document.querySelectorAll('.card-hover');
    if (cards.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        observer.observe(card);
        card.classList.add('opacity-0', 'transition-opacity', 'duration-500', 'ease-in-out');
    });
}
