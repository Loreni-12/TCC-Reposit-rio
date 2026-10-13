import { useEffect } from "react";

/** Define o título da aba do navegador. */
export function useTituloDocumento(titulo: string) {
  useEffect(() => {
    document.title = titulo === "Doe + Vida" ? titulo : `${titulo} | Doe + Vida`;
  }, [titulo]);
}
