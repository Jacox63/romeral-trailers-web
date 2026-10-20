"use client";

import { useId, useState, type FormEvent } from "react";
import { contact, contactSection } from "@/content/site";
import { mailtoUrl, whatsappUrl } from "@/lib/links";
import { track } from "@/lib/track";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight, ChatIcon, MailIcon } from "@/components/ui/icons";

type Fields = { nombre: string; ciudad: string; tipo: string; medidas: string; mensaje: string };
type Errors = Partial<Record<keyof Fields, string>>;
const empty: Fields = { nombre: "", ciudad: "", tipo: "", medidas: "", mensaje: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.nombre.trim().length < 2) e.nombre = "Escribe tu nombre.";
  if (f.ciudad.trim().length < 2) e.ciudad = "Indica tu ciudad para cotizar el envío.";
  if (!f.tipo) e.tipo = "Elige qué quieres cotizar.";
  if (f.mensaje.length > 600) e.mensaje = "Máximo 600 caracteres.";
  return e;
}

export function buildMessage(f: Fields) {
  const lines = [
    `Soy ${f.nombre.trim()}, de ${f.ciudad.trim()}.`,
    `Quiero cotizar: ${f.tipo}.`,
    f.medidas.trim() ? `Medidas aproximadas: ${f.medidas.trim()}.` : "",
    f.mensaje.trim() ? f.mensaje.trim() : "",
  ];
  return lines.filter(Boolean).join("\n");
}

export function Contact() {
  const uid = useId();
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState<string | null>(null);

  const set = (k: keyof Fields) => (v: string) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
    setReady(null);
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validate(fields);
    setErrors(e);
    const firstError = Object.keys(e)[0] as keyof Fields | undefined;
    if (firstError) {
      document.getElementById(`${uid}-${firstError}`)?.focus();
      return;
    }
    const url = whatsappUrl(`\n${buildMessage(fields)}`);
    setReady(url);
    track("form_whatsapp", { tipo: fields.tipo });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fieldCls =
    "peer w-full border-0 border-b border-bone/30 bg-transparent px-0 pt-6 pb-3 text-bone outline-none transition-colors placeholder:text-transparent focus:border-wood aria-[invalid=true]:border-wood";
  const labelCls =
    "pointer-events-none absolute top-6 left-0 origin-left text-muted-dark transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:tracking-[0.14em] peer-focus:text-wood peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:tracking-[0.14em] peer-[:not(:placeholder-shown)]:uppercase";

  const Err = ({ k }: { k: keyof Fields }) =>
    errors[k] ? (
      <p id={`${uid}-${k}-error`} className="mt-2 text-sm text-wood">
        {errors[k]}
      </p>
    ) : null;

  const input = (k: keyof Fields, label: string, opts: { required?: boolean; autoComplete?: string } = {}) => (
    <div className="relative">
      <input
        id={`${uid}-${k}`}
        name={k}
        value={fields[k]}
        onChange={(e) => set(k)(e.target.value)}
        placeholder={label}
        autoComplete={opts.autoComplete}
        required={opts.required}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={errors[k] ? `${uid}-${k}-error` : undefined}
        className={fieldCls}
      />
      <label htmlFor={`${uid}-${k}`} className={labelCls}>
        {label}
        {opts.required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <Err k={k} />
    </div>
  );

  return (
    <Reveal as="section" id="contacto" aria-labelledby="contacto-title" className="grain relative section-y bg-night text-bone">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="contacto-title" tone="dark" eyebrow={contactSection.eyebrow} title={contactSection.title} accent={contactSection.accent} />
          <p data-fade className="mt-8 max-w-md text-muted-dark">
            {contactSection.intro}
          </p>

          <ul data-fade className="mt-12 space-y-5 text-[1.05rem]">
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" data-cta="contacto-whatsapp-directo" className="group inline-flex items-center gap-4">
                <span className="grid size-11 place-items-center border border-bone/20 group-hover:border-wood">
                  <ChatIcon />
                </span>
                <span>
                  <span className="block text-xs tracking-[0.18em] text-muted-dark uppercase">WhatsApp</span>
                  <span className="link-line">{contact.whatsappDisplay}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={mailtoUrl()} data-cta="contacto-email" className="group inline-flex items-center gap-4">
                <span className="grid size-11 place-items-center border border-bone/20 group-hover:border-wood">
                  <MailIcon />
                </span>
                <span>
                  <span className="block text-xs tracking-[0.18em] text-muted-dark uppercase">Correo</span>
                  <span className="link-line break-all">{contact.email}</span>
                </span>
              </a>
            </li>
          </ul>
          <p data-fade className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm tracking-[0.14em] uppercase">
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" data-cta="contacto-instagram" className="link-line">
              Instagram<span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer" data-cta="contacto-facebook" className="link-line">
              Facebook<span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </p>
        </div>

        <form noValidate onSubmit={onSubmit} aria-label="Cotiza tu mueble" className="space-y-8 lg:col-span-6 lg:col-start-7" data-fade>
          <div className="grid gap-8 sm:grid-cols-2">
            {input("nombre", "Nombre", { required: true, autoComplete: "name" })}
            {input("ciudad", "Ciudad", { required: true, autoComplete: "address-level2" })}
          </div>

          <fieldset>
            <legend className="text-xs tracking-[0.14em] text-muted-dark uppercase">
              ¿Qué quieres cotizar? <span aria-hidden="true">*</span>
            </legend>
            <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Tipo de mueble" aria-invalid={errors.tipo ? true : undefined} aria-describedby={errors.tipo ? `${uid}-tipo-error` : undefined}>
              {contactSection.furnitureTypes.map((t, i) => (
                <label key={t} className="cursor-pointer">
                  <input
                    id={i === 0 ? `${uid}-tipo` : undefined}
                    type="radio"
                    name="tipo"
                    value={t}
                    checked={fields.tipo === t}
                    onChange={() => set("tipo")(t)}
                    className="peer sr-only"
                  />
                  <span className="inline-flex min-h-11 items-center border border-bone/25 px-4 text-sm transition-colors peer-checked:border-wood peer-checked:bg-wood peer-checked:text-night peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-wood hover:border-bone">
                    {t}
                  </span>
                </label>
              ))}
            </div>
            <Err k="tipo" />
          </fieldset>

          {input("medidas", "Medidas aproximadas (opcional)")}

          <div className="relative">
            <textarea
              id={`${uid}-mensaje`}
              name="mensaje"
              rows={3}
              value={fields.mensaje}
              onChange={(e) => set("mensaje")(e.target.value)}
              placeholder="Cuéntanos tu idea"
              aria-invalid={errors.mensaje ? true : undefined}
              aria-describedby={errors.mensaje ? `${uid}-mensaje-error` : undefined}
              className={`${fieldCls} resize-none`}
            />
            <label htmlFor={`${uid}-mensaje`} className={labelCls}>
              Cuéntanos tu idea (opcional)
            </label>
            <Err k="mensaje" />
          </div>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <button type="submit" data-cta="form-whatsapp" className="btn btn-primary shrink-0 whitespace-nowrap">
              <ChatIcon />
              <span>Continuar en WhatsApp</span>
              <ArrowRight className="btn-arrow" />
            </button>
            <p className="text-sm text-muted-dark">Se abrirá WhatsApp con tu mensaje; tú decides cuándo enviarlo.</p>
          </div>

          <div aria-live="polite" className="min-h-6">
            {ready ? (
              <p className="border-l border-wood pl-4 text-sm text-muted-dark">
                Abrimos WhatsApp con tu mensaje listo. El mensaje aún no se ha enviado: confírmalo en WhatsApp.{" "}
                <a href={ready} target="_blank" rel="noopener noreferrer" className="link-line text-bone">
                  ¿No se abrió? Ábrelo aquí
                </a>
                .
              </p>
            ) : null}
          </div>
        </form>
      </div>

    </Reveal>
  );
}
