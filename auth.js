// CONFIGURAÇÃO DO SUPABASE
// A chave 'anon' (public) é segura no front-end desde que o RLS esteja ativo no banco.
const supabaseUrl = 'https://yhumhqwbllqljzztkkrl.supabase.co';
const supabaseKey = 'sb_publishable_cSr2_fWj8PgdFcsteEXDEQ__JdOU0jA';

// Inicializa o cliente
let sb;
if (typeof supabase !== 'undefined') {
    sb = supabase.createClient(supabaseUrl, supabaseKey);
} else {
    console.error("ERRO CRÍTICO: A biblioteca do Supabase não carregou.");
    // Tenta avisar na tela se houver uma div de mensagem
    const msg = document.getElementById('message');
    if (msg) msg.innerText = "Erro ao carregar sistema.";
}

// --- FUNÇÃO DE LOGIN ---
async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('message');

    // Limpa estados anteriores
    if (msg) {
        msg.innerText = "Conectando...";
        msg.style.color = "#666";
    }

    if (!email || !password) {
        if (msg) {
            msg.innerText = "Preencha e-mail e senha.";
            msg.style.color = "#d4af37"; // Dourado
        }
        return;
    }

    // Tenta o Login
    const { data, error } = await sb.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error("Erro de Login:", error);
        if (msg) {
            msg.innerText = "E-mail ou senha incorretos.";
            msg.style.color = "#a83232"; // Vermelho
        }
    } else {
        if (msg) {
            msg.innerText = "Sucesso! Entrando...";
            msg.style.color = "#2e7d32"; // Verde
        }
        // Redireciona
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    }
}

// --- FUNÇÃO DE LOGOUT (Para usar na dashboard) ---
async function handleLogout() {
    await sb.auth.signOut();
    window.location.href = "login.html";
}

// --- VERIFICAÇÃO DE SESSÃO ---
// Se estiver na dashboard, verifica se o usuário realmente está logado
if (window.location.pathname.includes('dashboard.html')) {
    checkSession();
}

async function checkSession() {
    const { data: { session } } = await sb.auth.getSession();
    
    if (!session) {
        // Se não tem sessão, chuta de volta pro login
        window.location.href = "login.html";
    } else {
        // Se quiser mostrar o e-mail na tela:
        const userDisplay = document.getElementById('user-display');
        if (userDisplay && session.user) {
            userDisplay.innerText = session.user.email;
        }
    }
}