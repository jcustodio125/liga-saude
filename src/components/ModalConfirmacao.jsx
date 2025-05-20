// src/components/ModalConfirmacao.jsx

import useIdioma from "../hooks/useIdioma";
import "../assets/styles/modal.css";

export default function ModalConfirmacao({ aberto, tipo = "remover", onConfirm, onCancel }) {
  const { traduzir } = useIdioma();

  if (!aberto) return null;

  let mensagem = traduzir(
    "Tem certeza que deseja remover este item?",
    "Are you sure you want to remove this item?",
    "¿Está seguro de que desea eliminar este elemento?"
  );

  let tituloAcao = traduzir("Remover", "Remove", "Eliminar");

  if (tipo === "editar") {
    mensagem = traduzir(
      "Tem certeza que deseja modificar este item?",
      "Are you sure you want to edit this item?",
      "¿Está seguro de que desea editar este elemento?"
    );
    tituloAcao = traduzir("Editar", "Edit", "Editar");
  }

  if (tipo === "confirmar") {
    mensagem = traduzir(
      "Tem certeza que deseja marcar como atendido?",
      "Are you sure you want to mark as attended?",
      "¿Está seguro de que desea marcar como atendido?"
    );
    tituloAcao = traduzir("Atender", "Attend", "Atender");
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{traduzir("Confirmação", "Confirmation", "Confirmación")}</h3>
        <p>{mensagem}</p>
        <div className="modal-actions">
          <button className="btn cancelar" onClick={onCancel}>
            {traduzir("Cancelar", "Cancel", "Cancelar")}
          </button>
          <button className="btn confirmar" onClick={onConfirm}>
            {tituloAcao}
          </button>
        </div>
      </div>
    </div>
  );
}