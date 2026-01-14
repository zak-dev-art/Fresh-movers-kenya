from database import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

class Request(Base):
    __tablename__ = "requests"

    id = Column(Integer, primary_key=True)
    customer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    driver_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    truck_id = Column(Integer, ForeignKey("trucks.id"), nullable=True)
    goods = Column(String(255), nullable=False)
    weight_kg = Column(Integer, nullable=False)
    pickup_location = Column(String(255), nullable=False)
    dropoff_location = Column(String(255), nullable=False)
    status = Column(String(50), default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "customer_id": self.customer_id,
            "driver_id": self.driver_id,
            "truck_id": self.truck_id,
            "goods": self.goods,
            "weight_kg": self.weight_kg,
            "pickup_location": self.pickup_location,
            "dropoff_location": self.dropoff_location,
            "status": self.status,
            "created_at": self.created_at.isoformat()
        }
