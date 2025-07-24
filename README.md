# Digital Garden of Memories 🌱

A gentle, nostalgic digital garden where your thoughts and memories bloom as soft green leaves on growing plants. Each memory you write becomes a leaf that grows with love and care.

## Features

### 🌿 Growing Memories
- Write memories, thoughts, or feelings in the text area
- Each memory becomes a soft green leaf that grows from a plant stem
- Multiple plants grow naturally as your garden expands
- Leaves grow organically along the stems with natural positioning
- Hover over any leaf to see a personalized reflection or quote

### 💧 Gentle Nourishment
- "Water Me" button provides calming quotes and reflections
- Each quote is carefully chosen to inspire peace and growth
- Gentle animations and soft color palette throughout

### 🎨 Design Philosophy
- **Soft Colors**: Gentle greens, soft blues, and warm earth tones
- **Gentle Animations**: Smooth leaf growth, floating particles, and gentle transitions
- **Nostalgic Tone**: Poetic language and calming interactions
- **Responsive Design**: Works beautifully on all devices

### 🌟 Interactive Elements
- Floating particles that respond to mouse movement
- Gentle sound feedback when planting memories
- Smooth modal transitions for memory details
- Local storage to preserve your garden across sessions

## Quick Start

### Option 1: Simple Setup (Recommended)
```bash
# Clone or download the project
cd digital-garden-memories

# Run the deployment script
./deploy.sh
```

### Option 2: Manual Setup
```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Or start production server
npm start
```

### Option 3: Docker Deployment
```bash
# Build and run with Docker
docker-compose up -d

# Or build manually
docker build -t digital-garden .
docker run -p 3000:3000 digital-garden
```

## How to Use

1. **Plant a Memory**: Write your thought or memory in the text area and click "Plant Memory" or press Enter
2. **Watch Plants Grow**: Each memory becomes a leaf growing from a plant stem, with new plants appearing as your garden expands
3. **Hover for Reflections**: Hover over any leaf to see a personalized reflection or quote about that memory
4. **Water Your Garden**: Click the "Water Me" button for a gentle quote or reflection
5. **Watch It Grow**: Your garden expands naturally with multiple plants and organic leaf growth

## Web App Features

### 🚀 Production Ready
- **Express.js Server**: Robust Node.js backend with security headers
- **Compression**: Gzip compression for faster loading
- **CORS Support**: Cross-origin resource sharing enabled
- **Security**: Helmet.js for security headers and CSP
- **Error Handling**: Graceful 404 and error pages

### 🐳 Container Support
- **Dockerfile**: Ready-to-deploy container image
- **Docker Compose**: Easy multi-container deployment
- **Health Checks**: Built-in application health monitoring
- **Non-root User**: Secure container configuration

### 📱 Responsive & Accessible
- **Mobile First**: Optimized for all screen sizes
- **Progressive Enhancement**: Works without JavaScript
- **Accessibility**: Semantic HTML and ARIA support
- **Performance**: Optimized assets and caching

## API Endpoints

- `GET /` - Main application
- `GET /api/health` - Health check endpoint
- `GET /*` - 404 error page

## Development

### Prerequisites
- Node.js 14 or higher
- npm or yarn

### Available Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run build      # Build the application (no build step required)
```

### Environment Variables
```bash
NODE_ENV=development  # Environment mode
PORT=3000            # Server port
```

## Deployment Options

### Local Development
```bash
npm run dev
```

### Production Server
```bash
npm start
```

### Docker Deployment
```bash
docker-compose up -d
```

### Cloud Deployment
The app is ready for deployment on:
- **Heroku**: `git push heroku main`
- **Vercel**: Connect GitHub repository
- **Netlify**: Deploy static files
- **AWS/GCP/Azure**: Use Docker container

## Technical Details

- **Backend**: Express.js with security middleware
- **Frontend**: Pure HTML/CSS/JavaScript (no build step)
- **Storage**: Local browser storage (localStorage)
- **Security**: Helmet.js, CORS, CSP headers
- **Performance**: Gzip compression, caching headers
- **Container**: Docker with Alpine Linux

## Color Palette

- **Primary Greens**: #90EE90, #98FB98, #9ACD32, #6B8E23
- **Earth Tones**: Soft browns and beiges for the soil
- **Sky Blues**: Gentle blues for the water button and sky gradient
- **Text Colors**: Deep forest green (#2c5530) for readability

## Browser Compatibility

Works on all modern browsers that support:
- CSS Grid and Flexbox
- CSS Animations and Transitions
- Local Storage API
- Web Audio API (for gentle sounds)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

---

*"In the garden of memories, every leaf tells a story of growth."*

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Ensure you're using a modern browser
3. Try clearing browser cache and localStorage
4. Open an issue on GitHub with details 