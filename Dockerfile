# ---- 1) build the React site ----
FROM node:20-alpine AS web
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
ARG VITE_RECAPTCHA_SITE_KEY
ENV VITE_RECAPTCHA_SITE_KEY=$VITE_RECAPTCHA_SITE_KEY
RUN npm run build

# ---- 2) PHP + Apache serves the site, /api and /admin ----
FROM php:8.3-apache
RUN apt-get update && apt-get install -y --no-install-recommends libpq-dev \
 && docker-php-ext-install pdo_mysql pdo_pgsql \
 && rm -rf /var/lib/apt/lists/* \
 && a2enmod rewrite \
 && sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf
# Render sends traffic to $PORT (default 10000)
ENV PORT=10000
RUN sed -i 's/Listen 80/Listen ${PORT}/' /etc/apache2/ports.conf \
 && sed -i 's/<VirtualHost \*:80>/<VirtualHost *:${PORT}>/' /etc/apache2/sites-available/000-default.conf
COPY backend/ /var/www/html/
COPY --from=web /app/dist/ /var/www/html/
RUN rm -f /var/www/html/*.sql \
 && mkdir -p /var/www/html/uploads && chown -R www-data:www-data /var/www/html/uploads
