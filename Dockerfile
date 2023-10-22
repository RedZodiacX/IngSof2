FROM node:18-alpine

WORKDIR /usr/app

COPY index.mjs .
COPY package.json .
COPY package-lock.json .
COPY /src ./src/

ENV PORT 5001
ENV MONGO_URI mongodb://andres:Contraseña1234@bdprueba.552k2pn.mongodb.net/?retryWrites=true&w=majority&ssl=true
ENV MINIO_HOST = http://localhost:9000
ENV MINIO_ACCESS_KEY = root
ENV MINIO_SECRET_KEY = root1234
EXPOSE 5001

RUN npm install --production

ENTRYPOINT [ "npm", "start" ]