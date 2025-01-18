FROM node:23-alpine as dev_build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:23-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=dev_build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
