FROM node:9.2-alpine

WORKDIR /usr/src/app

ENV NODE_ENV production
COPY package.json package-lock.json ./
RUN npm install
COPY . .

CMD [ "node", "index" ]
