FROM node:18.19.1

WORKDIR /

COPY . .

RUN npm install --force

RUN npx prisma migrate deploy

EXPOSE 3000