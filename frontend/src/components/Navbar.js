// components/Navbar.js
import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className={"font-bold text-2xl"}>Foodtroeuf</h1>
      <img id='ostrich' src="https://images.pexels.com/photos/752035/pexels-photo-752035.jpeg" alt="logo"></img>
      <ul className="nav-links">
        <li><a href="/home">Accueil</a></li>
        <li><a href="/resa">Reservation</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
