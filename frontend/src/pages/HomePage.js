import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MenuList from '../components/MenuList';
import api from '../services/api';
import '../styles/HomePage.css';
import axios from 'axios';
import { API_URL } from '../config';

export const fetchFoodTrucks = async () => {
  try {
    const response = await axios.get(`${API_URL}/food_trucks`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des food trucks :", error);
    throw error;
  }
};
const HomePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/food_trucks/')
      .then(response => setItems(response.data))
      .catch(error => console.error('Erreur lors du chargement du menu', error));
  }, []);

  return (
    <div>
      <Navbar />
      <h1 style={{
                padding: '0 0 0 20px'
            }}
            >Bienvenue chez Foodtroeuf</h1>
        <section className="menu-section">
            <h2>Notre Menu</h2>
            <MenuList items={items} />
        </section>
    </div>


  );
};

export default HomePage;