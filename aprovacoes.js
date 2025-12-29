document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURAÇÃO DE COLUNAS (Cabeçalho da Tabela) ---
    // O cabeçalho muda dependendo se estamos vendo Ativos, Fornecedores ou Itens
    const columnConfigs = {
        ativo: `
            <tr>
                <th width="10%">Nº Ordem</th>
                <th>Descrição / Justificativa</th>
                <th>Data Criação</th>
                <th>Solicitante</th>
                <th width="10%" style="text-align: right;">Ações</th>
            </tr>
        `,
        fornecedor: `
            <tr>
                <th width="10%">Nº Ordem</th>
                <th>Razão Social</th>
                <th>CNPJ</th>
                <th>Nacionalidade</th>
                <th>Data Criação</th>
                <th>Solicitante</th>
                <th width="10%" style="text-align: right;">Ações</th>
            </tr>
        `,
        itens: `
            <tr>
                <th width="10%">Nº Ordem</th>
                <th width="8%">Grupo</th>
                <th>Código</th>
                <th>Descrição do Item</th>
                <th width="8%">Unidade</th>
                <th>Solicitante</th>
                <th width="10%" style="text-align: right;">Ações</th>
            </tr>
        `
    };

    // --- 2. CONFIGURAÇÃO DOS MENUS ---
    // Todas as abas principais têm as mesmas 3 opções agora
    const menus = {
        cadastros: [
            { id: 'ativo', label: 'Cadastro Ativos' },
            { id: 'fornecedor', label: 'Cadastro Fornecedores' },
            { id: 'itens', label: 'Cadastro Itens' }
        ],
        bloqueio: [
            { id: 'ativo', label: 'Bloqueio Ativos' },
            { id: 'fornecedor', label: 'Bloqueio Fornecedores' },
            { id: 'itens', label: 'Bloqueio Itens' }
        ],
        alteracoes: [
            { id: 'ativo', label: 'Alterações Ativos' },
            { id: 'fornecedor', label: 'Alterações Fornecedores' },
            { id: 'itens', label: 'Alterações Itens' }
        ]
    };

    // Elementos do DOM
    const mainTabs = document.querySelectorAll('.tab-btn');
    const subContainer = document.getElementById('sub-filter-container');
    const theadContainer = document.getElementById('dynamic-thead');
    const tableRows = document.querySelectorAll('#tabela-aprovacoes tr');

    // Estado Atual
    let currentMain = 'cadastros';
    let currentSub = 'ativo';
    
    // Objeto de Contagem
    let counts = {
        cadastros: { total: 0, ativo: 0, fornecedor: 0, itens: 0 },
        bloqueio: { total: 0, ativo: 0, fornecedor: 0, itens: 0 },
        alteracoes: { total: 0, ativo: 0, fornecedor: 0, itens: 0 }
    };

    // --- 3. ATUALIZAR CABEÇALHO ---
    function updateTableHeaders(subType) {
        // Usa a configuração específica ou 'ativo' como padrão
        const template = columnConfigs[subType] || columnConfigs['ativo'];
        theadContainer.innerHTML = template;
    }

    // --- 4. CALCULAR CONTAGENS ---
    function calcularContagens() {
        // Zera tudo
        for(let m in counts) {
            counts[m].total = 0;
            counts[m].ativo = 0;
            counts[m].fornecedor = 0;
            counts[m].itens = 0;
        }

        // Itera linhas visíveis no DOM
        tableRows.forEach(row => {
            if (row.parentElement) {
                const m = row.getAttribute('data-main');
                const s = row.getAttribute('data-sub');
                
                if (counts[m]) {
                    counts[m].total++;
                    if(counts[m][s] !== undefined) counts[m][s]++;
                }
            }
        });

        // Atualiza Badges (Abas Principais)
        mainTabs.forEach(tab => {
            const m = tab.getAttribute('data-main');
            const badge = tab.querySelector('.counter-badge');
            if(badge && counts[m]) {
                badge.innerText = counts[m].total;
                badge.style.opacity = counts[m].total === 0 ? '0.5' : '1';
            }
        });

        // Atualiza Badges (Sub-filtros Pills)
        document.querySelectorAll('.pill').forEach(pill => {
            const s = pill.getAttribute('data-sub');
            const badge = pill.querySelector('.counter-badge');
            if(badge && counts[currentMain] && counts[currentMain][s] !== undefined) {
                badge.innerText = counts[currentMain][s];
            }
        });
    }

    // --- 5. RENDERIZAR SUB-FILTROS ---
    function renderSubFilters(mainKey) {
        subContainer.innerHTML = '';
        const subItems = menus[mainKey];
        if(!subItems) return;

        subItems.forEach((item, index) => {
            const btn = document.createElement('button');
            btn.className = 'pill';
            btn.innerHTML = `${item.label} <span class="counter-badge">0</span>`;
            btn.setAttribute('data-sub', item.id);
            
            if (index === 0) {
                btn.classList.add('active');
                currentSub = item.id;
            }

            btn.addEventListener('click', () => {
                document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                currentSub = item.id;
                
                updateTableHeaders(currentSub);
                filtrarTabela();
            });

            subContainer.appendChild(btn);
        });
        
        // Garante estado correto
        updateTableHeaders(currentSub);
        calcularContagens();
        filtrarTabela();
    }

    // --- 6. FILTRAR TABELA ---
    function filtrarTabela() {
        tableRows.forEach(row => {
            const rowMain = row.getAttribute('data-main');
            const rowSub = row.getAttribute('data-sub');

            if (rowMain === currentMain && rowSub === currentSub) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });
        // Atualiza números para refletir estado atual
        calcularContagens();
    }

    // --- EVENTOS ---
    mainTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            mainTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            currentMain = tab.getAttribute('data-main');
            // Reseta sub para o primeiro item (ativo)
            currentSub = 'ativo'; 
            renderSubFilters(currentMain);
        });
    });

    document.querySelectorAll('.btn-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            if(confirm('Confirmar ação?')) {
                row.style.opacity = '0';
                setTimeout(() => { 
                    row.remove(); 
                    calcularContagens(); // Recalcula após remoção
                }, 300);
            }
        });
    });

    // Início
    renderSubFilters('cadastros');
});