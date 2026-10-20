---
name: browser-testing-qa
description: Prueba el sitio en un navegador real (Playwright/Chromium u otro disponible) - carga, navegación, enlaces, botones, formularios, scroll, animaciones, responsive, consola, imágenes, metadatos, accesibilidad y rendimiento - corrige fallos, repite y documenta en docs/qa-report.md. Úsala antes de cada entrega.
---

# Browser Testing QA

## Cuándo usarla
Antes de entregar o desplegar, y después de cada corrección relevante.

## Herramientas
- `npm run build` + servidor estático (`npx serve out` o `python3 -m http.server`).
- Playwright (Python o Node) con Chromium headless: `scripts/qa.py` del proyecto.
- `@axe-core` inyectado para accesibilidad.
- Navegador del usuario (Claude Browser / Chrome) para revisión visual cuando esté disponible.

## Entradas
Build de producción en `out/`, `scripts/qa.py`, `docs/motion-storyboard.md` (para saber qué
animaciones verificar), `src/content/site.ts` (destinos esperados de los CTA).

## Salidas
`docs/qa-report.md`, `qa/results.json`, capturas en `qa/screenshots/`.

## Procedimiento
1. Build de producción y servidor local.
2. Ejecuta `npm run qa` (corre `scripts/qa.py`). Cubre:
   - Carga: status 200, sin errores de consola ni `pageerror`, sin requests fallidos.
   - Imágenes: todas con `naturalWidth > 0` tras scroll completo.
   - Enlaces: anclas internas existen; externos con `href` absoluto y `rel` correcto.
   - Menú móvil: abre, Esc cierra, foco vuelve.
   - Formulario: validación bloquea vacío; con datos válidos genera URL de WhatsApp correcta.
   - Animaciones: tras scroll completo, elementos `[data-reveal]` con opacidad 1.
   - Reduced motion: todo visible sin scroll.
   - Responsive: sin desbordamiento horizontal en 6 viewports + capturas.
   - Metadatos: title, description, og, canonical, JSON-LD parseable.
   - axe: violaciones por severidad.
   - Rendimiento: tamaño total transferido, LCP aproximado vía PerformanceObserver.
3. Revisa las capturas (`qa/screenshots/`) visualmente.
4. Corrige, vuelve a construir y vuelve a correr solo lo afectado + suite completa al final.
5. Escribe `docs/qa-report.md` con: fecha, entorno, tabla prueba → resultado → evidencia,
   fallos corregidos, pendientes.

## Criterios de aceptación
- Cada fila del informe proviene de una ejecución real (con su salida o captura).
- 0 errores de consola en la ejecución final.

## Errores a evitar
- Marcar "OK" algo no ejecutado.
- Probar contra `next dev` y no contra el build.
- Ignorar fallos de recursos externos sin documentarlos.

## Regla anti-invención
Las métricas de rendimiento de un entorno headless son orientativas: indícalo; no las presentes
como Core Web Vitals de campo.
