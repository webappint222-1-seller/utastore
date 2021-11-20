FROM node:slim
WORKDIR api/
COPY package*.json ./
RUN npm install && npm update
COPY ./ .
CMD ["npm", "run", "dev"]
EXPOSE 3006