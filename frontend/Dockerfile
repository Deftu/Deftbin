FROM node:16-alpine
RUN mkdir -p /usr/src/app && \
    chown node:node /usr/src/app
USER node:node
WORKDIR /usr/src/app
COPY --chown=node:node . .

RUN npm install
EXPOSE ${PORT}

CMD ["npm", "build", "&&", "node", "build/index.js"]
