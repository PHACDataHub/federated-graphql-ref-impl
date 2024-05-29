FROM node:18-alpine

ENV NODE_ENV development

WORKDIR /app

COPY package*.json *.js ./

RUN npm install

USER node

EXPOSE 8080

CMD npm run start
