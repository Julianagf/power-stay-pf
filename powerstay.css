// Dados de usuários para exemplo simples (login hardcoded)
const usuarios = [
  { usuario: 'instrutor', senha: '123456', nome: 'Instrutor(a)' },
  { usuario: 'admin', senha: 'admin123', nome: 'Administrador' }
];

let turmas = [];
let alunos = [];

function mostrarMensagem(id, mensagem, isErro = false) {
  const el = document.getElementById(id);
  el.textContent = mensagem;
  el.classList.remove('feedback-error', 'feedback-success');
  el.classList.add(isErro ? 'feedback-error' : 'feedback-success');
  el.style.display = 'block';
  setTimeout(() => {
    el.style.display = 'none';
  }, 4000);
}

// Login
document.getElementById('btn-login').addEventListener('click', () => {
  const user = document.getElementById('input-username').value.trim();
  const pass = document.getElementById('input-password').value.trim();

  if (!user || !pass) {
    mostrarMensagem('login-msg', 'Preencha todos os campos!', true);
    return;
  }

  const found = usuarios.find(u => u.usuario === user && u.senha === pass);
  if (found) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('welcome-user').textContent = found.nome;
    showMenu();
  } else {
    mostrarMensagem('login-msg', 'Usuário ou senha inválidos!', true);
  }
});

// Funções para troca de telas
function toggleScreen(screenId, title) {
  document.querySelectorAll('.main .card').forEach(card => card.classList.add('hidden'));
  document.getElementById(screenId).classList.remove('hidden');
  document.getElementById('header-title').textContent = title;
}

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

function logout() {
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('input-username').value = '';
  document.getElementById('input-password').value = '';
}

// Salvar turma
function salvarTurma() {
  const nome = document.getElementById('turma-nome').value.trim();
  const modalidade = document.getElementById('turma-modalidade').value.trim();
  const msg = document.getElementById('msg-turma');
  if (!nome || !modalidade) {
    mostrarMensagem('msg-turma', 'Preencha todos os campos!', true);
    return;
  }
  turmas.push({ nome, modalidade });
  mostrarMensagem('msg-turma', 'Turma cadastrada com sucesso!');
  document.getElementById('turma-nome').value = '';
  document.getElementById('turma-modalidade').value = '';
  atualizarSelectTurmas('aluno-turma');
  atualizarSelectTurmas('relatorio-turma');
}

// Salvar aluno
function salvarAluno() {
  const nome = document.getElementById('aluno-nome').value.trim();
  const idade = document.getElementById('aluno-idade').value.trim();
  const foto = document.getElementById('aluno-foto').value.trim();
  const turma = document.getElementById('aluno-turma').value;
  if (!nome || !idade || !foto || !turma) {
    mostrarMensagem('msg-aluno', 'Preencha todos os campos!', true);
    return;
  }
  alunos.push({ nome, idade, foto, turma });
  mostrarMensagem('msg-aluno', 'Aluno cadastrado com sucesso!');
  document.getElementById('aluno-nome').value = '';
  document.getElementById('aluno-idade').value = '';
  document.getElementById('aluno-foto').value = '';
  atualizarListaAlunos();
}

// Atualiza selects
function atualizarSelectTurmas(selectId) {
  const select = document.getElementById(selectId);
  select.innerHTML = '';
  turmas.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.nome;
    opt.textContent = `${t.nome} (${t.modalidade})`;
    select.appendChild(opt);
  });
}

// Lista alunos na frequência
function atualizarListaAlunos() {
  const lista = document.getElementById('lista-alunos');
  lista.innerHTML = '';
  alunos.forEach(a => {
    lista.innerHTML += `
      <div class='card' style="display:flex; align-items:center; gap: 15px;">
        <img src='${a.foto}' class='profile-pic' alt='${a.nome}' />
        <div>
          <strong>${a.nome}</strong> | ${a.idade} anos | Turma: ${a.turma}
        </div>
      </div>`;
  });
}

// Gerar relatório simples
function gerarRelatorio() {
  const turma = document.getElementById('relatorio-turma').value;
  const mes = document.getElementById('relatorio-mes').value;
  const resultado = document.getElementById('relatorio-resultado');
  if (!turma || !mes) {
    resultado.innerHTML = '<p style="color: #d9534f;">Selecione o mês e a turma!</p>';
    return;
  }
  resultado.innerHTML = `<h4>Relatório de Frequência - ${mes}</h4>`;
  const alunosTurma = alunos.filter(a => a.turma === turma);
  alunosTurma.forEach(a => {
    resultado.innerHTML += `<p>${a.nome} | ${a.idade} anos</p>`;
  });
}
