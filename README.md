# StockMaster - Inventory Management System


A modern, real-time inventory management system built with FastAPI and React. Manage products, track stock movements, handle receipts and deliveries, and monitor warehouse inventory with ease.

##  Features

- **Product Management** - Add, edit, and track products with SKU, categories, and quantities
- **Operations Management**
  -  Receipts (Incoming goods)
  -  Deliveries (Outgoing goods)
  -  Internal Transfers (Between warehouses)
  -  Stock Adjustments (Inventory corrections)
- **Multi-Warehouse Support** - Track inventory across multiple locations
- **Real-time Dashboard** - KPIs, recent activity, and warehouse summaries
- **Status Tracking** - Monitor order status from placement to completion
- **Email OTP Registration** - Secure user registration with email verification
- **Search & Filter** - Quick product search across name, SKU, and category

##  Tech Stack

### Backend

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL** - Production database (SQLite for local dev)
- **Pydantic** - Data validation
- **SMTP** - Email OTP delivery

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library
- **Axios** - HTTP client

##  Installation

### Prerequisites

- Python 3.11+
- Node.js 18+
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/VedantSawant616/stockmaster.git
cd stockmaster
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
# Copy the following to backend/.env:
DATABASE_URL=sqlite:///./stockmaster.db
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com

# Start backend server
uvicorn main:app --reload
```

Backend will run on: `http://localhost:8000`

### 3. Frontend Setup

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create .env file (optional - defaults to localhost:8000)
echo "VITE_API_URL=http://localhost:8000" > .env

# Start frontend server
npm run dev
```

Frontend will run on: `http://localhost:5173`

##  Email Configuration (Gmail)

To enable OTP email delivery:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate a new app password for "Mail"
5. Copy the 16-character password (without spaces)
6. Add it to `backend/.env` as `SMTP_PASSWORD`

**Note:** If email is not configured, OTPs will be printed in the backend console.

##  Production Deployment

### Backend (Render)

1. Create account on [Render.com](https://render.com)
2. Create new PostgreSQL database
3. Create new Web Service from GitHub repo
4. Set environment variables:
   - `DATABASE_URL` - (auto-connected from database)
   - `ENVIRONMENT=production`
   - `FRONTEND_URL` - (your Vercel URL)
   - SMTP variables (same as local)

### Frontend (Vercel)

1. Create account on [Vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set root directory to `frontend`
4. Add environment variable:
   - `VITE_API_URL` - (your Render backend URL)
5. Deploy

##  Usage

### First Time Setup

1. Open `http://localhost:5173`
2. Register with your email
3. Check email for OTP (also printed in backend console)
4. Enter OTP to verify
5. Access the dashboard

### Managing Products

- Navigate to **Products** page
- Click **"Add Product"** to create new items
- Use search bar to filter products
- View stock levels with color coding (red/yellow/green)

### Creating Operations

1. Go to **Operations** page
2. Click **"New Operation"**
3. Select operation type:
   - **Receipt** - Goods arriving from vendor
   - **Delivery** - Goods leaving to customer
   - **Transfer** - Moving between warehouses
   - **Adjustment** - Fixing inventory discrepancies
4. Fill in details and submit
5. Change status to update inventory automatically

### Warehouse Management

- View warehouse summaries on Operations page
- Click **"View Items"** to see products in each warehouse
- Search within warehouse inventory

## 📁 Project Structure

```
stockmaster/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── models.py            # Database models
│   ├── schemas.py           # Pydantic schemas
│   ├── database.py          # DB connection
│   ├── seed_data.py         # Sample data
│   ├── routers/
│   │   ├── auth.py          # Registration & OTP
│   │   ├── products.py      # Product endpoints
│   │   ├── operations.py    # Operations endpoints
│   │   └── warehouses.py    # Warehouse endpoints
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # Main app component
│   │   ├── api.ts           # API client
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   └── main.tsx         # Entry point
│   ├── package.json         # Node dependencies
│   └── tailwind.config.js   # Tailwind CSS config
└── render.yaml              # Render deployment config
```

## 🔧 API Endpoints

### Authentication

- `POST /auth/register` - Send OTP to email
- `POST /auth/verify-otp` - Verify OTP and register user
- `POST /auth/resend-otp` - Resend OTP

### Products

- `GET /products/` - List all products
- `POST /products/` - Create product
- `GET /products/{id}` - Get product details
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Operations

- `GET /operations/recent/` - Recent operations by type
- `POST /operations/receipt` - Create receipt
- `POST /operations/delivery` - Create delivery
- `POST /operations/transfer` - Create transfer
- `POST /operations/adjustment` - Create adjustment
- `PATCH /operations/{id}/status` - Update operation status

### Warehouses

- `GET /warehouses/` - List warehouses
- `GET /warehouses/inventory` - Warehouse summaries
- `GET /warehouses/{id}/items` - Items in warehouse


## 👥 Contributors

- Vedant Sawant ([@VedantSawant616](https://github.com/VedantSawant616))
- Tanishq Shelar ([@itanishqshelar](https://github.com/itanishqshelar))
- Aryan Yadav ([@binaryan005](https://github.com/binaryan005))
- Arav Palsule ([@palsulearav](https://github.com/palsulearavapsit))
---

**Happy Inventory Managing! 📦✨**
