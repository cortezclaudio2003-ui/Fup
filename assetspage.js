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

    // 2. Accordion Menu
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

    // 3. Carregar Dados
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

// Dados Mockados (Exemplo)
const dadosMockados = [
    { 
        codInterno: 'EQ-2023-001', 
        equipamento: 'Balança D500', 
        marca: 'Shimadzu', 
        modelo: 'ATX224', 
        fabrica: 'FÁBRICA DE JOIA', 
        setor: 'Fundição',
        responsavel: 'Carlos Silva',
        dataEntrega: '2023-06-20',
        criadoPor: 'Admin',
        notaFiscal: 'NF-102030'
    },
    { 
        codInterno: 'INST-055', 
        equipamento: 'Paquímetro Digital', 
        marca: 'Mitutoyo', 
        modelo: '500-196', 
        fabrica: 'FÁBRICA DE LIFE', 
        setor: 'Qualidade',
        responsavel: 'Ana Souza',
        dataEntrega: '2024-01-12',
        criadoPor: 'Roberto.M',
        notaFiscal: 'NF-5599'
    }
];

function carregarDadosAtivos() {
    const tbody = document.getElementById('tabelaAssetsBody');
    if(!tbody) return;

    tbody.innerHTML = '';

    // Lê localStorage e mistura com mock
    let dadosLocais = JSON.parse(localStorage.getItem('sgqAssetsDB')) || [];
    const todosDados = [...dadosLocais, ...dadosMockados];

    todosDados.forEach(d => {
        // Garantir que campos vazios tenham um valor padrão
        const setor = d.setor || '-';
        const responsavel = d.responsavel || '-';
        const dataEntrega = d.dataEntrega ? formatarData(d.dataEntrega) : '-';
        const criadoPor = d.criadoPor || 'Usuário Atual';

        const html = `
            <tr>
                <td style="text-align:center;"><input type="checkbox"></td>
                <td style="text-align:center;">
                    <button class="btn-protocol" title="Gerar Protocolo" onclick="gerarProtocolo('${d.codInterno}')">
                        <span class="material-icons-outlined">assignment_return</span>
                    </button>
                </td>
                <td class="text-orange-link"><strong>${d.codInterno || '-'}</strong></td>
                <td>${d.equipamento || '-'}</td>
                <td><span class="status-pill ${d.fabrica === 'FÁBRICA DE JOIA' ? 'status-joia' : 'status-life'}">${d.fabrica || '-'}</span></td>
                <td>${setor}</td>
                <td style="font-weight: 500; color: #333;">${responsavel}</td>
                <td>${dataEntrega}</td>
                <td style="font-size: 13px; color: #666;">
                    <div style="display:flex; align-items:center; gap:5px;">
                        <span class="material-icons-outlined" style="font-size:14px;">person</span> ${criadoPor}
                    </div>
                </td>
                <td style="font-size:13px;">${d.marca || ''} ${d.modelo || ''}</td>
                <td style="color:#666;">${d.notaFiscal || '-'}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', html);
    });
}

function formatarData(dataISO) {
    if(!dataISO || dataISO === '-') return '-';
    if(dataISO.includes('/')) return dataISO; 
    const partes = dataISO.split('-');
    if(partes.length === 3) return `${partes[2]}/${partes[1]}/${partes[0]}`;
    return dataISO;
}

window.gerarProtocolo = function(codInterno) {
    alert(`Protocolo de entrega gerado para: ${codInterno}`);
};

window.filtrarTabela = function(filtro) {
    const input = document.querySelector('.erp-input-search');
    if(input) {
        input.value = filtro;
        input.dispatchEvent(new Event('input'));
    }
};