document.addEventListener('DOMContentLoaded', () => {

    // 1. Recuperar dados
    const dadosCarrinho = sessionStorage.getItem('carrinho_temp');
    const dadosCabecalho = sessionStorage.getItem('cabecalho_temp');
    
    let carrinho = [];

    if (dadosCarrinho) carrinho = JSON.parse(dadosCarrinho);

    if (carrinho.length === 0) {
        alert('Sessão expirada. Reinicie o processo.');
        window.location.href = 'novo_pedido.html';
        return;
    }

    // 2. Renderização (Mantida a lógica visual anterior)
    const sidebarList = document.getElementById('sidebarList');
    const itemsContainer = document.getElementById('itemsDetailContainer');
    const btnConcluir = document.getElementById('btnConcluir');

    renderizarPagina();

    function renderizarPagina() {
        if(sidebarList) sidebarList.innerHTML = '';
        if(itemsContainer) itemsContainer.innerHTML = '';

        carrinho.forEach((item, index) => {
            const valorTotal = item.preco * item.quantidade;

            // Sidebar
            if(sidebarList) {
                const sbHtml = `
                    <div class="sidebar-item-row" style="padding: 10px; border-bottom: 1px solid #ddd; background: #fff;">
                        <span style="background:#FFA000; color:white; padding:2px 5px; border-radius:3px; font-size:10px; font-weight:bold;">G</span>
                        <div style="font-size: 11px; margin-top:4px;">
                            <strong>${item.codigo}</strong> <br> ${item.descricao}
                        </div>
                    </div>
                `;
                sidebarList.insertAdjacentHTML('beforeend', sbHtml);
            }

            // Detalhes (Inputs)
            if(itemsContainer) {
                const detailHtml = `
                    <div class="item-detail-card" data-index="${index}" style="background: #fff; border: 1px solid #e0e0e0; margin-bottom: 20px; border-radius: 4px;">
                        <div class="card-summary-row" style="padding: 15px; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 15px; font-size: 12px;">
                            <div style="font-weight:bold; color:#E67E22;">${index + 1}</div>
                            <div style="width: 100px; font-weight:600; color:#E67E22;">${item.codigo}</div>
                            <div style="flex:1;">
                                <span style="background:#FFA000; color:white; padding:1px 4px; font-size:9px; border-radius:2px;">G</span>
                                <strong>${item.descricao}</strong>
                            </div>
                            <div style="font-weight:bold;">${formatarMoeda(valorTotal)}</div>
                        </div>

                        <div class="card-inputs-grid" style="padding: 20px; background: #FAFAFA; display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 20px;">
                            
                            <div>
                                <label style="display:block; font-size:11px; color:#666; margin-bottom:4px;">Grupo / Catálogo</label>
                                <div style="font-size:12px; font-weight:600;">${item.grupo}</div>
                                
                                <label style="display:block; font-size:11px; color:#666; margin-top:15px; margin-bottom:4px;">Cat. Class. Contábil</label>
                                <select class="input-me input-classificacao" style="width:100%; padding:6px; border:1px solid #ccc; border-left: 3px solid #ff4d4d; border-radius:4px;">
                                    <option value="Material de Consumo">Material de Consumo</option>
                                    <option value="Ativo Imobilizado">Ativo Imobilizado</option>
                                </select>
                            </div>

                            <div>
                                <label style="display:block; font-size:11px; color:#666; margin-bottom:4px;">Código Produto ERP</label>
                                <div style="font-size:12px; font-weight:600;">${item.codigo}</div>

                                <label style="display:block; font-size:11px; color:#666; margin-top:15px; margin-bottom:4px;">Orçado</label>
                                <select class="input-me input-orcado" style="width:100%; padding:6px; border:1px solid #ccc; border-left: 3px solid #ff4d4d; border-radius:4px;">
                                    <option value="S">Sim</option>
                                    <option value="N">Não</option>
                                </select>
                            </div>

                             <div>
                                <label style="display:block; font-size:11px; color:#666; margin-bottom:4px;">Aplicação</label>
                                <select class="input-me input-aplicacao" style="width:100%; padding:6px; border:1px solid #ccc; border-left: 3px solid #ff4d4d; border-radius:4px;">
                                    <option value="Industrialização">Industrialização</option>
                                    <option value="Uso e Consumo">Uso e Consumo</option>
                                </select>

                                <label style="display:block; font-size:11px; color:#666; margin-top:15px; margin-bottom:4px;">Tipo De Compra</label>
                                <select class="input-me input-tipo" style="width:100%; padding:6px; border:1px solid #ccc; border-radius:4px;">
                                    <option value="Normal">Normal</option>
                                    <option value="Urgente">Urgente</option>
                                </select>
                            </div>

                             <div>
                                <label style="display:block; font-size:11px; color:#666; margin-bottom:4px;">Quantidade</label>
                                <input type="number" class="input-me input-qtd" value="${item.quantidade}" style="width:100%; padding:6px; border:1px solid #ccc; border-left: 3px solid #ff4d4d; border-radius:4px;">

                                <label style="display:block; font-size:11px; color:#666; margin-top:15px; margin-bottom:4px;">Data Estimada</label>
                                <input type="date" class="input-me input-data" style="width:100%; padding:6px; border:1px solid #ccc; border-left: 3px solid #ff4d4d; border-radius:4px;">
                            </div>

                        </div>
                    </div>
                `;
                itemsContainer.insertAdjacentHTML('beforeend', detailHtml);
            }
        });
    }

    // 3. Ação: AVANÇAR PARA PÁGINA 4
    if(btnConcluir) {
        btnConcluir.addEventListener('click', () => {
            
            // Atualizar o objeto carrinho com os dados digitados nos inputs
            const cards = document.querySelectorAll('.item-detail-card');
            let erro = false;

            cards.forEach((card, index) => {
                const qtd = card.querySelector('.input-qtd').value;
                const data = card.querySelector('.input-data').value;
                const classificacao = card.querySelector('.input-classificacao').value;
                const aplicacao = card.querySelector('.input-aplicacao').value;
                const orcado = card.querySelector('.input-orcado').value;
                
                // Validação visual
                if(!qtd || !data) erro = true;

                // Atualiza o array principal
                carrinho[index].quantidade = parseInt(qtd);
                carrinho[index].detalhesItem = {
                    dataEntrega: data,
                    classificacao: classificacao,
                    aplicacao: aplicacao,
                    orcado: orcado
                };
            });

            if (erro) {
                alert('Preencha as quantidades e datas obrigatórias.');
                return;
            }

            // Salva o carrinho atualizado na sessão
            sessionStorage.setItem('carrinho_temp', JSON.stringify(carrinho));

            // Redireciona para Verificação
            btnConcluir.innerText = 'Processando...';
            window.location.href = 'novo_pedido4.html';
        });
    }

    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
});