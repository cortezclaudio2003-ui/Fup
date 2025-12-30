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
        contratos: [{ id: 'todos', label: 'Todos' }],
        bloqueios: [{ id: 'todos', label: 'Todos' }]
    };

    // --- DADOS MOCKADOS ---
    const mockData = [
        { type: 'cadastros', sub: 'ativos', id: 'AT-001', desc: 'Notebook Dell', details: 'TI / Hardware', user: 'Roberto', date: '30/12/2025', status: 'Novo', stClass: 'st-new' },
        { type: 'cadastros', sub: 'fornecedores', id: 'FOR-992', desc: 'Tech Solutions Ltda', details: 'CNPJ: 12.xxx', user: 'Maria', date: '29/12/2025', status: 'Novo', stClass: 'st-new' },
        { type: 'cadastros', sub: 'itens', id: 'IT-550', desc: 'Cabo HDMI', details: 'Material Consumo', user: 'Almox.', date: '28/12/2025', status: 'Novo', stClass: 'st-new' },
        { type: 'pedidos', sub: 'pendentes', id: 'PED-100', desc: 'Compra Licenças', details: 'R$ 5.000,00', user: 'TI', date: '25/12/2025', status: 'Pendente', stClass: 'st-urgent' },
        { type: 'pedidos', sub: 'pendentes', id: 'PED-101', desc: 'Mobiliário', details: 'R$ 12.000,00', user: 'RH', date: '24/12/2025', status: 'Pendente', stClass: 'st-urgent' },
        { type: 'pedidos', sub: 'historico', id: 'PED-090', desc: 'Material Limpeza', details: 'R$ 500,00', user: 'Facilities', date: '10/11/2025', status: 'Aprovado', stClass: 'st-history' },
        { type: 'bloqueios', sub: 'todos', id: 'BLK-22', desc: 'Forn. Logística SA', details: 'Pendência Fiscal', user: 'Fiscal', date: '01/12/2025', status: 'Bloqueado', stClass: 'st-urgent' }
    ];

    // --- DOM REFERENCES ---
    const mainTabs = document.querySelectorAll('.tab-item');
    const subNavContainer = document.getElementById('sub-navigation');
    const gridBody = document.getElementById('approval-grid');
    const checkAll = document.getElementById('check-all');
    const bulkActions = document.getElementById('bulk-actions');
    const selectedCountSpan = document.getElementById('selected-count');
    
    // Filtros
    const filterButtons = document.querySelectorAll('.btn-filter');
    const dropdownTemplate = document.getElementById('filter-dropdown-template');

    // Modal
    const modal = document.getElementById('modal-me');
    const modalDocRef = document.getElementById('modal-doc-ref');
    const modalTextArea = document.getElementById('modal-text');
    const btnCancelModal = document.getElementById('btn-cancel-modal');
    const btnCloseModal = document.getElementById('btn-close');
    const btnConfirmModal = document.getElementById('btn-confirm-modal');

    // STATE
    let currentMain = 'cadastros';
    let currentSub = 'ativos'; 
    let selectedIds = new Set();
    let actionTargetRow = null;
    
    // Estado dos Filtros Excel (Múltipla escolha)
    let activeFilters = {}; 
    let activeDropdown = null; 

    // --- FUNÇÕES DE INICIALIZAÇÃO ---

    function init() {
        // Inicializa listeners globais para fechar dropdown
        document.addEventListener('click', (e) => {
            if (activeDropdown && !activeDropdown.contains(e.target) && !e.target.classList.contains('btn-filter')) {
                closeDropdown();
            }
        });

        // Configura botões de filtro
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Impede fechar ao clicar
                const col = btn.getAttribute('data-col');
                toggleFilterDropdown(btn, col);
            });
        });

        renderSubTabs('cadastros');
    }

    // --- LÓGICA DE FILTROS TIPO EXCEL ---

    function toggleFilterDropdown(btn, columnKey) {
        if (activeDropdown && activeDropdown.dataset.col === columnKey) {
            closeDropdown();
            return;
        }
        closeDropdown(); 

        const currentTabData = getTabData(); 
        const uniqueValues = new Set();
        currentTabData.forEach(item => {
            let val = item[columnKey];
            if (columnKey === 'doc') val = item.id; 
            if (val) uniqueValues.add(val);
        });
        const sortedValues = Array.from(uniqueValues).sort();

        const dropdown = dropdownTemplate.cloneNode(true);
        dropdown.id = ''; 
        dropdown.classList.remove('hidden');
        dropdown.dataset.col = columnKey;

        const listContainer = dropdown.querySelector('.filter-options-list');
        
        const isAllSelected = !activeFilters[columnKey] || activeFilters[columnKey].length === 0;
        
        const divAll = document.createElement('label');
        divAll.className = 'filter-option-item';
        divAll.innerHTML = `<input type="checkbox" value="ALL" ${isAllSelected ? 'checked' : ''}> (Selecionar Tudo)`;
        listContainer.appendChild(divAll);

        sortedValues.forEach(val => {
            const isChecked = isAllSelected || (activeFilters[columnKey] && activeFilters[columnKey].includes(val));
            const label = document.createElement('label');
            label.className = 'filter-option-item';
            label.innerHTML = `<input type="checkbox" value="${val}" ${isChecked ? 'checked' : ''}> ${val}`;
            listContainer.appendChild(label);
        });

        // Eventos internos do Dropdown
        const checkInputs = listContainer.querySelectorAll('input[type="checkbox"]');
        const checkAllInput = checkInputs[0]; 

        checkAllInput.addEventListener('change', (e) => {
            const checked = e.target.checked;
            for(let i=1; i<checkInputs.length; i++) checkInputs[i].checked = checked;
        });

        const searchInput = dropdown.querySelector('.filter-search-input');
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const labels = listContainer.querySelectorAll('label:not(:first-child)');
            labels.forEach(lbl => {
                const txt = lbl.textContent.toLowerCase();
                lbl.style.display = txt.includes(term) ? 'flex' : 'none';
            });
        });

        dropdown.querySelector('.btn-filter-apply').addEventListener('click', () => {
            const selected = [];
            let allChecked = true;
            for(let i=1; i<checkInputs.length; i++) {
                if (checkInputs[i].checked) selected.push(checkInputs[i].value);
                else allChecked = false;
            }

            if (allChecked || selected.length === 0) {
                delete activeFilters[columnKey];
                btn.classList.remove('active-filter');
            } else {
                activeFilters[columnKey] = selected;
                btn.classList.add('active-filter');
            }

            renderGrid();
            closeDropdown();
        });

        dropdown.querySelector('.btn-filter-clear').addEventListener('click', () => {
            delete activeFilters[columnKey];
            btn.classList.remove('active-filter');
            renderGrid();
            closeDropdown();
        });

        document.body.appendChild(dropdown);
        const rect = btn.getBoundingClientRect();
        dropdown.style.top = (rect.bottom + window.scrollY + 5) + 'px';
        dropdown.style.left = (rect.left + window.scrollX) + 'px';
        
        activeDropdown = dropdown;
    }

    function closeDropdown() {
        if (activeDropdown) {
            activeDropdown.remove();
            activeDropdown = null;
        }
    }

    // --- RENDERIZAÇÃO E DADOS ---

    function getTabData() {
        return mockData.filter(item => {
            const matchMain = item.type === currentMain;
            let matchSub = false;
            if (currentMain === 'pedidos') {
                if (currentSub === 'todos') matchSub = true;
                else if (currentSub === 'pendentes') matchSub = (item.sub === 'pendentes');
                else if (currentSub === 'historico') matchSub = (item.sub === 'historico');
            } else {
                matchSub = (item.sub === currentSub || currentSub === 'todos');
            }
            return matchMain && matchSub;
        });
    }

    function renderSubTabs(mainKey) {
        subNavContainer.innerHTML = '';
        const subs = subCategories[mainKey] || [];
        
        if (subs.length > 0) currentSub = subs[0].id; 

        subs.forEach((sub, index) => {
            const btn = document.createElement('button');
            btn.className = `sub-pill ${index === 0 ? 'active' : ''}`;
            btn.innerText = sub.label;
            
            btn.addEventListener('click', () => {
                document.querySelectorAll('.sub-pill').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentSub = sub.id;
                activeFilters = {}; 
                document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active-filter'));
                renderGrid();
            });
            
            subNavContainer.appendChild(btn);
        });

        renderGrid();
    }

    function renderGrid() {
        gridBody.innerHTML = '';
        selectedIds.clear();
        updateBulkUI();
        if(checkAll) checkAll.checked = false;

        let items = getTabData();

        items = items.filter(item => {
            for (const key in activeFilters) {
                const allowedValues = activeFilters[key];
                if (!allowedValues) continue;

                let itemVal = item[key];
                if (key === 'doc') itemVal = item.id; 

                if (!allowedValues.includes(itemVal)) {
                    return false; 
                }
            }
            return true;
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

    // ATUALIZADO: Esconde a toolbar inteira se não houver seleção
    function updateBulkUI() {
        selectedCountSpan.innerText = selectedIds.size;
        const toolbar = document.querySelector('.table-toolbar');
        if (toolbar) {
            toolbar.style.display = selectedIds.size > 0 ? 'flex' : 'none';
        }
    }

    function openRejectModal(docId, rowElement) {
        modal.classList.remove('hidden');
        modalDocRef.innerText = docId;
        modalTextArea.value = '';
        actionTargetRow = rowElement;
    }

    // --- EVENTOS GERAIS ---
    
    mainTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            mainTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentMain = tab.getAttribute('data-target');
            activeFilters = {}; 
            document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active-filter'));
            renderSubTabs(currentMain);
        });
    });

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

    btnCancelModal.onclick = () => modal.classList.add('hidden');
    btnCloseModal.onclick = () => modal.classList.add('hidden');
    btnConfirmModal.addEventListener('click', () => {
        if(modalTextArea.value.trim() === "") { alert("Motivo obrigatório."); return; }
        modal.classList.add('hidden');
        if(actionTargetRow) actionTargetRow.remove();
    });

    init();
});