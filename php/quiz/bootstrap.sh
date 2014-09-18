#!/bin/sh

yum update -y
yum install httpd -y

rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
yum install --enablerepo=remi --enablerepo=remi-php55 php -y

rm -rf /var/www/html
ln -fs /vagrant /var/www/html

service httpd start

exit 0
