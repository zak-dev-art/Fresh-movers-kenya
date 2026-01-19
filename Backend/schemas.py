from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# User schemas
class UserRegister(BaseModel):
    username: str
    full_name: str
    email: EmailStr
    password: str
    role: Optional[str] = "customer"

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    full_name: str
    email: str
    role: str

# Truck schemas
class TruckCreate(BaseModel):
    plate: str
    capacity_kg: int
    refrigerated: Optional[bool] = True

class TruckResponse(BaseModel):
    id: int
    plate: str
    capacity_kg: int
    refrigerated: bool
    status: str

# Request schemas
class RequestCreate(BaseModel):
    customer_id: int
    goods: str
    weight_kg: int
    pickup_location: str
    dropoff_location: str

class RequestResponse(BaseModel):
    id: int
    customer_id: int
    driver_id: Optional[int]
    truck_id: Optional[int]
    goods: str
    weight_kg: int
    pickup_location: str
    dropoff_location: str
    status: str
    created_at: str

# Subscription schemas
class SubscriptionCreate(BaseModel):
    user_id: int
    plan: str
    price: float

class SubscriptionResponse(BaseModel):
    id: int
    user_id: int
    plan: str
    price: float

# Packaging schemas
class PackagingCreate(BaseModel):
    item_type: str
    weight_kg: float
    packaging_type: str
    notes: Optional[str] = ""

# Notification schemas
class NotificationCreate(BaseModel):
    user_id: int
    message: str

# Generic response schemas
class MessageResponse(BaseModel):
    message: str

class ErrorResponse(BaseModel):
    error: str