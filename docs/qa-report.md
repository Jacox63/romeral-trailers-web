# Informe de QA

- **Fecha:** 20 oct 2026
- **Build probado:** exportación estática `out/` (Next.js 16.4.2, Turbopack), servida localmente
- **Navegador:** Chromium 141 headless (Playwright 1.x) — `npm run qa` (`scripts/qa.py`)
- **Evidencia:** `qa/results.json` y capturas en `qa/screenshots/`
- **Resultado final:** **34 / 34 pruebas PASS** + 1 resultado informativo

## Comprobaciones estáticas

| Prueba | Resultado |
|---|---|
| `tsc --noEmit` | 0 errores |
| `eslint` (config Next) | 0 errores, 0 warnings |
| `next build` | Correcto; 6 rutas estáticas (/, 404, icon, apple-icon, robots.txt, sitemap.xml) |

## Pruebas en navegador (ejecución final)

| Área | Prueba | Resultado | Evidencia |
|---|---|---|---|
| Carga | HTTP 200 | PASS | load 0.24 s (local) |
| Consola | Sin errores ni warnings | PASS | 0 / 0 |
| Red | Sin peticiones fallidas | PASS | 0 |
| Imágenes | Todas cargan / todas con `alt` | PASS | 11 imágenes |
| Motion | Estado final visible tras scroll completo | PASS | 4 tarjetas, 3 líneas hero, 17 fades, 20 palabras, 4 máscaras, 1 clip, 12 líneas SplitText |
| Motion | Proyectos fijados (pin) en escritorio | PASS | `.pin-spacer` presente |
| Motion | Pista horizontal desplazada por scroll | PASS | `translateX(-869px)` |
| Motion | Movimiento reducido: todo visible, sin pin ni máscaras | PASS | 0 ocultos, pin=false |
| Rendimiento | Peso y LCP (orientativo) | PASS | 22 peticiones, 1.1 MB sin compresión (JS 626 KB, img 315 KB), LCP 336 ms headless local |
| SEO | Title, description, canonical, OG, Twitter, icon, JSON-LD válido, un solo `h1`, `lang=es-CO` | PASS | JSON-LD `FurnitureStore` sin rating/precios/horarios |
| SEO | robots.txt, sitemap.xml, og.jpg, icon.png servidos | PASS | 200 |
| Enlaces | 13 anclas internas existen | PASS | — |
| Enlaces | Ningún `href` vacío o `#` | PASS | — |
| Enlaces | 16 externos con `target=_blank` + `noopener` | PASS | — |
| Conversión | 12 CTA de WhatsApp usan +57 313 286 7686 | PASS | mensajes prellenados por contexto |
| Conversión | No se enlaza la tienda Shopify caída | PASS | 0 |
| Formulario | Vacío: bloquea, muestra 3 errores y enfoca el primero | PASS | `window.open` 0 veces |
| Formulario | Válido: abre WhatsApp con mensaje compuesto | PASS | nombre, ciudad, tipo, medidas y mensaje incluidos |
| Formulario | No muestra un falso "enviado" | PASS | texto: "El mensaje aún no se ha enviado: confírmalo en WhatsApp" |
| Teclado | Skip link primer foco → `#contenido` | PASS | — |
| Teclado | Foco visible | PASS | `solid 2px #C9956B` |
| Móvil | Menú abre, Esc cierra, foco vuelve | PASS | — |
| Móvil | Enlace del menú navega y cierra | PASS | — |
| Móvil | Proyectos sin pin; carrusel avanza con botón | PASS | scrollLeft 0→328, contador 02/03 |
| Móvil | Barra fija de WhatsApp fuera del hero | PASS | — |
| Móvil | Sin errores JS | PASS | — |
| Responsive | 0 px de desbordamiento horizontal en 320, 414, 844×390, 768, 1280, 1600 | PASS | capturas `responsive-*.jpg` |
| Responsive | 0 botones con objetivo táctil < 44 px | PASS | — |
| Accesibilidad | axe-core 4.14: 0 violaciones serias/críticas (estado final) | PASS | móvil y escritorio |

### Resultado informativo

axe ejecutado **en el estado inicial** (antes de hacer scroll) marca `color-contrast` en las
palabras de la sección Filosofía: es el efecto de revelado palabra a palabra, que parte de
opacidad 0.14 y llega a 1 al desplazarse. Mitigación: con `prefers-reduced-motion: reduce`
el texto está siempre a opacidad completa (verificado) y los lectores de pantalla leen el
texto completo. Si se prefiere eliminar el aviso, basta con subir la opacidad inicial o
desactivar el efecto en `src/components/sections/Philosophy.tsx`.

## Fallos encontrados y corregidos durante el QA

| Fallo | Causa | Corrección | Verificación |
|---|---|---|---|
| TypeScript: `process.env` inválido | La constante exportada `process` tapaba el global | Renombrada a `processSteps` | `tsc` 0 errores |
| Móvil: la franja de atributos tapaba la foto del hero | Franja con `position:absolute` en todos los tamaños | Solo absoluta en ≥ 1024 px | Captura móvil |
| Botón "Continuar en WhatsApp" partido en dos líneas | Ancho de columna | `whitespace-nowrap` + `shrink-0` | Captura escritorio |
| Botón de correo suelto con gran vacío | Bloque redundante | Eliminado (el correo ya está en la lista de contacto) | Captura |
| Carrusel móvil pegado al borde, texto cortado | `scroll-snap` sin `scroll-padding` y panel intro dentro de la pista | Intro fuera del carrusel en móvil, `scroll-px` = gutter | Prueba + captura |
| Titular del hero en 4 líneas | Escala display demasiado grande | `clamp(2.75rem, 6vw, 6.5rem)` | Captura |
| axe `label-content-name-mismatch` en el logotipo | `aria-label` distinto del texto visible | Texto accesible "Romeral Trailers, ir al inicio" | axe 0 serias |
| Prueba del formulario fallaba | Selector de la prueba hacía clic en "Comedor Berlín" | Selector exacto dentro de `#contacto` | PASS |

## No probado (y por qué)

- **Safari/iOS y Firefox reales**: solo Chromium está disponible en el entorno. Pendiente probar
  en iPhone (Safari) y Android (Chrome) reales antes de publicar.
- **Apertura real de la app de WhatsApp**: se verificó la URL generada, no el envío en la app.
- **Lighthouse / Core Web Vitals de campo**: las cifras de rendimiento son de un headless local
  sin red real; no equivalen a CWV de usuarios.
- **Revisión visual en el navegador del usuario**: el panel de navegador del escritorio no puede
  abrir `localhost` de este entorno.
- **Dominio, HTTPS, caché y compresión del hosting**: dependen del despliegue (no autorizado aún).
