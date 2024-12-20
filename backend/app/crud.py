from sqlalchemy.orm import Session
from . import models, schemas

# Get all shopping items
def get_shopping_items(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.ShoppingItem).offset(skip).limit(limit).all()

# Create a new shopping item
def create_shopping_item(db: Session, shopping_item: schemas.ShoppingItemCreate):
    db_item = models.ShoppingItem(name=shopping_item.name, number=shopping_item.number)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

# Get a shopping item by name
def get_shopping_item_by_name(db: Session, name: str):
    return db.query(models.ShoppingItem).filter(models.ShoppingItem.name == name).first()

# Update an item by name
def update_shopping_item_by_name(db: Session, name: str, shopping_item: schemas.ShoppingItemCreate):
    db_item = db.query(models.ShoppingItem).filter(models.ShoppingItem.name == name).first()
    if db_item:
        db_item.number = shopping_item.number
        db.commit()
        db.refresh(db_item)
        return db_item
    return None

# Delete an item by name
def delete_shopping_item_by_name(db: Session, name: str):
    db_item = db.query(models.ShoppingItem).filter(models.ShoppingItem.name == name).first()
    if db_item:
        db.delete(db_item)
        db.commit()
        return db_item
    return None
