#!/bin/bash

# Set environment variables
export NODE_OPTIONS="--openssl-legacy-provider"
export DISABLE_ESLINT_PLUGIN=true
export CI=false
export NODE_ENV=production
export SKIP_PREFLIGHT_CHECK=true
export GENERATE_SOURCEMAP=false

# Install dependencies
npm install --legacy-peer-deps

# Run build
npm run build 