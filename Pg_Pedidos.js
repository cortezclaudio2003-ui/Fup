document.addEventListener('DOMContentLoaded', () => {

    // 1. Toggle Sidebar
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebarPedidos');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('closed'));
    }

    // 2. Accordion
    document.querySelectorAll('.group-title').forEach(title => {
        title.addEventListener('click', () => {
            const list = title.nextElementSibling;
            const arrow = title.querySelector('.arrow');
            if (list) {
                list.style.display = (list.style.display === 'none') ? 'block' : 'none';
                arrow.innerText = (list.style.display === 'none') ? 'expand_more' : 'expand_less';
            }
        });
    });

    // 3. Busca Sidebar
    const sidebarSearchInput = document.querySelector('.sidebar-inner-search input');
    if (sidebarSearchInput) {
        sidebarSearchInput.addEventListener('input', function() {
            const termo = this.value.toLowerCase();
            document.querySelectorAll('.menu-group li').forEach(item => {
                item.style.display = item.innerText.toLowerCase().includes(termo) ? '' : 'none';
            });
            if(termo.length > 0) {
                document.querySelectorAll('.menu-group ul').forEach(ul => ul.style.display = 'block');
            }
        });
    }

    // 4. Carregar Pedidos
    carregarPedidos();

    // 5. Ativar Redimensionamento
    enableColumnResizing();

    // 6. Busca Principal
    const searchInput = document.querySelector('.erp-input-search');
    if(searchInput) {
        searchInput.addEventListener('input', function() {
            const termo = this.value.toLowerCase();
            document.querySelectorAll('#tabelaPedidosBody tr').forEach(linha => {
                linha.style.display = linha.innerText.toLowerCase().includes(termo) ? '' : 'none';
            });
        });
    }
});

function carregarPedidos() {
    const tbody = document.getElementById('tabelaPedidosBody');
    const pedidos = JSON.parse(localStorage.getItem('vivara_pedidos')) || [];
    const totalLabel = document.getElementById('totalPedidos');
    
    tbody.innerHTML = '';

    // FILTRO: Apenas pedidos que já foram formalizados (tem ID SAP ou status de entrega)
    const pedidosFiltrados = pedidos.filter(p => 
        p.erpId && p.erpId !== '-' && (p.status === 'AGUARDANDO ENTREGA' || p.status === 'CONCLUÍDO')
    );

    if(totalLabel) totalLabel.innerText = pedidosFiltrados.length;

    if (pedidosFiltrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 40px; color:#999;">Nenhum pedido formalizado encontrado.</td></tr>';
        return;
    }

    // Ordena por data (mais recente primeiro)
    pedidosFiltrados.reverse().forEach(p => {
        const idMe = p.id;
        const idSap = p.erpId;
        const titulo = p.cabecalho ? p.cabecalho.titulo : 'Sem Título';
        const data = p.dataCriacao || '-';
        const status = p.status;
        const valor = p.total ? parseFloat(p.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00';

        let classStatus = 'status-aguardando';
        if(status === 'CONCLUÍDO') classStatus = 'status-concluido';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="text-sap">${idSap}</td>
            <td class="text-me">${idMe}</td>
            <td style="font-weight: 500;">
                ${titulo}
                <div style="font-size:11px; color:#888; font-weight:400;">Fornecedor: VIVARA MATRIZ E FILIAIS</div>
            </td>
            <td><span class="text-status ${classStatus}">${status}</span></td>
            <td style="font-weight:600;">${valor}</td>
            <td>${data}</td>
            <td style="text-align: center;">
                <button class="btn-view" title="Ver Detalhes" onclick="verDetalhes(${idMe})">
                    <span class="material-icons-outlined">visibility</span>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.verDetalhes = function(id) {
    // Reusa a página de detalhes existente
    window.location.href = `novo_pedido5.html?id=${id}`;
};

// --- Lógica de Resize (Igual Aprovacoes) ---
function enableColumnResizing() {
    const table = document.getElementById('tabelaPedidosGrid');
    const cols = table.querySelectorAll('th');
    cols.forEach((col) => {
        const resizer = col.querySelector('.resizer');
        if (!resizer) return;
        createResizableColumn(col, resizer);
    });
}

function createResizableColumn(col, resizer) {
    let x = 0; let w = 0;
    const mouseDownHandler = function (e) {
        x = e.clientX;
        const styles = window.getComputedStyle(col);
        w = parseInt(styles.width, 10);
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
        resizer.classList.add('resizing');
    };
    const mouseMoveHandler = function (e) {
        const dx = e.clientX - x;
        col.style.width = `${w + dx}px`;
    };
    const mouseUpHandler = function () {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        resizer.classList.remove('resizing');
    };
    resizer.addEventListener('mousedown', mouseDownHandler);
}