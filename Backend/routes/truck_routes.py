from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.truck import Truck, TruckStatus
from schemas import TruckCreate, TruckResponse, MessageResponse
from typing import List

truck_router = APIRouter()

@truck_router.get("/", response_model=List[TruckResponse])
def get_all_trucks(db: Session = Depends(get_db)):
    try:
        trucks = db.query(Truck).all()
        return [truck.to_dict() for truck in trucks]
    except Exception as e:
        print("Error fetching trucks:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch trucks")

@truck_router.post("/", response_model=TruckResponse)
def add_truck(truck_data: TruckCreate, db: Session = Depends(get_db)):
    try:
        new_truck = Truck(
            plate_number=truck_data.plate,
            capacity_kg=truck_data.capacity_kg,
            refrigerated=truck_data.refrigerated,
            status=TruckStatus.AVAILABLE
        )
        
        db.add(new_truck)
        db.commit()
        db.refresh(new_truck)
        
        return new_truck.to_dict()
    except Exception as e:
        print("Error adding truck:", e)
        raise HTTPException(status_code=500, detail="Failed to add truck")

@truck_router.delete("/{truck_id}", response_model=MessageResponse)
def delete_truck(truck_id: int, db: Session = Depends(get_db)):
    try:
        truck = db.query(Truck).filter(Truck.id == truck_id).first()
        if not truck:
            raise HTTPException(status_code=404, detail="Truck not found")
        
        db.delete(truck)
        db.commit()
        
        return {"message": "Truck deleted"}
    except HTTPException:
        raise
    except Exception as e:
        print("Error deleting truck:", e)
        raise HTTPException(status_code=500, detail="Failed to delete truck")

