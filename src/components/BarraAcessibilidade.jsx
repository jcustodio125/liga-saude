
// src/components/BarraAcessibilidade.jsx
import React, { useContext, useEffect, useState } from "react";
import { IdiomaContext } from "../context/IdiomaContext";

import ContrasteOn from "../assets/icons/ContrasteOn";
import ContrasteOff from "../assets/icons/ContrasteOff";

import "../assets/styles/acessibilidade.css";

export default function BarraAcessibilidade() {
  const { idioma, trocarIdioma } = useContext(IdiomaContext);
  const [tamanhoFonte, setTamanhoFonte] = useState("normal");
  const [altoContrasteAtivo, setAltoContrasteAtivo] = useState(false);

  // Aplicar tamanho da fonte
  const aplicarTamanhoFonte = (tamanho) => {
    document.body.classList.remove("fonte-normal", "fonte-grande", "fonte-extra");
    document.body.classList.add(`fonte-${tamanho}`);
    localStorage.setItem("tamanhoFonte", tamanho);
    setTamanhoFonte(tamanho);
  };

  // Aplicar alto contraste
  const aplicarAltoContraste = (ativo) => {
    if (ativo) {
      document.body.classList.add("modo-alto-contraste");
    } else {
      document.body.classList.remove("modo-alto-contraste");
    }
    localStorage.setItem("altoContraste", ativo);
    setAltoContrasteAtivo(ativo);
  };

  // Carregar preferências salvas
  useEffect(() => {
    const idiomaSalvo = localStorage.getItem("lang");
    const fonteSalva = localStorage.getItem("tamanhoFonte");
    const altoContrasteSalvo = localStorage.getItem("altoContraste") === "true";

    if (idiomaSalvo && idiomaSalvo !== idioma) trocarIdioma(idiomaSalvo);
    if (fonteSalva) aplicarTamanhoFonte(fonteSalva);
    if (altoContrasteSalvo) aplicarAltoContraste(true);
  }, []);

  return (
    <div className="barra-acessibilidade" role="toolbar" aria-label="Barra de acessibilidade">
      {/* Grupo: Tamanho da Fonte */}
      <div className="grupo-acessibilidade grupo-fonte" aria-label="Tamanho da Fonte">
        <label className="grupo-label">Tamanho:</label>
        <button onClick={() => aplicarTamanhoFonte("normal")} aria-label="Fonte normal">A</button>
        <button onClick={() => aplicarTamanhoFonte("grande")} aria-label="Fonte grande">A+</button>
        <button onClick={() => aplicarTamanhoFonte("extra")} aria-label="Fonte extra grande">A++</button>
      </div>

      {/* Grupo: Contraste */}
      <div className="grupo-acessibilidade grupo-contraste" aria-label="Modo Alto Contraste">
        <label className="grupo-label">Contraste:</label>
        <button
          onClick={() => aplicarAltoContraste(!altoContrasteAtivo)}
          aria-pressed={altoContrasteAtivo}
          title={altoContrasteAtivo ? "Desativar alto contraste" : "Ativar alto contraste"}
          className={`botao-contraste ${altoContrasteAtivo ? "ativo" : ""}`}
        >
          {altoContrasteAtivo ? <ContrasteOn /> : <ContrasteOff />}
          <span>{altoContrasteAtivo ? "Desativar Alto Contraste" : "Ativar Alto Contraste"}</span>
        </button>
      </div>

      {/* Grupo: Idioma */}
      <div className="grupo-acessibilidade grupo-idioma" aria-label="Selecione o idioma">
        <label className="grupo-label" htmlFor="idioma">Idioma:</label>
        <select
          id="idioma"
          value={idioma}
          onChange={(e) => {
            trocarIdioma(e.target.value);
            localStorage.setItem("lang", e.target.value);
          }}
          aria-label="Selecione o idioma"
        >
          <option value="pt">🇧🇷 Português</option>
          <option value="en">🇺🇸 English</option>
          <option value="es">🇪🇸 Español</option>
        </select>
      </div>
    </div>
  );
}
