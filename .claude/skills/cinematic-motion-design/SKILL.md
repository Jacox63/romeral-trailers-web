---
name: cinematic-motion-design
description: Diseña el storyboard de animación y lo implementa con GSAP + ScrollTrigger (revelados de títulos, máscaras de imagen, parallax moderado, secciones fijadas, microinteracciones, progreso de scroll) respetando prefers-reduced-motion. Úsala para cualquier animación del sitio.
---

# Cinematic Motion Design

## Cuándo usarla
- Después de definir la arquitectura y antes de programar animaciones.
- Al añadir o depurar cualquier efecto de movimiento.

## Herramientas
GSAP + ScrollTrigger (única librería de motion del proyecto), CSS transitions para hover/focus,
Playwright para verificar estados inicial/final.

## Entradas
`docs/motion-storyboard.md` (si no existe, créalo primero con la plantilla de
`reference/storyboard-template.md`).

## Procedimiento
1. **Storyboard primero.** Por sección: objetivo, estado inicial, estado final, disparador,
   duración, easing, comportamiento móvil, CTA. Nada se programa sin estar ahí.
2. **Presupuesto de movimiento.** Un efecto protagonista por sección. Duraciones 0.6–1.2 s para
   entradas, 0.2–0.3 s para hover. Easing por defecto `power3.out` / `expo.out`.
3. **Contenido visible por defecto.** El HTML debe ser legible sin JS. Los estados ocultos se
   aplican desde JS (`gsap.from` / `gsap.set` dentro de `useGSAP` o `gsap.context`).
4. **Implementación React.** Hook `useGSAP` de `@gsap/react` con `scope` en un ref; nunca
   selectores globales. Limpia con `context.revert()` (el hook lo hace).
5. **Scroll.** `ScrollTrigger` con `start: "top 80%"` para revelados; `scrub` solo en parallax y
   barras de progreso; `pin` solo en escritorio vía `gsap.matchMedia()`.
6. **Reduced motion.** `gsap.matchMedia()` con `(prefers-reduced-motion: reduce)` → sin
   transformaciones, solo opacidad o nada. Además, reglas CSS que anulan transiciones.
7. **Rendimiento.** Anima solo `transform`, `opacity`, `clip-path`. Sin animar `width/top`.
   `will-change` puntual. Nada de scroll-jacking que impida llegar al contenido.

## Salidas
`docs/motion-storyboard.md`, componentes en `src/components/motion/`.

## Criterios de aceptación
- Cada animación del storyboard existe en código y se verificó en navegador (estado final
  visible tras scroll).
- Con `reducedMotion: 'reduce'` todo el contenido es visible y no hay pin.
- Sin errores de consola de GSAP (targets no encontrados).

## Errores a evitar
- Usar dos librerías de animación.
- Ocultar contenido con CSS (`opacity:0`) que nunca aparece si JS falla.
- Parallax fuerte en móvil; pin en móvil.

## Regla anti-invención
No describas en el informe efectos que no estén en el código y verificados.
