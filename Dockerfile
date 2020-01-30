FROM node:12

WORKDIR /usr/src/app

# Create run environment
COPY package*.json ./
RUN npm ci --only=production

EXPOSE 8080

CMD [ "node", "server.js" ]


