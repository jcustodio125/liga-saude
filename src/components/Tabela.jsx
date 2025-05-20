// src/components/Tabela.jsx

import React, { useState, useMemo } from "react";
import useIdioma from "../hooks/useIdioma";
import "../assets/styles/tabela.css";

export default function Tabela({
  dados = [],
  colunas = [],
  onEditar,
  onRemover,
  itensPorPagina = 5
}) {
  const { traduzir } = useIdioma(); // ✅ Hook para tradução

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");

  const dadosFiltrados = useMemo(() => {
    return dados.filter(item =>
      colunas.some(col => {
        const valor = item[col.campo];
        return valor && valor.toString().toLowerCase().includes(busca.toLowerCase());
      })
    );
  }, [busca, dados]);

  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const paginados = dadosFiltrados.slice(inicio, fim);

  return (
    <div className="tabela-container">
      <input
        className="input-busca"
        type="text"
        placeholder={traduzir("Buscar...", "Search...", "Buscar...")}
        value={busca}
        onChange={(e) => {
          setBusca(e.target.value);
          setPaginaAtual(1);
        }}
      />

      {/* Tabela */}
      <table className="tabela">
        <thead>
          <tr>
            {/* Cabeçalho da tabela */}
            {colunas.map((col) => (
              <th key={col.campo}>{col.label}</th>
            ))}
            {/* Coluna de ações */}
            {(onEditar || onRemover) && (
              <th>{traduzir("Ações", "Actions", "Acciones")}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginados.map((item) => (
            <tr key={item.id}>
              {colunas.map((col) => (
                <td key={col.campo}>{item[col.campo]}</td>
              ))}
              {(onEditar || onRemover) && (
                <td className="acoes">
                  {onEditar && (
                    <button
                      className="btn-editar"
                      onClick={() => onEditar(item)}
                    >
                      {traduzir("Editar", "Edit", "Editar")}
                    </button>
                  )}
                  {onRemover && (
                    <button
                      className="btn-remover"
                      onClick={() => onRemover(item)}
                    >
                      {traduzir("Remover", "Remove", "Eliminar")}
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="paginacao">
        <button
          className="nav-btn"
          onClick={() => setPaginaAtual(p => p - 1)}
          disabled={paginaAtual === 1}
        >
          ◀ {traduzir("Anterior", "Previous", "Anterior")}
        </button>

        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => setPaginaAtual(i + 1)}
            className={paginaAtual === i + 1 ? "ativo" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="nav-btn"
          onClick={() => setPaginaAtual(p => p + 1)}
          disabled={paginaAtual === totalPaginas}
        >
          {traduzir("Próxima", "Next", "Siguiente")} ▶
        </button>
      </div>
    </div>
  );
}