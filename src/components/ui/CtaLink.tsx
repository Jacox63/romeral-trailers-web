import type { ReactNode } from "react";
import { ArrowRight, ChatIcon } from "./icons";

type Variant = "primary" | "ghost" | "dark";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Identificador para analítica (data-cta). */
  cta: string;
  icon?: "arrow" | "chat";
  external?: boolean;
  className?: string;
};

/** Botón-enlace con estados hover/focus del sistema. Siempre apunta a un destino real. */
export function CtaLink({ href, children, variant = "primary", cta, icon = "arrow", external, className = "" }: Props) {
  const isExternal = external ?? /^https?:|^mailto:/.test(href);
  return (
    <a
      href={href}
      data-cta={cta}
      className={`btn btn-${variant} ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon === "chat" ? <ChatIcon /> : null}
      <span>{children}</span>
      {icon === "arrow" ? <ArrowRight className="btn-arrow" /> : null}
      {isExternal ? <span className="sr-only"> (se abre en una pestaña nueva)</span> : null}
    </a>
  );
}
