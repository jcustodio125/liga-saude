
// src/pages/AgendarConsulta.jsx
import React, { useEffect, useState } from "react";
import useIdioma from "../hooks/useIdioma";
import {
  listarEspecialidades,
  listarConvenios,
  agendarConsulta,
} from "../services/apiClient";
import "../assets/styles/agendar-consulta.css";

export default function AgendarConsulta() {
  const { traduzir } = useIdioma();
  const [especialidades, setEspecialidades] = useState([]);
  const [convenios, setConvenios] = useState([]);
  const [formulario, setFormulario] = useState({
    paciente: "",
    especialidadeId: "",
    convenioId: "",
    dataHora: "",
    medico: "",
  });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function carregarDados() {
      const esp = await listarEspecialidades();
      const conv = await listarConvenios();

      if (esp.status === 200) setEspecialidades(esp.data);
      if (conv.status === 200) setConvenios(conv.data);
    }

    carregarDados();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resposta = await agendarConsulta(formulario);

    if (resposta.status === 201) {
      setMensagem(
        traduzir(
          "Consulta agendada com sucesso!",
          "Appointment scheduled successfully!",
          "¡Cita programada con éxito!"
        )
      );
      setFormulario({
        paciente: "",
        especialidadeId: "",
        convenioId: "",
        dataHora: "",
        medico: "",
      });
    } else {
      setMensagem(
        traduzir(
          "Erro ao agendar consulta.",
          "Error scheduling appointment.",
          "Error al programar la cita."
        )
      );
    }
  };

  return (
    <div className="agendar-container">
      <h2>
        {traduzir("Agendar Consulta", "Schedule Appointment", "Programar Cita")}
      </h2>

      <form className="form-agendar" onSubmit={handleSubmit}>
        <input
          type="text"
          name="paciente"
          placeholder={traduzir("Nome do paciente", "Patient Name", "Nombre del Paciente")}
          value={formulario.paciente}
          onChange={handleChange}
          required
        />

        <select
          name="especialidadeId"
          value={formulario.especialidadeId}
          onChange={handleChange}
          required
        >
          <option value="">{traduzir("Selecione a especialidade", "Select Specialty", "Seleccione la especialidad")}</option>
          {especialidades.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nome}
            </option>
          ))}
        </select>

        <select
          name="convenioId"
          value={formulario.convenioId}
          onChange={handleChange}
          required
        >
          <option value="">{traduzir("Selecione o convênio", "Select Health Plan", "Seleccione el plan médico")}</option>
          {convenios.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          name="dataHora"
          value={formulario.dataHora}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="medico"
          placeholder={traduzir("Nome do médico", "Doctor's Name", "Nombre del médico")}
          value={formulario.medico}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn agendar">
          {traduzir("Agendar Consulta", "Schedule Appointment", "Programar Cita")}
        </button>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}
