FROM node:22.14.0 as build
WORKDIR /app
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
# Define port to expose application for the outside world.
EXPOSE 8080
CMD [ "ng", "serve" ]