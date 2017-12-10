FROM node:9.2.1

# Setup the application
COPY ./nginx /etc/nginx/conf.d/
COPY . /var/www

WORKDIR /var/www

# Install deps production
RUN yarn \
    && yarn server

# Allow to volume to share
VOLUME /var/www /etc/nginx/conf.d

CMD ["node", "server.js"]

EXPOSE 3000
