// src/hooks/useIdioma.js

import { useContext } from "react";
import { IdiomaContext } from "../context/IdiomaContext";

export default function useIdioma() {
  const { idioma, trocarIdioma } = useContext(IdiomaContext);

  const traduzir = (pt, en, es) => {
    if (idioma === "pt") return pt;
    if (idioma === "en") return en;
    if (idioma === "es") return es;
    return pt;
  };

  return { idioma, trocarIdioma, traduzir };
}