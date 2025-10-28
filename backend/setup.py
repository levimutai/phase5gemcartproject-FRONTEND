#!/usr/bin/env python3
"""Setup script for GemCart backend"""

import subprocess
import sys
import os

def run_command(command):
    """Run a command and return success status"""
    try:
        subprocess.run(command, shell=True, check=True)
        return True
    except subprocess.CalledProcessError:
        return False

def main():
    print("Setting up GemCart Backend...")
    
    # Install dependencies
    print("Installing dependencies...")
    if not run_command("pip install -r requirements.txt"):
        print("Failed to install dependencies")
        return False
    
    # Run the app
    print("Starting Flask server...")
    print("Server will run on http://localhost:5000")
    print("Press Ctrl+C to stop")
    
    os.system("python app.py")

if __name__ == "__main__":
    main()