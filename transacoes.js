/* Lógica Específica de Transações */

function novaTransacao() {
    // Aqui você conectaria com seu backend ou abriria um modal
    alert("Funcionalidade: Abrir modal de Nova Transação");
}

document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('tbody tr');
    
    // Efeito visual ao clicar na linha
    rows.forEach(row => {
        row.addEventListener('click', () => {
            rows.forEach(r => r.style.background = 'transparent');
            row.style.background = 'var(--bg-body)';
        });
    });
});