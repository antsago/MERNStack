FROM node:12 AS build

WORKDIR /usr/src/app/shared
COPY ./packages/shared/package*.json ./
RUN npm ci
COPY ./packages/shared/ ./
RUN npm run build

WORKDIR /usr/src/app/api
COPY ./packages/api/package*.json ./
RUN npm ci
COPY ./packages/api/ ./
RUN npm run build 

## ------- ##

FROM node:12

WORKDIR /usr/src/app/shared
COPY ./packages/shared/package*.json ./
RUN npm ci --only=production

WORKDIR /usr/src/app/api
COPY ./packages/api/package*.json ./
RUN npm ci --only=production

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/shared/dist/ ./shared/dist/
COPY --from=build /usr/src/app/api/dist/ ./api/dist/

WORKDIR /usr/src/app/api
CMD [ "npm", "start" ]