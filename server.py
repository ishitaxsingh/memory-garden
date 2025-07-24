#!/usr/bin/env python3
"""
Simple HTTP Server for Digital Garden of Memories
"""

import http.server
import socketserver
import os
import sys

class DigitalGardenHandler(http.server.SimpleHTTPRequestHandler):
    """Simple handler for the Digital Garden web app"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        # Add basic security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Cache-Control', 'public, max-age=3600')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Simple logging without complex formatting
        print(f"🌱 Request: {self.path}")
    
    def do_GET(self):
        # Handle API health check
        if self.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = '{"status": "healthy", "message": "Digital Garden is blooming beautifully"}'
            self.wfile.write(response.encode())
            return
        
        # Handle favicon.ico requests
        if self.path == '/favicon.ico':
            self.send_response(204)
            self.end_headers()
            return
        
        # Serve static files
        super().do_GET()

def main():
    """Main function to start the server"""
    PORT = 3000
    
    try:
        with socketserver.TCPServer(("", PORT), DigitalGardenHandler) as httpd:
            print("🌱 Digital Garden of Memories")
            print("=" * 40)
            print(f"🌿 Server starting on port {PORT}")
            print(f"💧 Visit: http://localhost:{PORT}")
            print("🌱 Press Ctrl+C to stop the server")
            print("=" * 40)
            
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n🌱 Shutting down the garden...")
                httpd.shutdown()
                print("💧 Garden closed. Goodbye!")
                
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use.")
            print("💡 Try a different port or stop the existing server.")
            sys.exit(1)
        else:
            print(f"❌ Error starting server: {e}")
            sys.exit(1)

if __name__ == "__main__":
    main() 