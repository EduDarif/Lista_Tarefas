let tarefas = []; // Array para armazenar as tarefas

// Função para adicionar uma nova tarefa à lista
function adicionarTarefa() {
    const novaTarefa = document.getElementById('inputNovaTarefa').value.trim();
    if (!novaTarefa) {
        alert('Por favor, insira uma nova tarefa.'); 
        return; 
    }
    tarefas.push({ texto: novaTarefa, concluida: false }); 
    document.getElementById('inputNovaTarefa').value = ''; 
    exibirTarefas(); 
    salvarTarefas();
}
// Função para exibir as tarefas na lista
function exibirTarefas() {
    const listaTarefas = document.getElementById('listaTarefas');
    listaTarefas.innerHTML = ''; 
    // Itera sobre as tarefas no array
    tarefas.forEach((tarefa, index) => {
      if (!tarefa.concluida ||!checkboxEsconder.checked) {
        const li = document.createElement('li'); 
        // Define a estrutura HTML para exibir a tarefa e os botões de ação
        li.innerHTML = `
                  <span>${tarefa.texto}</span>
                  <div>
                      <button data-index="${index}" onclick="concluirEditarTarefa(${index})" class="botaoConcluir">Concluir</button>
                      <button data-index="${index}" onclick="concluirEditarTarefa(${index}, true)" class="botaoEditar">Editar</button>
                      <button data-index="${index}" onclick="excluirTarefa(${index})" class="botaoExcluir">Excluir</button>
                  </div>
              `;
        listaTarefas.appendChild(li);
      }
    });
    salvarTarefas();
  }
// Função para marcar uma tarefa como concluída ou editar uma tarefa existente
function concluirEditarTarefa(index, isEditar = false) {
    if (isEditar) {
        const novoTexto = prompt('Digite a nova descrição da tarefa:', tarefas[index].texto);
        if (novoTexto !== null) {
            tarefas[index].texto = novoTexto.trim();
            exibirTarefas();
            salvarTarefas();
        }
    } else {
        if (tarefas[index].concluida) {
            alert('Esta tarefa já está concluída.');
            return; 
        }
        tarefas[index].concluida = true;
        exibirTarefas();
        mostrarNotificacao('Tarefa concluída!');
        salvarTarefas();
    }
}
// Função para excluir uma tarefa da lista
function excluirTarefa(index) {
    tarefas.splice(index, 1);
    exibirTarefas();
}
// Função para esconder ou mostrar tarefas concluídas
function esconderTarefa() {
    const checkboxEsconder = document.getElementById('checkboxEsconder');
    const listaTarefas = document.getElementById('listaTarefas');
    if (checkboxEsconder.checked) { 
        listaTarefas.classList.add('ocultarConcluidas');
    } else {   
        listaTarefas.classList.remove('ocultarConcluidas');
    }
    exibirTarefas();
}
// Função para mostrar uma notificação na tela
function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div'); 
    notificacao.classList.add('notificacao');
    notificacao.textContent = mensagem; 
    document.body.appendChild(notificacao); 
    setTimeout(() => {
        notificacao.classList.add('visivel');
    }, 100);
    setTimeout(() => {
        notificacao.classList.remove('visivel');
        setTimeout(() => {
            notificacao.remove();
        }, 1000);
    }, 3000);
}
// Função para salvar as tarefas no local storage
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); 
}
// Função para carregar as tarefas do local storage ao carregar a página
function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas'); 
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas); 
        const checkboxEsconder = document.getElementById('checkboxEsconder');
        if (checkboxEsconder.checked) {
            document.getElementById('listaTarefas').classList.add('ocultarConcluidas');
        }
        exibirTarefas(); 
    }
}
// Evento executado quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    carregarTarefas();
});
