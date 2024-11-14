# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app
RUN npm install

# Copy the rest of the application code
COPY . /app

# Build the application
RUN npm run build

# Install PM2 globally
RUN npm install -g pm2

# Start the application with PM2
CMD ["pm2-runtime", "start", "npm", "--", "start"]
