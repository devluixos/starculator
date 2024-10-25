# Dockerfile.vue

# Use the official Node.js 18 image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose Vue's development server port
EXPOSE 8082

# Start the development server
CMD ["npm", "run", "dev"]
