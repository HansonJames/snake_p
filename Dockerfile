# Build stage
FROM node:22-alpine as build-stage

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm && \
    pnpm config set registry https://registry.npmmirror.com

RUN pnpm install

COPY . .

RUN pnpm build

# Production stage
# Use alpine directly and install nginx manually to avoid inherited EXPOSE 80
FROM alpine:3.19 as production-stage

RUN apk add --no-cache nginx && \
    mkdir -p /run/nginx

# Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Ensure nginx user exists and permissions are correct
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/lib/nginx && \
    chown -R nginx:nginx /var/log/nginx

EXPOSE 5001

CMD ["nginx", "-g", "daemon off;"]
