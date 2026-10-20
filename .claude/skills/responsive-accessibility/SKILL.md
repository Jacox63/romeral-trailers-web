---
name: responsive-accessibility
description: Verifica y corrige la adaptación a móvil pequeño, móvil grande, tableta, portátil y escritorio, y la accesibilidad (teclado, foco visible, contraste, alt, movimiento reducido, objetivos táctiles, sin desbordamiento horizontal). Úsala antes de dar por terminada cualquier sección.
---

# Responsive & Accessibility

## Cuándo usarla
Al terminar una sección o componente, y en la pasada final de QA.

## Herramientas
Playwright (viewports y `reducedMotion`), `@axe-core/playwright`, script de contraste de
`visual-design-system`, navegador real para revisión visual.

## Entradas
Build de producción o servidor de desarrollo, `docs/design-system.md` (tokens de color para
contraste), lista de componentes interactivos.

## Viewports de referencia
| Nombre | Ancho × alto |
|---|---|
| Móvil pequeño | 320 × 640 |
| Móvil grande | 414 × 896 |
| Móvil horizontal | 844 × 390 |
| Tableta | 768 × 1024 |
| Portátil | 1280 × 800 |
| Escritorio | 1600 × 1000 |

## Procedimiento
1. **Desbordamiento.** En cada viewport: `document.documentElement.scrollWidth <= innerWidth`.
2. **Tipografía.** Cuerpo ≥ 16px en móvil; títulos sin cortes de palabra feos (`text-wrap: balance`).
3. **Táctil.** Objetivos ≥ 44 × 44px; separación suficiente entre enlaces.
4. **Teclado.** Tab recorre header → contenido → footer en orden lógico; skip link funciona;
   menú móvil abre/cierra con teclado y Esc; el foco vuelve al botón al cerrar.
5. **Foco visible.** `:focus-visible` con contorno de ≥ 2px y contraste ≥ 3:1.
6. **Contraste.** Ejecuta el script con cada par texto/fondo usado.
7. **Alt.** Imágenes informativas con alt descriptivo y real; decorativas con `alt=""`.
8. **Movimiento reducido.** Con `reducedMotion: 'reduce'` todo visible, sin pin ni parallax.
9. **axe.** Cero violaciones `serious`/`critical`; documenta las `moderate`.

## Salidas
Resultados en `docs/qa-report.md` (sección Responsive y Accesibilidad).

## Criterios de aceptación
- 0 desbordamientos horizontales en los 6 viewports.
- 0 violaciones axe serias o críticas.
- Recorrido completo con teclado documentado.

## Errores a evitar
- Probar solo en 1440px.
- Quitar `outline` sin reemplazo.
- `alt` genérico tipo "imagen".

## Regla anti-invención
Lo que no se probó se lista como "No probado", con la razón.
