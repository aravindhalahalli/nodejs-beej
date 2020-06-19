## Documentation of existing commands you can use
# docker ps: For listing the running container
#
# docker ps -all: To show all the containers that have ever been created on our machine
#
# docker system prune: Removes all containers and clears cache
#
# docker stop <container-id>: The container gets the SIGTERM signal and can take some time to stop to perform some clean up (e.g save file, emit msg, etc). Usually, after 10 seconds, docker stop would run the kill command
#
# docker kill <container-id>: The container gets the SIGKILL signal telling it to stop the container right away. Can use it if the container is stuck
#
# docker exec -it <container-id> sh: To start the terminal in the virtual machine. -it stands for accept input and 't' prettifies our output
#
#  docker build .: Builds the container based on your docker file (fed to docker client) which is then delivered docker server which in turn builds a usable image
#
# docker build -t rashtay/nodeapp:latest .: Tag our container. Follow the naming convention
#
# docker run -p 5000:5000 rashtay/nodeapp: To run the tagged container and map ports


# Specify the base image
FROM node:lts-alpine

# Specify a working directory for your application
WORKDIR /app

# Copy our package files. Copy the other files later to avoid unnecessary rebuilds
COPY ./package.* ./

# Install some dependencies
RUN npm install -g -s --no-progress yarn && \
    yarn

# Copy rest of the files
COPY ./ ./

# Default command
CMD ["yarn", "start"]