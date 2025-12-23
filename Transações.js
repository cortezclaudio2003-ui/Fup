function logout() {
    window.location.href = "login.html";
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Página de Pedido de Gases carregada.");
    
    // --- SELETORES ---
    const btnNewOrder = document.querySelector('.btn-new-order');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const searchInput = document.getElementById('menuSearch');
    const menuItems = document.querySelectorAll('.sidebar-menu li');

    // --- 1. BOTÃO NOVO PEDIDO ---
    // Atualizado para redirecionar para a página de Nova Requisição
    if (btnNewOrder) {
        btnNewOrder.addEventListener('click', () => {
            console.log("Botão Novo Pedido clicado.");
            window.location.href = "NovaRequisicao.html";
        });
    }

    // --- 2. TOGGLE MENU LATERAL (OCULTAR / MOSTRAR) ---
    // Ao clicar no ícone de 3 barras, adiciona/remove a classe 'closed'
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('closed');
            console.log("Menu lateral alternado. Estado fechado: ", sidebar.classList.contains('closed'));
        });
    }

    // --- 3. BUSCA NO MENU ---
    // Filtra os itens da lista conforme o usuário digita
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();

            menuItems.forEach(item => {
                const linkText = item.textContent.toLowerCase();
                
                // Se o texto do item conter o que foi digitado, mostra; senão, esconde.
                if (linkText.includes(term)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});