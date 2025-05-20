
// src/pages/Disponibilidade.jsx

import { useEffect, useState } from "react";
import useIdioma from "../hooks/useIdioma";
import {
  listarEspecialidades,
  listarDisponibilidades
} from "../services/apiClient";
import "../assets/styles/disponibilidade.css";

export default function Disponibilidade() {
  const { traduzir } = useIdioma();

  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadeId, setEspecialidadeId] = useState("");
  const [data, setData] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    async function carregarEspecialidades() {
      const resp = await listarEspecialidades();
      if (resp.status === 200) {
        setEspecialidades(resp.data);
      }
    }
    carregarEspecialidades();
  }, []);

  const buscarHorarios = async () => {
    if (!especialidadeId || !data) return;
    setCarregando(true);
    const resp = await listarDisponibilidades({ especialidadeId, data });
    if (resp.status === 200) setHorarios(resp.data);
    setCarregando(false);
  };

  return (
    <div className="disponibilidade-container">
      <h2>{traduzir("Verificar Disponibilidade", "Check Availability", "Verificar Disponibilidad")}</h2>

      <div className="filtros">
        <select
          value={especialidadeId}
          onChange={(e) => setEspecialidadeId(e.target.value)}
        >
          <option value="">
            {traduzir("Selecione a especialidade", "Select specialty", "Seleccione la especialidad")}
          </option>
          {especialidades.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nome}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <button className="btn buscar" onClick={buscarHorarios}>
          {traduzir("Buscar", "Search", "Buscar")}
        </button>
      </div>

      {carregando && <p>{traduzir("Carregando horários...", "Loading times...", "Cargando horarios...")}</p>}

      {!carregando && horarios.length > 0 && (
        <div className="grade-horarios">
          {horarios.map((h, index) => (
            <div
              key={index}
              className={`horario ${h.disponivel ? "disponivel" : "indisponivel"}`}
            >
              <span>{h.horaInicio} - {h.horaFim}</span>
              {h.disponivel ? (
                <span className="status">✔ {traduzir("Disponível", "Available", "Disponible")}</span>
              ) : (
                <span className="status ocupado">✖ {traduzir("Ocupado", "Busy", "Ocupado")}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {!carregando && horarios.length === 0 && data && especialidadeId && (
        <p className="nenhum">{traduzir("Nenhum horário encontrado.", "No time slots found.", "No se encontraron horarios.")}</p>
      )}
    </div>
  );
}
