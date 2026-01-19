import os

class Config:
    DEBUG = True
    DATABASE_URL = os.environ.get(
        "DATABASE_URL", 
        f"sqlite:///{os.path.join(os.path.dirname(__file__), 'instance', 'peri_logistics.db')}"
    )

