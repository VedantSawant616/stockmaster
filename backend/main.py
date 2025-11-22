from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os
import sys

# Add backend directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import engine, Base
import models
from routers import products, warehouses, operations, auth

env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)

# Create tables
models.Base.metadata.create_all(bind=engine)

# Seed database with sample data
from seed_data import seed_database
seed_database()

app = FastAPI(title="StockMaster API", description="Inventory Management System Backend")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to StockMaster API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

app.include_router(products.router)
app.include_router(warehouses.router)
app.include_router(operations.router)
app.include_router(auth.router)
