:root {
    --bg-light: #f0f9ff;
    --brand-blue: #0ea5e9;
    --brand-hover: #0284c7;
    --white: #ffffff;
    --text-dark: #0f172a;
    --text-muted: #64748b;
}

body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-light);
    color: var(--text-dark);
}

.btn-primary {
    background: var(--brand-blue);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
}

.btn-primary:hover {
    background: var(--brand-hover);
    transform: translateY(-2px);
}