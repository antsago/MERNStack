FROM node:12 AS build

ARG root=./packages/api
WORKDIR /usr/src/app

# Create build environment
COPY $root/package*.json ./
RUN npm ci

COPY $root/ ./
RUN npm run build

## ------- ##

FROM node:12

ARG root=./packages/api
WORKDIR /usr/src/app

# Create run environment
COPY $root/package*.json ./
RUN npm ci --only=production

COPY --from=build /usr/src/app/build ./build

CMD [ "npm", "start" ]