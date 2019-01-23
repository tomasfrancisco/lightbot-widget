FROM node:10.15-jessie as base

WORKDIR /app

COPY . .
RUN yarn && yarn build && mkdir /app/dist && cp /app/build/static/js/main.*.js ./dist/lightbot.js

FROM nginx:1.15-alpine

RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx

COPY --from=base /app/dist /usr/share/nginx/html

EXPOSE 80
