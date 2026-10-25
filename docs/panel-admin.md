# Panel de administración — especificación

Definido por el dueño del proyecto el 24 oct 2026. Acceso privado con usuario y clave
(ruta propuesta: `/admin`). Tres apartados obligatorios:

## 1. Contenido de la página

El cliente cambia las imágenes de la página sin depender del desarrollador.

- Ver la página organizada por los códigos de sección (S1 Portada, S3 Colección C1–C4,
  S4 Proyectos P1–P4, S5 Asesoría, etc.; ver mapa en la conversación de correcciones).
- Reemplazar una foto existente, agregar fotos y quitar fotos.
- Optimización automática al subir (redimensionar y convertir a WebP) para no hacer lenta la página.
- Botón **Publicar**: el cambio queda en línea en pocos minutos.
- Extensión prevista: editar textos y agregar muebles nuevos a la colección.

## 2. Compras

Todo lo que se paga por la pasarela de pagos.

- Lista de compras: fecha, cliente, teléfono/correo, producto o diseño, valor, estado del pago
  (aprobado, pendiente, rechazado) y estado del pedido (pagado, en taller, entregado).
- Filtros por fecha y estado; total vendido en el periodo.
- Descarga a Excel.

## 3. Diseños de clientes (Monta tu diseño)

Las solicitudes que llegan desde el configurador, con las fotos que adjuntan los clientes.

- Cada solicitud: fecha, datos de contacto, mueble, medidas y opciones elegidas, mensaje y
  **fotos adjuntas por el cliente** (de su espacio o de referencia).
- Ver las fotos en grande y descargarlas.
- Estado de la solicitud: nueva, cotizada, aceptada, descartada.
- Enlace directo para responder por WhatsApp.

**Implica en el configurador:** campo para que el cliente suba fotos (límite propuesto: hasta
5 fotos, 10 MB cada una, JPG/PNG/HEIC) y casilla de autorización de tratamiento de datos
personales (Ley 1581 de 2012), porque las fotos de la casa del cliente son datos personales.

## Requisitos técnicos

- Hosting con servidor y despliegue automático (no sirve un ZIP subido a mano).
- Base de datos para compras y solicitudes; almacenamiento de archivos para fotos.
- Costos externos estimados: US$25–45/mes (ver conversación del 24 oct 2026). Confirmar antes de activar.

## Por definir

- Nombre del configurador: "Monta tu diseño" (propuesta en PDF) o "Personaliza tu diseño".
- Cuántas personas entran al panel y si todas ven las compras.
- Avisos cuando llega una compra o un diseño nuevo (correo, WhatsApp o ambos).
