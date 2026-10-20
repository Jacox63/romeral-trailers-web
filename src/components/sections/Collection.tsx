import Image from "next/image";
import { collection } from "@/content/site";
import { quoteMessage, whatsappUrl } from "@/lib/links";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/icons";

export function Collection() {
  return (
    <Reveal as="section" id="coleccion" aria-labelledby="coleccion-title" className="on-light section-y bg-bone pt-0">
      <div className="container-x">
        <div className="grid gap-8 border-t border-night/15 pt-[var(--space-section)] lg:grid-cols-12">
          <SectionHeading
            id="coleccion-title"
            eyebrow={collection.eyebrow}
            title={collection.title}
            accent={collection.accent}
            className="lg:col-span-7"
          />
          <p data-fade className="max-w-md self-end text-muted lg:col-span-5 lg:justify-self-end">
            {collection.intro}
          </p>
        </div>

        <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {collection.items.map((p, i) => (
            <li key={p.id} data-reveal className={i % 2 === 1 ? "lg:mt-16" : ""}>
              <article className="group">
                <div data-mask className="piece-frame aspect-[4/5]">
                  <Image
                    src={p.image.src}
                    width={p.image.width}
                    height={p.image.height}
                    alt={p.alt}
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-night/70 px-2.5 py-1 text-[0.65rem] tracking-[0.2em] text-bone uppercase backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-6 text-xs font-medium tracking-[0.2em] text-wood-deep uppercase">{p.kicker}</p>
                <h3 className="mt-2 text-h3">{p.name}</h3>
                <p className="mt-3 text-[0.98rem] text-muted">{p.description}</p>
                <a
                  href={whatsappUrl(quoteMessage(`el ${p.name}`))}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta={`cotizar-${p.id}`}
                  className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-medium tracking-[0.12em] uppercase"
                >
                  <span className="link-line">Cotizar esta pieza</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="sr-only"> por WhatsApp: {p.name} (se abre en una pestaña nueva)</span>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
