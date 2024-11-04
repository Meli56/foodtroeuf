// src/pages/MenuPage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MenuList from '../components/MenuList';
import api from '../services/api';
import '../styles/MenuPage.css';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer les données de l'API pour afficher le menu
    api.get('/menu')
      .then(response => {
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Erreur lors du chargement du menu.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement du menu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="menu-page">
      <Navbar />
      <header className="menu-header">
        <h1>Notre Menu</h1>
        <p>Découvrez nos plats délicieux, fraîchement préparés.</p>
      </header>
      <MenuList items={menuItems} />
    </div>
  );
};

export default MenuPage;
