FROM node:alpine
COPY package.json /app/
WORKDIR /app
COPY . /app/
RUN npm install
EXPOSE 8081
CMD node app.js
