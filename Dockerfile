FROM node:8.4.0-alpine

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ARG BABEL_ENV=node
ENV BABEL_ENV $BABEL_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 8229

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app/

RUN yarn install && yarn cache clean

COPY . /app

RUN npm rebuild node-sass
RUN npx webpack --no-colors
# RUN npx jest --ci --color=false

CMD [ "node", "dist/server.webpacked.js" ]