# Specify the base image
FROM node:lts-alpine

# Specify a working directory for your application
WORKDIR /app

# Copy our package files. Copy the other files later to avoid unnecessary rebuilds
COPY package*.json ./
COPY ./yarn.lock ./

# Install dependenciesand clear the cache for production
RUN yarn install --production --force --ignore-scripts --prefer-offline && \
    yarn cache clean

# Copy rest of the files
COPY ./ ./

# Default command
CMD ["yarn", "start"]