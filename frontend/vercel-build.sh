#!/bin/bash

# Install dependencies
npm install --legacy-peer-deps

# Build the application
NODE_OPTIONS=--openssl-legacy-provider CI=false npm run build

# Ensure the build directory exists
if [ -d "build" ]; then
    # Copy build directory to the project root
    cp -r build ../
else
    echo "Build directory not found"
    exit 1
fi 