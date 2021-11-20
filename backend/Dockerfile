FROM node:slim
WORKDIR api/
COPY package*.json ./
RUN npm install && npm update && npm install --save-dev nodemon
COPY ./ .
CMD ["npm", "run", "dev"]
EXPOSE 3006