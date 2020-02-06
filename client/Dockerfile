FROM node:12

WORKDIR /usr/src/app

# Create run environment
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

CMD [ "npm", "start" ]