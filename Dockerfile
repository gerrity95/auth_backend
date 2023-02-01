FROM node:18-alpine as build

RUN apk add --update python3 make g++\
  && rm -rf /var/cache/apk/*

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN mkdir -p /var/log/auth_backend && chown -R node:node /var/log/auth_backend

USER node

WORKDIR /home/node/app

COPY package*.json ./

# # Install python/pip
# ENV PYTHONUNBUFFERED=1
# RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
# RUN python3 -m ensurepip
# RUN pip3 install --no-cache --upgrade pip setuptools

USER root

RUN chown -R node:node /home/node/app

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080


FROM node:18-alpine as main

WORKDIR /home/node/app

COPY --chown=node:node --from=build /home/node/app .

COPY --chown=node:node --from=build /home/node/app .

EXPOSE 8080

#CMD ["pm2-runtime", "process.yml"]
