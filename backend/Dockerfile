FROM node:slim
WORKDIR api/
COPY package*.json ./
RUN npm install && npm install nodemon --save-dev
COPY ./ .
CMD ["npm", "run", "dev"]
EXPOSE 3006