document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sidebar Toggle
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebarRegistros');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('closed');
        });
    }

    // 2. Sidebar Accordion
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

    // 3. Inicialização: Carregar "Notas Fiscais" por padrão
    const tabelaBody = document.getElementById('tabelaFiscalBody');
    if (tabelaBody) {
        mudarListagem('nf'); // Default
    }
});

// --- LÓGICA DE DADOS ---
const registrosDB = [
    // Notas Fiscais
    { cat: 'nf', doc: 'NF-001982', tipo: 'NF-e', entidade: 'DELL COMPUTADORES', valor: 'R$ 15.450,00', data: '03/01/2026', sefaz: 'Autorizada', erp: 'Integrado' },
    { cat: 'nf', doc: 'NF-005120', tipo: 'NFS-e', entidade: 'CONSULTORIA FINANCEIRA', valor: 'R$ 3.200,00', data: '28/12/2025', sefaz: 'Autorizada', erp: 'Aprovado' },
    { cat: 'nf', doc: 'NF-001981', tipo: 'NF-e', entidade: 'KALUNGA COMERCIO', valor: 'R$ 890,50', data: '20/12/2025', sefaz: 'Cancelada', erp: 'Cancelado' },
    
    // DIs
    { cat: 'di', doc: 'DI-22/00541', tipo: 'Importação', entidade: 'SHENZHEN ELECTRONICS', valor: 'USD 5,200.00', data: '02/01/2026', sefaz: 'Verde', erp: 'Pendente' },
    { cat: 'di', doc: 'DI-22/00100', tipo: 'Importação', entidade: 'CHINA TECH', valor: 'USD 1,200.00', data: '15/12/2025', sefaz: 'Vermelho', erp: 'Bloqueado' },

    // Correios
    { cat: 'correios', doc: 'AA123456BR', tipo: 'Sedex', entidade: 'REMETENTE EXTERNO', valor: 'R$ 45,90', data: '02/01/2026', sefaz: 'N/A', erp: 'Recebido' },
    { cat: 'correios', doc: 'BB987654BR', tipo: 'PAC', entidade: 'LOGÍSTICA SUL', valor: 'R$ 22,00', data: '30/12/2025', sefaz: 'N/A', erp: 'Em Trânsito' },
];

function mudarListagem(categoria) {
    // 1. Atualizar Menu Lateral (Visual)
    document.querySelectorAll('.menu-group li').forEach(li => {
        li.classList.remove('active-item');
        const arrow = li.querySelector('.arrow-right');
        if(arrow) arrow.style.color = '#CCC';
    });
    
    const activeLi = document.getElementById(`menu-${categoria}`);
    if(activeLi) {
        activeLi.classList.add('active-item');
        activeLi.querySelector('.arrow-right').style.color = '#E67E22';
    }

    // 2. Atualizar Título da Lista
    const titulos = {
        'nf': 'NOTAS FISCAIS',
        'di': 'DECLARAÇÕES DE IMPORTAÇÃO',
        'correios': 'RASTREIO CORREIOS / LOGÍSTICA'
    };
    const titleEl = document.getElementById('listTitle');
    if(titleEl) titleEl.innerText = titulos[categoria] || 'LISTAGEM';

    // 3. Filtrar e Renderizar Tabela
    const tbody = document.getElementById('tabelaFiscalBody');
    if(!tbody) return;

    tbody.innerHTML = '';
    const filtrados = registrosDB.filter(r => r.cat === categoria);

    if (filtrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:20px; color:#999;">Nenhum registro encontrado nesta categoria.</td></tr>';
        return;
    }

    filtrados.forEach(reg => {
        let corSefaz = '#2E7D32';
        if(reg.sefaz === 'Cancelada' || reg.sefaz === 'Vermelho') corSefaz = '#D32F2F';
        if(reg.sefaz === 'N/A') corSefaz = '#999';
        
        let corErp = '#2E7D32';
        if(reg.erp === 'Pendente' || reg.erp === 'Em Trânsito') corErp = '#E67E22';
        if(reg.erp === 'Cancelado' || reg.erp === 'Bloqueado') corErp = '#D32F2F';

        const html = `
            <tr style="background-color: #fff;">
                <td style="text-align:center;"><input type="checkbox"></td>
                <td class="text-orange-link"><strong>${reg.doc}</strong></td>
                <td>${reg.tipo}</td>
                <td style="font-weight:500;">${reg.entidade}</td>
                <td>${reg.valor}</td>
                <td style="color:#555;">${reg.data}</td>
                <td><div style="font-size:11px; color:${corSefaz}; font-weight:700; text-transform:uppercase;">${reg.sefaz}</div></td>
                <td><div style="font-size:11px; color:${corErp}; font-weight:700; text-transform:uppercase;">${reg.erp}</div></td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', html);
    });
}

// --- DROPDOWN ---
function toggleDropdown() {
    const dropdown = document.getElementById('newRecordDropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

window.onclick = function(event) {
    if (!event.target.matches('.btn-primary-erp') && !event.target.matches('.btn-primary-erp-arrow') && !event.target.matches('.material-icons-outlined')) {
        const dropdowns = document.getElementsByClassName("dropdown-menu");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}