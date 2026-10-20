# Datos y decisiones pendientes

Ordenados por impacto. Nada de esto bloquea ejecutar el sitio; sí conviene resolverlo antes de
publicarlo.

| # | Pendiente | Por qué importa | Dónde se cambia |
|---|---|---|---|
| 1 | **Autorización de Romeral Trailers** para usar sus fotos de Instagram | Las fotos son suyas; se usan de forma provisional | — |
| 2 | **Fotos originales en alta resolución** (≥ 2000 px) y, si se quiere, videos de reels | Las actuales salen de miniaturas de ~620 px: se ven suaves en pantallas retina | `assets-source/instagram/` → `npm run images` |
| 3 | **Logotipo vectorial (SVG)** | Hoy el header usa un logotipo tipográfico provisional; el favicon es un recorte de la foto de perfil | `src/components/ui/Wordmark.tsx`, `src/app/icon.png` |
| 4 | **Dominio** del sitio | Canonical, sitemap y Open Graph usan `https://romeraltrailers.com` como marcador | `NEXT_PUBLIC_SITE_URL` en `.env.local` |
| 5 | **¿Sigue abierto el local del Mall Portal de la Estrella (Local 23)?** y horario | Publicado en 2024; oculto hasta confirmar | `contact.showroom.enabled` en `src/content/site.ts` |
| 6 | **Tienda Shopify** desactivada | Si la reactivan, se puede enlazar | `contact.shop.enabled` |
| 7 | Permiso de **@viralbymafe** para mostrar su usuario y su frase | La cita la publicó la marca, pero es de una clienta | `projects.items` en `site.ts` |
| 8 | Materiales, medidas base y tiempos por referencia | Permitiría fichas de producto más completas | `collection.items` |
| 9 | ID de **Google Analytics 4** (opcional) | Medir clics en CTA (`data-cta`) | `NEXT_PUBLIC_GA_ID` |
| 10 | Actualizar el enlace de la **bio de Instagram** para apuntar al nuevo sitio | Cierra el recorrido Instagram → web → WhatsApp | Instagram / bio.site |
| 11 | Pruebas en iPhone y Android reales | Ver `docs/qa-report.md` | — |
