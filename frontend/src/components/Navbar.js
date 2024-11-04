// components/Navbar.js
import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Comptoir Volant</h1>
      <ul className="nav-links">
        <li><a href="/">Accueil</a></li>
        <li><a href="/menu">Menu</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
