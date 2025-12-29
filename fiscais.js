function switchTab(tabName) {
    // 1. Atualiza visual das abas
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    
    // Adiciona active no botão clicado
    event.target.classList.add('active');

    // 2. Simulação visual de carregamento
    const contentArea = document.querySelector('tbody');
    contentArea.style.opacity = '0.5';
    
    setTimeout(() => {
        console.log(`Carregando dados da aba: ${tabName}`);
        contentArea.style.opacity = '1';
    }, 200);
}