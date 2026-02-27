FROM node:latest
WORKDIR /usr/local/app/
COPY package.json ./
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["npm", "run", "start"]