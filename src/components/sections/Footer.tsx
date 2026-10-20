import { contact, footer, nav } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-night pb-28 text-bone lg:pb-0">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="accent mt-6 text-2xl text-muted-dark">{footer.tagline}</p>
          <p className="mt-4 text-sm text-muted-dark">{footer.location}</p>
        </div>
        <nav aria-label="Pie de página" className="md:col-span-3">
          <ul className="space-y-3 text-sm tracking-[0.12em] uppercase">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="link-line">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-3 text-sm md:col-span-4">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" data-cta="footer-whatsapp" className="link-line block w-fit">
            WhatsApp {contact.whatsappDisplay}
          </a>
          <a href={`mailto:${contact.email}`} data-cta="footer-email" className="link-line block w-fit break-all">
            {contact.email}
          </a>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" data-cta="footer-instagram" className="link-line block w-fit">
            Instagram {contact.instagramHandle}
          </a>
          <a href={contact.facebook} target="_blank" rel="noopener noreferrer" data-cta="footer-facebook" className="link-line block w-fit">
            Facebook
          </a>
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-bone/10 py-6 text-[0.8125rem] text-muted-dark sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Romeral Trailers. Todos los derechos reservados.</p>
        <p>Fotografías: Romeral Trailers.</p>
      </div>
    </footer>
  );
}
