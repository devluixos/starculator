#!/bin/bash
# Change ownership of the backend directory to your user
sudo chown -R luix:luix backend/

# Ensure write permissions
sudo chmod -R 755 backend/

# Make sure cache and log directories are writable
sudo chmod -R 777 backend/var/cache
sudo chmod -R 777 backend/var/log

# If you get permission issues with composer
sudo chmod -R 777 backend/vendor