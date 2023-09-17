# FRONTEND DOCKERFILE
# base image
FROM node:18-alpine

# set working directory
WORKDIR /app

# copy package.json
COPY package.json .

# install dependencies
RUN npm install

# copy rest of application code
COPY . .

# expose Port 3000 fro frontend
EXPOSE 3000

# command to start application
CMD ["npm", "start"]