FROM node:18.19.1

WORKDIR /app

COPY . .

RUN npm install --force

EXPOSE 3000