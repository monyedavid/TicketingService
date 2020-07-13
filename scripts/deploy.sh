#! /bin/bash
yarn build
docker build -t lilmakijr/fliqpay .
git add .
git commit -m "container"
heroku container:push web
heroku container:release web