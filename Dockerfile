FROM node:22-alpine AS builder

WORKDIR /app

# Set memory limit higher for the BUILD process (uses Swap)
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --legacy-peer-deps

# Generate Prisma Client
RUN npx prisma generate

# Copy application files
COPY . .

# Build Next.js application
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Runner Stage
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3002
ENV HOSTNAME "0.0.0.0"
# Limit Node.js memory usage to fit within 512MB RAM
ENV NODE_OPTIONS="--max-old-space-size=400"

# Copy necessary files for standalone execution
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3002

# Next.js standalone server runs with node server.js
CMD ["node", "server.js"]
