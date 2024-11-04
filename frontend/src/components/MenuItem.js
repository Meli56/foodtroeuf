// components/MenuItem.js
import React from 'react';
import '../styles/MenuItem.css';

const MenuItem = ({ item }) => {
  return (
    <div className="menu-item">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </div>
  );
};

export default MenuItem;
