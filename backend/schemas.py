from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# User Schemas
class UserRegister(BaseModel):
    email: str
    full_name: str

class VerifyOTP(BaseModel):
    email: str
    otp: str

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str
    role: Optional[str] = "staff"

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    email: str
    full_name: str
    role: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class ForgotPassword(BaseModel):
    email: str

class ResetPassword(BaseModel):
    email: str
    otp: str
    new_password: str

# Product Schemas
class ProductBase(BaseModel):
    name: str
    sku: str
    category: str
    unit_of_measure: str

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    quantity: int = 0
    
    class Config:
        from_attributes = True

class WarehouseBase(BaseModel):
    name: str
    location: str

class WarehouseCreate(WarehouseBase):
    pass

class Warehouse(WarehouseBase):
    id: int
    
    class Config:
        from_attributes = True

# Operation Schemas

class ReceiptCreate(BaseModel):
    product_id: int
    warehouse_id: int
    quantity: int
    supplier_name: str
    status: str = "ORDER_PLACED"  # ORDER_PLACED, IN_TRANSIT, COMPLETED
    notes: Optional[str] = None

class DeliveryCreate(BaseModel):
    product_id: int
    warehouse_id: int
    quantity: int
    customer_name: str
    status: str = "ORDER_RECEIVED"  # ORDER_RECEIVED, SHIPPING, SHIPPED
    notes: Optional[str] = None

class TransferCreate(BaseModel):
    product_id: int
    from_warehouse_id: int
    to_warehouse_id: int
    quantity: int
    notes: Optional[str] = None

class AdjustmentCreate(BaseModel):
    product_id: int
    warehouse_id: int
    counted_quantity: int
    reason: str  # e.g., "Damage", "Lost", "Found", "Recount"
    notes: Optional[str] = None

class OperationResponse(BaseModel):
    success: bool
    message: str
    transaction_id: int
    new_quantity: int

class StatusUpdate(BaseModel):
    status: str

class TransactionHistory(BaseModel):
    id: int
    product_name: str
    warehouse_name: str
    transaction_type: str
    quantity: int
    reference: str
    notes: Optional[str]
    status: str
    timestamp: datetime
    
    class Config:
        from_attributes = True
