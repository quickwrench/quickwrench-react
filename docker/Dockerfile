FROM node:alpine AS build

ARG BACKEND_URL

RUN mkdir -p /usr/local/app/src /usr/local/app/public

WORKDIR /usr/local/app

COPY package.json package-lock.json ./

RUN npm ci

COPY .env index.html vite.config.js ./

COPY src/ ./src

RUN if [ -n "${BACKEND_URL}" ]; then \
  echo "VITE_BACKEND_URL=${BACKEND_URL}" > .env.production; \
  fi && \
  npm run build

FROM nginx:alpine AS runtime

COPY --from=build /usr/local/app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY docker/nginx.conf /etc/nginx/conf.d
