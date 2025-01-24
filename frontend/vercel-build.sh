#!/bin/bash

# Clear npm cache and remove node_modules
npm cache clean --force
rm -rf node_modules

# Install dependencies with forced resolution
npm install --legacy-peer-deps --force

# Build the application with necessary environment variables
export NODE_OPTIONS=--openssl-legacy-provider
export CI=false
export DISABLE_ESLINT_PLUGIN=true
npm run build

# Ensure the build directory exists
if [ -d "build" ]; then
    # Copy build directory to the project root
    cp -r build ../
else
    echo "Build directory not found"
    exit 1
fi 