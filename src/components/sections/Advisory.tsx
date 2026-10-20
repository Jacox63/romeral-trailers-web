import Image from "next/image";
import { advisory } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { Reveal } from "@/components/motion/Reveal";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Advisory() {
  return (
    <Reveal as="section" aria-labelledby="asesoria-title" className="on-light section-y bg-sand">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:col-start-1">
          <SectionHeading id="asesoria-title" eyebrow={advisory.eyebrow} title={advisory.title} accent={advisory.accent} />
          {advisory.body.map((t) => (
            <p key={t} data-fade className="mt-6 max-w-lg text-muted">
              {t}
            </p>
          ))}
          <div data-fade className="mt-10">
            <CtaLink
              href={whatsappUrl("Quiero asesoría de diseño para mi espacio.")}
              cta="asesoria-whatsapp"
              variant="dark"
              icon="chat"
            >
              {advisory.cta}
            </CtaLink>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div data-clip-x className="piece-frame ml-auto aspect-[4/5] max-w-[32rem]">
            <Image
              src={advisory.image.src}
              width={advisory.image.width}
              height={advisory.image.height}
              alt={advisory.alt}
              sizes="(min-width: 1024px) 32rem, 100vw"
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
