document.addEventListener('DOMContentLoaded', () => {

    // 1. Toggle Sidebar
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebarTransacoes');
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

    // 4. Carregar Lista
    carregarAprovacoes();

    // 5. Ativar Redimensionamento das Colunas
    enableColumnResizing();

    // 6. Busca Principal
    const searchInput = document.querySelector('.erp-input-search');
    if(searchInput) {
        searchInput.addEventListener('input', function() {
            const termo = this.value.toLowerCase();
            document.querySelectorAll('#tabelaAprovacoes tr').forEach(linha => {
                linha.style.display = linha.innerText.toLowerCase().includes(termo) ? '' : 'none';
            });
        });
    }
});

function carregarAprovacoes() {
    const tbody = document.getElementById('tabelaAprovacoes');
    const pedidos = JSON.parse(localStorage.getItem('vivara_pedidos')) || [];
    
    tbody.innerHTML = '';

    // Filtra: "AGUARDANDO APROVAÇÃO" OU "APROVADO" ou "AGUARDANDO ENVIO"
    const itensParaAcao = pedidos.filter(p => 
        p.status === 'AGUARDANDO APROVAÇÃO' || p.status === 'APROVADO' || p.status === 'AGUARDANDO ENVIO'
    );

    if (itensParaAcao.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 40px; color:#999;">Nenhuma pendência encontrada.</td></tr>';
        return;
    }

    // Ordena mais antigo primeiro para aprovar na ordem
    itensParaAcao.forEach(p => {
        const id = p.id;
        const erp = p.erpId || '-';
        const titulo = p.cabecalho ? p.cabecalho.titulo : 'Sem Título';
        // CORREÇÃO AQUI: Usa a propriedade correta do objeto 'p' ou a variável definida
        const requisitanteNome = p.requisitamte || 'Usuário'; 
        const data = p.dataCriacao || '-';
        
        // Define cor do status
        let corStatus = '#666';
        if(p.status === 'AGUARDANDO APROVAÇÃO') corStatus = '#E67E22'; 
        if(p.status === 'APROVADO') corStatus = '#2E7D32'; 
        if(p.status === 'AGUARDANDO ENVIO') corStatus = '#1976D2';

        // Botões Dinâmicos
        let botoesHtml = '';
        if(p.status === 'AGUARDANDO APROVAÇÃO') {
            botoesHtml = `
                <button class="btn-approve" onclick="acaoAprovar(${id})">
                    <span class="material-icons-outlined" style="font-size:16px;">check</span> Aprovar
                </button>
                <button class="btn-reject" onclick="acaoReprovar(${id})">
                    <span class="material-icons-outlined" style="font-size:16px;">close</span> Reprovar
                </button>
            `;
        } else if (p.status === 'APROVADO' || p.status === 'AGUARDANDO ENVIO') {
            botoesHtml = `
                <button class="btn-generate" onclick="acaoGerarPedidoALM(${id})">
                    <span class="material-icons-outlined" style="font-size:16px;">assignment</span> Gerar Pedido Formalização ALM
                </button>
            `;
        }

        const tr = document.createElement('tr');
        // CORREÇÃO: Usando a variável 'requisitanteNome' correta
        tr.innerHTML = `
            <td class="doc-me">${id}</td>
            <td>${erp}</td>
            <td style="font-weight: 500;">${titulo}</td>
            <td style="color:${corStatus};" class="status-text">${p.status}</td>
            <td>${data}</td>
            <td>${requisitanteNome}</td> 
            <td class="action-cell">
                ${botoesHtml}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- AÇÕES DO USUÁRIO ---

window.acaoAprovar = function(id) {
    if(!confirm(`Confirma a aprovação da requisição ${id}?`)) return;
    
    atualizarStatusPedido(id, "APROVADO");
    carregarAprovacoes();
};

window.acaoReprovar = function(id) {
    const motivo = prompt("Motivo da reprovação:");
    if (motivo === null) return;
    
    atualizarStatusPedido(id, "REPROVADO", motivo);
    alert(`Requisição ${id} reprovada.`);
    carregarAprovacoes();
};

window.acaoGerarPedidoALM = function(id) {
    window.location.href = `Apr_Form_pd.html?id=${id}`; 
};

function atualizarStatusPedido(id, novoStatus, motivo = "") {
    const pedidos = JSON.parse(localStorage.getItem('vivara_pedidos')) || [];
    const index = pedidos.findIndex(p => p.id == id);
    if (index !== -1) {
        pedidos[index].status = novoStatus;
        if(motivo) pedidos[index].justificativaCancelamento = motivo;
        localStorage.setItem('vivara_pedidos', JSON.stringify(pedidos));
    }
}

// --- LÓGICA DE COLUNAS AJUSTÁVEIS (RESIZABLE) ---
function enableColumnResizing() {
    const table = document.getElementById('resizableTable');
    if (!table) return; // Segurança extra
    const cols = table.querySelectorAll('th');

    cols.forEach((col) => {
        const resizer = col.querySelector('.resizer');
        if (!resizer) return;

        createResizableColumn(col, resizer);
    });
}

function createResizableColumn(col, resizer) {
    let x = 0;
    let w = 0;

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