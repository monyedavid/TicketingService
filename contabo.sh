#! /bin/bash
echo "installing modules"
yarn
echo "building server.. *-*"
yarn build:server
echo "starting build file.. :)"
yarn start:contabo:dev