let turmas = [];
let alunos = [];

function showMenu() {
  toggleScreen('menu-screen', 'Início');
}

function showRegistroFrequencia() {
  toggleScreen('frequencia-screen', 'Registro de Frequência');
  atualizarListaAlunos();
}

function showCadastrarTurma() {
  toggleScreen('cadastrar-turma-screen', 'Cadastrar Turma');
}

function showCadastrarAluno() {
  toggleScreen('cadastrar-aluno-screen', 'Cadastrar Aluno');
  atualizarSelectTurmas('aluno-turma');
}

function showRelatorioMensal() {
  toggleScreen('relatorio-screen', 'Relatório Mensal');
  atualizarSelectTurmas('relatorio-turma');
}

function toggleScreen(screenId, title) {
  document.querySelectorAll('.main .card').forEach(card => card.classList.add('hidden'));
  document.getElementById(screenId).classList.remove('hidden');
  document.getElementById('header-title').textContent = title;
}

function salvarTurma() {
  const nome = document.getElementById('turma-nome').value;
  const modalidade = document.getElementById('turma-modalidade').value;
  if (nome && modalidade) {
    turmas.push({ nome, modalidade });
    alert('Turma cadastrada!');
    document.getElementById('turma-nome').value = '';
    document.getElementById('turma-modalidade').value = '';
  }
}

function salvarAluno() {
  const nome = document.getElementById('aluno-nome').value;
  const idade = document.getElementById('aluno-idade').value;
  const foto = document.getElementById('aluno-foto').value;
  const turma = document.getElementById('aluno-turma').value;
  if (nome && idade && foto && turma) {
    alunos.push({ nome, idade, foto, turma });
    alert('Aluno cadastrado!');
    document.getElementById('aluno-nome').value = '';
    document.getElementById('aluno-idade').value = '';
    document.getElementById('aluno-foto').value = '';
  }
}

function atualizarSelectTurmas(selectId) {
  const select = document.getElementById(selectId);
  select.innerHTML = '';
  turmas.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.nome;
    opt.textContent = t.nome + ' (' + t.modalidade + ')';
    select.appendChild(opt);
  });
}

function atualizarListaAlunos() {
  const lista = document.getElementById('lista-alunos');
  lista.innerHTML = '';
  alunos.forEach(a => {
    lista.innerHTML += `<div class='card'><img src='${a.foto}' class='profile-pic'><strong> ${a.nome}</strong> | ${a.idade} anos | Turma: ${a.turma}</div>`;
  });
}

function gerarRelatorio() {
  const turma = document.getElementById('relatorio-turma').value;
  const mes = document.getElementById('relatorio-mes').value;
  const resultado = document.getElementById('relatorio-resultado');
  resultado.innerHTML = `<h4>Relatório ${mes}</h4>`;
  const alunosTurma = alunos.filter(a => a.turma === turma);
  alunosTurma.forEach(a => {
    resultado.innerHTML += `<p>${a.nome} | ${a.idade} anos</p>`;
  });
}

function logout() {
  alert('Saindo...');
}

document.getElementById('welcome-user').textContent = 'Instrutor(a)';
