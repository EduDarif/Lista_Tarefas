let tarefas = []; // Array para armazenar as tarefas

// Função para adicionar uma nova tarefa à lista
function adicionarTarefa() {
    // Obtém o valor da nova tarefa e remove espaços em branco no início e no fim
    const novaTarefa = document.getElementById('inputNovaTarefa').value.trim();

    // Verifica se o campo está vazio
    if (!novaTarefa) {
        alert('Por favor, insira uma nova tarefa.'); // Exibe um alerta solicitando ao usuário inserir uma nova tarefa
        return; // Retorna para evitar a adição de uma tarefa vazia
    }

    tarefas.push({ texto: novaTarefa, concluida: false }); // Adiciona a nova tarefa ao array de tarefas

    document.getElementById('inputNovaTarefa').value = ''; // Limpa o campo de entrada

    exibirTarefas(); // Exibe as tarefas atualizadas na interface
}

// Função para exibir as tarefas na lista
function exibirTarefas() {
    const listaTarefas = document.getElementById('listaTarefas');
    listaTarefas.innerHTML = ''; // Limpa a lista antes de atualizá-la

    // Itera sobre as tarefas no array
    tarefas.forEach((tarefa, index) => {
        // Verifica se a tarefa não está concluída ou se a opção de ocultar tarefas concluídas não está ativada
        if (!tarefa.concluida || !checkboxEsconder.checked) {
            const li = document.createElement('li'); // Cria um elemento <li> para cada tarefa

            // Define a estrutura HTML para exibir a tarefa e os botões de ação
            li.innerHTML = `
                <span>${tarefa.texto}</span>
                <div>
                    <button onclick="concluirEditarTarefa(${index})" class="botaoConcluir">Concluir</button>
                    <button onclick="concluirEditarTarefa(${index}, true)" class="botaoEditar">Editar</button>
                    <button onclick="excluirTarefa(${index})" class="botaoExcluir">Excluir</button>
                </div>
            `;

            // Adiciona o elemento <li> à lista de tarefas
            listaTarefas.appendChild(li);
        }
    });
}

// Função para marcar uma tarefa como concluída ou editar uma tarefa existente
function concluirEditarTarefa(index, isEditar = false) {
    if (isEditar) {
        // Solicita ao usuário o novo texto para a tarefa
        const novoTexto = prompt('Digite a nova descrição da tarefa:', tarefas[index].texto);
        if (novoTexto !== null) {
            // Atualiza o texto da tarefa no array de tarefas
            tarefas[index].texto = novoTexto.trim();
        }
    } else {
        // Marca a tarefa como concluída no array de tarefas
        tarefas[index].concluida = true;

        // Exibe as tarefas atualizadas na interface
        exibirTarefas();

        // Mostra uma notificação de conclusão da tarefa
        mostrarNotificacao('Tarefa concluída!');
    }
}

// Função para excluir uma tarefa da lista
function excluirTarefa(index) {
    // Remove a tarefa do array de tarefas
    tarefas.splice(index, 1);

    // Exibe as tarefas atualizadas na interface
    exibirTarefas();
}

// Função para esconder ou mostrar tarefas concluídas
function esconderTarefa() {
    // Obtém o checkbox de ocultar tarefas concluídas
    const checkboxEsconder = document.getElementById('checkboxEsconder');
    const listaTarefas = document.getElementById('listaTarefas');

    if (checkboxEsconder.checked) {
        // Adiciona uma classe para ocultar tarefas concluídas
        listaTarefas.classList.add('ocultarConcluidas');
    } else {
        // Remove a classe de ocultar tarefas concluídas
        listaTarefas.classList.remove('ocultarConcluidas');
    }
    // Exibe as tarefas atualizadas na interface
    exibirTarefas();
}
// Função para mostrar uma notificação na tela
function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div'); // Cria um elemento <div> para a notificação
    notificacao.classList.add('notificacao');
    notificacao.textContent = mensagem; // Define o texto da notificação
    document.body.appendChild(notificacao); // Adiciona a notificação ao corpo do documento

    // Adiciona a classe 'visivel' após 100 milissegundos (efeito fade-in)
    setTimeout(() => {
        notificacao.classList.add('visivel');
    }, 100);

    // Remove a notificação após 3 segundos (efeito fade-out)
    setTimeout(() => {
        notificacao.classList.remove('visivel');
        setTimeout(() => {
            notificacao.remove();
        }, 1000);
    }, 3000);
}
// Evento executado quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    exibirTarefas(); // Exibe as tarefas ao carregar a página
});
