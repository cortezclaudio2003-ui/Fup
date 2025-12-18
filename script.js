// Seleciona o container de animação de fundo
const container = document.getElementById('animation-bg');
const colors = ['#d4af37', '#aa771c', '#a8a9ad', '#e0e0e0'];

// Função para criar quadrados animados
function createSquare() {
    // Verificação de segurança: Se o container não existir, para a função.
    if (!container) return;

    const el = document.createElement('div');
    el.className = 'square';
    el.style.borderColor = colors[Math.floor(Math.random() * colors.length)];

    const size = Math.random() * 40 + 15;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = Math.random() * 100 + 'vw';

    const duration = Math.random() * 10 + 15; 
    el.style.animationDuration = duration + 's';
    
    container.appendChild(el);

    setTimeout(() => {
        el.remove();
    }, duration * 1000);
}

// Função para rolar suavemente até seções
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        window.scrollTo({
            top: target.offsetTop - 80, // Ajusta para a navbar
            behavior: 'smooth'
        });
    }
}

// Função para ativar links da navbar baseado na rolagem
function activateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Função para animação de entrada dos elementos
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .hero-content');
    
    elements.forEach(element => {
        const elementTop = element.getAttribute('data-animated') ? 
            element.getBoundingClientRect().top + 100 : 
            element.getBoundingClientRect().top;
        
        if (elementTop < window.innerHeight - 100 && !element.getAttribute('data-animated')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.setAttribute('data-animated', 'true');
            }, 100);
        }
    });
}

// Inicializa animações apenas se o container existir
if (container) {
    setInterval(createSquare, 500);
}

// Adiciona eventos de scroll para ativação de links
window.addEventListener('scroll', () => {
    activateNavOnScroll();
    animateOnScroll();
});

// Inicializa animações quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona evento de clique para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                smoothScrollTo(targetId);
            }
        });
    });
    
    // Inicializa animações
    setTimeout(animateOnScroll, 500);
    
    // Atualiza navbar baseada no estado de login (chama função do auth.js)
    if (typeof updateNavbar === 'function') {
        updateNavbar();
    }
    
    // Adiciona efeito hover nas cards de funcionalidades
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        });
    });
});