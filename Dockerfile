FROM node:current-alpine

LABEL authors = "botprzemek"

ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}

WORKDIR /server

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["node", ".dist/src/index.js"]

EXPOSE 3000