
// src/services/apiClient.js

const db = {
  especialidades: [
    { id: 1, nome: "Cardiologia" },
    { id: 2, nome: "Dermatologia" },
    { id: 3, nome: "Ortopedia" },
    { id: 4, nome: "Ginecologia" },
    { id: 5, nome: "Neurologia" },
    { id: 6, nome: "Psiquiatria" },
    { id: 7, nome: "Pediatria" },
    { id: 8, nome: "Oftalmologia" },
    { id: 9, nome: "Otorrinolaringologia" },
    { id: 10, nome: "Endocrinologia" },
    { id: 11, nome: "Reumatologia" },
    { id: 12, nome: "Urologia" }
  ],
  convenios: [
    { id: 1, nome: "Unimed" },
    { id: 2, nome: "SulAmérica" },
    { id: 3, nome: "Amil" },
    { id: 4, nome: "Bradesco Saúde" },
    { id: 5, nome: "Cassi" }
  ],
  disponibilidades: [
    {
      id: 1,
      medico: "Dr. Carlos",
      especialidadeId: 1,
      diaSemana: "Segunda-feira",
      horaInicio: "08:00",
      horaFim: "12:00",
      duracaoConsultaMinutos: 30
    },
    {
      id: 2,
      medico: "Dra. Marina",
      especialidadeId: 2,
      diaSemana: "Terça-feira",
      horaInicio: "09:00",
      horaFim: "13:00",
      duracaoConsultaMinutos: 20
    }
  ],
  agendamentos: [
    {
      id: 1,
      paciente: "João da Silva",
      especialidadeId: 1,
      convenioId: 2,
      dataHora: "2025-05-17T09:00:00Z",
      medico: "Dr. Carlos",
      especialidadeNome: "Cardiologia",
      convenioNome: "SulAmérica"
    },
    {
      id: 2,
      paciente: "Maria Oliveira",
      especialidadeId: 2,
      convenioId: 1,
      dataHora: "2025-05-21T09:20:00Z",
      medico: "Dra. Marina",
      especialidadeNome: "Dermatologia",
      convenioNome: "Unimed"
    },
    {
      id: 3,
      paciente: "Carlos Mendes",
      especialidadeId: 5,
      convenioId: 3,
      dataHora: "2025-05-22T10:00:00Z",
      medico: "Dr. Jorge",
      especialidadeNome: "Neurologia",
      convenioNome: "Amil"
    }
  ],
  atendimentos: [
    {
      id: 1,
      agendamentoId: 1,
      dataAtendimento: "2025-05-17T09:30:00Z",
      observacoes: "Paciente apresentou melhora significativa"
    },
    {
      id: 2,
      agendamentoId: 2,
      dataAtendimento: "2025-05-21T09:45:00Z",
      observacoes: "Consulta de rotina realizada com sucesso"
    }
  ]
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// ✅ Cadastrar Especialidade
export const cadastrarEspecialidade = async (dados) => {
  await delay(500);
  const novo = { ...dados, id: db.especialidades.length + 1 };
  db.especialidades.push(novo);
  return { status: 201, data: novo };
};

// ✅ Listar Especialidades
export const listarEspecialidades = async () => {
  await delay(500);
  return { status: 200, data: [...db.especialidades] };
};

// ✅ Cadastrar Convênio
export const cadastrarConvenio = async (dados) => {
  await delay(500);
  const novo = { ...dados, id: db.convenios.length + 1 };
  db.convenios.push(novo);
  return { status: 201, data: novo };
};

// ✅ Listar Convênios
export const listarConvenios = async () => {
  await delay(500);
  return { status: 200, data: [...db.convenios] };
};

// ✅ Definir Disponibilidade
export const definirDisponibilidade = async (dados) => {
  await delay(500);
  const novo = { ...dados, id: db.disponibilidades.length + 1 };
  db.disponibilidades.push(novo);
  return { status: 201, data: novo };
};

// ✅ Listar Horários Disponíveis
export const listarDisponibilidades = async ({ especialidadeId, data, medico }) => {
  await delay(800);

  const duracaoConsultaMinutos = 30;
  const horaInicio = "08:00";
  const horaFim = "12:00";

  let [hInicio, mInicio] = horaInicio.split(":").map(Number);
  let [hFim, mFim] = horaFim.split(":").map(Number);

  const totalMinutos = hFim * 60 + mFim - hInicio * 60 - mInicio;

  const horarios = [];

  for (let i = 0; i < totalMinutos; i += duracaoConsultaMinutos) {
    const horaAtual = hInicio + Math.floor((mInicio + i) / 60);
    const minutoAtual = (mInicio + i) % 60;

    const inicio = `${String(horaAtual).padStart(2, "0")}:${String(minutoAtual).padStart(2, "0")}`;
    const fim = `${String(horaAtual + Math.floor((minutoAtual + duracaoConsultaMinutos) / 60)).padStart(2, "0")}:${String((minutoAtual + duracaoConsultaMinutos) % 60).padStart(2, "0")}`;

    // Simula alguns horários como ocupados
    const disponivel = Math.random() > 0.5;
    const agendamento = disponivel ? null : {
      paciente: "João da Silva",
      agendamentoId: 123
    };

    horarios.push({
      horaInicio: inicio,
      horaFim: fim,
      disponivel,
      ...agendamento
    });
  }

  return { status: 200, data: horarios };
};

// ✅ Agendar Consulta
export const agendarConsulta = async (dados) => {
  await delay(500);

  const novo = {
    id: db.agendamentos.length + 1,
    ...dados,
    especialidadeNome: db.especialidades.find(e => e.id === dados.especialidadeId)?.nome || "Especialidade Desconhecida",
    convenioNome: db.convenios.find(c => c.id === dados.convenioId)?.nome || "Convênio Desconhecido",
    medico: dados.medico || "Dr. João Silva"
  };

  db.agendamentos.push(novo);

  console.log("Agendamento salvo:", novo); // Debug

  return { status: 201, data: novo };
};

// ✅ Listar Agendamentos
export const listarAgendamentos = async () => {
  await delay(500);

  console.log("Buscando agendamentos:", db.agendamentos); // Debug

  return { status: 200, data: [...db.agendamentos] };
};