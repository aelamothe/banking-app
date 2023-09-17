# BACKEND DOCKERFILE
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

# expose Port 5000 for backend
EXPOSE 5000

# command to start application
CMD ["npm", "start"]