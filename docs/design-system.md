# Sistema de diseño — "Taller con intención"

## Concepto creativo

**Del taller a tu casa, con intención.** El sitio se recorre como un reel de la marca: entra
a un espacio en penumbra cálida (el carbón del logotipo), se detiene en la madera y el metal, y
termina en la conversación por WhatsApp. Dos atmósferas alternan:

- **Taller (oscuro)** — carbón cálido, luz ámbar de madera. Hero, proyectos, contacto.
- **Casa (claro)** — hueso y arena de paredes y tapizados. Filosofía, colección, proceso, FAQ.

Regla 60-30-10 (publicada por la propia marca): 60 % neutros, 30 % carbón, 10 % madera.

## Color (tokens en `src/app/globals.css`)

| Token | HEX | Origen | Uso |
|---|---|---|---|
| `--color-night` | #1C1719 | Decisión: carbón del logo (#2D272B est.) oscurecido para profundidad | Fondo secciones oscuras, texto sobre claro |
| `--color-charcoal` | #2D272B | Logotipo (ESTIMADO) | Superficies sobre night, tarjetas oscuras |
| `--color-bone` | #F1ECE4 | Paredes/tapizados (ESTIMADO, aclarado) | Fondo claro, texto sobre oscuro |
| `--color-sand` | #E4DACD | Arena/hueso (ESTIMADO) | Superficies sobre bone |
| `--color-greige` | #B0A497 | Piedra (ESTIMADO) | Líneas, detalles |
| `--color-wood` | #C9956B | Teca (#A97D59 est.) iluminada | Acento sobre oscuro, botón primario |
| `--color-wood-deep` | #7A4A2E | Nogal (#693F28 est.) | Acento de texto sobre claro |
| `--color-wood-raw` | #A97D59 | Teca (ESTIMADO) | Solo decorativo (no texto) |
| `--color-muted` | #5E5650 | Decisión | Texto secundario sobre claro |
| `--color-muted-dark` | #B8ADA2 | Decisión | Texto secundario sobre oscuro |

### Contraste (calculado con `.claude/skills/visual-design-system/scripts/contrast.mjs`)

| Texto / fondo | Ratio | AA normal |
|---|---|---|
| bone / night | 15.06 | ✔ |
| muted-dark / night | 8.04 | ✔ |
| wood / night | 6.74 | ✔ |
| night / wood (botón) | 6.74 | ✔ |
| night / bone | 15.06 | ✔ |
| muted / bone | 6.11 | ✔ |
| wood-deep / bone | 6.27 | ✔ |
| muted / sand | 5.20 | ✔ |
| bone / charcoal | 12.43 | ✔ |
| wood-raw / bone | 3.10 | ✘ → solo decorativo |

## Tipografía

| Token | Familia | Uso |
|---|---|---|
| `--font-sans` | Jost Variable | Todo el texto |
| `--font-accent` | Cormorant Garamond Italic | 1–2 palabras de acento en titulares |

Escala fluida:

| Paso | Clase | Tamaño | Interlineado | Tracking |
|---|---|---|---|---|
| Display | `text-display` | clamp(2.75rem, 7.2vw, 7rem) | 0.95 | -0.02em |
| H2 | `text-h2` | clamp(2.1rem, 4.6vw, 4.25rem) | 1.02 | -0.015em |
| H3 | `text-h3` | clamp(1.35rem, 2vw, 1.75rem) | 1.2 | 0 |
| Lead | `text-lead` | clamp(1.125rem, 1.5vw, 1.375rem) | 1.55 | 0 |
| Body | base | 1.0625rem | 1.65 | 0 |
| Eyebrow | `.eyebrow` | 0.75rem, 500, mayúsculas | 1 | 0.24em |
| Wordmark | `.wordmark` | 300, mayúsculas | 1 | 0.32em |

## Espaciado y retícula

- Base 4 px (escala Tailwind). Secciones: `--space-section: clamp(5rem, 12vw, 10rem)`.
- Contenedor: máx. 1440 px, gutter `clamp(1.25rem, 4vw, 3.5rem)`.
- Retícula: 12 col ≥ 1024, 6 col tableta, 4 col móvil (vía grid de Tailwind).

## Componentes

| Componente | Variantes | Estados |
|---|---|---|
| Button | `primary` (wood/night), `ghost` (borde bone), `dark` (night/bone) | hover: barrido de fondo desde la izquierda + flecha se desplaza 4 px; focus-visible: anillo 2 px wood con offset 3 px; active: escala .98 |
| ProductCard | imagen 4:5, título, descripción, enlace "Cotizar esta pieza" | hover: imagen escala 1.05 en 0.8 s, línea inferior crece |
| ProjectSlide | imagen vertical, número, título, texto | — |
| Accordion (FAQ) | `<details>` nativo estilizado | open: icono rota 45° |
| Field | input/select/textarea | borde inferior; focus: borde wood + etiqueta; error: texto wood-deep + `aria-invalid` |
| Chip | etiqueta material | — |

## Imagen

- Proporciones: 4:5 (producto), 9:16 recortado a 3:4 (proyectos/reels), 1:1 (cuadradas).
- `object-fit: cover`, sin filtros de color (se respeta el color real de la madera).
- Radio 2 px (casi recto, como mueble de taller). Las piezas con texto incrustado se usan
  donde el texto no compite con un titular.
- Fuente: `public/images/brand/*.webp` (≈620 px, ver limitación en content-inventory).

## Arquitectura (UI/UX)

Canal principal: Instagram en móvil. Intención dominante: "¿precio?".

| # | Sección | Pregunta que responde | CTA |
|---|---|---|---|
| 0 | Header + barra progreso | ¿Dónde estoy? | Cotizar (WhatsApp) |
| 1 | Hero | ¿Qué hacen? | WhatsApp · Ver colección |
| 2 | Filosofía | ¿Cómo piensan el diseño? | — |
| 3 | Colección | ¿Qué puedo pedir? | Cotizar esta pieza (WhatsApp con referencia) |
| 4 | Proyectos | ¿Qué han hecho? | Quiero un proyecto así |
| 5 | Asesoría | ¿Quién me acompaña? | Hablar con una asesora |
| 6 | Proceso | ¿Cómo funciona? | — |
| 7 | Preguntas | ¿Precio, medidas, envíos? | WhatsApp |
| 8 | Contacto | ¿Cómo pido? | Formulario → WhatsApp · correo · redes |
| 9 | Footer | — | Enlaces |

Móvil: barra inferior fija "Cotizar por WhatsApp" que aparece tras el hero y se oculta en
contacto. Primer CTA primario visible sin scroll en la portada.

```
ESCRITORIO HERO                                   MÓVIL HERO
┌───────────────────────────────────────────┐    ┌──────────────┐
│ ROMERAL   Colección Proyectos …  [Cotizar]│    │ ROMERAL   ☰  │
│                                           │    │ eyebrow      │
│ eyebrow              ┌──────────────┐     │    │ Muebles      │
│ Muebles hechos       │  01 Sake     │ ┌──┐│    │ hechos a     │
│ a medida,            │  (máscara)   │ │04││    │ medida, con  │
│ con intención.       │              │ └──┘│    │ intención.   │
│ lead                 └──────────────┘     │    │ [WhatsApp]   │
│ [WhatsApp] [Colección]                    │    │ ┌──────────┐ │
│ ── Fabricación propia · A medida · …  ──  │    │ │ 01 Sake  │ │
└───────────────────────────────────────────┘    └──────────────┘
```
