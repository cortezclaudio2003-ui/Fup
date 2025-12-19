function logout() {
    window.location.href = "login.html";
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Página de Pedido de Gases carregada.");
    
    // --- SELETORES ---
    const btnNewOrder = document.querySelector('.btn-new-order');
    const sidebarToggle = document.querySelector('.sidebar-toggle');

    // --- 1. BOTÃO NOVO PEDIDO ---
    if (btnNewOrder) {
        btnNewOrder.addEventListener('click', () => {
            console.log("Botão Novo Pedido clicado.");
            alert("Abrir formulário de Novo Pedido...");
        });
    }

    // --- 2. TOGGLE ---
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            console.log("Toggle clicado.");
        });
    }
});