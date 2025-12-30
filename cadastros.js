document.addEventListener('DOMContentLoaded', () => {
    
    const tabs = document.querySelectorAll('.sub-pill');
    const tableRows = document.querySelectorAll('#cadastros-body tr');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. Visual
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 2. Filtro
            const target = tab.getAttribute('data-target');
            
            tableRows.forEach(row => {
                const categoriaRow = row.getAttribute('data-category');

                if (target === 'todos') {
                    row.style.display = 'table-row';
                } else if (target === categoriaRow) {
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