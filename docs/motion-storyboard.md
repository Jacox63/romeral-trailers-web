# Storyboard de motion

Librería: GSAP 3 + ScrollTrigger (+ `@gsap/react`). Todo dentro de `gsap.matchMedia()`:

- `motion` = `(prefers-reduced-motion: no-preference)`
- `desktop` = `(min-width: 1024px)` (pin y scroll horizontal solo aquí)
- `reduce` = `(prefers-reduced-motion: reduce)` → sin animaciones; contenido visible.

Easing base: `expo.out` (entradas), `power2.inOut` (máscaras), `none` (scrub).
El HTML es legible sin JS: los estados iniciales se aplican desde JS con `gsap.from`.

## 00 · Header y progreso
| Campo | Valor |
|---|---|
| Objetivo | Orientar y mantener el CTA a mano |
| Contenido | Wordmark, 5 anclas, botón Cotizar |
| Estado inicial | Transparente sobre el hero |
| Estado final | Fondo night 88 % con blur tras 80 px de scroll; se oculta al bajar y reaparece al subir |
| Animación | `yPercent` -100/0, 0.4 s; barra de progreso `scaleX` 0→1 con scrub |
| Disparador | ScrollTrigger global |
| Móvil | Igual; menú a pantalla completa con lista que entra escalonada (0.06 s) |
| CTA | Cotizar (WhatsApp) |

## 01 · Hero
| Campo | Valor |
|---|---|
| Objetivo | Decir qué hacen en 3 s y llevar a WhatsApp |
| Contenido | Eyebrow, H1, lead, 2 CTA, imagen 01 Sake, imagen 04 Berlín, franja de atributos |
| Estado inicial | Líneas del H1 desplazadas 110 % abajo (máscara overflow), imagen principal recortada `clip-path: inset(100% 0 0 0)` escala 1.25 |
| Estado final | Texto en su sitio; imagen revelada escala 1 |
| Animación | Timeline: eyebrow fade 0.6 s → H1 líneas stagger 0.12 s, 1.1 s → lead/CTA 0.8 s → máscara imagen 1.4 s `power3.inOut` → imagen secundaria entra desde y:60 |
| Disparador | Carga de página |
| Scroll | Imagen principal `yPercent` -8 y secundaria -20 con scrub (parallax moderado); salida: contenido texto opacidad 1→0.2 |
| Duración | ≈ 2.2 s total de entrada |
| Móvil | Sin imagen secundaria; parallax reducido a -4 % |
| CTA | Cotizar por WhatsApp · Ver colección |

## 02 · Filosofía
| Campo | Valor |
|---|---|
| Objetivo | Transmitir criterio de diseño con palabras de la marca |
| Contenido | Dos frases publicadas por la marca |
| Estado inicial | Palabras con opacidad 0.15 |
| Estado final | Palabras opacidad 1 |
| Animación | Opacidad palabra a palabra ligada al scroll (scrub 0.5) |
| Disparador | `top 75%` → `bottom 60%` |
| Móvil | Igual (solo opacidad, barato) |
| CTA | — |

## 03 · Colección
| Campo | Valor |
|---|---|
| Objetivo | Mostrar piezas con nombre y abrir la cotización con contexto |
| Contenido | 4 tarjetas (Berlín, Bruxelles, Sake + Wuam + Oval, comedor con banca) |
| Estado inicial | Tarjeta y:80, opacidad 0; imagen con máscara inset(0 0 100% 0) |
| Estado final | En su sitio, imagen descubierta de arriba a abajo |
| Animación | Stagger 0.12 s, 1 s `expo.out`; hover CSS: imagen escala 1.05 0.8 s |
| Disparador | `top 80%` por tarjeta (batch) |
| Móvil | 1 columna, mismo revelado |
| CTA | "Cotizar esta pieza" → WhatsApp con referencia |

## 04 · Proyectos (horizontal)
| Campo | Valor |
|---|---|
| Objetivo | Demostrar capacidad: proyectos completos e instalación |
| Contenido | Airbnb Santa Marta, cocinas a medida, espacio social, estudio creativo |
| Estado inicial | Pista horizontal en x:0 |
| Estado final | Pista desplazada hasta mostrar la última diapositiva |
| Animación | Sección fijada (pin); `x` de la pista ligada al scroll (scrub 1); cada imagen hace parallax interno x ±6 %; contador "01/04" se actualiza |
| Disparador | `top top` → `+= ancho de pista` |
| Móvil/tableta | Sin pin: carrusel nativo con `scroll-snap`, arrastrable, con botones anterior/siguiente accesibles |
| CTA | "Quiero un proyecto así" |

## 05 · Asesoría
| Campo | Valor |
|---|---|
| Objetivo | Humanizar: hay una diseñadora que acompaña |
| Contenido | Foto 02 (Laura en cocina), texto de la marca |
| Estado inicial | Imagen `clip-path: inset(0 0 0 100%)` |
| Estado final | Revelada de derecha a izquierda; texto entra por líneas |
| Animación | 1.2 s `power3.inOut` |
| Disparador | `top 70%` |
| Móvil | Imagen arriba, mismo revelado vertical |
| CTA | Hablar con una asesora |

## 06 · Proceso
| Campo | Valor |
|---|---|
| Objetivo | Quitar incertidumbre sobre cómo se pide |
| Contenido | 4 pasos basados en lo publicado (idea → diseño a medida → taller → entrega/envío) |
| Estado inicial | Línea vertical `scaleY` 0; pasos opacidad 0.3 |
| Estado final | Línea completa; paso activo opacidad 1 |
| Animación | Línea con scrub; cada paso se activa al cruzar el centro de la pantalla |
| Disparador | `top 65%` → `bottom 65%` |
| Móvil | Igual |
| CTA | — |

## 07 · Preguntas frecuentes
| Campo | Valor |
|---|---|
| Objetivo | Responder "¿precio?" sin inventar cifras |
| Animación | `<details>` nativo; icono + rota 45° (CSS 0.3 s); contenido aparece con fade CSS |
| Móvil | Igual |
| CTA | Enlace a WhatsApp dentro de la respuesta de precio |

## 08 · Contacto
| Campo | Valor |
|---|---|
| Objetivo | Convertir |
| Contenido | Titular, formulario que compone el mensaje de WhatsApp, enlaces directos |
| Estado inicial | Titular por líneas; campos y:30 opacidad 0 |
| Animación | Stagger 0.08 s |
| Disparador | `top 75%` |
| Móvil | Formulario a una columna; la barra fija de WhatsApp se oculta aquí |
| CTA | Continuar en WhatsApp · Escribir por correo · Instagram |

## Microinteracciones globales
- Botones: barrido de fondo + flecha (CSS, 0.35 s).
- Enlaces: subrayado que crece desde la izquierda.
- Barra fija móvil: entra desde abajo tras el hero.
- Reduced motion: todas las anteriores se anulan con `@media (prefers-reduced-motion: reduce)`.
