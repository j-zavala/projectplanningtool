# Base image
FROM --platform=linux/amd64 node:18 AS build

# Install necessary tools
RUN apt-get update && apt-get install -y dnsutils netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Ensures both package.json AND package-lock.json are copied
COPY package.json ./
COPY package-lock.json ./

# Install app dependencies
RUN npm ci

# Copy the rest of the application code, including the scripts directory
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# NGINX Production stage
FROM nginx:latest AS prod

# Healthcheck to ensure the container is running
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Create log directory for NGINX
RUN mkdir -p /var/log/nginx

# Copy the build artifacts from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]