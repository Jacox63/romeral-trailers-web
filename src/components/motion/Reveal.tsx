"use client";

import { useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { gsap, MQ, revealLines, ScrollTrigger, useGSAP } from "./gsap";

type Props<T extends ElementType> = {
  as?: T;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

/**
 * Envoltorio cliente que anima por atributos a sus descendientes (el contenido sigue siendo
 * HTML de servidor, legible sin JS):
 *  - [data-split]  títulos revelados por líneas con máscara
 *  - [data-fade]   sube 24px y aparece
 *  - [data-reveal] tarjetas en lote: suben 80px y aparecen, escalonadas
 *  - [data-mask]   imagen descubierta de arriba a abajo (clip-path)
 *  - [data-clip-x] imagen descubierta de derecha a izquierda
 * Con prefers-reduced-motion: reduce no se aplica nada.
 */
export function Reveal<T extends ElementType = "section">({ as, children, ...rest }: Props<T>) {
  const Tag = (as ?? "section") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(root);

        q("[data-split]").forEach((el) =>
          revealLines([el], {}, { trigger: el, start: "top 85%", once: true }),
        );

        q("[data-fade]").forEach((el) =>
          gsap.from(el, {
            y: 24,
            autoAlpha: 0,
            duration: 0.9,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }),
        );

        const cards = q("[data-reveal]");
        if (cards.length) {
          gsap.set(cards, { y: 80, autoAlpha: 0 });
          ScrollTrigger.batch(cards, {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.12, overwrite: true }),
          });
        }

        q("[data-mask]").forEach((el) =>
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.3,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            },
          ),
        );

        q("[data-clip-x]").forEach((el) =>
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 0% 0% 100%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.4,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, start: "top 75%", once: true },
            },
          ),
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
