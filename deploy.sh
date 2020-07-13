#! /bin/bash
npm run build:server
docker build -t lilmakijr/fliqpay:latest .
git add .
git commit -m "container"
heroku container:push web
heroku container:release web