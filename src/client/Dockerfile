FROM node:18-alpine

# set working directory
WORKDIR /app/cloudfile

# add `/app/app/node_modules/.bin` to $PATH
ENV PATH /app/cloudfile/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci
RUN npm install react-scripts@5.0.1 -g --silent

# start app
CMD ["npm", "start"]