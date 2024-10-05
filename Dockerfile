# Use a smaller Node.js base image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the project (this runs `tsc -b` and `vite build` if in package.json)
RUN npm run build

# Expose Vite's default preview port
EXPOSE 4173 5173

# Command to run Vite in preview mode (production mode)
CMD [ "npm", "run", "preview" ]
