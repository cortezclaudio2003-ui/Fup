document.addEventListener('DOMContentLoaded', () => {
    
    // Botão Avançar
    const btnAvancar = document.getElementById('btnAvancar');

    if (btnAvancar) {
        btnAvancar.addEventListener('click', () => {
            
            // Simulação de dados coletados do carrinho
            const valorTotal = "235,00";
            const itemPrincipal = "SACO ZIP TRANSP 12X17CM c/100";
            
            // Gerar ID aleatório
            const meId = Math.floor(10000000 + Math.random() * 90000000);
            
            // Gerar ID ERP fictício
            const erpExemplo = "46000" + Math.floor(Math.random() * 9999);

            // Criar objeto do pedido
            const novoPedido = {
                meId: meId,
                erpId: erpExemplo,
                titulo: `Pedido via Catálogo - ${itemPrincipal} (Total: R$ ${valorTotal})`
            };

            // Salvar no LocalStorage
            let pedidos = JSON.parse(localStorage.getItem('vivara_pedidos')) || [];
            pedidos.unshift(novoPedido);
            localStorage.setItem('vivara_pedidos', JSON.stringify(pedidos));

            // Redirecionar
            window.location.href = 'transacoes.html';
        });
    }
});