---
name: conversion-seo
description: Implementa metadatos, Open Graph, favicon, jerarquía semántica, sitemap, robots, datos estructurados válidos, CTA estratégicas y preparación de analítica optimizando el recorrido Instagram → contacto. Úsala al crear páginas y antes de publicar.
---

# Conversion & SEO

## Cuándo usarla
Al crear o cambiar páginas, textos o CTA, y antes de cualquier despliegue.

## Herramientas
Next.js Metadata API (`metadata`, `sitemap.ts`, `robots.ts`, `opengraph-image`), edición de
archivos, Playwright para leer `<head>` renderizado.

## Entradas
`docs/business-research.md`, `src/content/site.ts`, dominio final (si no existe, usar variable
`NEXT_PUBLIC_SITE_URL` y marcarlo pendiente).

## Procedimiento
1. **Metadatos.** `title` ≤ 60 caracteres con marca + qué + dónde; `description` 140–160 con
   propuesta verificable. `lang="es-CO"`.
2. **Open Graph / Twitter.** Imagen 1200×630 real de la marca, `og:locale es_CO`.
3. **Semántica.** Un solo `h1`; `h2` por sección; landmarks `header`, `main`, `nav`, `footer`.
4. **Sitemap y robots.** Generados desde `NEXT_PUBLIC_SITE_URL`.
5. **Datos estructurados.** Solo si los datos son verificables (ej. `LocalBusiness`/
   `FurnitureStore` con nombre, ciudad, email, sameAs). Nada de `aggregateRating`, precios u
   horarios no publicados.
6. **Recorrido Instagram → contacto.**
   - Enlaces con UTM opcionales para medir (`?utm_source=instagram`).
   - CTA primaria a WhatsApp con mensaje prellenado según la pieza que se mira.
   - CTA en hero, tras la galería y en contacto; barra fija en móvil.
7. **Analítica.** Preparar `data-cta` en botones y un helper `track()` que solo actúa si existe
   `window.gtag`/`dataLayer`; ID en `NEXT_PUBLIC_GA_ID`. Sin cookies si no hay ID.

## Salidas
`src/app/layout.tsx` (metadata), `src/app/sitemap.ts`, `src/app/robots.ts`, JSON-LD en layout.

## Criterios de aceptación
- `<head>` renderizado contiene title, description, canonical, og:*, icon.
- JSON-LD valida como JSON y no contiene datos no verificados.
- Todos los `href` de CTA son reales.

## Errores a evitar
- Prometer ranking, ventas o tiempos de entrega.
- Keyword stuffing.
- Inventar dirección física, teléfono u horario.

## Regla anti-invención
No digas que el sitio está indexado o convierte sin datos de Search Console/analítica.
