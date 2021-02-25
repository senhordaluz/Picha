docker-compose up -d picha
docker-compose exec picha sh -c "python manage.py migrate"
docker-compose up --force-recreate -d picha