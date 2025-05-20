// src/App.jsx

import React from "react"; // ✅ Adicionar essa linha
import { useContext } from "react";
import { IdiomaProvider, IdiomaContext } from "./context/IdiomaContext";
import Home from "./pages/Home";
import Especialidades from "./pages/Especialidades";
import Convenios from "./pages/Convenios";
import AgendarConsulta from "./pages/AgendarConsulta";
import MeusAgendamentos from "./pages/MeusAgendamentos";
import Disponibilidade from "./pages/Disponibilidade";
import Navbar from "./components/Navbar";
import BarraAcessibilidade from "./components/BarraAcessibilidade";

function AppInterno() {
  const { idioma } = useContext(IdiomaContext);

  const path = window.location.pathname;

  const rotas = {
    "/": Home,
    "/especialidades": Especialidades,
    "/convenios": Convenios,
    "/disponibilidade": Disponibilidade,
    "/agendar-consulta": AgendarConsulta,
    "/meus-agendamentos": MeusAgendamentos,
  };

  const Component = rotas[path] || null;

  return (
    <div className="app-container">
      <BarraAcessibilidade />
      <Navbar />
      <main className="main-content">
        {Component ? (
          React.createElement(Component, { key: idioma })
        ) : (
          <p style={{ color: "white", padding: "1rem" }}>
            ⚠️ Página não encontrada: {path}
          </p>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <IdiomaProvider>
      <AppInterno />
    </IdiomaProvider>
  );
}
