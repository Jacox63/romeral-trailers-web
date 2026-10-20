"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { projects, statement } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { gsap, MQ, revealLines, useGSAP } from "@/components/motion/gsap";
import { CtaLink } from "@/components/ui/CtaLink";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null); // se mueve en escritorio
  const scrollerRef = useRef<HTMLDivElement>(null); // carrusel nativo en móvil
  const [current, setCurrent] = useState(1);
  const total = projects.items.length;

  useGSAP(
    () => {
      const section = ref.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const mm = gsap.matchMedia();

      // Escritorio: sección fijada y pista horizontal ligada al scroll.
      mm.add(MQ.desktop, () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setCurrent(Math.min(total, Math.max(1, Math.round(self.progress * (total - 1)) + 1))),
          },
        });
        // Parallax interno de cada imagen
        gsap.utils.toArray<HTMLElement>("[data-parallax]", section).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });

      // Título por líneas en cualquier tamaño (con movimiento permitido)
      mm.add(MQ.motion, () => {
        revealLines(gsap.utils.toArray("[data-split]", section), {}, { trigger: section, start: "top 70%", once: true });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  // Móvil/tableta: carrusel nativo con botones accesibles.
  const step = (dir: 1 | -1) => {
    const track = scrollerRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const w = slide ? slide.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * w, behavior: window.matchMedia(MQ.motion).matches ? "smooth" : "auto" });
  };
  const onScroll = () => {
    const track = scrollerRef.current;
    if (!track || window.innerWidth >= 1024) return;
    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-slide]"));
    const idx = slides.findIndex((s) => s.offsetLeft + s.offsetWidth / 2 > track.scrollLeft + 1);
    setCurrent(Math.min(total, Math.max(1, idx + 1)));
  };

  return (
    <section
      ref={ref}
      id="proyectos"
      aria-labelledby="proyectos-title"
      className="grain relative overflow-hidden bg-night py-[var(--space-section)] text-bone lg:h-svh lg:py-0"
    >
      <div ref={trackRef} className="lg:flex lg:h-full lg:w-max lg:items-center lg:pr-[12vw]">
        {/* Panel introductorio */}
        <div className="px-[var(--gutter)] lg:w-[36vw] lg:shrink-0 lg:pr-14">
          <p className="eyebrow text-wood">{projects.eyebrow}</p>
          <h2 id="proyectos-title" className="mt-6 text-h2" data-split>
            {projects.title} <span className="accent text-wood">{projects.accent}</span>
          </h2>
          <p className="mt-8 max-w-sm text-muted-dark">{statement.text} Comedores, cocinas y espacios completos, fabricados a la medida de cada lugar.</p>
          <div className="mt-10 flex items-center gap-6">
            <p className="text-sm tracking-[0.2em] text-muted-dark tabular-nums" aria-live="polite">
              <span className="text-bone">{String(current).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
            </p>
            <div className="flex gap-2 lg:hidden">
              <button type="button" onClick={() => step(-1)} className="grid size-11 place-items-center border border-bone/25 hover:border-bone" aria-label="Proyecto anterior">
                <ChevronLeft />
              </button>
              <button type="button" onClick={() => step(1)} className="grid size-11 place-items-center border border-bone/25 hover:border-bone" aria-label="Proyecto siguiente">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="snap-track mt-12 flex items-start gap-6 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-2 lg:mt-0 lg:gap-10 lg:overflow-visible lg:px-0 lg:pb-0"
        >
        {projects.items.map((p, i) => (
          <article
            key={p.id}
            data-slide
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${total}: ${p.title}`}
            className="flex w-[78vw] max-w-sm shrink-0 flex-col sm:w-[46vw] lg:w-[26vw] lg:max-w-none"
          >
            <div className="piece-frame aspect-[3/4] lg:aspect-auto lg:h-[58svh]">
              <Image
                data-parallax
                src={p.image.src}
                width={p.image.width}
                height={p.image.height}
                alt={p.alt}
                sizes="(min-width: 1024px) 26vw, 78vw"
                className="lg:scale-[1.14]"
              />
            </div>
            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-xs text-wood tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-h3">{p.title}</h3>
            </div>
            <p className="mt-3 text-[0.98rem] text-muted-dark">{p.description}</p>
            {p.quote ? (
              <blockquote className="mt-4 border-l border-wood pl-4">
                <p className="accent text-xl text-bone">“{p.quote.text}”</p>
                <footer className="mt-1 text-xs tracking-[0.1em] text-muted-dark">{p.quote.author}</footer>
              </blockquote>
            ) : null}
          </article>
        ))}

        {/* Cierre: pieza gráfica de la marca + CTA */}
        <div data-slide className="flex w-[78vw] max-w-sm shrink-0 flex-col sm:w-[46vw] lg:w-[26vw] lg:max-w-none">
          <div className="piece-frame aspect-[3/4] lg:aspect-auto lg:h-[58svh]">
            <Image
              src={statement.image.src}
              width={statement.image.width}
              height={statement.image.height}
              alt={statement.alt}
              sizes="(min-width: 1024px) 26vw, 78vw"
            />
          </div>
          <CtaLink
            href={whatsappUrl("Quiero cotizar un proyecto completo para mi espacio.")}
            cta="proyectos-whatsapp"
            icon="chat"
            className="mt-8 self-start"
          >
            Quiero un proyecto así
          </CtaLink>
        </div>
        </div>
      </div>
    </section>
  );
}
