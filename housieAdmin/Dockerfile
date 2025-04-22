FROM node:16-alpine as builder

WORKDIR /app

RUN npm install -g @angular/cli

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm","start" ]