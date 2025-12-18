/**
 * script.js - Efeitos Visuais e Navegação
 * Este arquivo controla as animações da Landing Page e UX.
 */

// Seleciona o container onde os quadrados vão "flutuar"
const container = document.getElementById('animation-bg');

// Paleta de cores oficial do FUP Enterprise (Azuis e Brancos)
const colors = ['#0284c7', '#38bdf8', '#0369a1', '#e0f2fe'];

/**
 * Cria um quadrado animado aleatório no fundo da tela
 */
function createSquare() {
    if (!container) return; // Só executa se o elemento existir na página

    const el = document.createElement('div');
    el.className = 'square';
    
    // Define uma cor de borda aleatória da nossa paleta 
    el.style.borderColor = colors[Math.floor(Math.random() * colors.length)];

    // Define tamanho aleatório entre 15px e 55px 
    const size = Math.random() * 40 + 15;
    el.style.width = size + 'px';
    el.style.height = size + 'px';

    // Posição horizontal aleatória (0 a 100vw) 
    el.style.left = Math.random() * 100 + 'vw';

    // Duração da subida aleatória para não parecer mecânico 
    const duration = Math.random() * 10 + 15; 
    el.style.animationDuration = duration + 's';
    
    container.appendChild(el);

    // Remove o elemento após a animação para não pesar o navegador 
    setTimeout(() => {
        el.remove();
    }, duration * 1000);
}

/**
 * Inicialização de funções após o carregamento do DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Inicia a criação de quadrados se o container estiver presente
    if (container) {
        setInterval(createSquare, 600); // Cria um novo quadrado a cada 600ms 
    }

    // Gerenciador de Rolagem Suave para links que começam com # 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault(); // Impede o pulo brusco
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset para não cobrir com o menu fixo
                    behavior: 'smooth' // Desliza suavemente 
                });
            }
        });
    });

    console.log("FUP Script: Efeitos visuais carregados com sucesso.");
});