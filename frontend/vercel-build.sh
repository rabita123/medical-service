#!/bin/bash

# Install dependencies
npm install --legacy-peer-deps

# Set environment variables
export NODE_OPTIONS=--openssl-legacy-provider
export DISABLE_ESLINT_PLUGIN=true
export CI=false
export SKIP_PREFLIGHT_CHECK=true

# Build the application
npm run build 