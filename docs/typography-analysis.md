# Análisis tipográfico

No hay CSS de la marca; el análisis es visual sobre el logotipo y las piezas gráficas.

| Uso observado | Rasgos | Familia probable | Estado |
|---|---|---|---|
| "ROMERAL" en logotipo | Sans geométrica, peso ligero, mayúsculas, tracking muy amplio (~0.3 em), M de vértice agudo | Geométrica tipo Futura/Josefin/Montserrat Light | ESTIMADO |
| "Espacios con INTENCIÓN" | Sans geométrica ligera; segunda línea en mayúsculas espaciadas, crema sobre foto | Tipo Montserrat Light | ESTIMADO |
| "HACEMOS LOS MUEBLES DE" | Sans geométrica media, mayúsculas espaciadas | Tipo Montserrat | ESTIMADO |
| "Tus sueños" | Caligráfica script fina de trazo continuo | Script (no identificable) | ESTIMADO |
| "AIRBNB / SANTAMARTA" | Sans geométrica, ligera arriba y seminegrita abajo | Tipo Montserrat | ESTIMADO |
| "60 30 10" | Sans condensada ligera | — | ESTIMADO |

No se pudo identificar con certeza ninguna fuente (no hay archivos ni CSS).

## Decisión para el sitio

| Rol | Fuente | Licencia | Por qué |
|---|---|---|---|
| Display + UI + cuerpo | **Jost** (variable, 300–700) | SIL OFL, vía `@fontsource-variable/jost` | Geométrica de raíz Futura: reproduce la M aguda y la ligereza del logotipo; en peso 300 con tracking amplio replica "ROMERAL"; legible en cuerpo a 400 |
| Acento editorial | **Cormorant Garamond Italic** (400/500) | SIL OFL, vía `@fontsource/cormorant-garamond` | Sustituye la script de "Tus sueños" por una cursiva editorial más legible y premium; se usa solo en 1–2 palabras por título |

Se descarta usar una script real: baja legibilidad en web y riesgo de parecer plantilla.

## Jerarquía resultante (resumen)

- Títulos display: Jost 300, mayúsculas solo en eyebrows y wordmark; titulares en caja
  mixta con una palabra en Cormorant italic.
- Eyebrows / etiquetas: Jost 500, mayúsculas, tracking 0.24 em, 12–13 px.
- Cuerpo: Jost 400, 17–18 px, interlineado 1.6.
