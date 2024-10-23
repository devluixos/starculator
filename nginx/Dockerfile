# Stage 1: Build the frontend
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the frontend source code
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY ./frontend/ ./

# Build the frontend for production
RUN npm run build

# Stage 2: Serve the frontend using Nginx
FROM nginx:alpine

# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy Nginx configuration
COPY ./webserver/nginx.prod.conf /etc/nginx/conf.d/default.conf

# Copy the built frontend files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
