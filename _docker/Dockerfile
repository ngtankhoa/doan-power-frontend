# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10.13-alpine as build-stage

# ENV NODE_ENV production

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json yarn.lock ./

# Install neccessary packages for rebuilding NPM modules, then uninstall them to keep the image tiny.
# Yarn already have builtin `node` image
RUN set -ex; \
	apk update && apk add yarn && \
	yarn install --production && \
	yarn cache clean

# Copy the app's code into the container
COPY . .

# Build React Code
RUN npm run build

# Production environment
# Stage 1, Have only the compiled app, ready for production with Nginx
FROM nginx:1.16-alpine

COPY --from=build-stage /app/build/ /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /app/_docker/nginx.conf /etc/nginx/conf.d/default.conf