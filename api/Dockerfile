# Base image
FROM --platform=linux/amd64 node:18

# Create app directory
WORKDIR /app

# Ensures both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code, including the scripts directory
COPY . .

# Ensure the script is executable
RUN chmod +x /app/scripts/update_containers.sh

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3005

# Start the server using the production build
CMD npm run migration:run && npm run start:prod