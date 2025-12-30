/* Lógica Genérica para Páginas com Abas (Transações e Cadastros) */

function novaTransacao() {
    alert("Funcionalidade: Abrir modal de Nova Transação");
}

document.addEventListener('DOMContentLoaded', () => {
    
    // Identifica qual corpo de tabela existe na página atual
    const tableBody = document.querySelector('tbody'); 
    // ^ Isso pega o primeiro tbody (transactions-body ou cadastros-body)
    
    if (!tableBody) return; // Se não houver tabela, para.

    const tabs = document.querySelectorAll('.tab-btn');
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
                
                // Lógica de filtro: 'todas'/'todos' mostra tudo, senão compara categoria
                if (target === 'todas' || target === 'todos') {
                    row.style.display = 'table-row';
                } else if (target === category) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // Efeito visual ao clicar na linha
    rows.forEach(row => {
        row.addEventListener('click', () => {
            rows.forEach(r => r.style.backgroundColor = 'transparent');
            row.style.backgroundColor = '#f9fafb';
        });
    });
});