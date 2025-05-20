// src/pages/MeusAgendamentos.jsx

import { useEffect, useState } from "react";
import { listarAgendamentos } from "../services/apiClient";
import ModalConfirmacao from "../components/ModalConfirmacao";
import "../assets/styles/meus-agendamentos.css";

export default function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [confirmarModal, setConfirmarModal] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);

  useEffect(() => {
    async function carregar() {
      const resp = await listarAgendamentos();
      if (resp.status === 200) {
        setAgendamentos(resp.data);
      }
    }
    carregar();
  }, []);

  const abrirConfirmacao = (agendamento) => {
    setAgendamentoSelecionado(agendamento);
    setConfirmarModal(true);
  };

  const confirmarAtendimento = () => {
    if (agendamentoSelecionado) {
      setAgendamentos(prev =>
        prev.map(a => a.id === agendamentoSelecionado.id
          ? { ...a, status: "Atendido" }
          : a
        )
      );
    }
    setConfirmarModal(false);
    setAgendamentoSelecionado(null);
  };

  return (
    <div className="agendamentos-container">
      <h2>Meus Agendamentos</h2>

      <table className="tabela-agendamentos">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Especialidade</th>
            <th>Convênio</th>
            <th>Data / Hora</th>
            <th>Médico</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((a) => (
            <tr key={a.id}>
              <td>{a.paciente}</td>
              <td>{a.especialidadeNome || "-"}</td>
              <td>{a.convenioNome || "-"}</td>
              <td>{new Date(a.dataHora).toLocaleString("pt-BR")}</td>
              <td>{a.medico}</td>
              <td>
                <span className={`status ${a.status === "Atendido" ? "verde" : "amarelo"}`}>
                  {a.status || "Agendado"}
                </span>
              </td>
              <td>
                {a.status !== "Atendido" && (
                  <button className="btn atender" onClick={() => abrirConfirmacao(a)}>
                    Marcar como atendido
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalConfirmacao
        aberto={confirmarModal}
        tipo="confirmar"
        onConfirm={confirmarAtendimento}
        onCancel={() => setConfirmarModal(false)}
      />
    </div>
  );
}
