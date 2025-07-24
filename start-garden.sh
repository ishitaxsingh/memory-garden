#!/bin/bash

# Digital Garden Startup Script
echo "🌱 Digital Garden of Memories"
echo "=" * 40

# Check if Node.js is available
if command -v node &> /dev/null; then
    echo "✅ Node.js found - using Express server"
    echo "📦 Installing dependencies..."
    npm install
    echo "🚀 Starting Node.js server..."
    npm start
else
    echo "🌿 Node.js not found - using Python server"
    echo "🚀 Starting Python server..."
    python3 server.py
fi 