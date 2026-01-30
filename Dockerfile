# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy project files
COPY . .

# Expose port (for local testing)
EXPOSE 3000

# Set environment variables (optional)
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
