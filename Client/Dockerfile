FROM nginx:1.23.1
CMD ["mkdir","-p","nginx/html","&&","mkdir","-p","nginx/conf.d"]

COPY ./build/* /usr/share/nginx/html/
COPY ./default.conf /etc/nginx/conf.d/

EXPOSE 3001