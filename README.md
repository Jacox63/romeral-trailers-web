# Romeral Trailers — sitio web

Sitio comercial de **Romeral Trailers**, taller de diseño en Medellín que fabrica muebles a
medida (comedores, salas, cocinas y espacios completos) con envíos nacionales.
Una sola página cinematográfica que lleva del interés (Instagram) a la cotización por WhatsApp.

## Stack

| Pieza | Uso |
|---|---|
| Next.js 16 (App Router, Turbopack) + React 19 + TypeScript | Aplicación y exportación estática |
| Tailwind CSS 4 | Estilos con tokens en `src/app/globals.css` |
| GSAP 3 + ScrollTrigger + SplitText (`@gsap/react`) | Animaciones ligadas al scroll |
| `@fontsource` (Jost, Cormorant Garamond) | Fuentes autoalojadas (licencia OFL) |
| sharp | Optimización de imágenes, favicon y Open Graph |
| Playwright + axe-core | QA en navegador real |

## Requisitos

- Node.js ≥ 20.9 y npm
- Python 3 + Playwright (`pip install playwright && playwright install chromium`) solo para `npm run qa`

## Ejecutar en local

```bash
npm install
cp .env.example .env.local   # opcional: dominio y analítica
npm run dev                  # http://localhost:3000
```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción → carpeta `out/` (HTML/CSS/JS estáticos) |
| `npm run preview` | Sirve `out/` en http://localhost:4173 |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm run images` | Regenera `public/images/brand/*.webp`, favicon y `og.jpg` desde `assets-source/` |
| `npm run qa` | Suite de pruebas en navegador (requiere build previo) → `qa/results.json` |

## Estructura

```
.claude/skills/        8 skills del proyecto (brand-research … browser-testing-qa)
CLAUDE.md              instrucciones para Claude Code en este repo
docs/                  auditoría de marca, paleta, tipografía, diseño, storyboard, QA, pendientes
assets-source/         fotos originales capturadas (entrada de npm run images)
public/                imágenes optimizadas y og.jpg
scripts/               optimize-images.mjs, qa.py
src/app/               layout (metadatos, JSON-LD), página, sitemap, robots, iconos
src/components/        ui/, motion/, sections/
src/content/site.ts    TODO el contenido y los datos de contacto (fuente única)
```

## Editar contenido

Todo texto, enlace y dato de contacto vive en `src/content/site.ts`. Las reglas:
no añadir precios, medidas, testimonios ni garantías que la marca no haya publicado
(ver `docs/business-research.md`). Para cambiar fotos: reemplaza el PNG en
`assets-source/instagram/` con el mismo nombre y ejecuta `npm run images`.

## Publicar

### Opción A — GitHub Pages (automático, incluido)

`.github/workflows/deploy-pages.yml` hace lint, typecheck, build y despliegue en cada push a
`main`. Una sola vez: en GitHub, **Settings → Pages → Source: GitHub Actions**. El sitio queda en
`https://<usuario>.github.io/<repo>/`. Con dominio propio, define en **Settings → Secrets and
variables → Actions → Variables** `SITE_URL=https://tu-dominio.com` (y `BASE_PATH` vacío).
En planes gratuitos, GitHub Pages exige que el repositorio sea público.

### Opción B — cualquier hosting estático

El build es estático, así que sirve cualquier hosting:

1. Define el dominio en `.env.local`: `NEXT_PUBLIC_SITE_URL=https://tu-dominio.com`
2. `npm run build`
3. Sube **el contenido de `out/`**:
   - **Vercel / Netlify / Cloudflare Pages:** conecta el repositorio; comando `npm run build`,
     carpeta de salida `out`.
   - **Hosting tradicional (cPanel, Hostinger…):** sube `out/` a `public_html/` por FTP.
4. Activa HTTPS y compresión (gzip/brotli) en el hosting.
5. Cambia el enlace de la bio de Instagram al nuevo dominio.
6. Opcional: registra el sitio en Google Search Console y envía `sitemap.xml`.

Hay una vista previa privada publicada en claude.ai; el despliegue público se activa al subir el repositorio a GitHub.

## Pendientes

Ver `docs/pendientes.md` (autorización y originales de fotos, logo SVG, dominio, local físico).
