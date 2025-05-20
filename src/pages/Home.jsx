// src/pages/Home.jsx

import "../assets/styles/home.css";
import useIdioma from "../hooks/useIdioma.js";

export default function Home() {
  const { traduzir } = useIdioma();

  return (
    <div className="home-container">

      {/* Seção Hero */}
      <section className="home-hero">
        <h1>{traduzir("Bem-vindo à Liga Saúde", "Welcome to Liga Saúde", "Bienvenido a Liga Saúde")}</h1>
        <p>
          {traduzir(
            "Aqui você encontra os melhores especialistas para cuidar da sua saúde. Explore nossas especialidades e agende sua consulta com facilidade.",
            "Here you will find the best specialists to take care of your health. Explore our specialties and easily schedule your appointment.",
            "Aquí encontrarás los mejores especialistas para cuidar tu salud. Explora nuestras especialidades y agenda tu cita fácilmente."
          )}
        </p>
        <div className="home-buttons">
          <a className="btn-home" href="/especialidades">{traduzir("Especialidades", "Specialties", "Especialidades")}</a>
          <a className="btn-home" href="/convenios">{traduzir("Convênios", "Health Plans", "Convenios")}</a>
          <a className="btn-home" href="/disponibilidade">{traduzir("Disponibilidade", "Availability", "Disponibilidad")}</a>
          <a className="btn-home" href="/meus-agendamentos">{traduzir("Meus Agendamentos", "My Appointments", "Mis Turnos")}</a>
          <a className="btn-home agendar" href="/agendar-consulta">{traduzir("Agendar Consulta", "Book Appointment", "Agendar Consulta")}</a>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="home-features">
        <div className="card card-feature">
          <h3>🩺 {traduzir("Especialidades", "Specialties", "Especialidades")}</h3>
          <p>{traduzir("Veja e gerencie especialidades médicas.", "View and manage medical specialties.", "Vea y administre especialidades médicas.")}</p>
        </div>
        <div className="card card-feature">
          <h3>📅 {traduzir("Horários Disponíveis", "Available Times", "Horarios Disponibles")}</h3>
          <p>{traduzir("Consulte horários por especialidade e data.", "Check times by specialty and date.", "Consulta horarios por especialidad y fecha.")}</p>
        </div>
        <div className="card card-feature">
          <h3>📝 {traduzir("Agende Consultas", "Schedule Appointments", "Agende Consultas")}</h3>
          <p>{traduzir("Faça agendamentos com poucos cliques.", "Schedule appointments with just a few clicks.", "Agenda citas en pocos clics.")}</p>
        </div>
        <div className="card card-feature">
          <h3>📋 {traduzir("Meus Agendamentos", "My Appointments", "Mis Turnos")}</h3>
          <p>{traduzir("Acompanhe e gerencie suas consultas.", "Track and manage your appointments.", "Sigue y gestiona tus citas.")}</p>
        </div>
      </section>
    </div>
  );
}
