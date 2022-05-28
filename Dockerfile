FROM node:14.16.0
WORKDIR /home/node/callakofa
COPY ./package*.json /home/node/callakofa/
RUN npm i
COPY . .
RUN npm run build && \
        chown -R node:node /home/node/callakofa
USER node

CMD ["npm", "run", "start"]
