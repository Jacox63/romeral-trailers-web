---
name: brand-research
description: Investiga una web o perfil social de referencia y la marca cliente para extraer paleta, tipografía, composición, fotografía, interacciones y datos comerciales verificables. Úsala antes de diseñar o rediseñar cualquier página.
---

# Brand Research

## Cuándo usarla
- Al empezar un sitio nuevo o un rediseño.
- Cuando cambie la referencia visual o aparezca contenido nuevo de la marca.
- Antes de escribir textos comerciales (para no inventar datos).

## Herramientas
- Navegador real (Claude Browser, Claude in Chrome o Playwright) para páginas con JS o login wall.
- `get_page_text` / `read_page` para texto y estructura; capturas solo cuando importa lo visual.
- `javascript_tool` / `page.evaluate` para leer `getComputedStyle`, `document.fonts`, hojas CSS.
- WebFetch para páginas estáticas. WebSearch para menciones externas.
- Python + Pillow para extraer colores dominantes de capturas (k-means o cuantización).

## Entradas
- URL de referencia visual y URL de la marca (pueden coincidir).
- `docs/` existentes si es una actualización.

## Procedimiento
1. **Inventario de fuentes.** Lista cada URL accesible (perfil, bio links, tienda, redes). Anota
   cuáles bloquean acceso automatizado. No eludas logins, captchas ni muros.
2. **Texto verificado.** Copia literalmente nombre, bio, ubicación, contacto, categorías y
   destacados. Cada dato lleva su fuente y fecha de consulta.
3. **Color.**
   - Exacto: valores de CSS (`getComputedStyle`, variables `--*`). Etiqueta `VERIFICADO (CSS)`.
   - Estimado: cuantización de capturas o fotos. Etiqueta `ESTIMADO (imagen)` + método.
   - Reporta proporción de uso aproximada (fondo / superficie / texto / acento).
4. **Tipografía.** `document.fonts` y `font-family` computado. Si la fuente es propietaria o no
   accesible, propone alternativa libre y justifica (anatomía, ancho, contraste).
5. **Composición.** Ancho de contenido, columnas, márgenes, proporciones de imagen, densidad.
6. **Fotografía.** Luz, fondos, encuadre, materiales visibles. Describe lo observado, no lo
   imaginado.
7. **Interacción y motion.** Solo efectos observados. Si no pudiste hacer scroll o hover,
   dilo como limitación.
8. **Negocio.** Productos, servicios, público probable (marcado como inferencia), contacto,
   diferenciadores con evidencia.

## Salidas
`docs/brand-audit.md`, `docs/color-palette.md`, `docs/typography-analysis.md`,
`docs/interaction-analysis.md`, `docs/reference-analysis.md`, `docs/business-research.md`,
`docs/content-inventory.md`. Plantilla de tabla en `reference/audit-template.md`.

## Criterios de aceptación
- Cada afirmación tiene etiqueta: VERIFICADO, ESTIMADO, INFERIDO o PENDIENTE.
- Hay una sección "Limitaciones" con lo que no se pudo inspeccionar y por qué.
- Ningún precio, testimonio, cifra o cliente aparece sin fuente.

## Errores a evitar
- Atribuir a la marca efectos o fuentes que no viste.
- Presentar un color de foto como color de marca exacto.
- Confundir la plataforma (UI de Instagram/Shopify) con la identidad de la marca.

## Regla anti-invención
Si no lo viste en una fuente accesible, no existe para el sitio: va a "Pendiente de validar".
