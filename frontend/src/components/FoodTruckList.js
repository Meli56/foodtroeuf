// src/components/FoodTruckList.js
import React, { useEffect, useState } from 'react';
import { fetchFoodTrucks } from '../services/foodTruckService';

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
    <div>
      <h2>Liste des Food Trucks</h2>      
      <ul>
        {foodTrucks.map((truck) => (
          <li key={truck.id}>
            <h3>{truck.name}</h3>
            <p>{truck.description}</p>
            <p>Location: {truck.location}</p>
            <p>Disponibilité: {truck.availability}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodTruckList;
