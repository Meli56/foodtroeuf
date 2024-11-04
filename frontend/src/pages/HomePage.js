import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MenuList from '../components/MenuList';
import api from '../services/api';
import '../styles/HomePage.css';

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
            <h2 className={""}>Notre Menu</h2>
            <MenuList items={items} />
        </section>
    </div>


  );
};

export default HomePage;