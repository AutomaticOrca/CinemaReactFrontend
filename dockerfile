# Stage 1: Build the Vite app
FROM node:18-alpine as build

# Declare build-time environment variables
ARG VITE_APP_NODE_ENV
ARG VITE_APP_SERVER_BASE_URL

# Set environment variables
ENV VITE_APP_NODE_ENV=$VITE_APP_NODE_ENV
ENV VITE_APP_SERVER_BASE_URL=$VITE_APP_SERVER_BASE_URL

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:1.23-alpine

# Set working directory in nginx
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy the built app from the build stage
COPY --from=build /app/dist .

# Expose port 80
EXPOSE 80

# Start Nginx server
ENTRYPOINT ["nginx", "-g", "daemon off;"]
