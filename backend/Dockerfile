# Use official lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies needed by Prisma on Alpine
RUN apk add --no-cache openssl

# Copy package descriptors
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and prisma schema
COPY . .

# Build the TypeScript code (which now also generates the Prisma client)
RUN npm run build

# Expose the API port (Render defaults to 10000, Railway provides PORT env)
EXPOSE 8000

# Start the Node.js application
CMD ["npm", "start"]
