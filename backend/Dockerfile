FROM node:slim
WORKDIR api/
COPY package*.json ./
RUN npm install && npm install nodemon --save-dev && npm install forever -g
COPY ./ .
CMD ["npm", "run", "dev"]
EXPOSE 3006