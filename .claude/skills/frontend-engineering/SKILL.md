---
name: frontend-engineering
description: Implementa el sitio en Next.js (App Router) + React + TypeScript + Tailwind v4 con componentes reutilizables, contenido centralizado, imágenes optimizadas, formularios funcionales y exportación estática. Úsala para crear o modificar código de la aplicación.
---

# Frontend Engineering

## Cuándo usarla
Cualquier cambio en `src/`, `public/`, configuración de Next o dependencias.

## Herramientas
npm, Next.js CLI, TypeScript (`tsc --noEmit`), ESLint, Bash, edición de archivos.

## Entradas
`docs/design-system.md`, `docs/motion-storyboard.md`, `src/content/site.ts`.

## Procedimiento
1. **Inspecciona antes de tocar.** `package.json`, `next.config.*`, estructura `src/`. Respeta
   el stack existente.
2. **Estructura.**
   ```
   src/app/            layout, page, globals.css, sitemap.ts, robots.ts, icon
   src/components/ui/        Button, Container, SectionHeading…
   src/components/sections/  Hero, Manifesto, Collection, …
   src/components/motion/    hooks y wrappers GSAP
   src/content/site.ts       textos, enlaces, galería (fuente única)
   src/lib/                  utilidades (cn, links)
   ```
3. **Contenido.** Componentes sin textos duros: todo sale de `site.ts`. Enlaces de contacto
   construidos en un solo lugar.
4. **Client vs server.** Server components por defecto; `"use client"` solo donde haya estado,
   eventos o GSAP.
5. **Imágenes.** `next/image` con `width/height` reales, `sizes` correcto, `priority` solo en el
   hero. Con export estático: `images.unoptimized = true` y archivos ya optimizados (WebP,
   ≤ 1600px lado largo) generados con `scripts/optimize-images.mjs` (sharp).
6. **Formularios.** Validación en cliente. Si no hay backend, el formulario arma un mensaje de
   WhatsApp o `mailto:` — el usuario completa el envío en su app; jamás mostrar "Enviado"
   sin envío real.
7. **Errores.** `not-found.tsx`; imágenes con `alt`; enlaces externos con `rel="noopener"`.
8. **Verificación.** `npx tsc --noEmit`, `npm run lint`, `npm run build` sin errores.

## Salidas
Código en `src/`, `next.config.ts`, `package.json` con scripts `dev`, `build`, `lint`, `qa`.

## Criterios de aceptación
- Build de producción sin errores ni warnings de tipos.
- Ningún texto comercial fuera de `site.ts`.
- Sin dependencias no usadas.

## Errores a evitar
- `any` para silenciar tipos; `useEffect` para GSAP en vez de `useGSAP`.
- Imágenes de varios MB en `public/`.
- Hidratación inconsistente (fechas, `Math.random` en render).

## Regla anti-invención
No digas que algo "funciona" sin haber corrido build y, si aplica, la prueba de navegador.
