FROM node:12 AS build

ARG root=./packages

# Create build environment
WORKDIR /usr/src/app/api
COPY $root/api/package*.json ./

RUN npm ci

# Build the service
WORKDIR /usr/src/app/
COPY $root/api/ ./api/
COPY $root/shared/ ./shared/

WORKDIR /usr/src/app/api
RUN npm run build

## ------- ##

FROM node:12

ARG root=./packages

# Create run environment
WORKDIR /usr/src/app/api
COPY $root/api/package*.json ./

RUN npm ci --only=production

# Run the service
COPY --from=build /usr/src/app/api/build ./build

CMD [ "npm", "start" ]