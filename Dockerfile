
FROM node:18-alpine as BUILD_IMAGE
WORKDIR /app/am-weather-vite-react

COPY package.json .
RUN yarn install
COPY . .
RUN yarn build

FROM node:18-alpine as PRODUCTION_IMAGE
WORKDIR /app/am-weather-vite-react

COPY --from=BUILD_IMAGE /app/am-weather-vite-react/dist /app/am-weather-vite-react/dist
EXPOSE 8080

COPY package.json .
COPY vite.config.ts .

RUN yarn add typescript

EXPOSE 8080
CMD ["yarn", "run", "preview"]