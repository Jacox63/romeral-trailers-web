"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { bindCtaTracking } from "@/lib/track";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { Wordmark } from "@/components/ui/Wordmark";
import { ChatIcon } from "@/components/ui/icons";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => bindCtaTracking(), []);

  // Fondo sólido tras 80px, ocultar al bajar / mostrar al subir, barra de progreso.
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setSolid(self.scroll() > 80);
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
        },
      });
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const show = gsap.quickTo(header, "yPercent", { duration: 0.4, ease: "power3.out" });
        ScrollTrigger.create({
          start: 200,
          end: "max",
          onUpdate: (self) => show(self.direction === 1 ? -100 : 0),
          onLeaveBack: () => show(0),
        });
      });
      return () => {
        st.kill();
        mm.revert();
      };
    },
    { scope: headerRef },
  );

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Menú móvil: Esc cierra, foco atrapado, scroll del body bloqueado.
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const focusables = menu?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && focusables && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    if (menu && window.matchMedia(MQ.motion).matches) {
      gsap.from(menu.querySelectorAll("[data-menu-item]"), { y: 40, autoAlpha: 0, stagger: 0.06, duration: 0.7 });
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, close]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 text-bone transition-[background-color,backdrop-filter] duration-500 ${
        solid || open ? "bg-night/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <a href="#inicio" className="relative z-10">
          <Wordmark />
          <span className="sr-only">, ir al inicio</span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[0.8125rem] tracking-[0.12em] uppercase">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link-line">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl("Quiero cotizar un mueble.")}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="header-whatsapp"
            className="btn btn-primary hidden min-h-11 px-5 sm:inline-flex"
          >
            <ChatIcon />
            <span>Cotizar</span>
            <span className="sr-only"> por WhatsApp (se abre en una pestaña nueva)</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 grid size-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-wood"
        style={{ transform: "scaleX(0)" }}
        ref={progressRef}
      />

      {open ? (
        <div
          id="menu-movil"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 top-[var(--header-h)] h-[calc(100svh-var(--header-h))] overflow-y-auto bg-night lg:hidden"
        >
          <nav aria-label="Menú móvil" className="container-x flex h-full flex-col justify-between pt-10 pb-12">
            <ul className="space-y-2">
              {nav.map((item, i) => (
                <li key={item.href} data-menu-item>
                  <a href={item.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-2 text-[2.25rem] font-light">
                    <span className="text-xs text-wood tabular-nums">0{i + 1}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              data-menu-item
              href={whatsappUrl("Quiero cotizar un mueble.")}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="menu-whatsapp"
              className="btn btn-primary w-full"
            >
              <ChatIcon />
              <span>Cotizar por WhatsApp</span>
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
