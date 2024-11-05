import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Base
from main import app, get_db

DATABASE_URL = "sqlite:///./test_food_truck.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(scope="session", autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


# Test for Users
def test_create_user():
    response = client.post(
        "/users/",
        json={
            "username": "testuser",
            "password": "testpassword",
            "email": "testuser@example.com",
            "role": "student"
        },
    )
    assert response.status_code == 200
    assert response.json()["username"] == "testuser"
    assert response.json()["email"] == "testuser@example.com"

def test_get_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_update_user():
    # Create a user to update
    user_response = client.post(
        "/users/",
        json={
            "username": "updateuser",
            "password": "testpassword",
            "email": "updateuser@example.com",
            "role": "student"
        },
    )
    user_id = user_response.json()["id"]
    
    # Update the user
    response = client.put(
        f"/users/{user_id}",
        json={
            "username": "updateduser",
            "password": "newpassword",
            "email": "updateduser@example.com",
            "role": "student"
        },
    )
    assert response.status_code == 200
    assert response.json()["username"] == "updateduser"

def test_delete_user():
    # Create a user to delete
    user_response = client.post(
        "/users/",
        json={
            "username": "deleteuser",
            "password": "testpassword",
            "email": "deleteuser@example.com",
            "role": "student"
        },
    )
    user_id = user_response.json()["id"]
    
    # Delete the user
    response = client.delete(f"/users/{user_id}")
    assert response.status_code == 200
    assert response.json()["username"] == "deleteuser"


# Test for Food Trucks
def test_create_food_truck():
    response = client.post(
        "/food_trucks/",
        json={
            "name": "Taco Truck",
            "description": "Best tacos in town",
            "location": "Downtown",
            "day_of_week": "lundi"
        },
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Taco Truck"

def test_get_food_trucks():
    response = client.get("/food_trucks/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_update_food_truck():
    # Create a food truck to update
    food_truck_response = client.post(
        "/food_trucks/",
        json={
            "name": "Burger Truck",
            "description": "Best burgers in town",
            "location": "Midtown",
            "day_of_week": "mardi"
        },
    )
    food_truck_id = food_truck_response.json()["id"]
    
    # Update the food truck
    response = client.put(
        f"/food_trucks/{food_truck_id}",
        json={
            "name": "Updated Burger Truck",
            "description": "Updated description",
            "location": "Updated location",
            "day_of_week": "mercredi"
        },
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Updated Burger Truck"

def test_delete_food_truck():
    # Create a food truck to delete
    food_truck_response = client.post(
        "/food_trucks/",
        json={
            "name": "Delete Truck",
            "description": "Temporary truck",
            "location": "Temporary location",
            "day_of_week": "jeudi"
        },
    )
    food_truck_id = food_truck_response.json()["id"]
    
    # Delete the food truck
    response = client.delete(f"/food_trucks/{food_truck_id}")
    assert response.status_code == 200
    assert response.json()["name"] == "Delete Truck"


# Test for Menu Items
def test_create_menu_item():
    # First, create a food truck to link the menu item to
    food_truck_response = client.post(
        "/food_trucks/",
        json={
            "name": "Pizza Truck",
            "description": "Best pizzas in town",
            "location": "Westside",
            "day_of_week": "vendredi"
        },
    )
    food_truck_id = food_truck_response.json()["id"]

    response = client.post(
        "/menus/",
        json={
            "food_truck_id": food_truck_id,
            "item_name": "Margherita Pizza",
            "description": "Classic pizza with cheese",
            "price": 8.99
        },
    )
    assert response.status_code == 200
    assert response.json()["item_name"] == "Margherita Pizza"

def test_update_menu_item():
    # Create a menu item to update
    menu_item_response = client.post(
        "/menus/",
        json={
            "food_truck_id": 1,
            "item_name": "Cheese Pizza",
            "description": "Cheesy pizza",
            "price": 7.99
        },
    )
    menu_item_id = menu_item_response.json()["id"]
    
    # Update the menu item
    response = client.put(
        f"/menus/{menu_item_id}",
        json={
            "food_truck_id": 1,
            "item_name": "Updated Cheese Pizza",
            "description": "Extra cheesy",
            "price": 9.99
        },
    )
    assert response.status_code == 200
    assert response.json()["item_name"] == "Updated Cheese Pizza"

def test_delete_menu_item():
    # Create a menu item to delete
    menu_item_response = client.post(
        "/menus/",
        json={
            "food_truck_id": 1,
            "item_name": "Delete Pizza",
            "description": "Temporary item",
            "price": 6.99
        },
    )
    menu_item_id = menu_item_response.json()["id"]
    
    # Delete the menu item
    response = client.delete(f"/menus/{menu_item_id}")
    assert response.status_code == 200
    assert response.json()["item_name"] == "Delete Pizza"


# Test for Orders
def test_create_order():
    response = client.post(
        "/orders/",
        json={
            "user_id": 1,
            "food_truck_id": 1,
            "order_details": "2 Cheese Pizzas",
            "status": "pending"
        },
    )
    assert response.status_code == 200
    assert response.json()["order_details"] == "2 Cheese Pizzas"

def test_get_orders():
    response = client.get("/orders/1")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_update_order():
    # Create an order to update
    order_response = client.post(
        "/orders/",
        json={
            "user_id": 1,
            "food_truck_id": 1,
            "order_details": "1 Pepperoni Pizza",
            "status": "pending"
        },
    )
    order_id = order_response.json()["id"]
    
    # Update the order
    response = client.put(
        f"/orders/{order_id}",
        json={
            "user_id": 1,
            "food_truck_id": 1,
            "order_details": "2 Pepperoni Pizzas",
            "status": "confirmed"
        },
    )
    assert response.status_code == 200
    assert response.json()["order_details"] == "2 Pepperoni Pizzas"

def test_delete_order():
    # Create an order to delete
    order_response = client.post(
        "/orders/",
        json={
            "user_id": 1,
            "food_truck_id": 1,
            "order_details": "Temporary order",
            "status": "pending"
        },
    )
    order_id = order_response.json()["id"]
    
    # Delete the order
    response = client.delete(f"/orders/{order_id}")
    assert response.status_code == 200
    assert response.json()["order_details"] == "Temporary order"
