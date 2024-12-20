from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, models
from ..database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Get all shopping items
@router.get("/api/shoppingItems", response_model=List[schemas.ShoppingItem])
def read_shopping_items(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    items = crud.get_shopping_items(db, skip=skip, limit=limit)
    return items

# Add a new shopping item
@router.post("/api/shoppingItems", response_model=schemas.ShoppingItem)
def create_shopping_item(shopping_item: schemas.ShoppingItemCreate, db: Session = Depends(get_db)):
    return crud.create_shopping_item(db=db, shopping_item=shopping_item)

# Get a shopping item by name
@router.get("/api/shoppingItems/{shoppingItemName}", response_model=schemas.ShoppingItem)
def read_shopping_item_by_name(shoppingItemName: str, db: Session = Depends(get_db)):
    db_item = crud.get_shopping_item_by_name(db, name=shoppingItemName)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

# Update an item by name
@router.put("/api/shoppingItems/{shoppingItemName}", response_model=schemas.ShoppingItem)
def update_shopping_item(shoppingItemName: str, shopping_item: schemas.ShoppingItemCreate, db: Session = Depends(get_db)):
    db_item = crud.update_shopping_item_by_name(db, name=shoppingItemName, shopping_item=shopping_item)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

# Delete an item by name
@router.delete("/api/shoppingItems/{shoppingItemName}", response_model=schemas.ShoppingItem)
def delete_shopping_item(shoppingItemName: str, db: Session = Depends(get_db)):
    db_item = crud.delete_shopping_item_by_name(db, name=shoppingItemName)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item
