from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.packaging import Packaging
from schemas import PackagingCreate, MessageResponse

packaging_router = APIRouter()

@packaging_router.post("/", response_model=MessageResponse)
def create_packaging_request(packaging_data: PackagingCreate, db: Session = Depends(get_db)):
    try:
        # Create and save package
        new_package = Packaging(
            item_type=packaging_data.item_type,
            weight_kg=packaging_data.weight_kg,
            packaging_type=packaging_data.packaging_type,
            notes=packaging_data.notes
        )
        
        db.add(new_package)
        db.commit()
        
        return {"message": "Packaging request created successfully"}
    except Exception as e:
        print("Error creating packaging request:", e)
        raise HTTPException(status_code=500, detail="Failed to create packaging request")
