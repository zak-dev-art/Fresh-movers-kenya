#!/usr/bin/env python3
"""
Startup script for FastAPI application
"""
import uvicorn
from app import app

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=5000,
        reload=True,  # Enable auto-reload for development
        log_level="info"
    )