# Starculator Project README

Welcome to the **Starculator** project! This guide will help you set up and understand the various components of the project, including Docker services, port mappings, how to release the production build using `build.sh`, accessing subdomains, and managing the Docker containers.

---

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Services Overview](#services-overview)
- [Ports and Domains](#ports-and-domains)
- [Starting and Stopping Services](#starting-and-stopping-services)
- [Releasing the Production Build](#releasing-the-production-build)
- [Accessing the Application](#accessing-the-application)
- [Nginx Configuration](#nginx-configuration)
- [Environment Variables](#environment-variables)
- [Conclusion](#conclusion)

---

## Introduction

Starculator is a web application that uses a Symfony backend and a Svelte frontend. The project leverages Docker to containerize the application, making it easier to develop and deploy.

---

## Prerequisites

- **Docker** and **Docker Compose** installed on your machine.
- A **Cloudflare Tunnel** set up with your domain.
- Basic knowledge of Docker and web development.
- **Node.js** and **npm** installed on your machine (for building the frontend locally).

---

## Project Structure

```
project-root/
├── backend/
│   ├── Dockerfile_dev
│   ├── Dockerfile_prod
│   └── (other backend files)
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   └── (other frontend files)
├── nginx/
│   ├── nginx.conf
│   └── html/ (contains built frontend files)
├── build.sh
├── docker-compose.yml
├── config.yml (Cloudflare Tunnel configuration)
└── .env
```

---

## Services Overview

### 1. **webserver**

- **Description**: Serves the production frontend using Nginx and proxies API requests to the production backend.
- **Docker Image**: `nginx:latest`
- **Usage**: Always running to serve the live application.
- **Notes**: Uses a simple setup by mounting the built frontend files into the Nginx container.

### 2. **cloudflared**

- **Description**: Creates a secure tunnel to expose local services through your domain using Cloudflare Tunnel.
- **Docker Image**: `cloudflare/cloudflared:latest`
- **Usage**: Always running to provide external access to your application.

### 3. **code_server**

- **Description**: A remote VS Code server for development.
- **Docker Image**: `codercom/code-server:latest`
- **Usage**: Optional; used if you want to develop remotely.

### 4. **db**

- **Description**: PostgreSQL database for the application.
- **Docker Image**: `postgres:latest`
- **Usage**: Always running; required by both development and production backends.

### 5. **backend-prod**

- **Description**: Symfony backend in production mode.
- **Docker Image**: Built from `backend/Dockerfile_prod`.
- **Usage**: Always running to serve the live application.

### 6. **backend-dev**

- **Description**: Symfony backend in development mode with hot reloading.
- **Docker Image**: Built from `backend/Dockerfile_dev`.
- **Usage**: Used during development; started with the `dev` profile.

### 7. **frontend-dev**

- **Description**: Svelte frontend in development mode with hot reloading.
- **Docker Image**: Built from `frontend/starculator-frontend/Dockerfile_dev`.
- **Usage**: Used during development; started with the `dev` profile.

---

## Ports and Domains

### Ports

| Port  | Service           | Description                                  |
|-------|-------------------|----------------------------------------------|
| 8080  | `webserver`       | Serves the production frontend via Nginx.    |
| 8081  | `code_server`     | Remote VS Code server for development.       |
| 8082  | `frontend-dev`    | Serves the development frontend (Vite).      |
| 8000  | `backend-dev`     | Symfony backend in development mode.         |

### Domains/Subdomains

- **`starculator.space`**: Points to the production frontend (`webserver` on port 8080).
- **`dev.starculator.space`**: Points to the development frontend (`frontend-dev` on port 8082).
- **`code.starculator.space`**: Points to the VS Code server (`code_server` on port 8081).

---

## Starting and Stopping Services

### Starting All Services

To start **all** services, including both production and development environments, you need to:

**1. Run the Build Script**

Before starting the services, run the `build.sh` script to build the frontend:

```bash
./build.sh
```

**2. Start All Services**

```bash
docker-compose --profile dev up -d
```

- **Explanation**: Starts all services, including those with the `dev` profile, in detached mode.

**Note**: The `--profile dev` flag activates the `dev` profile, starting the development services.

### Starting Specific Services

- **Start Production Services Only**:

  ```bash
  ./build.sh
  docker-compose up -d webserver backend-prod cloudflared
  ```

- **Start Development Services Only**:

  ```bash
  docker-compose --profile dev up -d
  ```

### Rebuilding Production

- **Rebuild Production Backend** (if there are changes):

  ```bash
  docker-compose build backend-prod
  docker-compose up -d backend-prod
  ```

- **Rebuild and Restart Production Frontend**:

  ```bash
  ./build.sh
  docker-compose restart webserver
  ```

### Stopping All Services

To stop all running services:

```bash
docker-compose down
```

### Stopping Specific Services

- **Stop Production Services Only**:

  ```bash
  docker-compose stop webserver backend-prod cloudflared
  ```

- **Stop Development Services Only**:

  ```bash
  docker-compose --profile dev stop
  ```

---

## Releasing the Production Build

### Using the Build Script

The `build.sh` script automates the frontend build process for production.

**Steps to Release the Production Build:**

1. **Run the Build Script**:

   ```bash
   ./build.sh
   ```

   - **What It Does**:
     - Navigates to the frontend directory.
     - Installs dependencies.
     - Builds the frontend for production.
     - Copies the built files to the `nginx/html/` directory.

2. **Start or Restart the `webserver` Service**:

   ```bash
   docker-compose up -d webserver
   ```

   - **Explanation**: Starts the `webserver` service or restarts it if it's already running.

---

## Accessing the Application

- **Production Frontend**: `https://starculator.space`
- **Development Frontend**: `https://dev.starculator.space` or `http://localhost:8082`
- **VS Code Server**: `https://code.starculator.space` or `http://localhost:8081`

---

## Nginx Configuration

### `nginx/nginx.conf`

This configuration file sets up Nginx to:

- Serve the production frontend.
- Proxy API requests to the production backend.

```nginx
worker_processes auto;
events { worker_connections 1024; }

http {
    server {
        listen 80;

        # Serve the frontend files
        root /usr/share/nginx/html;
        index index.html index.htm;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Proxy API requests to the Symfony backend
        location /api/ {
            proxy_pass http://backend-prod:80;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

**Note**: This file is mounted into the `webserver` service to configure Nginx.

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
CLOUDFLARE_TUNNEL_TOKEN=your-tunnel-token
CODE_SERVER_PASSWORD=your-code-server-password
SYMFONY_PASSWORD=your-symfony-db-password
```

- **`CLOUDFLARE_TUNNEL_TOKEN`**: Token for your Cloudflare Tunnel.
- **`CODE_SERVER_PASSWORD`**: Password to access the remote VS Code server.
- **`SYMFONY_PASSWORD`**: Password for the PostgreSQL database used by Symfony.

---

## Conclusion

You now have a complete overview of the Starculator project's Docker setup. The production build process is automated using the `build.sh` script, and you can start the entire application—including both production and development environments—with a single command. This setup simplifies development and deployment, ensuring consistency across environments.

Happy coding!

---

## Quick Reference

- **Build and Start All Services (Production and Development)**:

  ```bash
  ./build.sh
  docker-compose --profile dev up -d
  ```

- **Start Production Services Only**:

  ```bash
  ./build.sh
  docker-compose up -d webserver backend-prod cloudflared
  ```

- **Start Development Services Only**:

  ```bash
  docker-compose --profile dev up -d
  ```

- **Stop All Services**:

  ```bash
  docker-compose down
  ```

- **Rebuild Production Backend**:

  ```bash
  docker-compose build backend-prod
  docker-compose up -d backend-prod
  ```

- **Access Production Frontend**: `https://starculator.space`
- **Access Development Frontend**: `https://dev.starculator.space`
- **Access VS Code Server**: `https://code.starculator.space`

---

## Tips

- **Starting All Services Including Development**:

  - Use the `--profile dev` flag to activate the `dev` profile and start all services:

    ```bash
    docker-compose --profile dev up -d
    ```

- **Updating Frontend Code**:
  - After making changes to the frontend, rerun the build script and restart the webserver:

    ```bash
    ./build.sh
    docker-compose restart webserver
    ```

- **Updating Backend Code**:
  - For production:

    ```bash
    docker-compose build backend-prod
    docker-compose up -d backend-prod
    ```

  - For development:

    ```bash
    docker-compose restart backend-dev
    ```

- **Viewing Logs**:

  ```bash
  docker-compose logs -f webserver
  ```

- **Stopping Development Services**:

  ```bash
  docker-compose --profile dev stop
  ```

---

## Cloudflare Tunnel Configuration (`config.yml`)

```yaml
tunnel: your-tunnel-id
credentials-file: /home/nonroot/.cloudflared/your-tunnel-id.json

ingress:
  # Production Frontend
  - hostname: starculator.space
    service: http://localhost:8080

  # VSCode Server
  - hostname: code.starculator.space
    service: http://localhost:8081

  # Development Frontend
  - hostname: dev.starculator.space
    service: http://localhost:8082

  # Fallback for other requests
  - service: http_status:404
```

- **Note**: This configuration routes traffic based on the hostname to the appropriate service.

---

## Additional Notes

- **Docker Compose Version**: Ensure you're using a recent version of Docker Compose that supports profiles (version 1.28.0 or higher).
  - Check your version with:

    ```bash
    docker-compose --version
    ```

- **Starting Services Without Profiles**: If you run `docker-compose up -d` without specifying the `--profile dev` flag, only the services without profiles (production services) will start.

- **Customizing Profiles**: You can define and use different profiles as needed to control which services are started.

---
