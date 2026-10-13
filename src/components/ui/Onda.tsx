/**
 * Divisor ondulado entre seções. Coloque no topo de uma seção; `className` define a cor
 * da seção ANTERIOR via text-* (ex.: text-rosa-claro), que "escorre" para dentro da atual.
 */
export function Onda({ className = "", invertida = false }: { className?: string; invertida?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`block h-10 w-full sm:h-16 ${invertida ? "-scale-x-100" : ""} ${className}`}
    >
      <path fill="currentColor" d="M0,0H1440V34C1200,78 960,6 720,32C480,58 240,76 0,38Z" />
    </svg>
  );
}
