#!/bin/sh

# 環境を最新に
yum update -y

# httpdインストール
yum install httpd -y

# phpインストール
rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
yum install --enablerepo=remi --enablerepo=remi-php55 php -y

# ドキュメントルートを/vagrantの共有ディレクトリに変更
rm -rf /var/www/html
ln -fs /vagrant /var/www/html

# httpd起動設定
chkconfig --add httpd
service httpd start

exit 0
