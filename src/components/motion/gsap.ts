"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1 });
}

/** Consultas compartidas por todas las animaciones (ver docs/motion-storyboard.md). */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
} as const;

/**
 * Revela por líneas el texto de los elementos dados, con máscara.
 * Devuelve las instancias SplitText para que gsap.context las revierta al desmontar.
 */
export function revealLines(
  targets: Element[] | NodeListOf<Element>,
  vars: gsap.TweenVars = {},
  trigger?: ScrollTrigger.Vars,
) {
  const els = Array.from(targets);
  if (!els.length) return;
  return SplitText.create(els, {
    type: "lines",
    mask: "lines",
    linesClass: "split-line",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.1,
        ...vars,
        scrollTrigger: trigger,
      });
    },
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
