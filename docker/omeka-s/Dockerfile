FROM php:8.2-fpm-alpine

LABEL org.opencontainers.image.source=https://github.com/sepastian/omeka-s-docker
LABEL org.opencontainers.image.description Omeka S Docker image
LABEL org.opencontainers.image.authors="sebastian.gassner@gmail.com"

ENV OMEKA_VERSION=4.2.0

WORKDIR /var/www/html
RUN apk add --update-cache --virtual build-dependencies \
    wget \
    && apk add unzip \
    && wget https://github.com/omeka/omeka-s/releases/download/v${OMEKA_VERSION}/omeka-s-${OMEKA_VERSION}.zip \
    && unzip omeka-s-${OMEKA_VERSION}.zip \
    && mv omeka-s/* . \
    && apk del build-dependencies \
    && rm -rf omeka-s*

RUN apk add \
    freetype-dev \
    jpeg-dev \
    icu-dev \
    imagemagick-dev \
    imagemagick-jpeg \
    libpng-dev \
    libjpeg-turbo-dev \
    sed \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl pdo_mysql

# Remove config/database.ini, which is empty;
# instead, OMEKA_DB_CONNECTION_URL will be set during startup.
RUN rm config/database.ini

# Make sure /var/www/html/files and modules are owned by www-data.
RUN mkdir -p /var/www/html/files \
    && chown -R www-data:www-data /var/www/html

COPY install-modules.sh /usr/local/bin/install-modules.sh

# Run as www-data.
USER www-data

ENTRYPOINT ["install-modules.sh"]
CMD ["php-fpm"]
