---
name: visual-design-system
description: Convierte la auditoría de marca en un sistema visual implementable (tokens CSS, escala tipográfica, espaciado, retícula, botones, tarjetas, tratamiento de imagen y estados). Úsala después de brand-research y antes de construir componentes.
---

# Visual Design System

## Cuándo usarla
- Tras completar `docs/color-palette.md` y `docs/typography-analysis.md`.
- Al añadir un componente que necesite un valor que aún no es token.

## Herramientas
Edición de archivos, Node para validar contraste (`scripts/contrast.mjs`), Tailwind v4 `@theme`.

## Entradas
`docs/color-palette.md`, `docs/typography-analysis.md`, `docs/reference-analysis.md`.

## Procedimiento
1. **Color por rol, no por tono.** Define `--color-bg`, `--color-surface`, `--color-ink`,
   `--color-muted`, `--color-line`, `--color-accent`, `--color-accent-ink`. Máximo un acento
   saturado. Comprueba contraste de cada par texto/fondo (≥ 4.5:1 cuerpo, ≥ 3:1 títulos ≥ 24px).
2. **Tipografía.** Una display + una de texto (+ mono opcional). Escala fluida con `clamp()`
   de 6–8 pasos. Define interlineado y tracking por paso, no por componente.
3. **Espaciado.** Base 4px; escala de secciones con `clamp()` para que móvil no herede
   márgenes de escritorio.
4. **Retícula.** 12 columnas escritorio / 6 tableta / 4 móvil; gutter fijo; contenedor máx.
5. **Componentes base.** Botón primario, secundario, enlace; tarjeta; chip; campo de formulario.
   Cada uno con estados default / hover / focus-visible / active / disabled.
6. **Imagen.** Proporciones permitidas (ej. 4:5, 3:2, 16:9), radio, tratamiento (sin filtros
   que alteren color del producto), `object-fit` y punto focal.
7. **Implementación.** Tokens en `src/app/globals.css` dentro de `@theme`; documentación en
   `docs/design-system.md` con la tabla token → valor → uso.

## Salidas
`docs/design-system.md`, `src/app/globals.css`, componentes en `src/components/ui/`.

## Criterios de aceptación
- Ningún HEX suelto en componentes: todo pasa por tokens.
- Tabla de contraste con resultado calculado (no estimado a ojo).
- Foco visible distinto del hover.

## Errores a evitar
- Copiar la paleta de la UI de la plataforma (Instagram/Shopify) creyendo que es la marca.
- Más de dos familias tipográficas.
- Escalas que solo funcionan en 1440px.

## Regla anti-invención
Si un color o fuente es una decisión propia (no extraída), escríbelo como "Decisión de diseño"
con su razón; nunca lo atribuyas a la marca.
