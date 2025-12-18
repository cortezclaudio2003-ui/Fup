const supabaseUrl = 'https://yhumhqwbllqljzztkkrl.supabase.co';
const supabaseKey = 'sb_publishable_cSr2_fWj8PgdFcsteEXDEQ__JdOU0jA';
const sb = supabase.createClient(supabaseUrl, supabaseKey);

// Verifica se o usuário está logado
async function checkAuth() {
    const { data: { user } } = await sb.auth.getUser();
    return user;
}

// Atualiza a navbar baseado no estado de login
async function updateNavbar() {
    const user = await checkAuth();
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (user) {
            navbar.classList.add('user-logged-in');
            navbar.classList.remove('user-logged-out');
        } else {
            navbar.classList.add('user-logged-out');
            navbar.classList.remove('user-logged-in');
        }
    }
}

// Login function
async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('message');

    msg.innerText = "Autenticando...";
    msg.style.color = "#0ea5e9";

    try {
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (error) {
            msg.innerText = "Erro: " + error.message;
            msg.style.color = "#ef4444";
        } else {
            msg.innerText = "Bem-vindo! Redirecionando...";
            msg.style.color = "#10b981";
            
            // Atualiza navbar e redireciona
            await updateNavbar();
            setTimeout(() => window.location.href = "dashboard.html", 1000);
        }
    } catch (e) {
        msg.innerText = "Erro de conexão.";
        msg.style.color = "#ef4444";
    }
}

// Logout function
async function handleLogout() {
    try {
        await sb.auth.signOut();
        await updateNavbar();
        window.location.href = "index.html";
    } catch (error) {
        console.error('Erro no logout:', error);
        window.location.href = "index.html";
    }
}

// Protege rotas que requerem login
async function protectRoute() {
    const user = await checkAuth();
    if (!user && (window.location.pathname.includes('dashboard.html'))) {
        window.location.href = "login.html";
    }
}

// Inicializa quando o DOM carrega
document.addEventListener('DOMContentLoaded', async () => {
    await updateNavbar();
    
    // Verifica se precisa proteger a rota atual
    if (window.location.pathname.includes('dashboard.html')) {
        await protectRoute();
    }
});