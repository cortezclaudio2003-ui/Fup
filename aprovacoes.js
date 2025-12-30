document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURAÇÃO DAS RAMIFICAÇÕES ---
    const subCategories = {
        cadastros: [
            { id: 'ativos', label: 'Ativos Patrimoniais' },
            { id: 'fornecedores', label: 'Fornecedores' },
            { id: 'itens', label: 'Itens' }
        ],
        pedidos: [
            { id: 'todos', label: 'Todos' },
            { id: 'pendentes', label: 'Pendentes de Aprovação' },
            { id: 'historico', label: 'Histórico de Pedidos' }
        ],
        contratos: [
            { id: 'todos', label: 'Todos' } // Placeholder
        ],
        bloqueios: [
            { id: 'todos', label: 'Todos' } // Placeholder
        ]
    };

    // --- DADOS (Mock Data com Categoria/Subcategoria) ---
    const mockData = [
        // CADASTROS
        { type: 'cadastros', sub: 'ativos', id: 'AT-001', desc: 'Notebook Dell', details: 'TI / Hardware', user: 'Roberto', date: '30/12/2025', status: 'Novo', stClass: 'st-new' },
        { type: 'cadastros', sub: 'fornecedores', id: 'FOR-992', desc: 'Tech Solutions Ltda', details: 'CNPJ: 12.xxx', user: 'Maria', date: '29/12/2025', status: 'Novo', stClass: 'st-new' },
        { type: 'cadastros', sub: 'itens', id: 'IT-550', desc: 'Cabo HDMI', details: 'Material Consumo', user: 'Almox.', date: '28/12/2025', status: 'Novo', stClass: 'st-new' },
        
        // PEDIDOS
        { type: 'pedidos', sub: 'pendentes', id: 'PED-100', desc: 'Compra Licenças', details: 'R$ 5.000,00', user: 'TI', date: '25/12/2025', status: 'Pendente', stClass: 'st-urgent' },
        { type: 'pedidos', sub: 'pendentes', id: 'PED-101', desc: 'Mobiliário', details: 'R$ 12.000,00', user: 'RH', date: '24/12/2025', status: 'Pendente', stClass: 'st-urgent' },
        { type: 'pedidos', sub: 'historico', id: 'PED-090', desc: 'Material Limpeza', details: 'R$ 500,00', user: 'Facilities', date: '10/11/2025', status: 'Aprovado', stClass: 'st-history' },
        
        // BLOQUEIOS
        { type: 'bloqueios', sub: 'todos', id: 'BLK-22', desc: 'Forn. Logística SA', details: 'Pendência Fiscal', user: 'Fiscal', date: '01/12/2025', status: 'Bloqueado', stClass: 'st-urgent' }
    ];

    // --- DOM REFERENCES ---
    const mainTabs = document.querySelectorAll('.tab-item');
    const subNavContainer = document.getElementById('sub-navigation');
    const gridBody = document.getElementById('approval-grid');
    const checkAll = document.getElementById('check-all');
    const bulkActions = document.getElementById('bulk-actions');
    const selectedCountSpan = document.getElementById('selected-count');

    // Modal
    const modal = document.getElementById('modal-me');
    const modalDocRef = document.getElementById('modal-doc-ref');
    const modalTextArea = document.getElementById('modal-text');
    const btnCancelModal = document.getElementById('btn-cancel-modal');
    const btnCloseModal = document.getElementById('btn-close');
    const btnConfirmModal = document.getElementById('btn-confirm-modal');

    // STATE
    let currentMain = 'cadastros';
    let currentSub = 'ativos'; // Padrão inicial
    let selectedIds = new Set();
    let actionTargetRow = null;

    // --- FUNÇÕES ---

    function init() {
        // Inicializa com a primeira aba
        renderSubTabs('cadastros');
    }

    // Renderiza os botões de sub-nível (Pills)
    function renderSubTabs(mainKey) {
        subNavContainer.innerHTML = '';
        const subs = subCategories[mainKey] || [];
        
        if (subs.length > 0) {
            currentSub = subs[0].id; // Reseta para o primeiro subitem
        }

        subs.forEach((sub, index) => {
            const btn = document.createElement('button');
            btn.className = `sub-pill ${index === 0 ? 'active' : ''}`;
            btn.innerText = sub.label;
            
            btn.addEventListener('click', () => {
                document.querySelectorAll('.sub-pill').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentSub = sub.id;
                renderGrid();
            });
            
            subNavContainer.appendChild(btn);
        });

        renderGrid();
    }

    // Renderiza a Tabela baseado no Main e Sub atual
    function renderGrid() {
        gridBody.innerHTML = '';
        selectedIds.clear();
        updateBulkUI();
        if(checkAll) checkAll.checked = false;

        // Filtra os dados
        const items = mockData.filter(item => {
            const matchMain = item.type === currentMain;
            
            // Lógica Especial para Pedidos:
            // Se sub for 'todos', traz tudo de pedidos.
            // Se sub for 'pendentes', traz só pendentes.
            // Se sub for 'historico', traz o resto.
            let matchSub = false;
            
            if (currentMain === 'pedidos') {
                if (currentSub === 'todos') matchSub = true;
                else if (currentSub === 'pendentes') matchSub = (item.sub === 'pendentes');
                else if (currentSub === 'historico') matchSub = (item.sub === 'historico');
            } else {
                // Para Cadastros e outros, match exato
                matchSub = (item.sub === currentSub || currentSub === 'todos');
            }

            return matchMain && matchSub;
        });

        if (items.length === 0) {
            gridBody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 30px; color:#888;">Nenhum registro encontrado.</td></tr>';
            return;
        }

        items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="col-center"><input type="checkbox" class="row-check" data-id="${item.id}"></td>
                <td>
                    <div class="status-indicator ${item.stClass}">
                        <span class="dot-status"></span> ${item.status}
                    </div>
                </td>
                <td>
                    <span class="doc-id">${item.id}</span>
                    <span class="doc-desc">${item.desc}</span>
                </td>
                <td>
                    <span class="val-main">${item.details}</span>
                </td>
                <td>${item.user}</td>
                <td>${item.date}</td>
                <td class="col-center">
                    <button class="btn-icon-row btn-approve-row" title="Aprovar">✓</button>
                    <button class="btn-icon-row btn-reject-row" title="Reprovar">✕</button>
                </td>
            `;
            
            // Listeners da Linha
            const checkbox = tr.querySelector('.row-check');
            checkbox.addEventListener('change', (e) => {
                if(e.target.checked) selectedIds.add(item.id);
                else selectedIds.delete(item.id);
                updateBulkUI();
            });

            tr.querySelector('.btn-approve-row').addEventListener('click', () => {
                if(confirm(`Aprovar ${item.id}?`)) { tr.remove(); }
            });

            tr.querySelector('.btn-reject-row').addEventListener('click', () => {
                openRejectModal(item.id, tr);
            });

            gridBody.appendChild(tr);
        });
    }

    function updateBulkUI() {
        selectedCountSpan.innerText = selectedIds.size;
        bulkActions.style.display = selectedIds.size > 0 ? 'flex' : 'none';
    }

    function openRejectModal(docId, rowElement) {
        modal.classList.remove('hidden');
        modalDocRef.innerText = docId;
        modalTextArea.value = '';
        actionTargetRow = rowElement;
    }

    // --- EVENTOS GERAIS ---
    
    // Troca de Aba Principal
    mainTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            mainTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentMain = tab.getAttribute('data-target');
            renderSubTabs(currentMain);
        });
    });

    // Check All
    if(checkAll) {
        checkAll.addEventListener('change', (e) => {
            const checks = gridBody.querySelectorAll('.row-check');
            const isChecked = e.target.checked;
            selectedIds.clear();
            checks.forEach(c => {
                c.checked = isChecked;
                if(isChecked) selectedIds.add(c.getAttribute('data-id'));
            });
            updateBulkUI();
        });
    }

    // Modal
    btnCancelModal.onclick = () => modal.classList.add('hidden');
    btnCloseModal.onclick = () => modal.classList.add('hidden');
    btnConfirmModal.addEventListener('click', () => {
        if(modalTextArea.value.trim() === "") { alert("Motivo obrigatório."); return; }
        modal.classList.add('hidden');
        if(actionTargetRow) actionTargetRow.remove();
    });

    // Inicialização
    init();
});