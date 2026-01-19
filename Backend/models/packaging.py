from database import Base
from sqlalchemy import Column, Integer, String, Float, Text

class Packaging(Base):
    __tablename__ = "packaging"

    id = Column(Integer, primary_key=True)
    item_type = Column(String(120), nullable=False)
    weight_kg = Column(Float, nullable=False)
    packaging_type = Column(String(120), nullable=False)
    notes = Column(Text, default="")
