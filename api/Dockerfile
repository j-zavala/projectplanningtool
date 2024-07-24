# Base image
FROM --platform=linux/amd64 node:18

# Install necessary tools
RUN apt-get update && apt-get install -y dnsutils netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Ensures both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code, including the scripts directory
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3005

# Define placeholder environment variables for dev
# ENV DB_HOST=db_host_placeholder \
#     DB_PORT=db_port_placeholder \
#     DB_USERNAME=db_username_placeholder \
#     DB_PASSWORD=db_password_placeholder \
#     DB_NAME=db_name_placeholder \
#     DISABLE_DB=false

# Add diagnostic steps
RUN echo "Listing contents of /app:" && ls -la /app && \
    echo "Listing contents of /app/dist:" && ls -la /app/dist && \
    echo "Listing contents of /app/dist/migrations:" && ls -la /app/dist/migrations

# Start the server using the production build
CMD ["sh", "-c", "npm run migration:run && npm run start:prod"]