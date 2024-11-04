// components/MenuList.js
import React from 'react';
import MenuItem from '../components/MenuItem';
import '../styles/MenuList.css';

const MenuList = ({ items }) => {
  return (
    <div className="menu-list">
      {items.map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuList;
