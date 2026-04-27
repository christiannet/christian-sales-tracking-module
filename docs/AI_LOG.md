# AI LOG

Para el desarrollo del presente módulo, se incluyó Claude AI a Visual Studio Code.

Una vez instalado y configurado se comenzaron a pasarle las siguientes instrucciones:

1. "Genera un módulo de seguimiento de objetivos de ventas, toma en cuenta los siguientes criterios: Escribe el código en inglés, utiliza Angular 18, Material y typescript para el frontend, utiliza typescript con nodejs para el backend. Es fundamental que utilices Clean Architecture para separar bien el repositorio, modelos, servicios, infraestructura y vistas."

Claude generó de manera correcta la estructura de ambos proyectos basandosé en Clean Architecture.

2. "Conecta el backend con una base de datos SQLite local con las siguientes entidades: Promotor y Ventas"

Claude generó la conexión a base de datos, los modelos correspondientes.

3. "Se debe poder registrar una nueva venta y será registrada al promotor con la sesión activa. Debe visualizarse un dashboard con el progreso de venta con respecto a la meta mensual. Al alcanzarse el 50%, 80% y 100% de la meta, se debe otorgar un distintivo visual para cada uno en forma de badge. Genera al menos los siguientes 3 endpoints en el proyecto /sales, /progress/:userId y /sales/:userId"

Claude construyó la funcionalidad de forma correcta, se ajustaron algunos temas como modificadores de acceso, estilos y se hiceron pruebas de validación de información.

4. "Modifica frontend y backend para que utilicen inyección de dependencias con inversify"

Claude había generado la funcionalidad creando las instancias en cada lugar donde se necesitaban con el operador "new". Quizá para una aplicación pequeña como está era suficiente, pero pensando que pudiera crecer más, se incluyó la inyección de dependencias para la gestión de creación de instancias.

5. "Cambia la implementación de las contraseñas de los usuarios, para que se guarden de forma cifrada, usa la clave C0dy_123, asegurate que se pueda iniciar sesión correctamente"

Inicialmente Claude había generado la persistencia de contraseñas en crudo, se agregó funcionalidad para cifrar las contraseñas y persistirlas de esta manera en base de datos.

6. "Genera un componente reutilizable para que el botón de 'sign in' y el de 'register sale' sean un llamado de ese componente".

Dado que los dos eran botones de submit y sólo cambiaba el label y el mat-icon, se solicitó ponerlos en un solo componente.

7. "Cambia la implementación snackBar por ngx-toastr, usa color verde para mensajes de éxito, rojo para mensajes de error y amarillo para warnings"

Inicialmente Claude utilizó el snackbar de Material para el manejo de mensajes, sin embargo a nivel UX no es tan intuitiva para que el usuario determine si se trata de un error, alerta o éxito. Se cambió a toastr debido a su manejo de diseño dependiendo el mensaje.

8. "Genera un componente reutilizable para el registro de venta y para el historial de ventas"

Dado que Claude había generado esta funcionalidad directamente en el componente dashboard, se le solicitó que lo separara para que hubiera una mejor composición de la vista, y los componentes se pudieran utilizar en algunas otras pantallas.