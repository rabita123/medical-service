#!/bin/bash
echo "Installing dependencies..."
npm install

echo "Building frontend..."
cd frontend
npm install --legacy-peer-deps
npm run build

echo "Build complete!" 