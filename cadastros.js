document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE FILTRAGEM ---
    // Seleciona APENAS os buttons, ignorando o link <a>
    const tabs = document.querySelectorAll('button.tab-btn');
    const tableRows = document.querySelectorAll('#tabela-cadastros tr');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. Atualiza visual (remove active de todos os botões)
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 2. Filtra
            const target = tab.getAttribute('data-target');
            
            tableRows.forEach(row => {
                const categoriaRow = row.getAttribute('data-categoria');

                if (target === 'todas') {
                    row.style.display = 'table-row';
                } else if (target === categoriaRow) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // Filtro de Período
    const filtroPeriodo = document.getElementById('filtro-periodo');
    if(filtroPeriodo) {
        filtroPeriodo.addEventListener('change', (e) => {
            console.log(`Filtro: ${e.target.value}`);
        });
    }
});