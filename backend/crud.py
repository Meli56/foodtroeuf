# crud.py
from sqlalchemy.orm import Session
import models, schemas

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_food_truck(db: Session, food_truck_id: int):
    return db.query(models.FoodTruck).filter(models.FoodTruck.id == food_truck_id).first()

def get_food_trucks(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.FoodTruck).offset(skip).limit(limit).all()

def create_food_truck(db: Session, food_truck: schemas.FoodTruckCreate):
    db_food_truck = models.FoodTruck(**food_truck.dict())
    db.add(db_food_truck)
    db.commit()
    db.refresh(db_food_truck)
    return db_food_truck

def create_menu_item(db: Session, menu_item: schemas.MenuCreate):
    db_menu_item = models.Menu(**menu_item.dict())
    db.add(db_menu_item)
    db.commit()
    db.refresh(db_menu_item)
    return db_menu_item

def create_order(db: Session, order: schemas.OrderCreate):
    db_order = models.Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def get_orders(db: Session, user_id: int):
    return db.query(models.Order).filter(models.Order.user_id == user_id).all()

def update_user(db: Session, user_id: int, user: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        for key, value in user.dict().items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user

def update_food_truck(db: Session, food_truck_id: int, food_truck: schemas.FoodTruckCreate):
    db_food_truck = db.query(models.FoodTruck).filter(models.FoodTruck.id == food_truck_id).first()
    if db_food_truck:
        for key, value in food_truck.dict().items():
            setattr(db_food_truck, key, value)
        db.commit()
        db.refresh(db_food_truck)
    return db_food_truck

def delete_food_truck(db: Session, food_truck_id: int):
    db_food_truck = db.query(models.FoodTruck).filter(models.FoodTruck.id == food_truck_id).first()
    if db_food_truck:
        db.delete(db_food_truck)
        db.commit()
    return db_food_truck

def update_menu_item(db: Session, menu_item_id: int, menu_item: schemas.MenuCreate):
    db_menu_item = db.query(models.Menu).filter(models.Menu.id == menu_item_id).first()
    if db_menu_item:
        for key, value in menu_item.dict().items():
            setattr(db_menu_item, key, value)
        db.commit()
        db.refresh(db_menu_item)
    return db_menu_item

def delete_menu_item(db: Session, menu_item_id: int):
    db_menu_item = db.query(models.Menu).filter(models.Menu.id == menu_item_id).first()
    if db_menu_item:
        db.delete(db_menu_item)
        db.commit()
    return db_menu_item

def update_order(db: Session, order_id: int, order: schemas.OrderCreate):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if db_order:
        for key, value in order.dict().items():
            setattr(db_order, key, value)
        db.commit()
        db.refresh(db_order)
    return db_order

def delete_order(db: Session, order_id: int):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if db_order:
        db.delete(db_order)
        db.commit()
    return db_order
