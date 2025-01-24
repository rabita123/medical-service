#!/bin/bash

# Install dependencies
npm install --legacy-peer-deps

# Create build directory if it doesn't exist
mkdir -p build

# Copy assets to build directory
cp -r public/assets build/

# Build the application
NODE_OPTIONS=--openssl-legacy-provider CI=false npm run build

# Ensure the build directory is in the right place
if [ -d "build" ]; then
  echo "Build directory exists"
else
  echo "Build directory not found"
  exit 1
fi 