
// src/components/AgendamentoItem.jsx
import React from "react";
import useIdioma from "../hooks/useIdioma";

export default function AgendamentoItem({ agendamento }) {
  const { traduzir, idioma } = useIdioma();

  const idiomaFormatado = idioma === "pt" ? "pt-BR" : idioma === "en" ? "en-US" : "es-ES";

  const dataHora = agendamento.dataHora
    ? new Date(agendamento.dataHora).toLocaleString(idiomaFormatado)
    : traduzir("Não informado", "Not informed", "No informado");

  return (
    <div className="agendamento-item">
      <h4>{agendamento.paciente}</h4>
      <p><strong>{traduzir("Especialidade:", "Specialty:", "Especialidad:")}</strong> {agendamento.especialidadeNome || traduzir("Não informado", "Not informed", "No informado")}</p>
      <p><strong>{traduzir("Convênio:", "Health Plan:", "Convenio:")}</strong> {agendamento.convenioNome || traduzir("Não informado", "Not informed", "No informado")}</p>
      <p><strong>{traduzir("Data/Hora:", "Date/Time:", "Fecha/Hora:")}</strong> {dataHora}</p>
      <p><strong>{traduzir("Médico:", "Doctor:", "Médico:")}</strong> {agendamento.medico || traduzir("Não informado", "Not informed", "No informado")}</p>
    </div>
  );
}
