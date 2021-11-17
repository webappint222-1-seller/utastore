FROM node:slim
WORKDIR api/
COPY package*.json ./
RUN npm install && npm update
COPY ./ .
CMD ["node", "server.js"]
EXPOSE 3006