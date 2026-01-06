document.addEventListener('DOMContentLoaded', () => {
    // 1. Toggle Menu Lateral
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebarAssets');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('closed');
        });
    }

    // 2. Menu Acordeão
    const groupTitles = document.querySelectorAll('.group-title');
    groupTitles.forEach(title => {
        title.addEventListener('click', () => {
            const list = title.nextElementSibling;
            const arrow = title.querySelector('.arrow');
            if (list) {
                if (list.style.display !== 'none') {
                    list.style.display = 'none';
                    if (arrow) arrow.innerText = 'expand_more';
                } else {
                    list.style.display = 'block';
                    if (arrow) arrow.innerText = 'expand_less';
                }
            }
        });
    });

    // 3. Inicialização
    carregarDadosAtivos();

    // 4. Busca
    const mainSearchInput = document.querySelector('.erp-input-search');
    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', function() {
            const termo = this.value.toLowerCase();
            const linhas = document.querySelectorAll('#tabelaAssetsBody tr');
            linhas.forEach(linha => {
                const texto = linha.innerText.toLowerCase();
                linha.style.display = texto.includes(termo) ? '' : 'none';
            });
        });
    }
});

// --- DADOS MOCKADOS ---
const dadosMockados = [
    { codInterno: 'AT-001', equipamento: 'Balança de Precisão', modelo: 'Shimadzu ATX224', nSerie: 'SN-998877', notaFiscal: 'NF-102030', dataEmissao: '2023-05-10', dataRegistro: '2023-06-20', criadoPor: 'Admin' },
    { codInterno: 'AT-002', equipamento: 'Paquímetro Digital', modelo: 'Mitutoyo 500-196', nSerie: 'SN-112233', notaFiscal: 'NF-5599', dataEmissao: '2023-11-15', dataRegistro: '2024-01-12', criadoPor: 'Roberto.M' },
    { codInterno: 'AT-003', equipamento: 'Multímetro True RMS', modelo: 'Fluke 179', nSerie: 'SN-445566', notaFiscal: 'NF-7788', dataEmissao: '2024-02-01', dataRegistro: '2024-02-05', criadoPor: 'Julia.S' }
];

// --- FUNÇÃO 1: CARREGAR LISTA DE ATIVOS ---
function carregarDadosAtivos() {
    atualizarMenuAtivo('btnListaAtivos');
    document.getElementById('tableTitle').innerText = "Ativos Disponíveis em Estoque";
    
    const thead = document.getElementById('tabelaHead');
    
    // Cabeçalho Simples
    thead.innerHTML = `
        <tr>
            <th style="width: 40px; text-align:center;"><input type="checkbox"></th>
            <th>Código</th>
            <th>Equipamento</th>
            <th>Modelo</th>
            <th>N° Série</th>
            <th>Nota Fiscal</th>
            <th>Emissão</th>
            <th>Registro</th>
            <th>Criado Por</th>
            <th style="text-align: center;">Ações</th>
        </tr>
    `;

    const tbody = document.getElementById('tabelaAssetsBody');
    tbody.innerHTML = '';

    // Lógica de dados
    let dadosLocais = JSON.parse(localStorage.getItem('sgqAssetsDB')) || [];
    const todosDados = [...dadosLocais, ...dadosMockados];
    
    let historicoDB = JSON.parse(localStorage.getItem('sgqProtocolosDB')) || [];
    const codigosEntregues = historicoDB.map(p => p.codigoAtivo);

    const mapUnicos = new Map();
    todosDados.forEach(item => {
        if (!codigosEntregues.includes(item.codInterno)) {
            mapUnicos.set(item.codInterno, item);
        }
    });
    const dadosFinais = Array.from(mapUnicos.values());

    if (dadosFinais.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding:40px; color:#9CA3AF;">Todos os ativos foram protocolados.</td></tr>';
        return;
    }

    dadosFinais.forEach(d => {
        const dataEmissao = formatarData(d.dataEmissao);
        const dataRegistro = formatarData(d.dataRegistro);

        // HTML SEM CONTAINERS
        // Removemos divs wrappers desnecessárias
        const html = `
            <tr>
                <td style="text-align:center;"><input type="checkbox"></td>
                
                <td>
                    <a href="#" class="text-link">${d.codInterno || '-'}</a>
                </td>
                
                <td class="text-main">${d.equipamento || '-'}</td>
                
                <td class="text-sec">${d.modelo || '-'}</td>
                
                <td><span class="font-mono">${d.nSerie || '-'}</span></td>
                
                <td><span class="font-mono">${d.notaFiscal || '-'}</span></td>
                
                <td><span class="font-mono">${dataEmissao}</span></td>
                <td><span class="font-mono">${dataRegistro}</span></td>
                
                <td style="color:#4B5563;">
                    <span class="material-icons-outlined" style="font-size:14px; vertical-align:middle; margin-right:4px; color:#9CA3AF;">person</span>
                    ${d.criadoPor || 'Sistema'}
                </td>
                
                <td style="text-align: center;">
                    <button class="action-icon" title="Protocolar" onclick="window.location.href='protocassets.html?cod=${d.codInterno}'">
                        <span class="material-icons-outlined" style="font-size:20px;">assignment_turned_in</span>
                    </button>
                </td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', html);
    });
}

// --- FUNÇÃO 2: CARREGAR HISTÓRICO DE ENTREGAS ---
function carregarHistoricoEntregas() {
    atualizarMenuAtivo('btnHistorico');
    document.getElementById('tableTitle').innerText = "Histórico Detalhado de Entregas";

    const thead = document.getElementById('tabelaHead');
    thead.innerHTML = `
        <tr>
            <th style="width: 40px;"><input type="checkbox"></th>
            <th>Data Entrega</th>
            <th>Cód Ativo</th>
            <th>Equipamento</th>
            <th>Modelo</th>
            <th>Destino</th>
            <th>Responsável</th>
            <th>Status</th>
        </tr>
    `;

    const tbody = document.getElementById('tabelaAssetsBody');
    tbody.innerHTML = '';

    let historicoDB = JSON.parse(localStorage.getItem('sgqProtocolosDB')) || [];

    if (historicoDB.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:30px; color:#999; font-style:italic;">Nenhum histórico encontrado.</td></tr>';
        return;
    }

    historicoDB.forEach(h => {
        const dataEntrega = formatarData(h.dataEntrega);
        
        const html = `
            <tr>
                <td style="text-align:center;"><input type="checkbox"></td>
                <td><span class="font-mono">${dataEntrega}</span></td>
                <td><span class="text-link">${h.codigoAtivo}</span></td>
                <td class="text-main">${h.equipamento || '-'}</td>
                <td class="text-sec">${h.modelo || '-'}</td>
                <td>${h.setor}</td>
                <td style="color:#4B5563;">
                    <span class="material-icons-outlined" style="font-size:14px; vertical-align:middle; margin-right:4px; color:#9CA3AF;">person</span>
                    ${h.responsavel}
                </td>
                <td style="color:#059669; font-weight:600; font-size:13px;">Concluído</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', html);
    });
}

// --- UTILITÁRIOS ---
function atualizarMenuAtivo(idAtivo) {
    const menus = document.querySelectorAll('.menu-group li');
    menus.forEach(menu => menu.classList.remove('active-menu'));
    const item = document.getElementById(idAtivo);
    if(item) item.classList.add('active-menu');
}

function formatarData(dataISO) {
    if(!dataISO || dataISO === '-') return '-';
    if(dataISO.includes('/')) return dataISO; 
    const partes = dataISO.split('-');
    if(partes.length === 3) return `${partes[2]}/${partes[1]}/${partes[0]}`;
    return dataISO;
}