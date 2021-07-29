FROM registry.redhat.io/ubi8/nodejs-12:1

USER 0

WORKDIR /usr/src/iot-ui

COPY package.json .
RUN npm install

RUN mkdir RUN -p ./client
COPY client/package.json ./client
RUN npm install  --prefix ./client

COPY . ./

RUN npm run-script build
RUN npm --prefix ./client run-script build

RUN chown -R 1001:0 ./ \
    && chmod -R ug+rwx ./

USER 1001

EXPOSE 8080

ENTRYPOINT [ "npm", "run", "start" ]
