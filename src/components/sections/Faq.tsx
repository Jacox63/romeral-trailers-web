import { faq } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Plus } from "@/components/ui/icons";

export function Faq() {
  return (
    <Reveal as="section" id="preguntas" aria-labelledby="preguntas-title" className="on-light section-y bg-bone pt-0">
      <div className="container-x grid gap-12 border-t border-night/15 pt-[var(--space-section)] lg:grid-cols-12">
        <SectionHeading id="preguntas-title" eyebrow={faq.eyebrow} title={faq.title} accent={faq.accent} className="lg:col-span-5" />
        <div className="lg:col-span-7">
          {faq.items.map((item) => (
            <details key={item.q} data-fade className="faq-item border-b border-night/15">
              <summary className="flex min-h-16 items-center justify-between gap-6 py-6 text-[1.2rem] font-normal">
                {item.q}
                <Plus className="faq-icon shrink-0 text-wood-deep" />
              </summary>
              <div className="faq-body max-w-2xl pb-8 text-muted">
                <p>{item.a}</p>
                {item.cta ? (
                  <a
                    href={whatsappUrl("Quiero una cotización.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="faq-precio-whatsapp"
                    className="link-line mt-4 inline-block font-medium text-wood-deep"
                  >
                    Pedir cotización por WhatsApp
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                  </a>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
