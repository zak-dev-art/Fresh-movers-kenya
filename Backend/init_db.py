#!/usr/bin/env python3
"""
Simple database initialization script for FastAPI conversion
"""
import os
from database import engine, Base
from models import *  # Import all models

def init_db():
    """Create all database tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

if __name__ == "__main__":
    init_db()