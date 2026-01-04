document.addEventListener('DOMContentLoaded', () => {
    
    // --- ESTADO ---
    let itensContrato = [];

    // --- AUTO PREENCHIMENTO ---
    const inputInicio = document.getElementById('inputInicio');
    const inputFim = document.getElementById('inputFim');
    const txtDataCriacao = document.getElementById('txtDataCriacao');
    const inputTitulo = document.getElementById('inputTitulo');
    const mirrorTitulo = document.getElementById('mirrorTitulo');

    if (inputInicio) {
        const hoje = new Date();
        txtDataCriacao.innerText = hoje.toLocaleString('pt-BR'); // Ex: 11/12/2025 15:00:38
        
        inputInicio.value = hoje.toISOString().split('T')[0];
        
        const anoQueVem = new Date();
        anoQueVem.setFullYear(hoje.getFullYear() + 1);
        inputFim.value = anoQueVem.toISOString().split('T')[0];
    }

    // Espelhar Título na Grid
    if(inputTitulo) {
        inputTitulo.addEventListener('input', (e) => {
            mirrorTitulo.innerText = e.target.value || "...";
        });
    }

    // --- MODAL ITEM ---
    const modalItem = document.getElementById('modalItem');
    const btnAdicionarItem = document.getElementById('btnAdicionarItem');
    const btnCancelModal = document.querySelector('.btn-modal-cancel');
    const btnConfirmItem = document.getElementById('btnConfirmarItem');

    if(btnAdicionarItem) {
        btnAdicionarItem.addEventListener('click', () => {
            // Limpa campos
            document.getElementById('mdlDescricao').value = '';
            document.getElementById('mdlQtd').value = '1';
            document.getElementById('mdlPreco').value = '';
            modalItem.style.display = 'flex';
        });
    }

    if(btnCancelModal) {
        btnCancelModal.addEventListener('click', () => modalItem.style.display = 'none');
    }

    if(btnConfirmItem) {
        btnConfirmItem.addEventListener('click', () => {
            const desc = document.getElementById('mdlDescricao').value;
            const cod = document.getElementById('mdlCodigo').value;
            const un = document.getElementById('mdlUn').value;
            const qtd = parseFloat(document.getElementById('mdlQtd').value) || 0;
            const preco = parseFloat(document.getElementById('mdlPreco').value) || 0;

            if(!desc || qtd <= 0 || preco <= 0) {
                alert('Preencha os dados do item corretamente.');
                return;
            }

            const novoItem = {
                itemIdx: itensContrato.length + 1,
                codCliente: cod,
                codigo: cod, // Simplificação
                descricao: desc,
                un: un,
                preco: preco,
                quantidade: qtd,
                total: qtd * preco,
                status: 'Ativo',
                cotacao: Math.floor(2000000 + Math.random() * 900000)
            };

            itensContrato.push(novoItem);
            atualizarTabelaItens();
            modalItem.style.display = 'none';
        });
    }

    // --- RENDERIZAR TABELA ---
    function atualizarTabelaItens() {
        const tbody = document.getElementById('tbodyItens');
        const lblTotal = document.getElementById('lblTotalHeader');
        const inputValorLimite = document.getElementById('inputValorLimite');
        const cntItens = document.getElementById('cntItens');
        
        tbody.innerHTML = '';
        let totalGeral = 0;

        itensContrato.forEach((item, index) => {
            totalGeral += item.total;
            const tr = document.createElement('tr');
            
            // Formatando moeda
            const precoFmt = item.preco.toLocaleString('pt-BR', {minimumFractionDigits: 6});
            const qtdFmt = item.quantidade.toLocaleString('pt-BR', {minimumFractionDigits: 6});

            tr.innerHTML = `
                <td style="text-align:center;"><input type="checkbox"></td>
                <td style="text-align:center;">${item.itemIdx}</td>
                <td>${item.codCliente}</td>
                <td>${item.codigo}</td>
                <td>${item.descricao}</td>
                <td>${item.un}</td>
                <td>${precoFmt}</td>
                <td>${qtdFmt}</td>
                <td style="text-align:center;"><span class="status-dot"></span></td>
                <td style="text-align:center;">
                    ${item.cotacao} 
                    <span class="material-icons-outlined" style="font-size:14px; margin-left:5px; cursor:pointer;">edit</span>
                    <span class="material-icons-outlined" style="font-size:14px; margin-left:5px; cursor:pointer; color:red;" onclick="removerItem(${index})">delete</span>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Atualiza Header
        const totalFormatado = totalGeral.toLocaleString('pt-BR', {style:'currency', currency:'BRL', minimumFractionDigits: 2});
        lblTotal.innerText = totalFormatado;
        if(cntItens) cntItens.innerText = itensContrato.length;
        
        // Atualiza input de valor limite se estiver vazio
        if(inputValorLimite && (!inputValorLimite.value || inputValorLimite.value == 0)) {
            inputValorLimite.value = totalGeral.toFixed(2);
        }
    }

    // Função global para remover
    window.removerItem = function(index) {
        itensContrato.splice(index, 1);
        // Reindexar
        itensContrato.forEach((item, i) => item.itemIdx = i + 1);
        atualizarTabelaItens();
    };

    // --- SALVAR CONTRATO ---
    const form = document.getElementById('formNovoContrato');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const titulo = document.getElementById('inputTitulo').value;
            const fornecedor = document.getElementById('inputFornecedor').value;
            
            if(!titulo || !fornecedor) {
                alert('Preencha o Título e o Fornecedor no banner superior.');
                return;
            }

            // Gera ID SAP fictício (estilo 4600...)
            const novoId = `4600${Math.floor(100000 + Math.random() * 900000)}`;
            const valorTotal = itensContrato.reduce((acc, i) => acc + i.total, 0);

            const novoContrato = {
                id: novoId,
                objeto: titulo,
                fornecedor: fornecedor,
                tipo: document.getElementById('selectCategoria').value,
                valor: valorTotal,
                inicio: document.getElementById('inputInicio').value,
                fim: document.getElementById('inputFim').value,
                status: "Ativo", // Já nasce aprovado conforme regra
                itens: itensContrato
            };

            // Salva
            const contratosExistentes = JSON.parse(localStorage.getItem('vivara_contratos')) || [];
            contratosExistentes.unshift(novoContrato);
            localStorage.setItem('vivara_contratos', JSON.stringify(contratosExistentes));

            // Simula loading
            const btnSave = document.querySelector('.btn-final-save');
            btnSave.innerText = "Salvando...";
            
            setTimeout(() => {
                alert(`Contrato ${novoId} criado com sucesso!`);
                window.location.href = 'Pg_Contratos.html';
            }, 800);
        });
    }
});