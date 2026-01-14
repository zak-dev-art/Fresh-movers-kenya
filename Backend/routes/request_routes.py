from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import get_db
from models.request import Request
from schemas import RequestCreate, RequestResponse, MessageResponse
from typing import List, Optional

request_router = APIRouter()

# Fixed rate per kg (adjust as needed)
PRICE_PER_KG = 50  # Example: 50 currency units per kg

@request_router.get("/", response_model=List[dict])
def get_all_requests(user_id: int = Query(...), db: Session = Depends(get_db)):
    try:
        requests = db.query(Request).filter(Request.customer_id == user_id).all()
        
        requests_list = []
        for req in requests:
            req_dict = req.to_dict()
            # Add estimated price
            req_dict["estimated_price"] = req.weight_kg * PRICE_PER_KG
            requests_list.append(req_dict)
        
        return requests_list
    except Exception as e:
        print("Error fetching requests:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch requests")

@request_router.post("/", response_model=dict)
def create_request(request_data: RequestCreate, db: Session = Depends(get_db)):
    try:
        new_request = Request(
            customer_id=request_data.customer_id,
            goods=request_data.goods,
            weight_kg=request_data.weight_kg,
            pickup_location=request_data.pickup_location,
            dropoff_location=request_data.dropoff_location,
            status="pending"
        )
        
        db.add(new_request)
        db.commit()
        db.refresh(new_request)
        
        # Add estimated price in response
        response_data = new_request.to_dict()
        response_data["estimated_price"] = new_request.weight_kg * PRICE_PER_KG
        
        return response_data
    except Exception as e:
        print("Error creating request:", e)
        raise HTTPException(status_code=500, detail="Failed to create request")

@request_router.put("/{req_id}", response_model=dict)
def update_request(req_id: int, status: Optional[str] = None, driver_id: Optional[int] = None, truck_id: Optional[int] = None, db: Session = Depends(get_db)):
    try:
        req = db.query(Request).filter(Request.id == req_id).first()
        if not req:
            raise HTTPException(status_code=404, detail="Request not found")
        
        # Only allow updating status, truck, or driver assignment
        if status is not None:
            req.status = status
        if driver_id is not None:
            req.driver_id = driver_id
        if truck_id is not None:
            req.truck_id = truck_id
        
        db.commit()
        db.refresh(req)
        
        # Include estimated price in response
        req_dict = req.to_dict()
        req_dict["estimated_price"] = req.weight_kg * PRICE_PER_KG
        
        return req_dict
    except HTTPException:
        raise
    except Exception as e:
        print("Error updating request:", e)
        raise HTTPException(status_code=500, detail="Failed to update request")

@request_router.delete("/{req_id}", response_model=MessageResponse)
def delete_request(req_id: int, db: Session = Depends(get_db)):
    try:
        req = db.query(Request).filter(Request.id == req_id).first()
        if not req:
            raise HTTPException(status_code=404, detail="Request not found")
        
        db.delete(req)
        db.commit()
        
        return {"message": "Request deleted"}
    except HTTPException:
        raise
    except Exception as e:
        print("Error deleting request:", e)
        raise HTTPException(status_code=500, detail="Failed to delete request")
