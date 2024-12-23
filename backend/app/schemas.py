from pydantic import BaseModel

# Base schema for item
class ShoppingItemBase(BaseModel):
    name: str
    amount: int

# Schema for creating a new item
class ShoppingItemCreate(ShoppingItemBase):
    pass

# Schema for returning an item
class ShoppingItem(ShoppingItemBase):
    id: int

    class Config:
        orm_mode = True