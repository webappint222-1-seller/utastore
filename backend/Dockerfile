FROM node:slim
WORKDIR api/
COPY package*.json ./
RUN npm install
COPY ./ .
CMD ["npm", "run", "dev"]
EXPOSE 3006