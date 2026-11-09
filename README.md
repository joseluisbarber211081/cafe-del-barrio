# Café del Barrio — Landing V1.3

Landing responsive para una cafetería ficticia, desarrollada como proyecto de entrega.

## Enlaces

- Web pública (Lovable): https://cafe-del-barrio-jlb.lovable.app/
- Editor de Lovable: https://lovable.dev/projects/643bec06-ec6d-4d57-a150-0a9450a00849
- Web pública (GitHub Pages): https://joseluisbarber211081.github.io/cafe-del-barrio/
- Repositorio fuente (versión estática): https://github.com/joseluisbarber211081/cafe-del-barrio

**Importante:** el repositorio contiene la implementación estática HTML/CSS/JavaScript. El proyecto Lovable utiliza React/TypeScript. Ambos implementan las funciones de V1.3, pero sus bases de código son distintas y todavía no tienen sincronización Git automática.

## Requisitos

Para ejecutar esta versión estática en local basta con un navegador moderno. Para levantar un servidor local se puede utilizar Python 3; no se requieren dependencias npm ni bases de datos.

## Cómo arrancar en local

1. Clonar el repositorio: `git clone https://github.com/joseluisbarber211081/cafe-del-barrio.git`
2. Entrar en la carpeta: `cd cafe-del-barrio`
3. Ejecutar `python -m http.server 8080` (en Windows también puede funcionar `py -m http.server 8080`).
4. Abrir `http://localhost:8080/`.

También se puede abrir directamente `index.html`; se recomienda servidor local para una comprobación equivalente a GitHub Pages.

## Funcionalidades

- Diseño adaptable a pantallas de escritorio, tablet y móvil.
- Navegación por secciones, menú móvil y filtros de la carta.
- Formulario de contacto con validación de nombre, email, asunto y mensaje.
- Intento de envío real del formulario mediante FormSubmit AJAX al correo configurado por el titular.
- Mensajes de progreso, error y resultado. Un éxito comunicado por FormSubmit **no sustituye** la comprobación de que el correo haya llegado al destinatario.

## Qué está simulado

- La cafetería, su marca, su carta y los precios son ficticios.
- Las fotografías son recursos visuales ilustrativos; no representan un local verificable.
- No existe dirección física, horario comercial, teléfono real, reservas, pedidos ni pagos.
- No se simulan testimonios de clientes ni reseñas.
- El formulario **no es simulado en V1.3**: intenta enviar datos realmente a través de un proveedor externo. El servicio puede requerir la confirmación del email destinatario antes de entregar mensajes. La recepción efectiva aún debe verificarse mediante una prueba consentida.

## Datos de ejemplo y cómo reiniciarlos

No hay base de datos, cuentas ni semillas de datos que reiniciar. Los productos y precios de ejemplo están definidos directamente en `index.html`.

- **Reiniciar la carta:** usar el filtro «Todo» o recargar la página.
- **Limpiar los campos del formulario:** recargar la página. Los campos no se guardan en almacenamiento local.
- **Restaurar los datos originales de muestra:** recuperar la versión del archivo `index.html` desde Git, o volver a clonar el repositorio.
- **Mensajes enviados:** son procesados por FormSubmit; no se almacenan en este proyecto y no se pueden borrar ni reiniciar desde la aplicación.

## Publicación

GitHub Pages sirve los archivos de la rama `main`, directorio raíz `/(root)`. Para cambios en la versión React, el proyecto Lovable debe editarse y publicarse por separado mientras no se configure Git Sync.

## Validación de la entrega

Se debe comprobar manualmente antes de enviar a revisión:

1. Diseño y navegación en móvil y escritorio, sin desbordamiento horizontal.
2. Menú móvil, filtros de productos, imágenes, botones y anclas.
3. Envío real de un mensaje de prueba, activación del destinatario en FormSubmit si se solicita y recepción en su correo.
4. Que la URL de previsualización pública abre la versión correcta.

## Privacidad y confidencialidad

Material elaborado para su evaluación. No utilizar como portfolio ni divulgar como trabajo propio sin autorización expresa. El repositorio y las URL de previsualización están actualmente configurados como públicos, lo cual implica que terceros con el enlace pueden acceder al contenido. Los datos enviados por el formulario son procesados por FormSubmit; debe revisarse el aviso de privacidad antes de usar el formulario con clientes reales.
