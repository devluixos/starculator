#!/bin/bash
# build.sh

# Function to set permissions
set_permissions() {
    local dir=$1
    echo "🔒 Setting correct permissions for $dir..."
    sudo chown -R 101:101 $dir  # 101 is nginx user
    sudo chmod -R 755 $dir
}

# Function to build dev version
build_dev() {
    echo "🏗️ Building development version..."
    cd frontend
    npm install
    npm run build
    cd ..
    echo "📦 Copying to nginx dev directory..."
    sudo mkdir -p nginx/html-dev
    sudo rm -rf nginx/html-dev/*
    sudo cp -r frontend/build/* nginx/html-dev/
    set_permissions nginx/html-dev
}

# Function to build production version
build_prod() {
    echo "🏗️ Building production version..."
    cd frontend
    npm install
    npm run build
    cd ..
    echo "📦 Copying to nginx production directory..."
    sudo mkdir -p nginx/html
    sudo rm -rf nginx/html/*
    sudo cp -r frontend/build/* nginx/html/
    set_permissions nginx/html
}

# Function to restart services
restart_services() {
    if [ "$1" = "cloudflare" ]; then
        echo "🔄 Restarting webserver and cloudflare..."
        docker-compose restart webserver cloudflared
    else
        echo "🔄 Restarting webserver..."
        docker-compose restart webserver
    fi
}

# Print final status
print_status() {
    echo "✅ Build complete! The site should now be available at:"
    echo "- Development: https://dev.starculator.space"
    echo "- Code: https://code.starculator.space"
    echo "- API: https://backend.starculator.space/api/"
    echo "- Production: https://starculator.space"
}

# Main build process
echo "🚀 Starting build process..."

# Handle cloudflare flag
CLOUDFLARE=""
if [ "$1" = "--cloudflare" ] || [ "$2" = "--cloudflare" ]; then
    CLOUDFLARE="cloudflare"
fi

case "$1" in
    "dev")
        build_dev
        restart_services $CLOUDFLARE
        print_status
        ;;
    "prod")
        build_prod
        restart_services $CLOUDFLARE
        print_status
        ;;
    "--cloudflare")
        echo "Building both development and production versions..."
        build_dev
        build_prod
        restart_services $CLOUDFLARE
        print_status
        ;;
    *)
        echo "Building both development and production versions..."
        build_dev
        build_prod
        restart_services $CLOUDFLARE
        print_status
        ;;
esac