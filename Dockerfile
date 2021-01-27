FROM node:12.11.1 as dist
WORKDIR /tmp/
COPY . .
RUN npm install
RUN npm run build
RUN npm run test

FROM node:12.11.1-alpine as node_modules
WORKDIR /tmp/
COPY package.json ./
RUN npm install

FROM node:12.11.1-alpine
EXPOSE 5000
RUN addgroup -S app \
    && adduser -S -g app app \
    && mkdir -p /usr/src/app \
    && apk -U add git python make g++ curl && rm -rf /var/cache/apk/*
WORKDIR /usr/src/app
COPY --from=node_modules /tmp/node_modules ./node_modules
COPY --from=dist /tmp/dist ./dist
CMD ["node", "dist/main.js"]