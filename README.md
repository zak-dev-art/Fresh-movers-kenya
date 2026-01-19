# Fresh Movers Kenya 🚛

A modern logistics and cargo transportation platform for Kenya, providing fast, reliable, and affordable delivery services.

## 🌟 Features

- **Modern Authentication** - Login/Signup with secure JWT tokens
- **Truck Management** - Add, remove, and manage fleet vehicles
- **Request System** - Create and track delivery requests
- **Subscription Plans** - Multiple service tiers (Basic, Premium, Farm Fresh)
- **Real-time Notifications** - Stay updated on delivery status
- **Packaging Services** - After-sale packaging solutions
- **Responsive Design** - Works on desktop and mobile devices

## 🏗️ Project Structure

```
Fresh-movers-kenya/
├── fresh-movers-backend/     # FastAPI Backend
│   ├── models/              # Database models
│   ├── routes/              # API endpoints
│   ├── app.py              # Main application
│   ├── requirements.txt    # Python dependencies
│   └── README.md          # Backend deployment guide
│
└── fresh-movers-frontend/   # React Frontend
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/         # Application pages
    │   └── context/       # State management
    ├── package.json       # Node dependencies
    └── README.md         # Frontend deployment guide
```

## 🚀 Quick Start

### Backend Setup
```bash
cd fresh-movers-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Frontend Setup
```bash
cd fresh-movers-frontend
npm install
npm run dev
```

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **PostgreSQL** - Production database
- **JWT** - Authentication tokens
- **Uvicorn** - ASGI server

### Frontend
- **React 19** - UI framework
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool

## 🌐 Deployment

### Backend (Render)
1. Create PostgreSQL database on Render
2. Deploy from `fresh-movers-backend/` folder
3. Set environment variables:
   - `DATABASE_URL`
   - `SECRET_KEY`
   - `ACCESS_TOKEN_EXPIRE_MINUTES`

### Frontend (Vercel)
1. Deploy from `fresh-movers-frontend/` folder
2. Build command: `npm run build`
3. Output directory: `dist`

## 📱 Pages & Features

- **🏠 Home** - Landing page with login/signup
- **📊 Dashboard** - Overview with stats and quick actions
- **🚛 Order Truck** - Create delivery requests
- **📋 View Requests** - Track all orders
- **🔧 Manage Trucks** - Fleet management
- **💎 Subscription** - Service plans
- **🔔 Notifications** - Real-time alerts
- **📦 Packaging** - After-sale services

## 🔐 Authentication

- Secure JWT-based authentication
- User registration and login
- Protected routes and API endpoints
- Session management with localStorage

## 💳 Subscription Plans

1. **Basic Plan** (KES 120,000/month)
   - Standard deliveries
   - Limited refrigerated trucks
   - Basic support

2. **Premium Plan** (KES 150,000/month)
   - Unlimited deliveries
   - Full refrigerated access
   - Priority support

3. **Farm Fresh Plan** (KES 200,000/month)
   - All Premium features
   - Bulk order discounts
   - Dedicated account manager

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and inquiries, contact Fresh Movers Kenya logistics team.

---

**Fresh Movers Kenya** - Revolutionizing logistics across Kenya 🇰🇪