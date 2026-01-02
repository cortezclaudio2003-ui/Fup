document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Recuperar itens salvos na Etapa 1
    const dadosSessao = sessionStorage.getItem('carrinho_temp');
    let carrinho = [];

    // Debug: Verifica no console se os dados chegaram
    console.log("Dados recuperados da sessão:", dadosSessao);

    if (dadosSessao) {
        carrinho = JSON.parse(dadosSessao);
        // Se a lista não estiver vazia, renderiza
        if (carrinho.length > 0) {
            renderizarSidebar(carrinho);
        } else {
            tratarCarrinhoVazio();
        }
    } else {
        tratarCarrinhoVazio();
    }

    function tratarCarrinhoVazio() {
        alert('Nenhum item encontrado no carrinho. Você será redirecionado para o catálogo.');
        window.location.href = 'novo_pedido.html';
    }

    // 2. Renderizar a Sidebar (Esquerda)
    function renderizarSidebar(itens) {
        // IMPORTANTE: O ID abaixo deve existir no seu novo_pedido2.html
        const container = document.getElementById('listaItensSidebar');
        
        if (!container) {
            console.error('ERRO: Não encontrei o elemento <div id="listaItensSidebar"> no HTML.');
            return;
        }

        container.innerHTML = ''; // Limpa antes de adicionar

        itens.forEach(item => {
            const html = `
                <div class="item-mini-card" style="padding: 10px; border-bottom: 1px solid #eee; display: flex; gap: 10px; align-items: center; background: white; margin-bottom: 5px; border-radius: 4px;">
                    <div class="badge-g" style="background:#FFA000; color:white; padding:2px 6px; border-radius:3px; font-weight:bold; font-size:10px;">G</div>
                    <div class="item-info" style="display: flex; flex-direction: column;">
                        <span class="item-code" style="font-weight:700; font-size:11px; color:#444;">${item.codigo}</span>
                        <span class="item-desc" style="font-size:11px; color:#666; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px;">${item.descricao}</span>
                        <span style="font-size: 10px; color: #999;">Qtd: ${item.quantidade} | ${item.un}</span>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
        });

        // Preenche o título automaticamente com o nome do primeiro item (Sugestão)
        const inputTitulo = document.getElementById('inputTitulo');
        if(inputTitulo) {
            inputTitulo.value = `Pedido: ${itens[0].descricao} ...`;
        }
    }

    // 3. Botão Avançar -> Salva Cabeçalho e vai para novo_pedido3
    const btnAvancar = document.getElementById('btnAvancarEtapa2'); // Verifique se o ID no HTML é este
    
    if(btnAvancar) {
        btnAvancar.addEventListener('click', (e) => {
            e.preventDefault();

            const titulo = document.getElementById('inputTitulo').value;
            const localEntrega = document.getElementById('selectEntrega').value;
            const cc = document.getElementById('inputCC').value;
            const localFat = document.getElementById('selectFaturamento').value;
            const comentarios = document.getElementById('inputComentarios').value; // Opcional

            // Validação simples
            if(!titulo || !localEntrega || !localFat || !cc) {
                alert('Preencha os campos obrigatórios (borda vermelha).');
                return;
            }

            const cabecalhoPedido = {
                titulo: titulo,
                centroCusto: cc,
                localEntrega: localEntrega,
                localFaturamento: localFat,
                comentarios: comentarios
            };

            sessionStorage.setItem('cabecalho_temp', JSON.stringify(cabecalhoPedido));
            
            // Redireciona
            window.location.href = 'novo_pedido3.html';
        });
    }
});