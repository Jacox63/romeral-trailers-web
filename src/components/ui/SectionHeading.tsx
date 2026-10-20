type Props = {
  eyebrow: string;
  title: string;
  accent: string;
  id?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Encabezado de sección: eyebrow + h2 con palabra de acento. data-split activa el revelado por líneas. */
export function SectionHeading({ eyebrow, title, accent, id, tone = "light", className = "" }: Props) {
  return (
    <div className={className}>
      <p className={`eyebrow ${tone === "dark" ? "text-wood" : "text-wood-deep"}`} data-fade>
        {eyebrow}
      </p>
      <h2 id={id} className="mt-6 text-h2" data-split>
        {title} <span className="accent">{accent}</span>
      </h2>
    </div>
  );
}
