// src/pages/Disponibilidade.jsx

import { useState } from "react";
import { listarDisponibilidades } from "../services/apiClient";
import DisponibilidadeForm from "../components/DisponibilidadeForm";

export default function Disponibilidade() {
  const [horarios, setHorarios] = useState([]);

  const handleBuscar = async (dados) => {
    const resposta = await listarDisponibilidades(dados);
    if (resposta.status === 200) {
      setHorarios(resposta.data);
    }
  };

  return (
    <div>
      <DisponibilidadeForm onBuscar={handleBuscar} />

      {horarios.length > 0 && (
        <>
          <h3>Horários Disponíveis</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {horarios.map((hora, index) => (
              <div
                key={index}
                style={{
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: hora.disponivel ? "#d4edda" : "#f8d7da",
                  cursor: hora.disponivel ? "pointer" : "not-allowed"
                }}
              >
                <strong>{hora.horaInicio} - {hora.horaFim}</strong>
                <p>{hora.disponivel ? "Disponível" : `Indisponível (${hora.paciente})`}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}