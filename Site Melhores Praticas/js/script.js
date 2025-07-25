document.addEventListener("DOMContentLoaded", function () {
    initNavLinkHover();
    initMobileMenu();
    initCarousel();
    initSmoothScroll();
    initAccordion();
    initCardAnimations();
    initGlossarySearch();
    initBackToTop();
    initScrollAnimations();
});

// 🌿 Hover animado nos links da árvore
function initNavLinkHover() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => link.classList.add('shadow-xl', 'scale-110'));
        link.addEventListener('mouseleave', () => link.classList.remove('shadow-xl', 'scale-110'));
    });
}

// 📱 Menu mobile (alerta simples ou lógica futura)
function initMobileMenu() {
    const buttons = document.querySelectorAll('button.md\\:hidden, button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Menu mobile ativado (placeholder)");
            // Lógica real pode ser adicionada aqui futuramente
        });
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

    updateCarousel();
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

// 🔍 Filtro do glossário (só funciona na página do glossário)
function initGlossarySearch() {
    const searchInput = document.getElementById('glossary-search');
    const glossaryItems = document.querySelectorAll('.glossary-item');

    if (!searchInput || glossaryItems.length === 0) return;

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        glossaryItems.forEach(item => {
            const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
            const desc = item.querySelector('p')?.textContent.toLowerCase() || '';
            const visible = title.includes(query) || desc.includes(query);
            item.style.display = visible ? 'block' : 'none';
        });
    });
}

// ⬆️ Botão "voltar ao topo"
function initBackToTop() {
    const backBtn = document.getElementById('back-to-top');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
        const visible = window.scrollY > 100;
        backBtn.classList.toggle('opacity-0', !visible);
        backBtn.classList.toggle('pointer-events-none', !visible);
    });

    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 🎬 Animação de entrada geral com fade/slide
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    });

    elements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500');
        observer.observe(el);
    });
}
