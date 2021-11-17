FROM node:slim
WORKDIR api/
COPY package*.json ./
RUN npm install
COPY ./ .
CMD ["node", "server.js"]
EXPOSE 3006