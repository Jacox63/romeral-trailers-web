"use client";

import { useRef } from "react";
import { processSteps as process } from "@/content/site";
import { gsap, MQ, revealLines, ScrollTrigger, useGSAP } from "@/components/motion/gsap";

export function Process() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
        const list = q("[data-steps]")[0];
        revealLines(q("[data-split]"), {}, { trigger: ref.current, start: "top 75%", once: true });
        gsap.fromTo(
          q("[data-line]"),
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 65%", end: "bottom 65%", scrub: true } },
        );
        q("[data-step]").forEach((step) => {
          gsap.set(step, { opacity: 0.3 });
          ScrollTrigger.create({
            trigger: step,
            start: "top 65%",
            onEnter: () => gsap.to(step, { opacity: 1, duration: 0.5 }),
            onLeaveBack: () => gsap.to(step, { opacity: 0.3, duration: 0.5 }),
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="proceso" aria-labelledby="proceso-title" className="on-light section-y bg-bone">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:col-span-5 lg:h-fit">
          <p className="eyebrow text-wood-deep">{process.eyebrow}</p>
          <h2 id="proceso-title" className="mt-6 text-h2" data-split>
            {process.title} <span className="accent">{process.accent}</span>
          </h2>
        </div>
        <ol data-steps className="relative lg:col-span-6 lg:col-start-7">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.15rem] w-px bg-night/15" />
          <span aria-hidden="true" data-line className="absolute top-2 bottom-2 left-[1.15rem] w-px origin-top bg-wood-deep" />
          {process.steps.map((s, i) => (
            <li key={s.title} data-step className="relative grid grid-cols-[2.3rem_1fr] gap-6 pb-14 last:pb-0">
              <span className="relative z-10 grid size-[2.3rem] place-items-center rounded-full border border-wood-deep bg-bone text-xs font-medium text-wood-deep tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h3">{s.title}</h3>
                <p className="mt-3 max-w-md text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
