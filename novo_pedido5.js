/* --- Reset --- */
body {
    background-color: #F9FAFC; /* Fundo levemente cinza para contraste */
    margin: 0; padding: 0;
    font-family: 'Inter', sans-serif;
    color: #333; font-size: 12px;
    overflow-x: hidden;
}

/* --- Action Bar Top --- */
.actions-bar {
    display: flex; justify-content: space-between; padding: 12px 30px;
    border-bottom: 1px solid #DDD; background: #FFF;
    box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}
.left-actions, .right-actions { display: flex; gap: 15px; }

.action-btn {
    background: transparent; border: none; font-weight: 600; color: #555;
    cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 13px;
    padding: 5px 10px; border-radius: 4px; transition: background 0.2s;
}
.action-btn:hover { color: #000; background: #F0F0F0; }


/* --- Main Container (MODIFICADO PARA OCUPAR TELA TODA) --- */
.main-container {
    width: 98%; /* Ocupa 98% da tela */
    max-width: 100%; /* Remove limite de 1200px */
    margin: 20px auto; 
    padding: 0;
}

/* --- Hero Section (Bloco Laranja) --- */
.hero-section {
    display: flex; gap: 0; margin-bottom: 25px; align-items: stretch;
    background: #FFF; border: 1px solid #E0E0E0; border-radius: 6px; overflow: hidden;
    box-shadow: 0 2px 5px rgba(0,0,0,0.02);
}

/* Caixa Laranja Esquerda */
.id-box {
    background-color: #EFA674; 
    color: #FFF;
    padding: 20px 30px;
    min-width: 160px;
    display: flex; flex-direction: column; justify-content: center;
}
.id-label { font-size: 13px; opacity: 0.9; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;}
.id-value { font-size: 24px; font-weight: 700; }

/* Info Central */
.hero-info { 
    flex: 1; display: flex; flex-direction: column; justify-content: center; 
    padding: 20px 30px; border-right: 1px solid #EEE;
}
.hero-title { font-size: 18px; font-weight: 700; text-transform: uppercase; color: #333; margin-bottom: 5px;}
.hero-subtitle { font-size: 14px; font-weight: 600; color: #555; margin-bottom: 8px; }
.hero-user { display: flex; align-items: center; gap: 6px; color: #777; font-size: 12px; font-weight: 500;}

/* Status Direita */
.hero-status { 
    text-align: right; display: flex; flex-direction: column; justify-content: center; 
    padding: 20px 30px; min-width: 200px; background: #FAFAFA;
}
.total-value { font-size: 26px; font-weight: 700; color: #333; letter-spacing: -0.5px; }
.status-badge { 
    font-size: 13px; font-weight: 700; margin-top: 5px;
    color: #1A56DB; /* Azul */
    text-transform: uppercase; 
}
.created-date { font-size: 11px; color: #888; margin-top: 5px; }


/* --- Address Cards (MODIFICADO) --- */
/* Grid de 2 colunas que se esticam */
.address-row { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    gap: 25px; 
    margin-bottom: 25px; 
}

.address-card {
    background: #FFF;
    border: 1px solid #E0E0E0; border-radius: 6px; padding: 25px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}
.card-header-label { font-size: 11px; color: #999; margin-bottom: 8px; text-transform: uppercase; font-weight: 600;}
.card-code { font-size: 18px; font-weight: 700; color: #E67E22; margin-bottom: 12px; }
.address-lines p { margin: 6px 0; color: #555; display: flex; align-items: center; gap: 10px; font-size: 12px; }
.icon-tiny { font-size: 16px; color: #BBB; }

/* --- Sections (Accordion style) --- */
.section-block { margin-bottom: 25px; background: transparent; }
.section-title { 
    font-size: 15px; font-weight: 600; color: #333; margin-bottom: 15px; 
    display: flex; align-items: center; gap: 8px;
}
.toggle-orange { color: #E67E22; background: #FFF3E0; border-radius: 50%; padding: 3px; font-size: 18px; }
.status-inline { color: #1A56DB; font-weight: 700; margin-left: 5px; }
.expand-all { font-size: 11px; font-weight: 600; margin-left: auto; cursor: pointer; color: #666; display: flex; align-items: center; gap: 5px;}

/* Grid Info (MODIFICADO) */
.info-grid {
    display: grid; 
    grid-template-columns: repeat(4, 1fr); /* Mantém 4 colunas */
    gap: 30px; /* Aumenta o espaço entre colunas para preencher a tela */
    padding: 0 10px;
}
.field-box { display: flex; flex-direction: column; gap: 6px; }
.field-box label { font-size: 11px; color: #888; font-weight: 500; text-transform: uppercase; }
.field-box span { font-size: 13px; font-weight: 500; color: #222; }
.field-box.full { grid-column: span 4; margin-top: 10px; border-top: 1px dashed #DDD; padding-top: 15px;}
.attachment-link { color: #555; display: flex; align-items: center; gap: 5px; font-style: italic;}

/* Tabela Items Final (MODIFICADO) */
.table-container {
    background: #FFF; border: 1px solid #E0E0E0; border-radius: 6px; overflow: hidden;
}
.table-items-header {
    display: flex; padding: 12px 20px; border-bottom: 1px solid #DDD; background: #F8F8F8;
    font-weight: 600; color: #666; font-size: 11px; text-transform: uppercase;
}
.item-row-final {
    display: flex; padding: 15px 20px; border-bottom: 1px solid #EEE; align-items: center; font-size: 13px; background: #FFF;
}
.item-row-final:last-child { border-bottom: none; }
.badge-g { background:#FFA000; color:white; padding:2px 6px; border-radius:3px; font-size:10px; font-weight:bold; margin-right: 8px;}