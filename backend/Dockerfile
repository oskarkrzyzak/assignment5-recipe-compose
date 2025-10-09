# Use Node.js base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files
COPY . .

# Create directory for SQLite database
RUN mkdir -p /app/data

# Expose port 5000 for backend
EXPOSE 5000

# Start the backend application
CMD ["npm", "start"]