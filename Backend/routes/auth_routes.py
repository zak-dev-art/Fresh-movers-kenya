from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.user import User, Role
from schemas import UserRegister, UserLogin, UserResponse, MessageResponse
from auth import create_access_token, get_current_user

auth_router = APIRouter()

@auth_router.post("/register", response_model=MessageResponse)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    # Check if user exists
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Validate role
    if user_data.role not in Role._value2member_map_:
        raise HTTPException(status_code=400, detail=f"Invalid role '{user_data.role}'")
    
    # Create user
    user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        role=Role(user_data.role)
    )
    user.set_password(user_data.password)
    
    db.add(user)
    db.commit()
    
    return {"message": "Registered successfully"}

@auth_router.post("/login")
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if not user or not user.check_password(user_data.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": user.id, "role": user.role.value})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role.value
        }
    }

@auth_router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "role": current_user.role.value
    }
