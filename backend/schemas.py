from pydantic import BaseModel
from typing import Optional, List

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
