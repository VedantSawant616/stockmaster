from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import smtplib
import random
import os
import sys
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import get_db
from models import User
from schemas import UserRegister, VerifyOTP

router = APIRouter(prefix="/auth", tags=["auth"])

# Store OTPs temporarily (in production, use Redis or database)
otp_store = {}

def generate_otp():
    return str(random.randint(100000, 999999))

def send_otp_email(email: str, otp: str):
    """Send OTP to user's email"""
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")
    smtp_from = os.getenv("SMTP_FROM", smtp_user)
    
    # For local development without SMTP configured
    if not all([smtp_user, smtp_password]):
        print(f"\n{'='*50}")
        print(f"📧 OTP for {email}: {otp}")
        print(f"{'='*50}\n")
        return
    
    try:
        message = MIMEMultipart()
        message["From"] = smtp_from
        message["To"] = email
        message["Subject"] = "Your StockMaster Registration OTP"
        
        body = f"""
Hello,

Your OTP for registration is: {otp}

This OTP will expire in 10 minutes.

Best regards,
StockMaster Team
        """
        message.attach(MIMEText(body, "plain"))
        
        # Use STARTTLS for port 587
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(message)
        server.quit()
        print(f"✓ OTP email sent to {email}")
    except Exception as e:
        print(f"Failed to send email: {e}")
        print(f"[FALLBACK] OTP for {email}: {otp}")

@router.post("/register")
async def register(user_data: UserRegister, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """Step 1: Send OTP to user's email"""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Generate OTP
    otp = generate_otp()
    
    # Store OTP with expiry (10 minutes)
    otp_store[user_data.email] = {
        "otp": otp,
        "expires_at": datetime.utcnow() + timedelta(minutes=10),
        "user_data": user_data.dict()
    }
    
    # Send OTP in background
    background_tasks.add_task(send_otp_email, user_data.email, otp)
    
    return {"message": "OTP sent to your email", "email": user_data.email}

@router.post("/verify-otp")
async def verify_otp(verify_data: VerifyOTP, db: Session = Depends(get_db)):
    """Step 2: Verify OTP and create user"""
    email = verify_data.email
    otp = verify_data.otp
    
    # Check if OTP exists
    if email not in otp_store:
        raise HTTPException(status_code=400, detail="No OTP found for this email")
    
    stored_data = otp_store[email]
    
    # Check if OTP expired
    if datetime.utcnow() > stored_data["expires_at"]:
        del otp_store[email]
        raise HTTPException(status_code=400, detail="OTP has expired")
    
    # Verify OTP
    if stored_data["otp"] != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    
    # Create user
    user_data = stored_data["user_data"]
    new_user = User(
        email=user_data["email"],
        full_name=user_data["full_name"]
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Clean up OTP
    del otp_store[email]
    
    return {
        "message": "Registration successful",
        "user": {
            "email": new_user.email,
            "full_name": new_user.full_name
        }
    }

@router.post("/resend-otp")
async def resend_otp(email: str, background_tasks: BackgroundTasks):
    """Resend OTP to user's email"""
    if email not in otp_store:
        raise HTTPException(status_code=400, detail="No registration found for this email")
    
    # Generate new OTP
    otp = generate_otp()
    
    # Update OTP and expiry
    otp_store[email]["otp"] = otp
    otp_store[email]["expires_at"] = datetime.utcnow() + timedelta(minutes=10)
    
    # Send OTP in background
    background_tasks.add_task(send_otp_email, email, otp)
    
    return {"message": "New OTP sent to your email"}
