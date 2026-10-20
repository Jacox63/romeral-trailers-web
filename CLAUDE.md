# CLAUDE.md — Romeral Trailers Web

Instrucciones generales para cualquier sesión de Claude Code que trabaje en este repositorio.

## Qué es este proyecto

Sitio web comercial de **Romeral Trailers** (Instagram `@romeraltrailers`), taller de diseño en
Medellín que fabrica mobiliario y decoración de estilo industrial y minimalista, con envíos
nacionales. El objetivo del sitio es convertir visitas (sobre todo desde Instagram) en
conversaciones comerciales por WhatsApp o correo, y en visitas a la tienda online existente.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 con tokens en `src/app/globals.css` (`@theme`)
- GSAP + ScrollTrigger para motion (una sola librería de animación; no añadir Framer Motion)
- Fuentes self-hosted con `@fontsource` (el entorno de build no siempre alcanza Google Fonts)
- Exportación estática (`output: "export"`) → carpeta `out/` desplegable en cualquier hosting

## Fuente de verdad del contenido

- `src/content/site.ts` contiene TODO el texto comercial, enlaces y datos de contacto.
- `docs/business-research.md` dice qué está verificado y qué está pendiente.
- **Nunca inventes** precios, testimonios, clientes, cifras, garantías, medidas ni materiales.
  Si un dato no está en `docs/business-research.md` como verificado, márcalo como pendiente.

## Skills del proyecto

Viven en `.claude/skills/`. Úsalas en este orden para trabajo nuevo:

1. `brand-research` → investigar referencia y marca
2. `visual-design-system` → tokens y componentes base
3. `ui-ux-architecture` → estructura y recorrido
4. `cinematic-motion-design` → storyboard y animaciones
5. `frontend-engineering` → implementación
6. `responsive-accessibility` → adaptación y a11y
7. `conversion-seo` → metadatos y CTA
8. `browser-testing-qa` → pruebas reales y `docs/qa-report.md`

## Comandos

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # genera out/
npm run lint
npm run qa         # pruebas de navegador (requiere build previo)
```

## Reglas de trabajo

- No hagas `git push`, despliegues, compras ni cambios de dominio sin autorización explícita.
- No subas secretos. Variables en `.env.local` (ver `.env.example`).
- No muestres mensajes de éxito en formularios si el envío no ocurrió.
- Respeta `prefers-reduced-motion` en toda animación nueva.
- No marques una prueba como aprobada sin ejecutarla; documenta lo no probado.
- Las fotos de `public/images/brand/` son de Romeral Trailers: no las alteres ni deformes.
