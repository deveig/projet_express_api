FROM node:latest
ARG PORT
ARG DB_KEY
# ARG DB_NAME
ARG RANDOM_KEY
ENV PORT=$PORT
ENV DB_KEY=$DB_KEY
# ENV DB_NAME=$DB_NAME
ENV RANDOM_KEY=$RANDOM_KEY
WORKDIR /usr/local/app/
COPY package.json ./
RUN npm install
COPY . ./
RUN echo "PORT=$PORT" >> .env
RUN echo "DB_KEY=$DB_KEY" >> .env
RUN echo "RANDOM_KEY=$RANDOM_KEY" >> .env
EXPOSE 3000
CMD ["npm", "run", "start"]