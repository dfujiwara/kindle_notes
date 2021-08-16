FROM node:14.17.5

WORKDIR /app
COPY dist /app/dist
RUN npm install

ENTRYPOINT node ./dist/watcher.js ./test_folder
