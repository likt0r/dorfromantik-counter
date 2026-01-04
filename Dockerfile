# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first to leverage cache
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build-only

# Stage 2: Serve
FROM joseluisq/static-web-server:2-alpine

# Enable SPA mode (rewrite 404s to index.html)
ENV SERVER_FALLBACK_PAGE=index.html
ENV SERVER_ROOT=/public
ENV SERVER_PORT=80
# Force IPv4 binding (Fixes 'Address family not supported' error)
ENV SERVER_HOST=0.0.0.0

# Security & Features
ENV SERVER_SECURITY_HEADERS=true
ENV SERVER_LOG_LEVEL=info

# Copy built assets from builder stage
COPY --from=builder --chown=1000:1000 /app/dist /public

# Expose port 80
EXPOSE 80