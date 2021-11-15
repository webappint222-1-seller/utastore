FROM node:14.15.4-alpine3.12
WORKDIR api/
COPY package*.json ./
RUN npm install
COPY ./ .
CMD ["node", "server.js"]
EXPOSE 3006