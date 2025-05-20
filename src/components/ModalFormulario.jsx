// src/components/ModalFormulario.jsx

import React, { useState, useEffect } from "react";
import useIdioma from "../hooks/useIdioma";
import "../assets/styles/modal.css";

export default function ModalFormulario({ aberto, titulo, campos, dadosIniciais = {}, onSubmit, onCancel }) {
  const { traduzir } = useIdioma();
  const [valores, setValores] = useState({});

  useEffect(() => {
    setValores(dadosIniciais);
  }, [dadosIniciais]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(valores);
  };

  if (!aberto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{titulo}</h3>
        <form onSubmit={handleSubmit} className="form-modal">
          {campos.map((campo) => (
            <div className="form-group" key={campo.nome}>
              <label htmlFor={campo.nome}>{traduzir(campo.label, campo.labelEn || campo.label, campo.labelEs || campo.label)}</label>
              <input
                type={campo.tipo || "text"}
                name={campo.nome}
                id={campo.nome}
                value={valores[campo.nome] || ""}
                onChange={handleChange}
                required={campo.obrigatorio}
              />
            </div>
          ))}
          <div className="modal-actions">
            <button type="button" className="btn cancelar" onClick={onCancel}>
              {traduzir("Cancelar", "Cancel", "Cancelar")}
            </button>
            <button type="submit" className="btn confirmar">
              {traduzir("Salvar", "Save", "Guardar")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}