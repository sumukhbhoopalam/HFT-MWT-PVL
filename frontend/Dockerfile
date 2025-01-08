# Use an official Node.js runtime as a parent image
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight web server to serve static files
FROM nginx:alpine

# Set working directory for nginx
WORKDIR /usr/share/nginx/html

# Copy the build output to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy a default config.json (optional, for fallback in production)
COPY config.json ./config.json

# Add entrypoint script to allow dynamic config.json setup
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose the port Nginx is running on
EXPOSE 80

# Start the entrypoint script and Nginx
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]