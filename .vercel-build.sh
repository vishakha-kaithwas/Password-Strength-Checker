#!/bin/bash
set -e

# Fix permission issue for vite binary
chmod +x ./node_modules/.bin/vite

# Run normal build
npm run build
