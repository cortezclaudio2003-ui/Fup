document.addEventListener('DOMContentLoaded', () => {
    
    // Lógica de Sub-Abas (Pills)
    const tabs = document.querySelectorAll('.sub-pill');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Aqui entraria a lógica de filtro dos cards se necessário
            console.log(`Filtrando grid por: ${tab.innerText}`);
        });
    });

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if(confirm("Deseja sair?")) window.location.href = 'index.html';
        });
    }
});