# Step 1: Build Stage
FROM node:22 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files to the working directory
COPY . .

# Run the Next.js build command (this will generate the .next folder)
RUN npm run build

# Step 2: Production Stage
FROM node:22-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy necessary files from the build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY prisma ./prisma/

# Expose port 3000
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "run", "dev"]
