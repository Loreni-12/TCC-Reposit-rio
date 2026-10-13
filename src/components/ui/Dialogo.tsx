import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

interface DialogoProps {
  aberto: boolean;
  aoFechar: () => void;
  titulo: string;
  children: ReactNode;
}

/** Pop-up acessível com <dialog> nativo: prende o foco, fecha com Esc e clicando fora. */
export function Dialogo({ aberto, aoFechar, titulo, children }: DialogoProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo) return;
    if (aberto && !dialogo.open) dialogo.showModal();
    if (!aberto && dialogo.open) dialogo.close();
  }, [aberto]);

  return (
    <dialog
      ref={ref}
      aria-label={titulo}
      onClose={aoFechar}
      onClick={(e) => e.target === ref.current && aoFechar()}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl bg-branco p-0 text-preto backdrop:bg-preto/40"
    >
      <div className="relative max-h-[90dvh] overflow-y-auto p-6 sm:p-8">
        <button
          type="button"
          onClick={aoFechar}
          className="absolute right-4 top-4 rounded-full p-2 text-cinza hover:bg-rosa-claro hover:text-vermelho"
        >
          <X aria-hidden className="size-5" />
          <span className="sr-only">Fechar</span>
        </button>
        {children}
      </div>
    </dialog>
  );
}
