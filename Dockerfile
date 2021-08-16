FROM node:14.17.5

WORKDIR /app
COPY dist /app/dist
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
RUN mkdir -p /app/notes_folder

ENTRYPOINT node ./dist/watcher.js ./notes_folder
