docker build -t front-nginx .
docker run --name front-nginx -d  -p  8000:8000 front-nginx