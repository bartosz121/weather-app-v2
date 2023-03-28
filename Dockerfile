# base image
FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY nginx/nginx.conf /etc/nginx/conf.d

COPY --from=base /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
