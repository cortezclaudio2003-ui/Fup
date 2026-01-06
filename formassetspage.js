document.addEventListener('DOMContentLoaded', function() {
    // Inicializa a Data de Registro com a data atual
    const dateField = document.getElementById('dataRegistro');
    
    if (dateField) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const dd = String(today.getDate()).padStart(2, '0');
        dateField.value = `${yyyy}-${mm}-${dd}`;
    }
});

function salvarAtivo() {
    // 1. Coletar os valores dos inputs
    const codInterno = document.getElementById('codInterno').value;
    const equipamento = document.getElementById('equipamento').value;
    const modelo = document.getElementById('modelo').value;
    const nSerie = document.getElementById('nSerie').value;
    const notaFiscal = document.getElementById('notaFiscal').value;
    const dataEmissao = document.getElementById('dataEmissao').value;
    const dataRegistro = document.getElementById('dataRegistro').value;
    const criadoPor = document.getElementById('criadoPor').value;

    // 2. Validação Simples (Campos Obrigatórios)
    if (!codInterno || equipamento === "" || !nSerie) {
        alert("Por favor, preencha os campos obrigatórios (Código, Equipamento e Nº Série).");
        return;
    }

    // 3. Criar o Objeto do Ativo
    const novoAtivo = {
        codInterno: codInterno,
        equipamento: equipamento,
        modelo: modelo,
        nSerie: nSerie,
        notaFiscal: notaFiscal,
        dataEmissao: dataEmissao,
        dataRegistro: dataRegistro,
        criadoPor: criadoPor
    };

    // 4. Salvar no LocalStorage (Mesma chave usada na assetspage.js)
    let assetsDB = JSON.parse(localStorage.getItem('sgqAssetsDB')) || [];
    
    // Verifica se já existe um código igual (opcional, evita duplicidade)
    const existe = assetsDB.some(item => item.codInterno === codInterno);
    if(existe) {
        alert("Erro: Já existe um ativo cadastrado com este Código Interno.");
        return;
    }

    assetsDB.push(novoAtivo);
    localStorage.setItem('sgqAssetsDB', JSON.stringify(assetsDB));

    // 5. Feedback e Redirecionamento
    alert("Ativo cadastrado com sucesso!");
    window.location.href = 'assetspage.html';
}