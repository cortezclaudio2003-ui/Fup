document.addEventListener('DOMContentLoaded', () => {
    
    // --- ESTADO ---
    let carrinho = [];
    const itemsPerPage = 15; 
    let currentPage = 1;
    let filteredData = []; 
    
    // --- CONTEXTO ---
    const cabecalhoSalvo = JSON.parse(sessionStorage.getItem('cabecalho_temp'));
    if(cabecalhoSalvo) {
        if(cabecalhoSalvo.empresa) document.getElementById('displayEmpresa').innerText = cabecalhoSalvo.empresa;
        if(cabecalhoSalvo.categoria) document.getElementById('displayCategoria').innerText = cabecalhoSalvo.categoria;
        if(cabecalhoSalvo.org) document.getElementById('displayOrg').innerText = cabecalhoSalvo.org;
        if(cabecalhoSalvo.centro) document.getElementById('displayCentro').innerText = cabecalhoSalvo.centro;
        
        document.getElementById('confCentro').value = cabecalhoSalvo.centro || "FAB1 - FABRICA MANAUS";
        document.getElementById('confEmpresa').value = cabecalhoSalvo.empresa || "3000 - CONIPA";
        document.getElementById('confOrg').value = cabecalhoSalvo.org || "OCCO - CONIPA";
        document.getElementById('confCategoria').value = cabecalhoSalvo.categoria || "CCI CONIPA";
    }

    // --- MOCK DE DADOS ---
    const dbProdutos = [];
    const grupos = ["ESCRITÓRIO", "ALMOXARIFADO", "EMBALAGEM", "COPA", "LIMPEZA", "INFORMATICA"];
    const unidades = ["UN", "PCT", "CX", "RL"];

    for (let i = 1; i <= 55; i++) {
        dbProdutos.push({
            codigo: `INS${1000 + i}`,
            descricao: `PRODUTO TESTE DESCRIÇÃO ${i} - EXEMPLO DE ITEM`,
            grupo: grupos[i % 6],
            un: unidades[i % 4],
            preco: (Math.random() * 50 + 1).toFixed(2)
        });
    }
    dbProdutos.unshift(
        { codigo: "INS150124", descricao: "SACO ZIP TRANSP 12X17CM c/100", grupo: "ALMOXARIFADO", un: "PCT", preco: 8.75 },
        { codigo: "INS99999", descricao: "CANETA ESFEROGRÁFICA AZUL", grupo: "ESCRITÓRIO", un: "UN", preco: 1.50 }
    );

    // --- ELEMENTOS ---
    const btnAvancar = document.getElementById('btnAvancar');
    const containerCarrinho = document.getElementById('cartContainer'); 
    const displayTotal = document.querySelector('.total-value');
    const btnLimpar = document.getElementById('btnLimparCarrinho');
    
    const btnToggleCart = document.getElementById('btnToggleCart');
    const searchInput = document.getElementById('searchInput');
    const btnPesquisar = document.getElementById('btnPesquisar');
    const tbody = document.getElementById('tabelaProdutos');
    const infoResultados = document.getElementById('infoResultados');

    // Paginação
    const btnPrevPage = document.getElementById('btnPrevPage');
    const btnNextPage = document.getElementById('btnNextPage');
    const pageNumbersContainer = document.getElementById('pageNumbers');

    // Modal
    const btnAlterarContexto = document.getElementById('btnAlterarContexto');
    const modalConfig = document.getElementById('modalConfig');
    const btnSalvarConfig = document.getElementById('btnSalvarConfig');
    const btnFecharConfig = document.getElementById('btnFecharConfig');
    const btnVoltarMercado = document.getElementById('btnVoltarMercado');
    const btnCloseConfigTop = document.getElementById('btnCloseConfigTop');
    
    const displayCategoria = document.getElementById('displayCategoria');
    const displayEmpresa = document.getElementById('displayEmpresa');
    const displayOrg = document.getElementById('displayOrg');
    const displayCentro = document.getElementById('displayCentro');

    const confCategoria = document.getElementById('confCategoria');
    const confEmpresa = document.getElementById('confEmpresa');
    const confOrg = document.getElementById('confOrg');
    const confCentro = document.getElementById('confCentro');

    // Inicializa
    mostrarEstadoInicial();

    // --- BUSCA ---
    function realizarBusca() {
        const termo = searchInput.value.trim().toLowerCase();
        
        if (termo === "") {
            mostrarEstadoInicial();
            filteredData = [];
            return;
        }

        filteredData = dbProdutos.filter(p => 
            p.codigo.toLowerCase().includes(termo) || 
            p.descricao.toLowerCase().includes(termo)
        );

        currentPage = 1;
        renderPage();
    }

    function mostrarEstadoInicial() {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="state-message">
                    <span class="material-icons-outlined" style="font-size: 32px; color: #DDD; margin-bottom: 5px;">search</span>
                    <p>Digite o código ou descrição para pesquisar...</p>
                </td>
            </tr>
        `;
        infoResultados.innerText = "Aguardando pesquisa...";
        pageNumbersContainer.innerHTML = "";
        btnPrevPage.disabled = true;
        btnNextPage.disabled = true;
    }

    // --- RENDERIZAÇÃO ---
    function renderPage() {
        tbody.innerHTML = '';

        const totalItems = filteredData.length;

        if (totalItems === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="state-message">
                        <p style="color: #E67E22;">Nenhum produto encontrado.</p>
                    </td>
                </tr>
            `;
            infoResultados.innerText = "0 itens encontrados";
            pageNumbersContainer.innerHTML = "";
            btnPrevPage.disabled = true;
            btnNextPage.disabled = true;
            return;
        }

        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
        const itensPagina = filteredData.slice(startIndex, endIndex);

        infoResultados.innerText = `${totalItems} itens encontrados`;
        
        // Controles Numéricos
        renderPaginationControls(totalPages);

        // Linhas
        itensPagina.forEach(prod => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${prod.codigo}</strong></td>
                <td><a class="link-prod">${prod.descricao}</a></td>
                <td>${prod.grupo}</td>
                <td>${prod.un}</td>
                <td>R$ ${parseFloat(prod.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td class="text-center">
                    <button type="button" class="btn-add-cart" title="Adicionar ao carrinho">
                        <span class="material-icons-outlined">add_shopping_cart</span>
                    </button>
                </td>
            `;

            const btnAdd = tr.querySelector('.btn-add-cart');
            btnAdd.addEventListener('click', () => {
                adicionarAoCarrinho({ ...prod, quantidade: 1 });
            });

            tbody.appendChild(tr);
        });
    }

    function renderPaginationControls(totalPages) {
        pageNumbersContainer.innerHTML = "";
        
        btnPrevPage.disabled = (currentPage === 1);
        btnNextPage.disabled = (currentPage === totalPages);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            btn.innerText = i;
            btn.addEventListener('click', () => {
                currentPage = i;
                renderPage();
            });
            pageNumbersContainer.appendChild(btn);
        }
    }

    btnPrevPage.addEventListener('click', () => {
        if (currentPage > 1) { currentPage--; renderPage(); }
    });

    btnNextPage.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        if (currentPage < totalPages) { currentPage++; renderPage(); }
    });

    searchInput.addEventListener('input', realizarBusca);
    btnPesquisar.addEventListener('click', realizarBusca);

    // --- MODAL ---
    function openModal() {
        modalConfig.style.display = 'flex';
        confCategoria.value = displayCategoria.innerText;
        confEmpresa.value = displayEmpresa.innerText;
        confOrg.value = displayOrg.innerText;
        confCentro.value = displayCentro.innerText;
    }

    function closeModal() { modalConfig.style.display = 'none'; }

    function saveConfig() {
        displayCategoria.innerText = confCategoria.value.toUpperCase();
        displayEmpresa.innerText = confEmpresa.value.toUpperCase();
        displayOrg.innerText = confOrg.value.toUpperCase();
        displayCentro.innerText = confCentro.value.toUpperCase();
        
        const cabecalho = JSON.parse(sessionStorage.getItem('cabecalho_temp')) || {};
        cabecalho.categoria = confCategoria.value.toUpperCase();
        cabecalho.empresa = confEmpresa.value.toUpperCase();
        cabecalho.org = confOrg.value.toUpperCase();
        cabecalho.centro = confCentro.value.toUpperCase();
        
        sessionStorage.setItem('cabecalho_temp', JSON.stringify(cabecalho));
        closeModal();
    }

    btnAlterarContexto.addEventListener('click', openModal);
    btnSalvarConfig.addEventListener('click', saveConfig);
    btnFecharConfig.addEventListener('click', closeModal);
    btnVoltarMercado.addEventListener('click', closeModal);
    btnCloseConfigTop.addEventListener('click', closeModal);

    // --- CARRINHO ---
    btnToggleCart.addEventListener('click', () => {
        const icon = btnToggleCart.querySelector('.material-icons');
        if (containerCarrinho.classList.contains('hidden')) {
            containerCarrinho.classList.remove('hidden'); icon.innerText = 'expand_less';
        } else {
            containerCarrinho.classList.add('hidden'); icon.innerText = 'expand_more';
        }
    });

    function abrirCarrinhoSeFechado() {
        if (containerCarrinho.classList.contains('hidden')) {
            containerCarrinho.classList.remove('hidden');
            btnToggleCart.querySelector('.material-icons').innerText = 'expand_less';
        }
    }

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
                            <div class="meta-line">SUB: <strong>${formatarMoeda(subtotal)}</strong></div>
                        </div>
                    </div>
                    <div class="item-title">${item.descricao} (${item.codigo})</div>
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

    function conectarEventosCarrinho() {
        const cartItems = containerCarrinho.querySelectorAll('.item-card');
        cartItems.forEach(card => {
            const index = parseInt(card.dataset.index);
            card.querySelector('.remove-btn').addEventListener('click', () => removerItem(index));
            card.querySelector('.btn-mais').addEventListener('click', () => {
                carrinho[index].quantidade++;
                atualizarCarrinho();
            });
            card.querySelector('.btn-menos').addEventListener('click', () => {
                if (carrinho[index].quantidade > 1) {
                    carrinho[index].quantidade--;
                    atualizarCarrinho();
                }
            });
            const input = card.querySelector('.input-qty');
            input.addEventListener('change', (e) => {
                let qtd = parseInt(e.target.value);
                if(isNaN(qtd) || qtd < 1) qtd = 1;
                carrinho[index].quantidade = qtd;
                atualizarCarrinho();
            });
        });
    }

    function adicionarAoCarrinho(produto) {
        const existente = carrinho.find(item => item.codigo === produto.codigo);
        if (existente) {
            alert('Item já está no carrinho. Ajuste a quantidade no painel lateral.');
        } else {
            carrinho.unshift(produto);
            atualizarCarrinho();
            abrirCarrinhoSeFechado();
        }
    }

    function removerItem(index) {
        carrinho.splice(index, 1);
        atualizarCarrinho();
    }

    function limparCarrinho() {
        if (carrinho.length > 0 && confirm('Remover todos os itens do carrinho?')) {
            carrinho = [];
            atualizarCarrinho();
        }
    }

    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    if (btnLimpar) {
        btnLimpar.addEventListener('click', (e) => { e.preventDefault(); limparCarrinho(); });
    }

    if (btnAvancar) {
        btnAvancar.addEventListener('click', () => {
            if (carrinho.length === 0) {
                alert('Adicione itens ao carrinho para avançar.');
                return;
            }
            
            sessionStorage.setItem('carrinho_temp', JSON.stringify(carrinho));
            const cabecalho = {
                categoria: displayCategoria.innerText,
                empresa: displayEmpresa.innerText,
                org: displayOrg.innerText,
                centro: displayCentro.innerText
            };
            const antigo = JSON.parse(sessionStorage.getItem('cabecalho_temp')) || {};
            const novo = { ...antigo, ...cabecalho };
            sessionStorage.setItem('cabecalho_temp', JSON.stringify(novo));

            btnAvancar.innerHTML = '<span>Processando...</span>';
            setTimeout(() => {
                window.location.href = 'novo_pedido2.html';
            }, 300);
        });
    }
});