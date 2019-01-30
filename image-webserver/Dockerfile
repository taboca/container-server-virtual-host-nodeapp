FROM ubuntu:18.04

RUN apt-get -y update
RUN apt-get install apache2 -y

RUN a2enmod proxy
RUN a2enmod proxy_http

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

COPY ./public-html/ /var/www/html

COPY www.myexamplesite.com.conf /etc/apache2/sites-available/
COPY www.myothersite.com.conf /etc/apache2/sites-available/

COPY www.myexamplesite.com.conf /etc/apache2/sites-enabled/
COPY www.myothersite.com.conf /etc/apache2/sites-enabled/

RUN chgrp -R www-data /var/www

EXPOSE 80

CMD ["/usr/sbin/apache2ctl","-DFOREGROUND"]
