// src/components/FoodTruckList.js
import React, { useEffect, useState } from 'react';
import { fetchFoodTrucks } from '../services/foodTruckService';
import '../styles/FoodTruckList.css';
import MenuList from '../components/MenuList';

const FoodTruckList = () => {
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFoodTrucks = async () => {
      try {
        const data = await fetchFoodTrucks();
        setFoodTrucks(data);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };
    console.log("Donnes " + fetchFoodTrucks)

    getFoodTrucks();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }
  if (!foodTrucks) {
    return <p>Aucun food truck disponible pour le moment.</p>;
  }

  return (
    <div className={"bg-black"}>
      <h2>Liste des Food Trucks</h2>      
      <div className="foodTruckGrid">
      {foodTrucks.map((truck) => (
          <div key={truck.id} className="foodTruckItem">
            <h3>{truck.name}</h3>
            <p>{truck.description}</p>
            <p>Location: {truck.location}</p>
            <p>Disponibilité: {truck.availability}</p>

            <h4>--- Menu ---</h4>
            {truck.menu_items && truck.menu_items.length > 0 ? (
              <div className='foodTruckMenuGrid'>
                {truck.menu_items.map((menuItem) => (
                <div className="foodTruckMenu">
                    <h3>{menuItem.item_name}</h3>
                    <p>{menuItem.description}</p>
                    <p>Prix: {menuItem.price.toFixed(2)}€</p>
                </div>
                ))}
            </div>
            ) : (
              <p>Aucun item de menu disponible.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodTruckList;
