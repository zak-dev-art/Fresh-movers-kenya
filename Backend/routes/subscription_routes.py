from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import get_db
from models.subscription import Subscription
from schemas import SubscriptionCreate, SubscriptionResponse, MessageResponse
from typing import List

subscription_router = APIRouter()

@subscription_router.get("/", response_model=List[SubscriptionResponse])
def get_subscriptions(user_id: int = Query(...), db: Session = Depends(get_db)):
    try:
        subscriptions = db.query(Subscription).filter(Subscription.user_id == user_id).all()
        return [sub.to_dict() for sub in subscriptions]
    except Exception as e:
        print("Error fetching subscriptions:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch subscriptions")

@subscription_router.post("/", response_model=SubscriptionResponse)
def create_subscription(subscription_data: SubscriptionCreate, db: Session = Depends(get_db)):
    try:
        new_sub = Subscription(
            user_id=subscription_data.user_id,
            plan=subscription_data.plan,
            price=subscription_data.price
        )
        
        db.add(new_sub)
        db.commit()
        db.refresh(new_sub)
        
        return new_sub.to_dict()
    except Exception as e:
        print("Error creating subscription:", e)
        raise HTTPException(status_code=500, detail="Failed to create subscription")

@subscription_router.delete("/{sub_id}", response_model=MessageResponse)
def delete_subscription(sub_id: int, user_id: int = Query(...), db: Session = Depends(get_db)):
    try:
        sub = db.query(Subscription).filter(Subscription.id == sub_id, Subscription.user_id == user_id).first()
        if not sub:
            raise HTTPException(status_code=404, detail="Subscription not found")
        
        db.delete(sub)
        db.commit()
        
        return {"message": "Subscription deleted"}
    except HTTPException:
        raise
    except Exception as e:
        print("Error deleting subscription:", e)
        raise HTTPException(status_code=500, detail="Failed to delete subscription")
