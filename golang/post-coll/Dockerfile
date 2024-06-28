# Use the official Golang image as the base image
FROM golang:latest

# Set the working directory to /app
WORKDIR /app

# Clone the Postmanerator repository
RUN git clone https://github.com/aubm/postmanerator.git

# Change the working directory to /app/postmanerator
WORKDIR /app/postmanerator

# Build Postmanerator from the source
RUN go build

# Add the Postman collection file to the container
COPY TODO.postman_collection.json /app/postmanerator/TODO.postman_collection.json

# Set the entrypoint to run Postmanerator
ENTRYPOINT ["/app/postmanerator/postmanerator"]