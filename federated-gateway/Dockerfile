FROM node:18-alpine

ENV NODE_ENV development

WORKDIR /app

COPY package*.json index*.js ./

RUN npm install

USER node

EXPOSE 4000

CMD npm run start
