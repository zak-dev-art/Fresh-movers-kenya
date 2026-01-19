# Peri Logistics Kenya - FastAPI Backend

This backend has been converted from Flask to FastAPI while maintaining the same API endpoints and authentication system.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Initialize Database**
   ```bash
   python init_db.py
   ```

3. **Run the Application**
   ```bash
   # Option 1: Using the run script
   python run.py
   
   # Option 2: Using uvicorn directly
   uvicorn app:app --host 0.0.0.0 --port 5000 --reload
   
   # Option 3: Using the app directly
   python app.py
   ```

## API Documentation

FastAPI automatically generates interactive API documentation:
- **Swagger UI**: http://localhost:5000/docs
- **ReDoc**: http://localhost:5000/redoc

## Key Changes from Flask

1. **Framework**: Migrated from Flask to FastAPI
2. **ORM**: Changed from Flask-SQLAlchemy to pure SQLAlchemy
3. **Validation**: Added Pydantic models for request/response validation
4. **Dependencies**: Updated requirements.txt with FastAPI dependencies
5. **Authentication**: Maintained the same authentication logic (no JWT tokens)

## API Endpoints

All endpoints remain the same:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/trucks/` - Get all trucks
- `POST /api/trucks/` - Add new truck
- `DELETE /api/trucks/{truck_id}` - Delete truck
- `GET /api/requests/` - Get user requests
- `POST /api/requests/` - Create new request
- `PUT /api/requests/{req_id}` - Update request
- `DELETE /api/requests/{req_id}` - Delete request
- `GET /api/notifications/` - Get notifications
- `GET /api/subscriptions/` - Get subscriptions
- `POST /api/subscriptions/` - Create subscription
- `DELETE /api/subscriptions/{sub_id}` - Delete subscription
- `POST /api/packaging/` - Create packaging request

## Frontend Compatibility.

The frontend should work without any changes as all API endpoints and response formats remain identical.