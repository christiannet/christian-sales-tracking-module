# Proyecto: Módulo de Seguimiento de Objetivos de Ventas.
# Autor: Christian Sánchez Gómez - SR Software Developer

----------------------------------------------------------------------------------

- Objetivo: Construir Módulo de Seguimiento de Objetivos de Ventas donde se pueda:
    * Registrar sus ventas del día.
    * Visualizar su progreso hacía la meta mensual.
    * Ver los reconocimientos desbloqueados al superar hitos clave: 50%, 80%, 100%

- Requerimientos funcionales

    * El promotor inicia su sesión.
    * El promotor registra sus ventas del día.
    * El promotor visualiza su progreso de meta mensual.
    * El promotor visualizar los reconocimientos desploqueados al superar los hitos.
    * El promotor cierra su sesión.

- Requerimientos no funcionales

    * Manejo de errores explícito.
    * Estructura Clean Arquitecture.
    * Base de datos en memoria o SQLite.
    * Reutilización de componentes - wrapper design.
    * Sistema de diseño y tokens semánticos.
    * Despliegue con máximo dos comandos después de ser clonado.

- Entidades identificadas
    * Promotor: Persona que registra su venta en el sistema.
    * Hito: Logro desbloqueado por el Promotor.

- Stack a utilizar
    * Frontend: Angular 18 - Angular es un framework de desarrollo frontend empresarial basado en el diseño de componentes.
    Ofrece una gran cantidad de funcionalidad para crear aplicaciones robustas, tales como interceptors, guards, lazy loading
    entre otras. Adicionalmente es compatible con el sistema de diseño Material.

    * Backend: Node JS 24 - Node es un framework de desarrollo backend que sigue siendo muy popular para el desarrollo de aplicaciones
    de backend robustas, ya que ofrece un muy buen desempeño añadiendo manejo de multiples conexiones asincronas de forma simultánea,
    escalabilidad, ecosistema grande de desarrollo y se puede escribir con Typescript al igual que Angular para agilizar el desarrollo.

    * Base de datos: De acuerdo a los requerimientos funcionales mencionados, se puede utilizar tanto una base de datos relacional como una no racional. Dado el alcance de este proyecto, se utilizará SQLite para la persistencia de datos, ya que no requiere de configuración
    avanzada para crear la base de datos.

- Fuera del alcance
Para el entregable de este proyecto queda fuera del alcance la siguiente funcionalidad:
    * Catálogo de Promotores - Registro, edición, eliminación de promotores. Sólo se crearán los seeds, ya que no se especifíca la funcionalidad del catálogo por el momento.
    * Catálogo de reconocimientos - Registro, edición, eliminación de reconocimientos. Sólo se crearán los seeds, ya que no se especifíca la funcionalidad del catálogo por el momento.
    * Monitoreo vía Azure Insights. La funcionalidad no es compleja y no tiene un arquitectura de microservicios, por lo que por ahora no es necesario.
    * Sugerencias de venta. Se puede implementar en un futuro un agente de IA que sugiera estrategias de venta con base al historial de ventas, por el momento no es requerido.
    * Exportación a XSLX. Se puede implementar en un futuro, por el momento no es requerido.

