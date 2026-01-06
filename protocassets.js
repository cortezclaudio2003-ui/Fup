document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigoAtivo = urlParams.get('cod');

    if (!codigoAtivo) {
        console.warn("Nenhum código de ativo identificado na URL.");
    }

    // Preenche Data Atual
    const dateField = document.getElementById('dataEntrega');
    if (dateField) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const dd = String(today.getDate()).padStart(2, '0');
        dateField.value = `${yyyy}-${mm}-${dd}`;
    }
});

// Precisamos dos dados de exemplo aqui também para encontrar as informações caso seja um item Mock
const dadosMockadosRef = [
    { codInterno: 'AT-001', equipamento: 'Balança D500', modelo: 'ATX224', nSerie: 'SN-998877', notaFiscal: 'NF-102030', dataEmissao: '2023-05-10', dataRegistro: '2023-06-20', criadoPor: 'Admin' },
    { codInterno: 'AT-002', equipamento: 'Paquímetro Digital', modelo: '500-196', nSerie: 'SN-112233', notaFiscal: 'NF-5599', dataEmissao: '2023-11-15', dataRegistro: '2024-01-12', criadoPor: 'Roberto.M' }
];

function salvarProtocolo() {
    // 1. Coleta Inputs da Entrega
    const dataEntrega = document.getElementById('dataEntrega').value;
    const setor = document.getElementById('setorEntrega').value;
    const responsavel = document.getElementById('respRecebimento').value;
    const urlParams = new URLSearchParams(window.location.search);
    const codigoAtivo = urlParams.get('cod'); 

    if (!dataEntrega || !setor || !responsavel) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }
    if (!codigoAtivo) {
        alert("Erro: Código não identificado.");
        return;
    }

    // 2. BUSCAR DADOS COMPLETOS DO ATIVO (Snapshot)
    // Procura no localStorage OU nos Mocks
    let assetsDB = JSON.parse(localStorage.getItem('sgqAssetsDB')) || [];
    const todosAtivos = [...assetsDB, ...dadosMockadosRef];
    
    // Encontra o objeto original para copiar seus dados
    const ativoOriginal = todosAtivos.find(a => a.codInterno === codigoAtivo) || {};

    // 3. CRIAR OBJETO COMPLETO DO PROTOCOLO
    const novoProtocolo = {
        id: Date.now(),
        // Dados da Entrega
        dataEntrega: dataEntrega,
        setor: setor,
        responsavel: responsavel,
        
        // Dados do Ativo (Copiados para o histórico)
        codigoAtivo: codigoAtivo,
        equipamento: ativoOriginal.equipamento || '-',
        modelo: ativoOriginal.modelo || '-',
        nSerie: ativoOriginal.nSerie || '-',
        notaFiscal: ativoOriginal.notaFiscal || '-'
    };

    // 4. SALVAR NO HISTÓRICO
    let historicoDB = JSON.parse(localStorage.getItem('sgqProtocolosDB')) || [];
    historicoDB.push(novoProtocolo);
    localStorage.setItem('sgqProtocolosDB', JSON.stringify(historicoDB));

    // 5. REMOVER DA LISTA DE ATIVOS
    if (assetsDB.length > 0) {
        const index = assetsDB.findIndex(item => item.codInterno === codigoAtivo);
        if (index > -1) {
            assetsDB.splice(index, 1);
            localStorage.setItem('sgqAssetsDB', JSON.stringify(assetsDB));
        }
    }

    // 6. Exibir Feedback
    mostrarModalSucesso();
}

function mostrarModalSucesso() {
    const modal = document.getElementById('modalSucesso');
    if(modal) {
        modal.classList.add('active');
        setTimeout(() => {
            window.location.href = 'assetspage.html';
        }, 2000);
    }
}