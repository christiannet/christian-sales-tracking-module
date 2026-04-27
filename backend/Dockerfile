# =============================================================================
# Backend — Node.js / Express / SQLite
# =============================================================================
# Multi-stage build:
#   builder → compila TypeScript y genera el artefacto en dist/
#   runner  → imagen mínima con solo los binarios necesarios para producción
#
# NOTA: better-sqlite3 requiere compilación nativa; python3, make y g++ son
# necesarios únicamente en el stage builder para generar los bindings nativos,
# y de nuevo en el reinstall de producción (npm ci --omit=dev) porque los
# bindings deben compilarse para la arquitectura de la imagen final.
#
# Base de datos SQLite:
#   El archivo sales-tracking.db se crea en el directorio de trabajo (/app)
#   al iniciar el servidor por primera vez. Para persistir los datos entre
#   reinicios del contenedor, montá un bind-mount o volumen sobre ese archivo:
#
#     docker run -v ./data/sales-tracking.db:/app/sales-tracking.db <image>
#
# Variables de entorno disponibles:
#   PORT  → puerto en el que escucha el servidor (default: 3002)
# =============================================================================

# ── Stage 1: Builder ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

# Herramientas necesarias para compilar los bindings nativos de better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Instalar todas las dependencias (incluye devDependencies para compilar TS)
COPY package*.json ./
RUN npm ci

# Compilar TypeScript → dist/
COPY tsconfig.json ./
COPY src           ./src
RUN npm run build

# Reinstalar solo dependencias de producción en la misma imagen para que
# los bindings nativos queden compilados para la arquitectura correcta
RUN npm ci --omit=dev

# ── Stage 2: Runner ───────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Copiar node_modules de producción y el código compilado
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist         ./dist

EXPOSE 3002

ENV PORT=3002 \
    NODE_ENV=production

CMD ["node", "dist/presentation/server.js"]
