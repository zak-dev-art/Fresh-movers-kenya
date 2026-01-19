import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes.auth_routes import auth_router
from routes.truck_routes import truck_router
from routes.request_routes import request_router
from routes.notification_routes import notification_router
from routes.subscription_routes import subscription_router
from routes.packaging_routes import packaging_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Peri Logistics Kenya API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",                # local dev
        "http://localhost:5174",                # local dev (alternative port)
        "http://127.0.0.1:5173",                # local dev
        "http://127.0.0.1:5174",                # local dev (alternative port)
        "https://your-frontend.vercel.app"     # deployed frontend
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"]
)

# Include routers
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(truck_router, prefix="/api/trucks", tags=["trucks"])
app.include_router(request_router, prefix="/api/requests", tags=["requests"])
app.include_router(notification_router, prefix="/api/notifications", tags=["notifications"])
app.include_router(subscription_router, prefix="/api/subscriptions", tags=["subscriptions"])
app.include_router(packaging_router, prefix="/api/packaging", tags=["packaging"])

# Health check endpoint
@app.get("/")
def health_check():
    return {"status": "backend running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
