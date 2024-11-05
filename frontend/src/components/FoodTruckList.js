// src/components/FoodTruckList.js
import React, { useEffect, useState } from 'react';
import { fetchFoodTrucks } from '../services/foodTruckService';
import '../styles/FoodTruckList.css';

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

    getFoodTrucks();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }
  if (!foodTrucks) {
    return <p>Aucun food truck disponible pour le moment.</p>;
  }
  const currentDay = new Date().toLocaleString('fr-FR', { weekday: 'long' });
 

  return (
    <div className={"py-4 px-6 sm:px-8"}>
      <h2 className={"text-white text-2xl font-semibold"}>Liste des Food Trucks</h2>      
      <div className="foodTruckGrid">
      {foodTrucks.map((truck) => (
          <div key={truck.name} className={"foodTruckItem sm:max-w-[25%] md:max-w-[20%] lg:max-w-[16%] " + (truck.day_of_week == currentDay ? 'bg-black text-white' : 'bg-white text-black shadow-xl')}>
            <a href="/resa" className={" no-underline"}>
              <h3>{truck.name}</h3>
              <p>{truck.description}</p>
              <p>Location: {truck.location}</p>
              <p>Disponibilité: {truck.day_of_week}</p>
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
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodTruckList;
