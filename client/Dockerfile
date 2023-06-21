FROM node:14
WORKDIR /app
COPY package.json package-lock.json /app/
COPY public /app/public
COPY src /app/src
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
