# Use an official Node.js image as the base image
FROM node:latest

# Set the working directory inside the containe
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose a port (if your Node.js application listens on a specific port)
# EXPOSE 3000

# Define the default command to run the application
CMD ["npm","start"]  
