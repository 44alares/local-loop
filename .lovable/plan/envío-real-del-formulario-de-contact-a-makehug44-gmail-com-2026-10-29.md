# Envío real del formulario de /contact a makehug44@gmail.com

## Situación actual
- Archivo: `src/pages/Contact.tsx`, función `handleSubmit` (línea 40).
- No envía ningún email. Solo abre el programa de correo del visitante (`mailto:hello@makehug.com`) y muestra siempre "Message Sent!", aunque no se haya enviado nada.
- No hay integración con Resend, Edge Functions, Formspree, EmailJS ni SMTP.

## Servicio elegido: Emails de Lovable (el más sencillo)
- Sin cuentas ni claves externas.
- Única configuración que necesitas: conectar un subdominio de envío de tu dominio (ej. `notify.makehug.com`) desde el botón "Set up email domain". Se añaden unos registros DNS una vez; hasta que se verifiquen, los emails quedan en cola y salen solos después.

## Qué se construye
1. Plantilla de email "Nuevo mensaje de contacto" con: nombre, email del remitente, asunto y mensaje (más país, código postal y roles que ya pide el formulario).
2. La dirección makehug44@gmail.com se fija solo en el servidor (nunca en la web).
3. `handleSubmit` envía los datos al servidor en vez de abrir `mailto`.
4. Validación del email del remitente (campo nuevo y obligatorio) y límites de longitud.
5. Solo se muestra "Message Sent!" si el servidor confirma el envío; si falla, se muestra el error real y el formulario conserva lo escrito.
6. Texto de éxito actualizado (sin "tu programa de correo debería abrirse").

## Detalles técnicos
- Configurar dominio → setup de infraestructura de email → scaffold de emails de la app.
- Plantilla `contact-notification` con `to: 'makehug44@gmail.com'` fijo en el registro; `send-transactional-email` invocado desde el cliente con `idempotencyKey` único.
- Errores leídos de `FunctionsHttpError` y mostrados con toast.
- Página de baja de suscripción requerida por el sistema.
