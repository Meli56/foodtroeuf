// src/services/foodTruckService.js
import axios from 'axios';
import { API_URL } from './config';

export const fetchFoodTrucks = async () => {
  try {
    const response = await axios.get(`${API_URL}/food_trucks/`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des food trucks :", error);
    throw error;
  }
};
