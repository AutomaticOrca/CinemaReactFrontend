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

FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]