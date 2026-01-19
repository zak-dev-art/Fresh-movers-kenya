# Fresh Movers Kenya - Backend

## Deployment Instructions

### Render Deployment:
1. Connect this repository to Render
2. Create PostgreSQL database first
3. Deploy as Web Service

### Environment Variables:
```
DATABASE_URL=postgresql://user:pass@host/db
SECRET_KEY=d466e2cdd9d21285feab948093f70716a3a311896caa0534155adbd9c8b2e72c
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

### Build Settings:
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn app:app --host 0.0.0.0 --port $PORT`
- **Python Version:** 3.11+

### API Endpoints:
- Health Check: `/`
- Authentication: `/api/auth`
- Trucks: `/api/trucks`
- Requests: `/api/requests`
- Notifications: `/api/notifications`
- Subscriptions: `/api/subscriptions`
- Packaging: `/api/packaging`