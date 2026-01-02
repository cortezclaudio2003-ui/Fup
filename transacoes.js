document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menu Lateral (Toggle)
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebarTransacoes');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('closed');
        });
    }

    // 2. Carregar dados da tabela (Novos Pedidos)
    const tabelaBody = document.querySelector('.table-container-erp tbody');
    if (tabelaBody) {
        carregarTabela(tabelaBody);
    }
});

function carregarTabela(tbody) {
    // Busca os pedidos salvos no navegador
    const pedidos = JSON.parse(localStorage.getItem('vivara_pedidos')) || [];

    // Cria uma linha para cada pedido salvo
    pedidos.forEach(pedido => {
        const novaLinha = `
            <tr style="background-color: #fcfcfc;">
                <td><input type="checkbox"></td>
                <td class="text-blue">${pedido.meId}</td>
                <td class="text-blue">${pedido.erpId || ''}</td>
                <td>${pedido.titulo}</td>
            </tr>
        `;
        
        // Adiciona a linha no COMEÇO da tabela (antes das estáticas)
        tbody.insertAdjacentHTML('afterbegin', novaLinha);
    });
}