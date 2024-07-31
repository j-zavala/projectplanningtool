# Base image
FROM --platform=linux/amd64 node:18 AS build
# Create app directory
WORKDIR /app
# Ensures both package.json AND package-lock.json are copied
COPY package*.json ./
# Install app dependencies
RUN npm ci
# Copy the rest of the application code, including the scripts directory
COPY . .
# Creates a "dist" folder with the production build
RUN npm run build


FROM nginx:latest AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80/tcp
CMD ["nginx", "-g", "daemon off;"]