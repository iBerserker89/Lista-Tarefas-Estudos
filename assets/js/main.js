// Selecionando as classes do input, botão e lista.
const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');


// Cria e retorna um elemento 'li'.
function criaLi() {
    const li = document.createElement('li');
    return li;
}

// Limpa o campo e retorna o foco para o input:
function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

// Cria um botão para apagar tarefas:
function criaBotaoApagar(li) {
    // Adiciona espaço entre o texto e o botão
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = "Apagar";
    // Determina classe e nome da classe do elemento
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
}

// Insere o texto do input em uma nova 'li', criada por criaLi() e insere no elemento 'ul.tarefas'. 
function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    // Quando terminar de criar a tarefa limpa o input.
    limpaInput();
    // Cria um botão apagar quando adicionar uma nova tarefa.
    criaBotaoApagar(li);
    // Salvar tarefa:
    salvarTarefas();
}

// Capturando o evento da tecla "Enter".
inputTarefa.addEventListener('keypress', function(e) {
    // Se o código do botão pressionado for '13' (Enter) a tarefa também é criada.
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

// Capturando o evento do botão
// Criando função anônima, pq precisa ser uma função no 2º parâmetro
btnTarefa.addEventListener('click', function() {
    // Prevenindo o input de retornar valor, caso esteja vazio.
    if (!inputTarefa.value) return;

    // Função que vai criar nova tarefa, quando o botão for clicado:
    criaTarefa(inputTarefa.value);
});

// Captura o evento do botão 'apagar':
document.addEventListener('click', function(e) {
    // Mostra qual evento está sendo clicado.
    const el = e.target;

    // Se esse botão contém a classe 'apagar', apaga o elemento pai ('li').
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

// Salvar tarefa:
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

     // Obter o texto dentro das listas:
    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        // Substiui a palavra 'Apagar', que está no botão, por ' '.
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        // Transfere tarefaTexto para o array de listaDeTarefas:
        listaDeTarefas.push(tarefaTexto);
    }

    // Converte o array listaDeTarefas em .json:
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    // Salva o arquivo json com o nome 'tarefas' na memória local do navegador
    localStorage.setItem('tarefas', tarefasJSON);
}


function adicionaTarefasSalvas() {
    // Recupera o .json guardado na memória local do navegador:
    const tarefas = localStorage.getItem('tarefas');
    // Converte o arquivo json para string.
    const listaDeTarefas = JSON.parse(tarefas);

    // Chama a função criaTarefa, usando a string armazenada na memória local do navegador.
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();
