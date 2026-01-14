from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.notification import Notification
from typing import List

notification_router = APIRouter()

@notification_router.get("/", response_model=dict)
def get_all_notifications(db: Session = Depends(get_db)):
    try:
        # No JWT, so just return all notifications
        notifications = db.query(Notification).all()
        
        notifications_list = [
            {
                "id": n.id,
                "message": n.message,
                "created_at": n.created_at.isoformat() if n.created_at else None
            }
            for n in notifications
        ]
        
        return {"notifications": notifications_list}
    except Exception as e:
        print("Error fetching notifications:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch notifications")
