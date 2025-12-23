// Verifica se já existem dados no LocalStorage, se não, cria alguns de exemplo
let dbCadastros = JSON.parse(localStorage.getItem('fup_cadastros')) || [
    { id: 1, nome: "Ana Pereira", email: "ana.p@fup.com", cargo: "Gerente", status: "Ativo" },
    { id: 2, nome: "Carlos Souza", email: "carlos.s@fup.com", cargo: "Analista", status: "Férias" }
];

document.addEventListener('DOMContentLoaded', () => {
    renderTable();

    // Listener para o formulário
    const form = document.getElementById('formCadastro');
    form.addEventListener('submit', salvarCadastro);
});

// Função para renderizar a tabela
function renderTable() {
    const tbody = document.querySelector('#tabelaCadastros tbody');
    tbody.innerHTML = ''; // Limpa tabela atual

    if (dbCadastros.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 48px; color: #999;">
                    <i class="ri-inbox-line" style="font-size: 2.5rem; display: block; margin-bottom: 12px;"></i>
                    Nenhum cadastro encontrado.
                </td>
            </tr>`;
    } else {
        dbCadastros.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.email}</td>
                <td>${item.cargo}</td>
                <td><span class="status-badge status-${item.status.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}">${item.status}</span></td>
                <td style="text-align: right;">
                    <button class="action-btn edit" onclick="editarCadastro(${item.id})" title="Editar"><i class="ri-pencil-line"></i></button>
                    <button class="action-btn delete" onclick="deletarCadastro(${item.id})" title="Excluir"><i class="ri-delete-bin-line"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
    
    // Atualiza contador
    document.getElementById('totalRecords').innerText = `${dbCadastros.length} registros encontrados`;
}

// Abrir Modal
function openModal() {
    document.getElementById('formCadastro').reset(); // Limpa formulário
    document.getElementById('editId').value = ''; // Limpa ID (modo criação)
    document.getElementById('modalTitle').innerText = 'Novo Cadastro';
    document.getElementById('modalOverlay').classList.add('active');
}

// Fechar Modal
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// Salvar (Criar ou Editar)
function salvarCadastro(e) {
    e.preventDefault();

    const id = document.getElementById('editId').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cargo = document.getElementById('cargo').value;
    const status = document.getElementById('status').value;

    if (id) {
        // Edição
        const index = dbCadastros.findIndex(item => item.id == id);
        if (index !== -1) {
            dbCadastros[index] = { id: Number(id), nome, email, cargo, status };
        }
    } else {
        // Criação (Gera ID baseado na data atual para ser único)
        const newId = Date.now();
        dbCadastros.push({ id: newId, nome, email, cargo, status });
    }

    // Salva no navegador e atualiza tela
    localStorage.setItem('fup_cadastros', JSON.stringify(dbCadastros));
    renderTable();
    closeModal();
}

// Preencher formulário para edição
function editarCadastro(id) {
    const item = dbCadastros.find(d => d.id === id);
    if (item) {
        document.getElementById('editId').value = item.id;
        document.getElementById('nome').value = item.nome;
        document.getElementById('email').value = item.email;
        document.getElementById('cargo').value = item.cargo;
        document.getElementById('status').value = item.status;
        
        document.getElementById('modalTitle').innerText = 'Editar Cadastro';
        document.getElementById('modalOverlay').classList.add('active');
    }
}

// Deletar
function deletarCadastro(id) {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
        dbCadastros = dbCadastros.filter(item => item.id !== id);
        localStorage.setItem('fup_cadastros', JSON.stringify(dbCadastros));
        renderTable();
    }
}

function logout() {
    window.location.href = "login.html";
}