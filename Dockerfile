FROM node:10.15-jessie as base

WORKDIR /app/dist
WORKDIR /app

COPY . .
RUN yarn && yarn build && cp /app/build/static/js/main.*.js ./dist/lightbot.js

FROM dirkdev98/docker-static

COPY --from=base /app/dist /public

EXPOSE 3000
