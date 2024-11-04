import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import FoodTruckList from '../components/FoodTruckList';

import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <h1 style={{
                padding: '0 0 0 20px'
            }}
            >Bienvenue chez Foodtroeuf</h1>
        <section className={"menu-section"}>
            <FoodTruckList />
            {/* <MenuList items={items} /> */}
        </section>
    </div>
  );
};

export default HomePage;