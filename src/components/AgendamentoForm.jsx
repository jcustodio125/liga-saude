
import React, { useState, useEffect } from "react";
import {
  listarEspecialidades,
  listarConvenios,
  listarDisponibilidades,
  agendarConsulta,
} from "../services/apiClient";

const FormAgendamento = () => {
  const [paciente, setPaciente] = useState("");
  const [especialidadeId, setEspecialidadeId] = useState("");
  const [convenioId, setConvenioId] = useState("");
  const [data, setData] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [convenios, setConvenios] = useState([]);
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchDados = async () => {
      const esp = await listarEspecialidades();
      const conv = await listarConvenios();
      setEspecialidades(esp.data);
      setConvenios(conv.data);
    };
    fetchDados();
  }, []);

  const buscarHorarios = async () => {
    if (!especialidadeId || !data) return;
    const result = await listarDisponibilidades({
      especialidadeId,
      data,
    });
    setHorarios(result.data);
  };

  const handleSubmit = async () => {
    const novosErros = {};
    if (!paciente.trim()) novosErros.paciente = "Informe o nome do paciente";
    if (!especialidadeId) novosErros.especialidadeId = "Escolha uma especialidade";
    if (!convenioId) novosErros.convenioId = "Escolha um convênio";
    if (!horarioSelecionado) novosErros.horario = "Escolha um horário";

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    const dataHoraCompleta = `${data}T${horarioSelecionado}:00Z`;
    const response = await agendarConsulta({
      paciente,
      especialidadeId: parseInt(especialidadeId),
      convenioId: parseInt(convenioId),
      dataHora: dataHoraCompleta,
    });

    if (response.status === 201) {
      setMensagem("Agendamento realizado com sucesso!");
      setPaciente("");
      setHorarioSelecionado("");
    }
  };

  return (
    <div>
      <h2>Agendar Consulta</h2>
      <input
        placeholder="Nome do Paciente"
        value={paciente}
        onChange={(e) => setPaciente(e.target.value)}
      />
      {erros.paciente && <span className="erro">{erros.paciente}</span>}

      <select value={especialidadeId} onChange={(e) => setEspecialidadeId(e.target.value)}>
        <option value="">Selecione a especialidade</option>
        {especialidades.map((esp) => (
          <option key={esp.id} value={esp.id}>
            {esp.nome}
          </option>
        ))}
      </select>
      {erros.especialidadeId && <span className="erro">{erros.especialidadeId}</span>}

      <select value={convenioId} onChange={(e) => setConvenioId(e.target.value)}>
        <option value="">Selecione o convênio</option>
        {convenios.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nome}
          </option>
        ))}
      </select>
      {erros.convenioId && <span className="erro">{erros.convenioId}</span>}

      <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
      <button onClick={buscarHorarios}>Buscar Horários</button>

      {horarios.length > 0 && (
        <div>
          <h4>Horários disponíveis</h4>
          {horarios.map((h, idx) => (
            <button
              key={idx}
              onClick={() => setHorarioSelecionado(h.horaInicio)}
              disabled={!h.disponivel}
              style={{
                margin: "4px",
                backgroundColor: h.disponivel ? "#4CAF50" : "#f44336",
                color: "white",
                border: horarioSelecionado === h.horaInicio ? "2px solid black" : "none",
              }}
            >
              {h.horaInicio} - {h.horaFim}
            </button>
          ))}
          {erros.horario && <span className="erro">{erros.horario}</span>}
        </div>
      )}

      <br />
      <button onClick={handleSubmit}>Agendar</button>
      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
    </div>
  );
};

export default FormAgendamento;
