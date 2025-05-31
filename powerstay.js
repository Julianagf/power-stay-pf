// Usuário e senha fixos para exemplo
const USER = "admin";
const PASS = "123456";

// Dados armazenados (inicialmente do localStorage ou vazio)
let turmas = JSON.parse(localStorage.getItem("turmas")) || [];
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
let frequencias = JSON.parse(localStorage.getItem("frequencias")) || [];

// Elementos DOM
const loginScreen = document.getElementById("login-screen");
const dashboard = document.getElementById("dashboard");
const loginMsg = document.getElementById("login-msg");
const welcomeUser = document.getElementById("welcome-user");
const headerTitle = document.getElementById("header-title");

// Inputs login
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-login");

// Menu buttons
const btnMenu = document.getElementById("btn-menu");
const btnFrequencia = document.getElementById("btn-frequencia");
const btnCadastrarTurma = document.getElementById("btn-cadastrar-turma");
const btnCadastrarAluno = document.getElementById("btn-cadastrar-aluno");
const btnRelatorio = document.getElementById("btn-relatorio");
const btnLogout = document.getElementById("btn-logout");

// Sections do dashboard
const sections = {
  menu: document.getElementById("menu-screen"),
  frequencia: document.getElementById("frequencia-screen"),
  cadastrarTurma: document.getElementById("cadastrar-turma-screen"),
  cadastrarAluno: document.getElementById("cadastrar-aluno-screen"),
  relatorio: document.getElementById("relatorio-screen"),
};

// Inputs turmas e alunos
const inputTurmaNome = document.getElementById("turma-nome");
const inputTurmaModalidade = document.getElementById("turma-modalidade");
const btnSalvarTurma = document.getElementById("btn-salvar-turma");
const msgTurma = document.getElementById("msg-turma");

const inputAlunoNome = document.getElementById("aluno-nome");
const inputAlunoIdade = document.getElementById("aluno-idade");
const inputAlunoFoto = document.getElementById("aluno-foto");
const selectAlunoTurma = document.getElementById("aluno-turma");
const btnSalvarAluno = document.getElementById("btn-salvar-aluno");
const msgAluno = document.getElementById("msg-aluno");

// Frequência
const listaAlunosDiv = document.getElementById("lista-alunos");
const btnSalvarFrequencia = document.getElementById("btn-salvar-frequencia");
const msgFrequencia = document.getElementById("msg-frequencia");

// Relatório
const inputRelatorioMes = document.getElementById("relatorio-mes");
const selectRelatorioTurma = document.getElementById("relatorio-turma");
const btnGerarRelatorio = document.getElementById("btn-gerar-relatorio");
const relatorioResultado = document.getElementById("relatorio-resultado");

// -------------------------------------
// FUNÇÃO MOSTRAR TELA DO DASHBOARD
function mostrarTela(tela) {
  for (const key in sections) {
    if (sections[key]) {
      sections[key].classList.add("hidden");
    }
  }
  if (sections[tela]) {
    sections[tela].classList.remove("hidden");
    headerTitle.textContent = {
      menu: "Bem-vindo ao PowerStay",
      frequencia: "Registro de Frequência",
      cadastrarTurma: "Cadastrar Nova Turma",
      cadastrarAluno: "Cadastrar Novo Aluno",
      relatorio: "Relatório Mensal",
    }[tela];
  }

  // Atualiza active no menu lateral
  const btns = [btnMenu, btnFrequencia, btnCadastrarTurma, btnCadastrarAluno, btnRelatorio];
  btns.forEach((btn) => btn.classList.remove("active"));
  switch (tela) {
    case "menu":
      btnMenu.classList.add("active");
      break;
    case "frequencia":
      btnFrequencia.classList.add("active");
      break;
    case "cadastrarTurma":
      btnCadastrarTurma.classList.add("active");
      break;
    case "cadastrarAluno":
      btnCadastrarAluno.classList.add("active");
      break;
    case "relatorio":
      btnRelatorio.classList.add("active");
      break;
  }
}

// -------------------------------------
// LOGIN
btnLogin.onclick = () => {
  const user = inputUsername.value.trim();
  const pass = inputPassword.value.trim();

  if (user === USER && pass === PASS) {
    loginMsg.style.display = "none";
    loginScreen.classList.add("hidden");
    dashboard.classList.remove("hidden");
    welcomeUser.textContent = user;
    carregarSelects();
    mostrarTela("menu");
  } else {
    loginMsg.textContent = "Usuário ou senha incorretos.";
    loginMsg.className = "feedback-msg feedback-error";
    loginMsg.style.display = "block";
  }
};

// -------------------------------------
// CARREGA selects de turmas nos forms
function carregarSelects() {
  // Limpar opções
  selectAlunoTurma.innerHTML = "";
  selectRelatorioTurma.innerHTML = '<option value="">--Selecione a turma--</option>';

  if (turmas.length === 0) {
    const opt = document.createElement("option");
    opt.textContent = "Nenhuma turma cadastrada";
    opt.disabled = true;
    opt.value = "";
    selectAlunoTurma.appendChild(opt);
    selectRelatorioTurma.appendChild(opt.cloneNode(true));
    return;
  }

  turmas.forEach((turma) => {
    let opt1 = document.createElement("option");
    opt1.value = turma.id;
    opt1.textContent = `${turma.nome} (${turma.modalidade})`;
    selectAlunoTurma.appendChild(opt1);

    let opt2 = document.createElement("option");
    opt2.value = turma.id;
    opt2.textContent = `${turma.nome} (${turma.modalidade})`;
    selectRelatorioTurma.appendChild(opt2);
  });
}

// -------------------------------------
// SALVAR TURMA
btnSalvarTurma.onclick = () => {
  const nome = inputTurmaNome.value.trim();
  const modalidade = inputTurmaModalidade.value.trim();

  if (!nome || !modalidade) {
    msgTurma.textContent = "Preencha todos os campos.";
    msgTurma.className = "feedback-msg feedback-error";
    msgTurma.style.display = "block";
    return;
  }

  // Criar id simples
  const id = Date.now().toString();

  turmas.push({ id, nome, modalidade });
  localStorage.setItem("turmas", JSON.stringify(turmas));

  msgTurma.textContent = "Turma cadastrada com sucesso!";
  msgTurma.className = "feedback-msg feedback-success";
  msgTurma.style.display = "block";

  inputTurmaNome.value = "";
  inputTurmaModalidade.value = "";

  carregarSelects();
};

// -------------------------------------
// SALVAR ALUNO
btnSalvarAluno.onclick = () => {
  const nome = inputAlunoNome.value.trim();
  const idade = parseInt(inputAlunoIdade.value);
  const foto = inputAlunoFoto.value.trim();
  const turmaId = selectAlunoTurma.value;

  if (!nome || !idade || !turmaId) {
    msgAluno.textContent = "Preencha todos os campos obrigatórios.";
    msgAluno.className = "feedback-msg feedback-error";
    msgAluno.style.display = "block";
    return;
  }

  // Criar id simples
  const id = Date.now().toString();

  alunos.push({ id, nome, idade, foto, turmaId });
  localStorage.setItem("alunos", JSON.stringify(alunos));

  msgAluno.textContent = "Aluno cadastrado com sucesso!";
  msgAluno.className = "feedback-msg feedback-success";
  msgAluno.style.display = "block";

  inputAlunoNome.value = "";
  inputAlunoIdade.value = "";
  inputAlunoFoto.value = "";
  selectAlunoTurma.value = "";

  carregarSelects();
};

// -------------------------------------
// Mostrar alunos na tela de frequência
function mostrarListaAlunos() {
  listaAlunosDiv.innerHTML = "";
  const turmaId = selectRelatorioTurma.value || (turmas[0] && turmas[0].id);

  if (!turmaId) {
    listaAlunosDiv.textContent = "Nenhuma turma cadastrada para mostrar alunos.";
    return;
  }

  // Filtrar alunos da turma selecionada
  const alunosTurma = alunos.filter((a) => a.turmaId === turmaId);

  if (alunosTurma.length === 0) {
    listaAlunosDiv.textContent = "Nenhum aluno cadastrado nessa turma.";
    return;
  }

  // Data atual para o registro de frequência
  const hoje = new Date().toISOString().slice(0, 10);

  alunosTurma.forEach((aluno) => {
    // Verifica se já tem frequência hoje
    const presenca = frequencias.find(
      (f) => f.alunoId === aluno.id && f.data === hoje
    );

    const divAluno = document.createElement("div");
    divAluno.className = "lista-aluno-item";

    const infoDiv = document.createElement("div");
    infoDiv.className = "lista-aluno-info";

    const img = document.createElement("img");
    img.className = "profile-pic";
    img.src = aluno.foto || "https://i.pravatar.cc/60?u=" + aluno.id;
    img.alt = aluno.nome;

    const nomeSpan = document.createElement("span");
    nomeSpan.className = "lista-aluno-nome";
    nomeSpan.textContent = aluno.nome;

    infoDiv.appendChild(img);
    infoDiv.appendChild(nomeSpan);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = presenca ? true : false;
    checkbox.dataset.alunoId = aluno.id;

    divAluno.appendChild(infoDiv);
    divAluno.appendChild(checkbox);

    listaAlunosDiv.appendChild(divAluno);
  });
}

// Atualiza lista de alunos quando muda turma no relatório (mesma turma usada na frequência)
selectRelatorioTurma.addEventListener("change", () => {
  mostrarListaAlunos();
});

// -------------------------------------
// SALVAR FREQUÊNCIA
btnSalvarFrequencia.onclick = () => {
  const checkboxes = listaAlunosDiv.querySelectorAll("input[type=checkbox]");
  const hoje = new Date().toISOString().slice(0, 10);

  checkboxes.forEach((checkbox) => {
    const alunoId = checkbox.dataset.alunoId;
    // Remove registro anterior do dia
    frequencias = frequencias.filter(
      (f) => !(f.alunoId === alunoId && f.data === hoje)
    );

    if (checkbox.checked) {
      frequencias.push({ alunoId, data: hoje });
    }
  });

  localStorage.setItem("frequencias", JSON.stringify(frequencias));

  msgFrequencia.textContent = "Frequência salva com sucesso!";
  msgFrequencia.className = "feedback-msg feedback-success";
  msgFrequencia.style.display = "block";

  setTimeout(() => {
    msgFrequencia.style.display = "none";
  }, 3000);
};

// -------------------------------------
// GERAR RELATÓRIO
btnGerarRelatorio.onclick = () => {
  const mesAno = inputRelatorioMes.value;
  const turmaId = selectRelatorioTurma.value;

  if (!mesAno || !turmaId) {
    rel
