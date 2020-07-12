#! /bin/bash
yarn build
docker build -t lilmakijr/zephyr-admin-console .
git add .
git commit -m "deploy bash script"
heroku container:push web
heroku container:release web