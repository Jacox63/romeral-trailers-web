/**
 * Logotipo tipográfico provisional. El logotipo oficial (isotipo de picos + "ROMERAL")
 * solo está disponible a 150 px; se sustituirá por el SVG oficial cuando la marca lo entregue.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-start leading-none ${className}`}>
      <span className="sr-only">Romeral Trailers</span>
      <span aria-hidden="true" className="wordmark text-[1.05rem] sm:text-[1.15rem]">
        Romeral
      </span>
      <span aria-hidden="true" className="mt-1 pl-[0.1em] text-[0.55rem] font-medium tracking-[0.5em] text-wood uppercase">
        Trailers
      </span>
    </span>
  );
}
