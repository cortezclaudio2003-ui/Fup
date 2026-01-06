document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Define Data de Hoje automaticamente
    const dateField = document.getElementById('registrationDate');
    if(dateField) {
        const today = new Date().toISOString().split('T')[0];
        dateField.value = today;
    }

    // 2. Navegação (Botões Voltar/Cancelar)
    const goBack = () => {
        window.location.href = 'assetspage.html';
    };

    const btnBack = document.getElementById('btnBack');
    const btnCancel = document.getElementById('btnCancel');
    
    if(btnBack) btnBack.addEventListener('click', goBack);
    if(btnCancel) btnCancel.addEventListener('click', goBack);

    // 3. Captura do Formulário
    const form = document.getElementById('assetsForm');
    
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Objeto com os campos exatos solicitados
            const formData = {
                id: Date.now(), // ID único interno
                codInterno: document.getElementById('internalCode').value,
                equipamento: document.getElementById('equipment').value,
                fabrica: document.getElementById('factory').value, // Campo Novo
                marca: document.getElementById('brand').value,
                modelo: document.getElementById('model').value,
                capacidade: document.getElementById('capacity').value,
                nSerie: document.getElementById('serialNumber').value,
                notaFiscal: document.getElementById('invoice').value,
                dataCadastro: document.getElementById('registrationDate').value
            };

            // Salva no LocalStorage
            try {
                const existingData = JSON.parse(localStorage.getItem('sgqAssetsDB')) || [];
                existingData.push(formData);
                localStorage.setItem('sgqAssetsDB', JSON.stringify(existingData));
                
                alert('Ativo registrado com sucesso!');
                goBack(); 
            } catch (error) {
                console.error('Erro ao salvar:', error);
                alert('Erro ao salvar o registro.');
            }
        });
    }
});