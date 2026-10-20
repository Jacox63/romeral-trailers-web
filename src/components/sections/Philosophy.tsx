"use client";

import { useRef } from "react";
import { philosophy } from "@/content/site";
import { gsap, MQ, useGSAP } from "@/components/motion/gsap";

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const words = philosophy.quote.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
        gsap.fromTo(
          q("[data-word]"),
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: { trigger: q("blockquote")[0], start: "top 78%", end: "bottom 55%", scrub: 0.5 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="filosofia-title" className="on-light section-y bg-bone">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <h2 id="filosofia-title" className="eyebrow h-fit text-wood-deep lg:col-span-3 lg:pt-4">
          {philosophy.eyebrow}
        </h2>
        <div className="lg:col-span-9">
          <blockquote className="text-[clamp(1.75rem,3.6vw,3.4rem)] leading-[1.18] font-light tracking-[-0.01em]">
            <p>
              {words.map((w, i) => (
                <span key={i} data-word className="inline">
                  {w}{" "}
                </span>
              ))}
            </p>
          </blockquote>
          <p className="mt-10 max-w-xl text-muted">— Romeral Trailers. {philosophy.note}</p>
        </div>
      </div>
    </section>
  );
}
