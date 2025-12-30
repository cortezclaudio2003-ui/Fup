document.addEventListener('DOMContentLoaded', () => {
    
    const tabs = document.querySelectorAll('.sub-pill');
    const tableRows = document.querySelectorAll('#fiscais-body tr');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. Atualiza visual (remove active)
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 2. Filtra as linhas
            const target = tab.getAttribute('data-target');

            // Simples efeito de fade
            const tbody = document.getElementById('fiscais-body');
            tbody.style.opacity = '0.5';

            setTimeout(() => {
                tableRows.forEach(row => {
                    const category = row.getAttribute('data-category');
                    if (target === category) {
                        row.style.display = 'table-row';
                    } else {
                        row.style.display = 'none';
                    }
                });
                tbody.style.opacity = '1';
            }, 150);
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