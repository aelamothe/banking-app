# base image
FROM node:19.5.0-alpine

# everything will run inside of this directory
WORKDIR /app

COPY package.json .

RUN npm install

# now copy everything
COPY . .

EXPOSE 3000

CMD ["node", "/src/index.js"]