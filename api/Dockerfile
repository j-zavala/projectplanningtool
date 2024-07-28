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

# Add diagnostic steps
RUN echo "Listing contents of /app:" && ls -la /app && \
    echo "Listing contents of /app/dist:" && ls -la /app/dist

# Set environment variables for production
ENV NODE_ENV=production

# Start the server using the production build
CMD ["sh", "-c", "npm run migration:run && npm run start:prod"]
