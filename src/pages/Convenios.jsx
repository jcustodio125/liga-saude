// src/pages/Convenios.jsx

import { useEffect, useState } from "react";
import useIdioma from "../hooks/useIdioma";
import {
  listarConvenios,
  cadastrarConvenio
} from "../services/apiClient";
import Tabela from "../components/Tabela";
import ModalFormulario from "../components/ModalFormulario";
import ModalConfirmacao from "../components/ModalConfirmacao";
import "../assets/styles/convenios.css";

export default function Convenios() {
  const { traduzir } = useIdioma();
  const [convenios, setConvenios] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [editando, setEditando] = useState(null);
  const [removerId, setRemoverId] = useState(null);
  const [modo, setModo] = useState("criar");

  // Carregar convênios ao montar o componente
  useEffect(() => {
    async function carregar() {
      const resp = await listarConvenios();
      if (resp.status === 200) setConvenios(resp.data);
    }
    carregar();
  }, []);

  // Função para salvar (criar ou editar)
  const salvar = async (dados) => {
    const resp = await cadastrarConvenio(dados);

    if (resp.status === 201 || resp.status === 200) {
      if (editando) {
        // Atualizar item existente
        setConvenios(prev =>
          prev.map(c => (c.id === dados.id ? dados : c))
        );
      } else {
        // Adicionar novo item
        setConvenios(prev => [...prev, resp.data]);
      }

      setModalAberto(false);
      setEditando(null);
    }
  };

  return (
    <div className="container-tabela">
      <div className="cabecalho-tabela">
        {/* Título traduzido */}
        <h2>{traduzir("Convênios", "Health Plans", "Convenios")}</h2>
        <button
          className="btn adicionar"
          onClick={() => {
            setEditando(null);
            setModo("criar");
            setModalAberto(true);
          }}
        >
          + {traduzir("Novo Convênio", "New Health Plan", "Nuevo Convenio")}
        </button>
      </div>

      {/* Tabela de convênios com colunas traduzidas */}
      <Tabela
        dados={convenios}
        colunas={[
          { label: traduzir("ID", "ID", "ID"), campo: "id" },
          { label: traduzir("Nome", "Name", "Nombre"), campo: "nome" }
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

      {/* Modal de formulário com campos traduzidos */}
      <ModalFormulario
        aberto={modalAberto}
        titulo={
          editando
            ? traduzir("Editar Convênio", "Edit Health Plan", "Editar Convenio")
            : traduzir("Novo Convênio", "New Health Plan", "Nuevo Convenio")
        }
        campos={[
          {
            nome: "nome",
            label: traduzir("Nome", "Name", "Nombre"),
            obrigatorio: true
          }
        ]}
        dadosIniciais={editando || {}}
        onSubmit={salvar}
        onCancel={() => {
          setModalAberto(false);
          setEditando(null);
        }}
      />

      {/* Modal de confirmação com base no idioma */}
      <ModalConfirmacao
        aberto={modalConfirmar}
        tipo={modo}
        mensagem={traduzir(
          modo === "remover"
            ? "Tem certeza que deseja remover este convênio?"
            : "",
          modo === "remover"
            ? "Are you sure you want to remove this health plan?"
            : "",
          modo === "remover"
            ? "¿Está seguro de que desea eliminar este convenio?"
            : ""
        )}
        onConfirm={() => {
          setConvenios(prev => prev.filter(e => e.id !== removerId));
          setModalConfirmar(false);
        }}
        onCancel={() => setModalConfirmar(false)}
      />
    </div>
  );
}