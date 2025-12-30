function novaTransacao() {
    alert("Funcionalidade: Abrir modal de Nova Transação");
}

document.addEventListener('DOMContentLoaded', () => {
    
    const tableBody = document.getElementById('transactions-body'); 
    if (!tableBody) return;

    const tabs = document.querySelectorAll('.sub-pill');
    const rows = tableBody.querySelectorAll('tr');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. Atualiza classe active nos botões
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 2. Filtra as linhas da tabela
            const target = tab.getAttribute('data-target');

            rows.forEach(row => {
                const category = row.getAttribute('data-category');
                
                if (target === 'todas') {
                    row.style.display = 'table-row';
                } else if (target === category) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });
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