FROM node:18

# Create app directory - create a directory to hold the application code inside the image,
# this will be the working directory for this application
WORKDIR /user/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install files
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production // TODO uncomment this

# Copy Source Files
COPY . .

EXPOSE 8080

CMD [ "node", "src/server.js" ]
