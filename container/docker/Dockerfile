FROM node:18-alpine

WORKDIR /app
# grab [ package.json, package-lock.json, tsconfig.json ]
COPY ../../package.json .
COPY ../../package-lock.json .
COPY ../../tsconfig.json .

RUN npm install

copy ../../src ./src

RUN ./node_modules/.bin/tsc

EXPOSE 3000

CMD ["node", "./dist/server/server.js"]