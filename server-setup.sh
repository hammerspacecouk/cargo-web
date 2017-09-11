#!/usr/bin/env bash

# Setup swap
# https://stackoverflow.com/a/17173973

# Add nginx
sudo yum install nginx
sudo service nginx start
sudo mkdir /etc/nginx/sites-enabled
sudo mkdir /var/www

# Add IUS
sudo yum-config-manager --enable epel https://rhel6.iuscommunity.org/ius-release.rpm
sudo yum install https://rhel6.iuscommunity.org/ius-release.rpm

# Install PHP
sudo yum install php71u-common php71u-cli php71u-fpm php71u-fpm-nginx
# listen = /var/run/php-fpm/www.sock in /etc/php-fpm.d/www.conf
# listen.owner = nginx
#listen.group = nginx
# listen.mode = 0660

# Install node
sudo su
curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
yum install nodejs
npm install -g pm2
pm2 startup
#pm2 restart app_name_or_id

# Install MySQL (this is 5.5)
yum install mysql-server
service mysqld start
mysql_secure_installation