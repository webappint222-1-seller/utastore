FROM node:slim
WORKDIR api/
COPY package*.json ./
RUN npm install && npm install nodemon --save-dev && npm install http-status
COPY ./ .
CMD ["npm", "run", "dev"]
EXPOSE 3006