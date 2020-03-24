FROM node:12 AS build

WORKDIR /usr/src/app

# Create build environment
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

## ------- ##

FROM node:12

WORKDIR /usr/src/app

# Create run environment
COPY package*.json ./
RUN npm ci --only=production

COPY --from=build /usr/src/app/build ./build

CMD [ "npm", "start" ]