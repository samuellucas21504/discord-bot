FROM node:18

WORKDIR /usr/app

COPY package*.json tsconfig.json ./

RUN npm install

COPY ./models ./models
COPY ./config ./config
COPY ./src ./src

EXPOSE 3000

CMD ["npx", "tsx", "src/index.ts"]
