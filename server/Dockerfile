# if got `ERROR [internal] load metadata for docker.io/library/node:19.0.0` then run rm  ~/.docker/config.json
FROM node:19.0.0

WORKDIR /app

# so run npm i only if package.json changed
COPY package.json package-lock.json tsconfig.json ./
RUN npm i

COPY ./src/ ./src/
RUN npx tsc

# don't run startProject.sh cuz The npm binary will not forward signals to your app which prevents graceful shutdown.
CMD ["node", "production/server.js"]
