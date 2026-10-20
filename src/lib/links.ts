import { contact } from "@/content/site";

/** Construye un enlace de WhatsApp con el número verificado y un mensaje prellenado. */
export function whatsappUrl(message?: string): string {
  const text = message ? `${contact.whatsappGreeting} ${message}` : contact.whatsappGreeting;
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const quoteMessage = (piece: string) =>
  `Me interesa ${piece}. ¿Me ayudan con medidas y cotización?`;

export const mailtoUrl = (subject = "Cotización desde la web") =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;
