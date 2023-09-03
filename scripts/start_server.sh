#!/usr/bin/env bash
docker-compose -f docker-compose.prod.yml build;
docker-compose -f docker-compose.prod.yml up -d;
docker-compose -f docker-compose.prod.yml exec app ./manage.py migrate;
docker-compose -f docker-compose.prod.yml exec app npm run build;
docker-compose -f docker-compose.prod.yml exec app ./manage.py collectstatic --noinput;
