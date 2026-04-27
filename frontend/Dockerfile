# =============================================================================
# Frontend — Angular 18 / nginx
# =============================================================================
# Multi-stage build:
#   builder → instala dependencias y compila la SPA con ng build
#   runner  → imagen nginx:alpine que sirve los archivos estáticos generados
#
# El bundle de producción de Angular 18 se genera en:
#   dist/sales-tracking-frontend/browser/
#
# URL de la API:
#   Los servicios Angular tienen la URL del backend configurada como
#   http://localhost:3002/api. En producción Docker esa URL debe apuntar
#   al nombre del servicio backend dentro de la red Docker. Opciones:
#
#   a) Configurar nginx para hacer proxy de /api al contenedor backend
#      (recomendado — el frontend queda en el mismo origen y evita CORS):
#
#        location /api {
#            proxy_pass http://backend:3002/api;
#        }
#
#   b) Reemplazar la URL al momento del build pasando la variable como
#      argumento de construcción si los servicios leen de environment.ts.
#
# =============================================================================

# ── Stage 1: Builder ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias antes de copiar el código fuente para aprovechar
# la caché de capas de Docker (la capa se invalida solo si cambia package*.json)
COPY package*.json ./
RUN npm ci

# Copiar el resto del proyecto y compilar
COPY . .
RUN npm run build

# ── Stage 2: Runner ───────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Eliminar la configuración por defecto de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Configuración personalizada para manejar el routing client-side de Angular
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copiar el bundle generado al directorio raíz de nginx
COPY --from=builder /app/dist/sales-tracking-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
