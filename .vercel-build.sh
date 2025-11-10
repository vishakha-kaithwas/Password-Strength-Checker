#!/bin/bash
# Clean install all dependencies
npm ci

# Fix permissions for vite (this line solves your issue)
chmod +x ./node_modules/.bin/vite

# Build your app
npm run build
