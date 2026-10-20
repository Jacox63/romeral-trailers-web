---
name: ui-ux-architecture
description: Define arquitectura de información, jerarquía de contenidos, estructura de secciones, jerarquía de CTA, experiencia móvil y recorrido comercial con esquemas de composición. Úsala antes de maquetar páginas o al reordenar secciones.
---

# UI/UX Architecture

## Cuándo usarla
- Antes de crear páginas o secciones.
- Cuando una sección no tiene objetivo comercial claro.

## Herramientas
Edición de archivos (wireframes ASCII en Markdown), lectura de `docs/business-research.md`.

## Entradas
`docs/business-research.md`, `docs/content-inventory.md`, `docs/design-system.md`.

## Procedimiento
1. **Usuario y llegada.** Define el canal principal de entrada (aquí: Instagram en móvil) y la
   intención probable (ver piezas, preguntar por medida/precio, comprar).
2. **Una pregunta por sección.** Cada sección responde una: ¿qué hacen?, ¿cómo se ve?, ¿por qué
   ellos?, ¿cómo pido?, ¿qué pasa después? Elimina secciones sin pregunta.
3. **Jerarquía de CTA.**
   - Primaria: la acción con menos fricción hacia venta (WhatsApp).
   - Secundaria: tienda online / ver trabajos.
   - Terciaria: correo, redes.
   Máximo una primaria visible por pantalla.
4. **Navegación.** ≤ 5 anclas; menú móvil a pantalla completa con foco atrapado y cierre con Esc.
   CTA primaria persistente en móvil (barra inferior) sin tapar contenido.
5. **Wireframes.** Esquema ASCII por sección en escritorio y móvil, ver
   `reference/wireframe-example.md`.
6. **Contenido real.** Si falta contenido para una sección, la sección se reduce o se marca
   como pendiente; no se rellena con lorem ipsum ni datos inventados.

## Salidas
Sección "Arquitectura" en `docs/design-system.md` o `docs/motion-storyboard.md` (mapa de
secciones + wireframes).

## Criterios de aceptación
- Cada sección tiene objetivo, contenido fuente y CTA asociada.
- El recorrido móvil llega a un CTA primario en ≤ 2 desplazamientos desde la portada.
- Todos los destinos de CTA son URLs reales o están marcados como pendientes.

## Errores a evitar
- Secciones de relleno (estadísticas inventadas, testimonios de ejemplo).
- Menús con más de 6 entradas en una landing.
- Formularios largos cuando WhatsApp resuelve la intención.

## Regla anti-invención
No supongas procesos (tiempos de entrega, garantías, pagos) que la marca no publica.
