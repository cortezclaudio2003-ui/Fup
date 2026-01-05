document.addEventListener('DOMContentLoaded', () => {
    
    // Tempo total: 1s (aparecer logo) + 2.5s (encher barra) + 0.5s (respiro)
    // Total = 4000ms (4 segundos)
    
    setTimeout(() => {
        // Redireciona para o login
        window.location.href = 'login.html';
    }, 4000);

});