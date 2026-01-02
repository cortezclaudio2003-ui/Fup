document.addEventListener('DOMContentLoaded', () => {
    
    // --- ESTADO DO CARRINHO ---
    let carrinho = [];

    // --- ELEMENTOS DO DOM ---
    const btnAvancar = document.getElementById('btnAvancar');
    const containerCarrinho = document.querySelector('.cart-items-container');
    const displayTotal = document.querySelector('.total-value');
    const btnLimpar = document.getElementById('btnLimparCarrinho');
    const btnsAdicionar = document.querySelectorAll('.btn-add-cart');

    // --- FUNÇÕES ---

    // 1. Atualizar HTML do Carrinho
    function atualizarCarrinho() {
        containerCarrinho.innerHTML = ''; 
        let totalGeral = 0;

        if (carrinho.length === 0) {
            containerCarrinho.innerHTML = `
                <div class="empty-cart-state">
                    <span class="material-icons-outlined">remove_shopping_cart</span>
                    <p>Seu carrinho está vazio</p>
                </div>`;
            displayTotal.innerText = 'R$ 0,00';
            return;
        }

        carrinho.forEach((item, index) => {
            const subtotal = item.preco * item.quantidade;
            totalGeral += subtotal;

            const itemHTML = `
                <div class="item-card" data-index="${index}">
                    <div class="item-card-header">
                        <span class="material-icons-outlined remove-btn" title="Remover item">remove_circle_outline</span>
                        
                        <div class="item-meta">
                            <div class="meta-line">GRUPO: <strong>${item.grupo}</strong></div>
                            <div class="meta-line">SUB-TOTAL: <strong>${formatarMoeda(subtotal)}</strong></div>
                        </div>
                    </div>
                    
                    <div class="item-title">
                        ${item.descricao} (${item.codigo})
                    </div>

                    <div class="item-actions">
                        <div class="stepper-group">
                            <button class="btn-menos">-</button>
                            <input type="number" class="input-qty" value="${item.quantidade}" min="1">
                            <button class="btn-mais">+</button>
                        </div>
                        <div class="unit-info">
                            ${item.un}. <strong>${formatarMoeda(item.preco)}</strong>
                            <span class="badge-gold">G</span>
                        </div>
                    </div>
                </div>
            `;
            containerCarrinho.insertAdjacentHTML('beforeend', itemHTML);
        });

        displayTotal.innerText = formatarMoeda(totalGeral);
        conectarEventosCarrinho();
    }

    // 2. Conectar eventos internos do carrinho (remover, alterar qtd)
    function conectarEventosCarrinho() {
        const cartItems = containerCarrinho.querySelectorAll('.item-card');

        cartItems.forEach(card => {
            const index = parseInt(card.dataset.index);

            // AÇÃO: Remover Item
            card.querySelector('.remove-btn').addEventListener('click', () => {
                removerItem(index);
            });

            // AÇÃO: Aumentar Quantidade (+)
            card.querySelector('.btn-mais').addEventListener('click', () => {
                carrinho[index].quantidade++;
                atualizarCarrinho();
            });

            // AÇÃO: Diminuir Quantidade (-)
            card.querySelector('.btn-menos').addEventListener('click', () => {
                if (carrinho[index].quantidade > 1) {
                    carrinho[index].quantidade--;
                    atualizarCarrinho();
                }
            });

            // AÇÃO: Digitação Manual no Input
            const inputQty = card.querySelector('.input-qty');
            inputQty.addEventListener('change', (e) => {
                let novaQtd = parseInt(e.target.value);
                
                // Validação simples (mínimo 1)
                if (isNaN(novaQtd) || novaQtd < 1) {
                    novaQtd = 1;
                }
                
                carrinho[index].quantidade = novaQtd;
                atualizarCarrinho();
            });
        });
    }

    // 3. Adicionar item (REGRA: Item Único)
    function adicionarAoCarrinho(produto) {
        // Verifica se já existe
        const existente = carrinho.find(item => item.codigo === produto.codigo);
        
        if (existente) {
            alert('Este item já está no carrinho. Você pode alterar a quantidade diretamente no painel do carrinho.');
            return; 
        } else {
            // Adiciona novo item com quantidade 1
            carrinho.unshift(produto); 
        }
        atualizarCarrinho();
    }

    // 4. Remover item
    function removerItem(index) {
        carrinho.splice(index, 1);
        atualizarCarrinho();
    }

    // 5. Limpar tudo
    function limparCarrinho() {
        if (carrinho.length > 0) {
            if(confirm('Deseja remover todos os itens do carrinho?')) {
                carrinho = [];
                atualizarCarrinho();
            }
        }
    }

    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // --- LISTENERS GERAIS ---

    // Botões "Carrinho" da tabela de produtos
    btnsAdicionar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            
            const produto = {
                codigo: row.dataset.codigo,
                descricao: row.dataset.descricao,
                grupo: row.dataset.grupo,
                un: row.dataset.un,
                preco: parseFloat(row.dataset.preco),
                quantidade: 1
            };
            
            adicionarAoCarrinho(produto);
        });
    });

    // Botão Limpar Carrinho
    if (btnLimpar) {
        btnLimpar.addEventListener('click', (e) => {
            e.preventDefault();
            limparCarrinho();
        });
    }

    // Botão Avançar (MODIFICADO)
    if (btnAvancar) {
        btnAvancar.addEventListener('click', () => {
            if (carrinho.length === 0) {
                alert('Adicione itens ao carrinho para avançar.');
                return;
            }

            // --- LÓGICA DE CONTINUAÇÃO ---
            // 1. Salva o carrinho na sessão temporária
            sessionStorage.setItem('carrinho_temp', JSON.stringify(carrinho));

            // 2. Muda o texto do botão para feedback visual
            const originalText = btnAvancar.innerHTML;
            btnAvancar.innerHTML = 'Processando...';

            // 3. Redireciona para a página de detalhes (novo_pedido2.html)
            setTimeout(() => {
                window.location.href = 'novo_pedido2.html';
            }, 300);
        });
    }
});