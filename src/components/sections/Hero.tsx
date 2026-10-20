"use client";

import Image from "next/image";
import { useRef } from "react";
import { hero } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { gsap, MQ, useGSAP } from "@/components/motion/gsap";
import { CtaLink } from "@/components/ui/CtaLink";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = gsap.utils.selector(ref);
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(q("[data-hero-eyebrow]"), { autoAlpha: 0, y: 16, duration: 0.6 })
          .from(q("[data-hero-line]"), { yPercent: 115, duration: 1.1, stagger: 0.12 }, "-=0.2")
          .from(q("[data-hero-fade]"), { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1 }, "-=0.6")
          .fromTo(
            q("[data-hero-main]"),
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power3.inOut" },
            0.35,
          )
          .from(q("[data-hero-main] img"), { scale: 1.25, duration: 2.2 }, 0.35)
          .from(q("[data-hero-second]"), { autoAlpha: 0, y: 60, duration: 1.1 }, 1.2)
          .from(q("[data-hero-attr]"), { autoAlpha: 0, y: 12, stagger: 0.06, duration: 0.6 }, 1.3);

        // Parallax moderado y salida del texto
        const st = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q("[data-hero-main] img"), { yPercent: 8, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-hero-second]"), { yPercent: -25, ease: "none", scrollTrigger: st });
        gsap.to(q("[data-hero-copy]"), { autoAlpha: 0.25, y: -40, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="hero-title"
      className="grain relative isolate overflow-hidden bg-night text-bone"
    >
      <div className="container-x grid min-h-svh grid-cols-1 items-center gap-12 pt-[calc(var(--header-h)+2.5rem)] pb-12 lg:grid-cols-12 lg:gap-8 lg:pb-32">
        <div data-hero-copy className="lg:col-span-6 xl:col-span-6">
          <p data-hero-eyebrow className="eyebrow text-wood">
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="mt-8 text-display">
            {hero.titleLines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">
                  {line}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.12em]">
              <span data-hero-line className="accent block text-wood">
                {hero.titleAccent}
              </span>
            </span>
          </h1>
          <p data-hero-fade className="mt-8 max-w-xl text-lead text-muted-dark">
            {hero.lead}
          </p>
          <div data-hero-fade className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink href={whatsappUrl("Quiero cotizar un mueble a medida.")} cta="hero-whatsapp" icon="chat">
              {hero.primaryCta}
            </CtaLink>
            <CtaLink href="#coleccion" variant="ghost" cta="hero-coleccion" external={false}>
              {hero.secondaryCta}
            </CtaLink>
          </div>
        </div>

        <div className="relative lg:col-span-6 lg:pl-8 xl:pl-16">
          <div
            data-hero-main
            className="piece-frame ml-auto aspect-[4/5] w-full max-w-[34rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
          >
            <Image
              src={hero.image.src}
              width={hero.image.width}
              height={hero.image.height}
              alt={hero.imageAlt}
              priority
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="will-change-transform"
            />
          </div>
          <figure
            data-hero-second
            className="piece-frame absolute -bottom-10 left-0 hidden aspect-[3/4] w-[38%] max-w-[13rem] ring-8 ring-night lg:block"
          >
            <Image
              src={hero.secondaryImage.src}
              width={hero.secondaryImage.width}
              height={hero.secondaryImage.height}
              alt={hero.secondaryImageAlt}
              sizes="13rem"
            />
          </figure>
        </div>
      </div>

      <div className="relative border-t border-bone/10 lg:absolute lg:inset-x-0 lg:bottom-0">
        <ul className="container-x flex flex-wrap items-center gap-x-8 gap-y-2 py-5 text-[0.7rem] font-medium tracking-[0.2em] text-muted-dark uppercase sm:justify-between">
          {hero.attributes.map((a) => (
            <li key={a} data-hero-attr className="flex items-center gap-3">
              <span aria-hidden="true" className="size-1 rotate-45 bg-wood" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
