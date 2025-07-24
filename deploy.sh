#!/bin/bash

# Digital Garden Deployment Script
echo "🌱 Setting up Digital Garden of Memories..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "❌ Node.js version 14 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating environment file..."
    cat > .env << EOF
NODE_ENV=development
PORT=3000
EOF
    echo "✅ Environment file created"
fi

# Start the application
echo "🚀 Starting Digital Garden..."
echo "🌿 Your garden will be available at: http://localhost:3000"
echo "💧 Press Ctrl+C to stop the server"
echo ""

npm start 