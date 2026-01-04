document.addEventListener('DOMContentLoaded', () => {

    // Toggle Sidebar
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebarContratos');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => sidebar.classList.toggle('closed'));
    }

    // Accordion
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

    carregarContratos();
    enableColumnResizing();
});

function carregarContratos() {
    const tbody = document.getElementById('tabelaContratosBody');
    const totalLabel = document.getElementById('totalContratos');
    
    tbody.innerHTML = '';

    // Mock
    const contratosEstaticos = [
        { id: 'CTR-2024-001', objeto: 'Prestação de Serviços de Limpeza', fornecedor: 'LIMPEZA TOTAL LTDA', tipo: 'Serviço', status: 'Ativo', inicio: '2024-01-01', fim: '2025-12-31', valor: 120000.00 },
        { id: 'CTR-2023-089', objeto: 'Fornecimento de Embalagens', fornecedor: 'KLABIN S.A.', tipo: 'Fornecimento', status: 'Ativo', inicio: '2023-06-15', fim: '2026-06-15', valor: 500000.00 },
        { id: 'CTR-2022-012', objeto: 'Locação de Impressoras', fornecedor: 'CANON DO BRASIL', tipo: 'Locação', status: 'Vencido', inicio: '2022-02-01', fim: '2024-02-01', valor: 45000.00 },
    ];

    // LocalStorage
    const contratosDinamicos = JSON.parse(localStorage.getItem('vivara_contratos')) || [];
    const todosContratos = [...contratosDinamicos, ...contratosEstaticos];

    if(totalLabel) totalLabel.innerText = todosContratos.length;

    todosContratos.forEach(c => {
        let classStatus = 'st-ativo';
        if(c.status === 'Vencido') classStatus = 'st-vencido';
        if(c.status === 'Rascunho') classStatus = 'st-rascunho';

        // Formata data
        const dataInicio = c.inicio.includes('-') ? c.inicio.split('-').reverse().join('/') : c.inicio;
        const dataFim = c.fim.includes('-') ? c.fim.split('-').reverse().join('/') : c.fim;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="text-id">${c.id}</td>
            <td style="font-weight: 500;">
                ${c.objeto}
                <div style="font-size:11px; color:#888; font-weight:400;">${c.fornecedor}</div>
            </td>
            <td>${c.tipo}</td>
            <td><span class="text-status-ctr ${classStatus}">${c.status}</span></td>
            <td>${dataInicio} até ${dataFim}</td>
            <td style="font-weight:600;">${parseFloat(c.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            <td style="text-align: center;">
                <button class="btn-view" title="Ver Detalhes">
                    <span class="material-icons-outlined">visibility</span>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- Resize ---
function enableColumnResizing() {
    const table = document.getElementById('tabelaContratosGrid');
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
        w = parseInt(window.getComputedStyle(col).width, 10);
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