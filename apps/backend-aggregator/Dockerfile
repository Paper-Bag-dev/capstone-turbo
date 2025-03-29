FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY dist ./dist

ENV PORT=5001

EXPOSE 5001

CMD [ "npm" , "start" ]