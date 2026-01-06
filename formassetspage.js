document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formNovoAtivo');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Pequeno detalhe UX: Definir data de aquisição para hoje por padrão
    const dataAqInput = document.getElementById('dataAquisicao');
    if (dataAqInput) {
        dataAqInput.valueAsDate = new Date();
    }
});

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    
    // Feedback visual imediato no botão
    const btnSubmit = document.querySelector('.btn-primary');
    const originalText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = '<span class="material-icons-outlined" style="animation: spin 1s linear infinite;">refresh</span> Salvando...';
    btnSubmit.disabled = true;

    // 1. Coletar dados
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 2. Simular processamento (Delay)
    setTimeout(() => {
        // 3. Lógica de Negócio (Mock ID)
        const nextId = Math.floor(Math.random() * 10000);
        const prefix = data.fabrica && data.fabrica.includes('JOIA') ? 'JOIA' : 'LIFE';
        data.codInterno = `${prefix}-${nextId}`;
        data.criadoPor = "Usuário Atual";
        data.status = "Ativo";

        // 4. Salvar LocalStorage
        let currentDB = JSON.parse(localStorage.getItem('sgqAssetsDB')) || [];
        currentDB.push(data);
        localStorage.setItem('sgqAssetsDB', JSON.stringify(currentDB));

        // 5. Sucesso
        alert(`Sucesso!\nAtivo registrado sob código: ${data.codInterno}`);
        
        // Redirecionar
        window.location.href = 'assetspage.html';
        
    }, 800); // 800ms delay para parecer processamento real
}

// CSS Injection para animação de loading no JS (opcional, mas legal)
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(style);