FROM node:8-alpine

EXPOSE 3000

COPY . /slack-invite-automation
WORKDIR /slack-invite-automation
RUN npm i npm@latest -g
RUN npm install
CMD node ./bin/www
