FROM node:12 AS build

WORKDIR /usr/src/app

# Create build environment
COPY ./packages/*.json ./
RUN npm ci

COPY ./packages/shared/package*.json ./shared/
COPY ./packages/api/package*.json ./api/
RUN npx lerna bootstrap --ci

# Build the service
COPY ./packages/shared/ ./shared/
COPY ./packages/api/ ./api/

RUN npx lerna run build

## ------- ##

FROM node:12

WORKDIR /usr/src/app

# Create run environment
COPY ./packages/*.json ./
RUN npm ci lerna

COPY ./packages/shared/package*.json ./shared/
COPY ./packages/api/package*.json ./api/
RUN npx lerna bootstrap --ci -- --only=production

# Run the service
COPY --from=build /usr/src/app/shared/dist/ ./shared/dist/
COPY --from=build /usr/src/app/api/dist/ ./api/dist/

WORKDIR /usr/src/app/api
CMD [ "npm", "start" ]