FROM nginx:1.23.3

# add the configuration of NGINX
RUN rm /etc/nginx/conf.d/default.conf
COPY config/default.conf /etc/nginx/conf.d/default.conf

#copy the static files of website
COPY frontend/ /usr/share/nginx/html/
