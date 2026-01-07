# Use official Node.js runtime as parent image
FROM node:22-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose port
EXPOSE 3000

# Define command to run the app
CMD [ "npm", "start" ]
