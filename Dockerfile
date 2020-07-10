FROM node

WORKDIR /wrn-server

COPY ./package.json .

RUN npm i -g yarn
RUN npm i -g reflect-metadata
RUN yarn install

COPY ./build  ./build
COPY ./.env  .

WORKDIR .

ENV NODE_ENV production

EXPOSE 4000

CMD ["node", "build/index.js"]