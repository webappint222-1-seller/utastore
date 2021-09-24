FROM node:14.15.4-alpine3.12 as build-stage
WORKDIR app/
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY etc/www.utastore.team.key /etc/ssl/www.utastore.team.key
COPY etc/www.utastore.team.crt /etc/ssl/www.utastore.team.crt
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443