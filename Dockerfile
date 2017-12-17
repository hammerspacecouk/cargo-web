# ARG BASED REPO won't work until the docker version is updated. Use explict repo for now
FROM node:9.2.1

ARG BASE
#FROM ${BASE}

# Setup the application
COPY ./nginx /etc/nginx/conf.d/
COPY . /var/www

WORKDIR /var/www

# Allow to volume to share
VOLUME /var/www /etc/nginx/conf.d

CMD ["node", "server.js"]

EXPOSE 3000
