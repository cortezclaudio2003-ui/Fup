document.addEventListener('DOMContentLoaded', () => {
    // Toggle do Menu Lateral Estilo ERP
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebarTransacoes');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita comportamento padrão de link
            sidebar.classList.toggle('closed');
        });
    }

    // Interação simples nas linhas da tabela (Highlight)
    const linhas = document.querySelectorAll('tbody tr');
    linhas.forEach(linha => {
        const checkbox = linha.querySelector('input[type="checkbox"]');
        if(checkbox) {
            checkbox.addEventListener('change', () => {
                if(checkbox.checked) {
                    linha.style.backgroundColor = '#F2F7FF'; // Azul bem clarinho ao selecionar
                } else {
                    linha.style.backgroundColor = '';
                }
            });
        }
    });
});