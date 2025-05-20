// src/pages/Especialidades.jsx

import { useEffect, useState } from "react";
import {
  listarEspecialidades,
  cadastrarEspecialidade
} from "../services/apiClient";
import Tabela from "../components/Tabela";
import ModalFormulario from "../components/ModalFormulario";
import ModalConfirmacao from "../components/ModalConfirmacao";
import "../assets/styles/especialidades.css";
import "../assets/styles/tabela.css";

export default function Especialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [editando, setEditando] = useState(null);
  const [removerId, setRemoverId] = useState(null);
  const [modo, setModo] = useState("criar");

  useEffect(() => {
    async function carregar() {
      const resp = await listarEspecialidades();
      if (resp.status === 200) setEspecialidades(resp.data);
    }
    carregar();
  }, []);

  const salvar = async (dados) => {
    const resp = await cadastrarEspecialidade(dados);
    if (resp.status === 201) {
      setEspecialidades(prev => [...prev, resp.data]);
      setModalAberto(false);
      setEditando(null);
    }
  };

  return (
    <div className="container-tabela">
      <div className="cabecalho-tabela">
        <h2>Especialidades</h2>
        <button
          className="btn adicionar"
          onClick={() => {
            setEditando(null);
            setModo("criar");
            setModalAberto(true);
          }}
        >
          + Nova Especialidade
        </button>
      </div>

      <Tabela
        dados={especialidades}
        colunas={[
          { label: "ID", campo: "id" },
          { label: "Nome", campo: "nome" }
        ]}
        onEditar={(item) => {
          setEditando(item);
          setModo("editar");
          setModalAberto(true);
        }}
        onRemover={(item) => {
          setRemoverId(item.id);
          setModo("remover");
          setModalConfirmar(true);
        }}
      />

      <ModalFormulario
        aberto={modalAberto}
        titulo={editando ? "Editar Especialidade" : "Nova Especialidade"}
        campos={[{ nome: "nome", label: "Nome", obrigatorio: true }]}
        dadosIniciais={editando || {}}
        onSubmit={salvar}
        onCancel={() => {
          setModalAberto(false);
          setEditando(null);
        }}
      />

      <ModalConfirmacao
        aberto={modalConfirmar}
        tipo={modo}
        onConfirm={() => {
          setEspecialidades(prev => prev.filter(e => e.id !== removerId));
          setModalConfirmar(false);
        }}
        onCancel={() => setModalConfirmar(false)}
      />
    </div>
  );
}