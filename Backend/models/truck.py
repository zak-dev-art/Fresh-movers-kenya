from database import Base
import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, Enum, DateTime

class TruckStatus(enum.Enum):
    AVAILABLE = "available"
    BUSY = "busy"
    MAINTENANCE = "maintenance"

class Truck(Base):
    __tablename__ = "trucks"

    id = Column(Integer, primary_key=True)
    plate_number = Column(String(50), unique=True, nullable=False)
    capacity_kg = Column(Integer, nullable=False)
    refrigerated = Column(Boolean, default=True)
    status = Column(Enum(TruckStatus), default=TruckStatus.AVAILABLE)
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "plate": self.plate_number,
            "capacity_kg": self.capacity_kg,
            "refrigerated": self.refrigerated,
            "status": self.status.value
        }
