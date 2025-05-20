import React, { createContext, useState, useEffect } from "react";

export const IdiomaContext = createContext();

export const IdiomaProvider = ({ children }) => {
  const [idioma, setIdioma] = useState("pt");
  // Carrega o idioma salvo no localStorage ao iniciar
  useEffect(() => {
    const idiomaSalvo = localStorage.getItem("idiomaSelecionado");
    if (idiomaSalvo) {
      setIdioma(idiomaSalvo);
    }
  }, []);

  // Salva no localStorage sempre que o idioma mudar
  useEffect(() => {
    localStorage.setItem("idiomaSelecionado", idioma);
  }, [idioma]);

  return (
    <IdiomaContext.Provider value={{ idioma, trocarIdioma: setIdioma }}>
      {children}
    </IdiomaContext.Provider>
  );
};