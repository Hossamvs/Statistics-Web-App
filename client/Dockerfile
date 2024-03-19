# Base image - Node.js alpine image for smaller size
FROM node:alpine

# Working directory
WORKDIR /user/src/app

# Copy package.json
COPY ./package.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory
COPY . .

# Expose React development server port (usually 3000)
EXPOSE 3000


# Run the React development server (adjust if you use a different command)
CMD [ "npm", "start" ]
