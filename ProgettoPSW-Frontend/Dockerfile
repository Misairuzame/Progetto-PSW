# Fase 1: Build dell'app
# Usandiamo Node 12, compatibile con Angular 8
FROM node:12-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

CMD ["npm", "start"]
