FROM node:lts-alpine

COPY ./package.json ./yarn.lock /usr/src/app/
WORKDIR /usr/src/app/

RUN yarn

COPY . .

ARG FRONTEND_PORT

EXPOSE ${FRONTEND_PORT}

CMD yarn dev