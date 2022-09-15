let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');

//Alterar Tema
var bodyWhiteMode = document.querySelector('body');
var labelWhiteMode = document.querySelector('.label');
var ballWhiteMode = document.querySelector('.ball');
var conteudoWhiteMode = document.querySelector('.conteudo');
var inputWhiteMode = document.querySelector('#inputNovaTarefa'); 
var btnAddTarefaWhiteMode = document.querySelector('#btnAddTarefa'); 
var listaTarefasWhiteMode = document.querySelector('#listaTarefas'); 
var listaTarefasLiWhiteMode = document.querySelector('liTarefas')


function changeClasses () {
    bodyWhiteMode.classList.toggle(whiteModeClass);
    labelWhiteMode.classList.toggle(whiteModeClass);
    ballWhiteMode.classList.toggle(whiteModeClass);
    conteudoWhiteMode.classList.toggle(whiteModeClass);
    inputWhiteMode.classList.toggle(whiteModeClass);
    btnAddTarefaWhiteMode.classList.toggle(whiteModeClass);
    listaTarefasWhiteMode.classList.toggle(whiteModeClass);
    listaTarefasLiWhiteMode.classList.toggle(whiteModeClass);
       
    
}

const whiteModeClass = 'white-mode';


const chk = document.querySelector('#chk');
chk.addEventListener('change', changeClasses);

// Ação dos botoes

inputNovaTarefa.addEventListener('keypress', (e) => {

    if(e.keyCode == 13) {
        let tarefa = {
            nome: inputNovaTarefa.value, 
            id: gerarId(),
        }
        adicionarTarefa(tarefa);
    }
});

janelaEdicaoBtnFechar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
})

btnAddTarefa.addEventListener('click', (e) => {
    let tarefa = {
        nome: inputNovaTarefa.value, 
        id: gerarId(),
    }
    adicionarTarefa(tarefa);
})

btnAtualizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();

    let idTarefa = idTarefaEdicao.innerHTML.replace('#', '');

    let tarefa = {
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById(''+idTarefa+'');

    if(tarefaAtual) {
        let li = criarTagLI(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!')
    }
});

//Gerar ID
function gerarId() {
    return Math.floor(Math.random() * 3000);
}


// Adicionar tarefa ao HTML
function adicionarTarefa(tarefa) {
    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);
    inputNovaTarefa.value = '';
}

function criarTagLI(tarefa) {
    let li = document.createElement('li');
    li.classList.add('liTarefa');
    li.id = tarefa.id;
    

    let span = document.createElement('span');
    span.classList.add('textTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = ('<i class="fa-solid fa-trash-can"></i>');
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;

}

function editar(idTarefa) {
    let li = document.getElementById(''+ idTarefa + '');
    if(li) {
        idTarefaEdicao.innerHTML = '#' + idTarefa;
        inputTarefaNomeEdicao.value = li.innerText;
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!')
    }
    
}

function excluir(idTarefa) {
    let confirmacao = window.confirm('Tem certeza que deseja excluir? ');
    if(confirmacao) {
        let li = document.getElementById(''+ idTarefa + '');
        if(li) {
            listaTarefas.removeChild(li);
        }
    } else {
        alert('Elemento HTML não encontrado!')
    }
}

function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}