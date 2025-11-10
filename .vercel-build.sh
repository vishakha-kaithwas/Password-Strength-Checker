#!/bin/bash
set -e

# Reinstall dependencies cleanly
npm ci

# Fix vite file permissions (main issue)
chmod +x ./node_modules/.bin/vite

# Build the project
npm run build
