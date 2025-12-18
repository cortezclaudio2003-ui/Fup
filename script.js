window.addEventListener('DOMContentLoaded', () => {
    
    // Simulação de inicialização de sistemas da empresa
    console.log("Fup: Iniciando protocolos de segurança...");

    // Definimos o tempo total da intro (4 segundos)
    setTimeout(() => {
        const wrapper = document.querySelector('.loader-wrapper');
        
        // Transição de saída elegante (subida com fade)
        wrapper.style.transition = "all 1s cubic-bezier(0.77, 0, 0.175, 1)";
        wrapper.style.transform = "translateY(-20px)";
        wrapper.style.opacity = "0";

        setTimeout(() => {
            // Aqui você redireciona para o login ou Dashboard do Fup
            console.log("Acesso autorizado. Bem-vindo ao Fup.");
            // window.location.href = "dashboard.html"; 
        }, 1000);

    }, 4000);
});