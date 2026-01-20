import os
import sys
import webbrowser
import http.server
import socketserver
import threading
import time
from pathlib import Path

def main():
    print("=" * 50)
    print("    3D Model Playground - Starting...")
    print("=" * 50)
    print()
    
    # Get the directory where this script is located
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    port = 8000
    
    print(f"Starting HTTP server on http://localhost:{port}")
    print()
    print("Instructions:")
    print("- The server will start automatically")
    print("- Your browser will open to the application")
    print("- Allow camera and microphone access when prompted")
    print("- Say 'drag', 'rotate', 'scale', or 'animate' to control models")
    print("- Use pinch gestures to interact with 3D models")
    print()
    print("Press Ctrl+C to stop the server when done.")
    print("=" * 50)
    print()
    
    # Create HTTP server
    handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            print(f"Server running at http://localhost:{port}")
            
            # Open browser after a short delay
            def open_browser():
                time.sleep(1)
                webbrowser.open(f"http://localhost:{port}")
            
            browser_thread = threading.Thread(target=open_browser)
            browser_thread.daemon = True
            browser_thread.start()
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\nShutting down server...")
    except OSError as e:
        if e.errno == 10048:  # Port already in use
            print(f"ERROR: Port {port} is already in use.")
            print("Please close any other applications using this port and try again.")
        else:
            print(f"ERROR: {e}")
        input("Press Enter to exit...")

if __name__ == "__main__":
    main()