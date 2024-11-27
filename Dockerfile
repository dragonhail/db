# Use the official Node.js image from Docker Hub
FROM node:22.11.0-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the server
CMD ["node", "app.js"]