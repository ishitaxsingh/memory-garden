const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: []
        }
    },
    crossOriginEmbedderPolicy: false
}));

// Enable CORS for development
app.use(cors());

// Compression middleware
app.use(compression());

// Serve static files
app.use(express.static(path.join(__dirname, './'), {
    maxAge: '1h',
    etag: true
}));

// API routes for future enhancements
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        message: 'Digital Garden is blooming beautifully',
        timestamp: new Date().toISOString()
    });
});

// Serve the main application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404 errors gracefully
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong in the garden',
        message: 'Please try again later'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🌱 Digital Garden is blooming on port ${PORT}`);
    console.log(`🌿 Visit http://localhost:${PORT} to start growing your memories`);
    console.log(`💧 Your garden of memories awaits...`);
});

module.exports = app; 