FROM node:lts-alpine

COPY ./package.json ./yarn.lock /usr/src/app/
WORKDIR /usr/src/app/

RUN yarn

COPY . .

ARG BACKEND_PORT

EXPOSE ${BACKEND_PORT}

CMD yarn start:debug
