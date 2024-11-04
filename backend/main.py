# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import crud, models, schemas
from database import SessionLocal, engine
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

# Créer les tables
models.Base.metadata.create_all(bind=engine)

# Initialisation de l'application
app = FastAPI()

# Origines autorisées (vous pouvez ajouter les domaines de votre frontend ici)
origins = [
    "http://localhost",
    "http://localhost:3000",
]

# Ajout du middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Autorise uniquement ces origines spécifiques
    allow_credentials=True,  # Autorise l'envoi de cookies (utile pour l'authentification)
    allow_methods=["*"],  # Autorise toutes les méthodes (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Autorise tous les headers
)


# Dependency pour obtenir une session de base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Routes Utilisateur
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.put("/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.update_user(db, user_id=user_id, user=user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.delete("/users/{user_id}", response_model=schemas.User)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.delete_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Routes Food Truck
@app.post("/food_trucks/", response_model=schemas.FoodTruck)
def create_food_truck(food_truck: schemas.FoodTruckCreate, db: Session = Depends(get_db)):
    return crud.create_food_truck(db=db, food_truck=food_truck)

@app.get("/food_trucks/", response_model=list[schemas.FoodTruck])
def read_food_trucks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    food_trucks = crud.get_food_trucks(db, skip=skip, limit=limit)
    return food_trucks

@app.put("/food_trucks/{food_truck_id}", response_model=schemas.FoodTruck)
def update_food_truck(food_truck_id: int, food_truck: schemas.FoodTruckCreate, db: Session = Depends(get_db)):
    db_food_truck = crud.update_food_truck(db, food_truck_id=food_truck_id, food_truck=food_truck)
    if db_food_truck is None:
        raise HTTPException(status_code=404, detail="Food Truck not found")
    return db_food_truck

@app.delete("/food_trucks/{food_truck_id}", response_model=schemas.FoodTruck)
def delete_food_truck(food_truck_id: int, db: Session = Depends(get_db)):
    db_food_truck = crud.delete_food_truck(db, food_truck_id=food_truck_id)
    if db_food_truck is None:
        raise HTTPException(status_code=404, detail="Food Truck not found")
    return db_food_truck

# Routes Menu
@app.post("/menus/", response_model=schemas.Menu)
def create_menu_item(menu_item: schemas.MenuCreate, db: Session = Depends(get_db)):
    return crud.create_menu_item(db=db, menu_item=menu_item)

@app.put("/menus/{menu_item_id}", response_model=schemas.Menu)
def update_menu_item(menu_item_id: int, menu_item: schemas.MenuCreate, db: Session = Depends(get_db)):
    db_menu_item = crud.update_menu_item(db, menu_item_id=menu_item_id, menu_item=menu_item)
    if db_menu_item is None:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return db_menu_item

@app.delete("/menus/{menu_item_id}", response_model=schemas.Menu)
def delete_menu_item(menu_item_id: int, db: Session = Depends(get_db)):
    db_menu_item = crud.delete_menu_item(db, menu_item_id=menu_item_id)
    if db_menu_item is None:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return db_menu_item

# Routes Commandes
@app.post("/orders/", response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    return crud.create_order(db=db, order=order)

@app.get("/orders/{user_id}", response_model=list[schemas.Order])
def read_orders(user_id: int, db: Session = Depends(get_db)):
    orders = crud.get_orders(db, user_id=user_id)
    return orders

@app.put("/orders/{order_id}", response_model=schemas.Order)
def update_order(order_id: int, order: schemas.OrderCreate, db: Session = Depends(get_db)):
    db_order = crud.update_order(db, order_id=order_id, order=order)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order

@app.delete("/orders/{order_id}", response_model=schemas.Order)
def delete_order(order_id: int, db: Session = Depends(get_db)):
    db_order = crud.delete_order(db, order_id=order_id)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order
