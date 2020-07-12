FROM node:12 AS build

WORKDIR /usr/src/app

# Create build environment
COPY ./packages/*.json ./
RUN npm ci

COPY ./packages/shared/package*.json ./shared/
COPY ./packages/client/package*.json ./client/
RUN npx lerna bootstrap --ci

# Build the service
COPY ./packages/shared/ ./shared/
COPY ./packages/client/ ./client/

RUN npx lerna run build

## ------- ##

FROM node:12

WORKDIR /usr/src/app

# Create run environment
COPY ./packages/*.json ./
RUN npm ci lerna

COPY ./packages/shared/package*.json ./shared/
COPY ./packages/client/package*.json ./client/
RUN npx lerna bootstrap --ci -- --only=production

# Run the service
COPY --from=build /usr/src/app/shared/dist/ ./shared/dist/
COPY --from=build /usr/src/app/client/dist/ ./client/dist/

WORKDIR /usr/src/app/client
CMD [ "npm", "start" ]