FROM node

WORKDIR /fliq-pay

COPY ./package.json .
COPY ./ormconfig.json .

RUN npm i -g reflect-metadata
RUN npm install

COPY ./build  ./build
COPY ./.env  .

WORKDIR .

ENV NODE_ENV production

EXPOSE 5500

CMD ["node", "build/index.js"]