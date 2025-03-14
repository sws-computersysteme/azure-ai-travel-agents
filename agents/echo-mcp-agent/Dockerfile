# Use Node.js base image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript files
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "dist/index.js"]
