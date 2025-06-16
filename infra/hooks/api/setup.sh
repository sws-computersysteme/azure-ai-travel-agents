#! /bin/bash

# Install dependencies for the API service
printf ">> Installing dependencies for the API service...\n"
if [ ! -d ./src/api/node_modules ]; then
    printf "Installing dependencies for the API service...\n"
    npm ci --prefix=src/api --legacy-peer-deps
    status=$?
    if [ $status -ne 0 ]; then
        printf "API dependencies installation failed with exit code $status. Exiting.\n"
        exit $status
    fi
else
    printf "Dependencies for the API service already installed.\n"
fi
