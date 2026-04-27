# Notas de Arquitectura
* ¿Qué cambiarías si este módulo fuera a producción con 10,000 usuarios activos?

R: Cambiará la implementación de base de datos y pondría una base de datos no relacional, con un diseño de colecciones que permitan el registro y acceso a datos de manera más eficiente. Adicionalmente incluría Kubernetes para el escalamiento horizontal del aplicativo.

* ¿Qué dejaste fuera por tiempo y en qué orden lo priorizarías si tuvieras más?

R: La siguiente funcionalidad y en este orden
1. Pruebas unitarías
2. Implementación de Kubernetes
3. Sugerencia de estrategía de venta
4. Notificaciones de alerta de cumplimiento/incumpliento de venta cercano a la fecha de cierre.