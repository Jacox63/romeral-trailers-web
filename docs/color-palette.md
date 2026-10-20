# Paleta de color

Método: no existe CSS propio de la marca (no hay web). Todos los valores provienen de
**cuantización median-cut (Pillow)** sobre el logotipo y 10 fotografías propias de Instagram
capturadas el 20 oct 2026. Por eso todos son `ESTIMADO (imagen)`. Las cifras de "peso" son el %
de píxeles del cluster en la imagen analizada.

## Colores extraídos

| Rol observado | HEX | RGB | Fuente | Peso aprox. |
|---|---|---|---|---|
| Fondo del logotipo (carbón cálido) | #2D272B | 45,39,43 | logo | 49 % del logo |
| Trazo del logotipo | #FFFFFF | 255,255,255 | logo (observación) | — |
| Madera teca clara | #A97D59 | 169,125,89 | 04 comedor Berlín | 8 % |
| Madera teca media | #89674B | 137,103,75 | global | 4 % |
| Madera oscura / nogal | #693F28 | 105,63,40 | 03 salón social | 8 % |
| Greige piedra | #B0A497 | 176,164,151 | global | 9 % |
| Arena clara | #D1C5B4 | 209,197,180 | global | 4 % |
| Hueso / tapizado | #D9CFC4 | 217,207,196 | 06 comedor Bruxelles | 7 % |
| Gris concreto | #86817A | 134,129,122 | global | 8 % |
| Metal/sombra | #292521 | 41,37,33 | 01 comedor Sake | 14 % |

Valores de la interfaz de Instagram (#0C1014, azul #4A5DF9) y del error de Shopify (#000F0D)
se registraron pero **se descartan**: no son de la marca.

## Lectura de la paleta

- **60 %** neutros cálidos (hueso, arena, greige) — las paredes y tapizados de sus espacios.
- **30 %** carbón cálido / metal negro — logotipo y estructuras metálicas.
- **10 %** madera — el protagonista material y el acento natural.

(La propia marca publica la regla 60-30-10 en feb 2026; se usa aquí como criterio coherente.)

## Paleta del sitio (decisión de diseño basada en lo anterior)

Ver `docs/design-system.md` para tokens y contrastes calculados.
