FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

#Copy package and source code
COPY --chown=node:node package*.json ./
COPY --chown=node:node ./src/  ./src/
COPY --chown=node:node ./oas/  ./
COPY --chown=node:node tsconfig*.json ./

# Install dependencies
RUN npm ci
RUN npm run build

# folder permisions
RUN mkdir ./oas && chown -R node:node ./oas

# Expose the port
EXPOSE 3000

# Switch back to the node user
USER node
# Start the app
CMD [ "node", "dist/main.js" ]