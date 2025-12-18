function irParaLogin() {
    const intro = document.querySelector('.intro-screen');
    intro.style.transition = "opacity 0.6s ease";
    intro.style.opacity = "0";
    setTimeout(() => {
        window.location.href = "login.html";
    }, 600);
}

// Redireciona automaticamente após 4 segundos
const autoRedirect = setTimeout(irParaLogin, 4000);

// Redireciona ao clicar em qualquer lugar
window.addEventListener('click', () => {
    clearTimeout(autoRedirect);
    irParaLogin();
});