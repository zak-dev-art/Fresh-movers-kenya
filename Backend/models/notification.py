from database import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    message = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
