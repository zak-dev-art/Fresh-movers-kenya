from database import Base
from sqlalchemy import Column, Integer, String, Float, ForeignKey

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    plan = Column(String(255), nullable=False)
    price = Column(Float, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "plan": self.plan,
            "price": self.price
        }
