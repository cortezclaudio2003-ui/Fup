function logout() {
    window.location.href = "login.html";
}

document.addEventListener('DOMContentLoaded', () => {
    
    // Verifica se estamos na página que tem o sidebar (Transações.html)
    const sidebar = document.getElementById('sidebar');
    
    // Se não tiver sidebar, provavel que seja NovaRequisicao.html, então paramos aqui
    // para deixar o NovaRequisicao.js cuidar do resto.
    if (!sidebar) return; 

    console.log("Página de Transações carregada.");
    
    // --- SELETORES DA PÁGINA DE TRANSAÇÕES ---
    const btnNewOrder = document.querySelector('.btn-new-order');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const searchInput = document.getElementById('menuSearch');
    const menuItems = document.querySelectorAll('.sidebar-menu li');

    // --- 1. BOTÃO NOVA REQUISIÇÃO ---
    if (btnNewOrder) {
        btnNewOrder.addEventListener('click', () => {
            console.log("Indo para Nova Requisição...");
            window.location.href = "NovaRequisicao.html";
        });
    }

    // --- 2. TOGGLE MENU LATERAL ---
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('closed');
        });
    }

    // --- 3. BUSCA NO MENU ---
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();

            menuItems.forEach(item => {
                const linkText = item.textContent.toLowerCase();
                if (linkText.includes(term)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});