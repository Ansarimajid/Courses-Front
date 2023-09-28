# Use the official Node.js image as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies and fix vulnerabilities

RUN npm cache clean --force

RUN npm install && npm audit fix

# Copy the rest of the application files to the container
COPY . .


EXPOSE 3000

# Start the React application
CMD ["npm", "start"]
