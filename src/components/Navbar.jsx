// src/components/Navbar.jsx

import React, { useState } from "react";
import useIdioma from "../hooks/useIdioma";
import "../assets/styles/navbar.css";

export default function Navbar() {
  const { traduzir } = useIdioma();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <div className="navbar-brand">🏥 Liga Saúde</div>
        <button
          className={`navbar-toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label={traduzir("Alternar menu", "Toggle menu", "Alternar menú")}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <li>
          <a href="/" className="navbar-link">{traduzir("Home", "Home", "Inicio")}</a>
        </li>
        <li>
          <a href="/especialidades" className="navbar-link">{traduzir("Especialidades", "Specialties", "Especialidades")}</a>
        </li>
        <li>
          <a href="/convenios" className="navbar-link">{traduzir("Convênios", "Health Plans", "Convenios")}</a>
        </li>
        <li>
          <a href="/disponibilidade" className="navbar-link">{traduzir("Disponibilidade", "Availability", "Disponibilidad")}</a>
        </li>
        <li>
          <a href="/meus-agendamentos" className="navbar-link">{traduzir("Meus Agendamentos", "My Appointments", "Mis Citas")}</a>
        </li>
        <li>
          <a href="/agendar-consulta" className="btn btn-primary btn-sm">
            {traduzir("Agendar Consulta", "Book Appointment", "Agendar Cita")}
          </a>
        </li>
      </ul>
    </nav>
  );
}