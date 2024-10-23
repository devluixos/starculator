#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Build the frontend
npm run build

# Return to the project root
cd ../

# Copy the built files to a directory that will be served by Nginx
mkdir -p nginx/html
cp -r frontend/public/* nginx/html/
