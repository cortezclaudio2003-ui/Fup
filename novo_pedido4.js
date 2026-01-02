document.addEventListener('DOMContentLoaded', () => {

    // --- 1. RECUPERAR DADOS DA SESSÃO ---
    const dadosCarrinho = sessionStorage.getItem('carrinho_temp');
    const dadosCabecalho = sessionStorage.getItem('cabecalho_temp');
    
    let carrinho = [];
    let cabecalho = {};

    if (dadosCarrinho) carrinho = JSON.parse(dadosCarrinho);
    if (dadosCabecalho) cabecalho = JSON.parse(dadosCabecalho);

    // Se não houver itens (acesso direto ou erro), volta para o início
    if (carrinho.length === 0) {
        alert('Sessão expirada. Você será redirecionado para o catálogo.');
        window.location.href = 'novo_pedido.html';
        return;
    }

    // --- 2. RENDERIZAR INFORMAÇÕES GERAIS ---
    
    // Preenche campos de texto simples
    const elTitulo = document.getElementById('lblTitulo');
    const elCentroCusto = document.getElementById('lblCentroCusto');
    const elValorTotal = document.getElementById('lblValorTotal');

    if(elTitulo) elTitulo.innerText = cabecalho.titulo || '-';
    if(elCentroCusto) elCentroCusto.innerText = cabecalho.centroCusto || '-';

    // Calcular Total do Pedido
    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    if(elValorTotal) {
        elValorTotal.innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Mapeamento de siglas para os Cards de Endereço (Simulação Visual)
    const mapaLocais = {
        'CD-SP': 'CNP',
        'LOJA-RJ': 'LJR',
        'MATRIZ': 'MTZ',
        'VIVARA-MATRIZ': 'ALM',
        'VIVARA-FILIAL': 'FL1'
    };
    
    const elLocalEntrega = document.getElementById('lblLocalEntrega');
    const elLocalFat = document.getElementById('lblLocalFat');

    if(elLocalEntrega) {
        elLocalEntrega.innerText = mapaLocais[cabecalho.localEntrega] || cabecalho.localEntrega || 'LOC';
    }
    if(elLocalFat) {
        elLocalFat.innerText = mapaLocais[cabecalho.localFaturamento] || cabecalho.localFaturamento || 'FAT';
    }

    // --- 3. RENDERIZAR LISTAS DE ITENS ---
    const sidebarList = document.getElementById('listaItensSidebar');
    const mainList = document.getElementById('listaItensResumo');
    const countItens = document.getElementById('countItens');
    
    if(countItens) countItens.innerText = carrinho.length;
    if(sidebarList) sidebarList.innerHTML = '';
    if(mainList) mainList.innerHTML = '';

    carrinho.forEach((item, index) => {
        const totalItem = item.preco * item.quantidade;

        // A. Renderiza na Sidebar (Esquerda)
        if(sidebarList) {
            const sbHtml = `
                 <div style="padding: 10px; border-bottom: 1px solid #ddd; background: #fff; display:flex; gap:10px; align-items:center;">
                    <span style="background:#FFA000; color:white; padding:2px 5px; border-radius:3px; font-size:10px; font-weight:bold;">G</span>
                    <div style="font-size: 11px;">
                        <strong>${item.codigo}</strong> <br> ${item.descricao.substring(0,25)}...
                    </div>
                </div>
            `;
            sidebarList.insertAdjacentHTML('beforeend', sbHtml);
        }

        // B. Renderiza na Lista Principal (Resumo Tabela)
        if(mainList) {
            const mainHtml = `
                <div class="item-row-resumo">
                    <div style="width: 30px; text-align:center;">${index + 1}</div>
                    <div style="width: 120px;"><a href="#" class="code-link">${item.codigo}</a></div>
                    <div style="width: 150px;">${item.codigo}</div>
                    <div style="flex:1;">
                        <span style="background:#FFA000; color:white; padding:1px 4px; font-size:9px; border-radius:2px;">G</span>
                        <strong>${item.descricao}</strong>
                        <div style="font-size:11px; color:#777; margin-top:4px;">
                            Qtd: ${item.quantidade} | Aplicação: ${item.detalhesItem?.aplicacao || 'N/A'}
                        </div>
                    </div>
                    <div style="width: 100px; text-align:right; font-weight:600;">${totalItem.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                    <div style="width: 60px; text-align:right;">
                         <span class="material-icons" style="font-size:16px; cursor:pointer; color:#555;">content_copy</span>
                    </div>
                </div>
            `;
            mainList.insertAdjacentHTML('beforeend', mainHtml);
        }
    });

    // --- 4. AÇÃO FINALIZAR (CRIA O PEDIDO E REDIRECIONA) ---
    const btnFinalizar = document.getElementById('btnFinalizar');
    
    if(btnFinalizar) {
        btnFinalizar.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Gera um ID aleatório para simular o sistema (Ex: 69321337)
            const meId = Math.floor(69000000 + Math.random() * 100000); 
            
            // 2. Cria o objeto final do pedido
            const pedidoFinal = {
                id: meId,
                status: "Aguardando Aprovação", // Status inicial padrão
                dataCriacao: new Date().toLocaleString('pt-BR'), // Data/Hora atual
                cabecalho: cabecalho, // Trazido da session (pág 2)
                itens: carrinho,      // Trazido da session (pág 1 e 3)
                total: total
            };

            // 3. Salva no "Banco de Dados" do navegador (LocalStorage)
            let historico = JSON.parse(localStorage.getItem('vivara_pedidos')) || [];
            historico.unshift(pedidoFinal); // Adiciona no topo da lista
            localStorage.setItem('vivara_pedidos', JSON.stringify(historico));

            // 4. Limpa a sessão temporária (fluxo concluído)
            sessionStorage.removeItem('carrinho_temp');
            sessionStorage.removeItem('cabecalho_temp');

            // 5. Feedback visual e Redirecionamento
            btnFinalizar.innerHTML = 'Processando...';
            btnFinalizar.disabled = true;
            
            setTimeout(() => {
                // Vai para a página 5 passando o ID na URL
                window.location.href = `novo_pedido5.html?id=${meId}`;
            }, 800);
        });
    }

});