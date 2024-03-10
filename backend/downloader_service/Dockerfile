FROM node:14-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY routes ./routes

COPY index.js ./

EXPOSE 8081

CMD ["node", "index.js"]