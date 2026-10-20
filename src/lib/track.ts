/**
 * Analítica opcional. Solo envía eventos si existe un gestor (gtag o dataLayer) cargado
 * con NEXT_PUBLIC_GA_ID. Sin ID no se carga nada ni se usan cookies.
 */
type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

export function track(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
  if (typeof w.gtag === "function") w.gtag("event", name, params);
  else if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event: name, ...params });
}

/** Delegación global: cualquier elemento con data-cta registra un clic. */
export function bindCtaTracking() {
  const handler = (e: MouseEvent) => {
    const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cta]");
    if (el) track("cta_click", { cta: el.dataset.cta, href: el.getAttribute("href") });
  };
  document.addEventListener("click", handler);
  return () => document.removeEventListener("click", handler);
}
