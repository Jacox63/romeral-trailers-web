"use client";

import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/links";
import { ChatIcon } from "@/components/ui/icons";

/** Barra fija en móvil: aparece tras el hero y se oculta en la sección de contacto. */
export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contacto");
    if (!hero || !contact) return;
    let heroOut = false;
    let inContact = false;
    const update = () => setVisible(heroOut && !inContact);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroOut = !e.isIntersecting;
        if (e.target === contact) inContact = e.isIntersecting;
      }
      update();
    });
    io.observe(hero);
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-bone/10 bg-night/95 p-3 backdrop-blur-md transition-transform duration-500 ease-[var(--ease-out-expo)] lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <a
        href={whatsappUrl("Quiero cotizar un mueble.")}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="mobile-bar-whatsapp"
        tabIndex={visible ? 0 : -1}
        className="btn btn-primary w-full"
      >
        <ChatIcon />
        <span>Cotizar por WhatsApp</span>
      </a>
    </div>
  );
}
