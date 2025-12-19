function logout() {
    // Redireciona para o login
    window.location.href = "login.html";
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Página de Pedido de Gases carregada.");
    
    // --- SELETORES ---
    const btnNewOrder = document.querySelector('.btn-new-order');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const searchInput = document.querySelector('.sidebar-search-input');
    const sidebar = document.querySelector('.sidebar-menu');

    // --- 1. BOTÃO NOVO PEDIDO ---
    if (btnNewOrder) {
        btnNewOrder.addEventListener('click', () => {
            console.log("Botão Novo Pedido clicado.");
            // Futura lógica: abrir modal ou exibir formulário
            alert("Abrir formulário de Novo Pedido...");
        });
    }

    // --- 2. MENU TOGGLE (Expandir/Recolher) ---
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            // Nota: Adicione regras CSS para .collapsed se quiser animação visual
            console.log("Estado do menu lateral alterado.");
        });
    }

    // --- 3. BUSCA LATERAL ---
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase();
            console.log("Buscando:", termo);
            // Futura lógica: filtrar itens da lista .sidebar-list-content
        });
    }
});